import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchClasses,
  fetchCourses,
  fetchSubjectsByCourse,
} from "../../features/register/registerSlice";
import {
  registerStudent,
  resetRegisterState,
} from "../../features/register/studentRegisterSlice";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

const CLASS_NAME_ALLOWLIST = new Set(["6th", "7th", "8th", "9th", "10th"]);

const StudentRegisterForm = ({
  category,
  title,
  subtitle,
  allowedCourseSlugs,
  classSelectionMode = "required",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const filteredCourses = courses.filter((course) =>
    allowedCourseSlugs.includes(course.slug)
  );

  const filteredClasses =
    classSelectionMode === "required"
      ? classes.filter((item) => CLASS_NAME_ALLOWLIST.has(item.class_name?.trim()))
      : classes;

  const selectedCourse = filteredCourses.find(
    (course) => String(course.id) === String(selectedCourseId)
  );

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchClasses());

    return () => {
      dispatch(resetRegisterState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCourseId) {
      return;
    }

    dispatch(fetchSubjectsByCourse(selectedCourseId));
  }, [dispatch, selectedCourseId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseChange = (event) => {
    const nextCourseId = event.target.value;
    setSelectedCourseId(nextCourseId);
    setSelectedClassId("");
    setSelectedSubjects([]);
  };

  const toggleSubject = (subjectId) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!selectedCourse?.slug) {
      toast.error("Please select a course");
      return;
    }

    if (classSelectionMode === "required" && !selectedClassId) {
      toast.error("Please select a class");
      return;
    }

    if (selectedSubjects.length === 0) {
      toast.error("Please select at least one subject");
      return;
    }

    const payload = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
      course: selectedCourse.slug,
      subjects: selectedSubjects,
    };

    if (selectedClassId) {
      payload.class_id = selectedClassId;
    }

    const resultAction = await dispatch(
      registerStudent({
        category,
        payload,
      })
    );

    if (registerStudent.fulfilled.match(resultAction)) {
      toast.success("Registration successful!");
      navigate("/login", {
        state: { email: payload.email },
      });
      return;
    }

    toast.error(resultAction.payload || "Registration failed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
          <p className="mt-3 text-base text-slate-600">{subtitle}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="rounded-3xl border border-white/80 bg-white/95 p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Mobile"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <div className="border-t border-slate-100 pt-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Select Course
                </label>
                <select
                  value={selectedCourseId}
                  onChange={handleCourseChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose a course</option>
                  {filteredCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>

              {classSelectionMode !== "hidden" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Select Class
                    {classSelectionMode === "required" && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </label>
                  <select
                    value={selectedClassId}
                    onChange={(event) => setSelectedClassId(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    disabled={!selectedCourseId}
                    required={classSelectionMode === "required"}
                  >
                    <option value="">
                      {classSelectionMode === "required"
                        ? "Select class"
                        : "Class not required"}
                    </option>
                    {filteredClasses.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.class_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select Subjects
                </label>
                <div
                  className={`grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 ${
                    !selectedCourseId ? "opacity-60" : ""
                  }`}
                >
                  {!selectedCourseId && (
                    <p className="text-sm text-slate-500 sm:col-span-2">
                      Select a course to load subjects.
                    </p>
                  )}
                  {selectedCourseId &&
                    subjects.map((subject) => (
                      <label
                        key={subject.id}
                        className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 text-sm text-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubjects.includes(subject.id)}
                          onChange={() => toggleSubject(subject.id)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600"
                        />
                        <span>{subject.subject_name}</span>
                      </label>
                    ))}
                </div>
              </div>

              <Button type="submit" loading={loading} fullWidth className="mt-4 py-3">
                Register Now
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </Card>

          <Card className="rounded-3xl border border-white/80 bg-slate-900 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Registration Guide
            </p>
            <h2 className="mt-4 text-3xl font-bold">What we collect</h2>
            <div className="mt-6 space-y-4 text-sm leading-6 text-slate-200">
              <p>Your course is sent as a backend-ready slug, not a numeric course id.</p>
              <p>Subjects are submitted as an array of subject ids so the tutor match stays intact.</p>
              <p>
                {classSelectionMode === "required"
                  ? "School registrations require a class between 6th and 10th."
                  : "Engineering registrations keep class selection optional and out of the way."}
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-white/10 p-5">
              <p className="text-sm font-semibold text-white">Need another student route?</p>
              <p className="mt-2 text-sm text-slate-200">
                You can return to the category chooser at any time and switch between school and engineering registration.
              </p>
              <Link
                to="/register"
                className="mt-4 inline-flex text-sm font-semibold text-blue-200 hover:text-white"
              >
                Back to student categories
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterForm;
