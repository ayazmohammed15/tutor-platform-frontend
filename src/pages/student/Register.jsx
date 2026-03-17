import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  fetchClasses,
  fetchSubjectsByCourse
} from "../../features/register/registerSlice";

// import { useAuth } from "../../context/AuthContext";
import { registerStudent } from "../../features/register/studentRegisterSlice";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.studentRegister);

  const { courses, classes, subjects } = useSelector((state) => state.register);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const coursePrices = {
    "school-tuition": 2000,
    "iit-jee": 5000,
    "neet": 4500,
    "foundation": 3000,
  };

  // 1. Initial Load: Fetch Courses
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // 2. Fetch Classes AND Subjects when Course changes
  useEffect(() => {
    if (selectedCourse) {
      dispatch(fetchClasses(selectedCourse));
      dispatch(fetchSubjectsByCourse(selectedCourse)); // Fetch based on course only
    }
  }, [selectedCourse, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    const course = courses?.find((item) => String(item.id) === String(courseId));
    const courseSlug = course?.slug || "";

    setSelectedCourse(courseId);
    setSelectedClass("");
    setSelectedSubjects([]);
    setTotalPrice(coursePrices[courseSlug] || 0);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSubjectChange = (subjectId) => {
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    return toast.error("Passwords do not match");
  }

  if (!selectedCourse) return toast.error("Please select a course");
  if (!selectedClass) return toast.error("Please select a class");
  if (selectedSubjects.length === 0) return toast.error("Please select subjects");

  const selectedCourseData = courses?.find(
    (course) => String(course.id) === String(selectedCourse)
  );

  const payload = {
    ...formData,
    course: selectedCourseData?.slug || "",
    course_id: selectedCourseData?.id || selectedCourse,
    class_id: selectedClass,
    subjects: selectedSubjects,
    total_price: totalPrice,
  };

  try {
    const resultAction = await dispatch(registerStudent(payload));

    if (registerStudent.fulfilled.match(resultAction)) {
      toast.success("Registration successful!");
      navigate("/login");
    } else {
      toast.error(resultAction.payload || "Registration failed");
    }

  } catch (error) {
    toast.error("Something went wrong");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Register as Student</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required />
            <Input label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </div>
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Mobile" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          <Input label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <hr className="my-6" />

          {/* COURSE SELECT (Single) */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Course</label>
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="w-full border rounded-md p-2 bg-white"
              required
            >
              <option value="">Choose a course</option>
              {courses?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.course_name} 
                </option>
              ))}
            </select>
          </div>

          {/* CLASS SELECT (Single) */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Class</label>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              disabled={!selectedCourse}
              className="w-full border rounded-md p-2 bg-white disabled:bg-gray-100"
              required
            >
              <option value=""> Select Class </option>
              {classes?.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.class_name}</option>
              ))}
            </select>
          </div>

          {/* SUBJECTS (Multi-select Checkboxes) - Fetched based on Course */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Subjects</label>
            <div className={`grid grid-cols-2 gap-2 border rounded-md p-3 bg-white ${!selectedCourse && 'opacity-50'}`}>
              {!selectedCourse && <p className="text-xs text-gray-400 col-span-2 text-center">Select a course to see subjects</p>}
              {subjects?.map((subject) => (
                <div key={subject.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`sub-${subject.id}`}
                    checked={selectedSubjects.includes(subject.id)}
                    onChange={() => handleSubjectChange(subject.id)}
                    className="rounded text-blue-600"
                  />
                  <label htmlFor={`sub-${subject.id}`} className="text-sm cursor-pointer">
                    {subject.subject_name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-right">
            <span className="text-gray-600">Total: </span>
            <span className="text-xl font-bold text-blue-600">₹{totalPrice}</span>
          </div>

          <Button type="submit" loading={loading} fullWidth className="mt-4">
            Register Now
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
