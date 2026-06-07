import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
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
  course_type,
  title,
  subtitle,
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

  const filteredCourses = courses;

  const filteredClasses =
    classSelectionMode === "required"
      ? classes.filter((item) => CLASS_NAME_ALLOWLIST.has(item.class_name?.trim()))
      : classes;

  const selectedCourse = filteredCourses.find(
    (course) => String(course.id) === String(selectedCourseId)
  );
  const isSchoolRegistration = classSelectionMode === "required";
  const pathLabel = isSchoolRegistration ? "School Tuition" : "Entrance Exam Prep";
  const guideItems = isSchoolRegistration
    ? ["Choose your curriculum", "Select your class", "Pick the subjects you need"]
    : ["Choose your exam track", "Pick the subjects you need", "Complete your student profile"];

  useEffect(() => {
    dispatch(fetchCourses(course_type));
    dispatch(fetchClasses());

    return () => {
      dispatch(resetRegisterState());
    };
  }, [dispatch, course_type]);

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
    <div className="min-h-screen bg-[#f6f8fb] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/register"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Student registration paths
        </Link>

        <div className="mb-6 rounded-[2rem] border border-white bg-white/80 px-5 py-6 shadow-sm sm:px-8">
          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
              {pathLabel}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              {subtitle}
            </p>

          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-sm font-semibold text-slate-500">Step 1 of 1</p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">Student details</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
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
                label="Mobile Number"
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
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {isSchoolRegistration ? "Curriculum" : "Exam Track"}
                </label>
                <select
                  value={selectedCourseId}
                  onChange={handleCourseChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">
                    {isSchoolRegistration ? "Choose curriculum" : "Choose exam track"}
                  </option>
                  {filteredCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>

              {classSelectionMode !== "hidden" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Class
                    {classSelectionMode === "required" && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </label>
                  <select
                    value={selectedClassId}
                    onChange={(event) => setSelectedClassId(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-slate-100"
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Subjects
                </label>
                <div
                  className={`grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 ${!selectedCourseId ? "opacity-60" : ""
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
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition-colors hover:border-teal-200 hover:bg-teal-50/40"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubjects.includes(subject.id)}
                          onChange={() => toggleSubject(subject.id)}
                          className="h-4 w-4 rounded border-slate-300 text-teal-700"
                        />
                        <span>{subject.subject_name}</span>
                      </label>
                    ))}
                </div>
              </div>

              <Button type="submit" loading={loading} fullWidth className="mt-4 bg-teal-700 py-3 hover:bg-teal-800 active:bg-teal-900">
                Create Student Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-teal-700 hover:text-teal-800 hover:underline">
                Sign in
              </Link>
            </p>
          </Card>

          <Card className="relative overflow-hidden rounded-[2rem] border border-teal-100 bg-gradient-to-br from-[#0f172a] via-[#132238] to-[#0d9488] p-6 text-white shadow-2xl sm:p-8">

            {/* Glow Effects */}
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-teal-400/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-300/10 blur-2xl" />

            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
                Quick Setup
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-white">
                Start with the right tutor match
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-200">
                Fill in your contact details, choose your learning path,
                and select the subjects where you want support.
              </p>

              <div className="mt-7 space-y-3">
                {guideItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-400/20">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-teal-200"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="text-sm font-medium text-slate-100">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">
                  Selected the wrong path?
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Go back to choose between school tuition and
                  entrance exam prep registration.
                </p>

                <Link
                  to="/register"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition hover:text-white"
                >
                  Change path

                  <ArrowLeft
                    className="h-4 w-4 rotate-180"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterForm;
