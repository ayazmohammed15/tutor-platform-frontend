import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCourses,
  fetchBoards,
  fetchClasses,
  fetchSubjects
} from "../../features/register/registerSlice";

import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import toast from "react-hot-toast";

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    courses,
    boards,
    classes,
    subjects
  } = useSelector((state) => state.register);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const coursePrices = {
    "school-tuition": 2000,
    "iit-jee": 5000,
    "neet": 4500,
    "foundation": 3000,
  };

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCourseChange = (course) => {

    let updatedCourses;

    if (selectedCourses.includes(course.slug)) {
      updatedCourses = selectedCourses.filter((c) => c !== course.slug);
    } else {
      updatedCourses = [...selectedCourses, course.slug];
    }

    setSelectedCourses(updatedCourses);

    const price = updatedCourses.reduce(
      (sum, slug) => sum + (coursePrices[slug] || 0),
      0
    );

    setTotalPrice(price);
  };

  const handleBoardChange = (boardId) => {

    const id = Number(boardId);

    setSelectedBoard(id);
    setSelectedClass(null);
    setSelectedSubjects([]);

    if (id) {
      dispatch(fetchClasses(id));
    }
  };

  const handleClassChange = (classId) => {

    const id = Number(classId);

    setSelectedClass(id);
    setSelectedSubjects([]);

    if (!id) return;

    dispatch(
      fetchSubjects({
        boardId: selectedBoard,
        classIds: [id],
      })
    );
  };

  const handleSubjectChange = (subjectId) => {

    let updated;

    if (selectedSubjects.includes(subjectId)) {
      updated = selectedSubjects.filter((id) => id !== subjectId);
    } else {
      updated = [...selectedSubjects, subjectId];
    }

    setSelectedSubjects(updated);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!selectedClass) {
      toast.error("Please select class");
      return;
    }

    if (selectedSubjects.length === 0) {
      toast.error("Please select subjects");
      return;
    }

    setLoading(true);

    try {

      const response = await register({
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        courses: selectedCourses,
        board_id: selectedBoard,
        class_id: selectedClass,
        subjects: selectedSubjects,
        total_price: totalPrice
      });

      if (response.success) {
        toast.success("Registration successful!");
        navigate("/login");
      }

    } catch (error) {

      console.error(error);
      toast.error("Registration failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">

      <Card className="w-full max-w-md">

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">
            Register as <span className="font-semibold text-blue-600">Student</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <Input label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required />
          <Input label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required />
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Mobile Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          <Input label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          {/* COURSES */}

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Select Courses
            </label>

            {courses?.map((course) => (
              <div key={course.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.slug)}
                  onChange={() => handleCourseChange(course)}
                  className="mr-2"
                />
                <span>
                  {course.course_name}
                  {coursePrices[course.slug]
                    ? ` - ₹${coursePrices[course.slug]}`
                    : ""}
                </span>
              </div>
            ))}
          </div>

          {/* BOARD */}

          <div className="mt-4">

            <label className="block text-sm font-medium mb-2">
              Select Board (Optional)
            </label>

            <select
              onChange={(e) => handleBoardChange(e.target.value)}
              className="w-full border rounded p-2"
            >

              <option value="">Select Board</option>

              {boards?.map((board) => (
                <option key={board.id} value={board.id}>
                  {board.board_name}
                </option>
              ))}

            </select>

          </div>

          {/* CLASS */}

          <div className="mt-4">

            <label className="block text-sm font-medium mb-2">
              Select Class
            </label>

            <select
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full border rounded p-2"
              disabled={!selectedBoard}
            >

              <option value="">Select Class</option>

              {classes?.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.class_name}
                </option>
              ))}

            </select>

          </div>

          {/* SUBJECTS */}

          <div className="mt-4">

            <label className="block text-sm font-medium mb-2">
              Select Subjects
            </label>

            {subjects?.map((subject) => (

              <div key={subject.id} className="flex items-center mb-2">

                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subject.id)}
                  onChange={() => handleSubjectChange(subject.id)}
                  className="mr-2"
                />

                <span>{subject.subject_name}</span>

              </div>

            ))}

          </div>

          <div className="mt-4 text-lg font-semibold text-blue-600">
            Total Price: ₹{totalPrice}
          </div>

          <Button type="submit" loading={loading} fullWidth className="mt-6">
            Register
          </Button>

        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Sign in here
            </Link>
          </p>
        </div>

      </Card>

    </div>

  );

};

export default Register;