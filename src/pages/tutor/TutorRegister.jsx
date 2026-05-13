import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  FileText,
  GraduationCap,
  Loader2,
  Upload,
  UserRound,
} from "lucide-react";

import {
  fetchSubjects,
  fetchClasses,
  fetchCoursesBySubject
} from "../../features/register/registerSlice";

import { completeTutorRegistration }
  from "../../features/register/tutorRegisterSlice";

const STEPS = [
  {
    id: 1,
    title: "Identity",
    subtitle: "Basic tutor details",
    icon: UserRound,
  },
  {
    id: 2,
    title: "Credentials",
    subtitle: "Education and experience",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Teaching Fit",
    subtitle: "Subjects, courses, classes",
    icon: BookOpen,
  },
];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 46,
    borderRadius: 12,
    borderColor: state.isFocused ? "#2563eb" : "#dbe3ef",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(37, 99, 235, 0.12)" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#2563eb" : "#b7c3d4",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "2px 12px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#94a3b8",
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: 999,
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#1d4ed8",
    fontWeight: 600,
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.14)",
  }),
};

const TutorRegister = () => {

  const [step, setStep] = useState(1);

  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.tutorRegister);
  const { subjects, courses, classes } = useSelector((state) => state.register);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    qualification: "",
    university: "",
    graduationYear: "",
    experienceYears: "",
    subjectId: null,
    courseIds: [],
    classIds: [],
    teachingMode: "",
    expectedFee: "",
    about: "",
    demoLink: "",
    profilePhoto: null,
    resume: null,
  });

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchClasses());
  }, [dispatch]);

  const subjectOptions = subjects?.map((s) => ({
    value: s.id,
    label: s.subject_name
  }));

  const courseOptions = courses?.map((c) => ({
    value: c.id,
    label: c.course_name
  }));

  const classOptions = classes?.map((cl) => ({
    value: cl.id,
    label: cl.class_name
  }));

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!token) return toast.error("Invalid registration link");
    if (!formData.subjectId) return toast.error("Primary subject required");

    try {

      const data = new FormData();

      data.append("token", token);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("phone", formData.phone);
      data.append("qualification", formData.qualification);
      data.append("university", formData.university);
      data.append("graduationYear", formData.graduationYear);
      data.append("experienceYears", formData.experienceYears);

      data.append("subjectId", formData.subjectId);
      data.append("courseIds", JSON.stringify(formData.courseIds));
      data.append("classIds", JSON.stringify(formData.classIds));

      data.append("teachingMode", formData.teachingMode);
      data.append("expectedFee", formData.expectedFee);
      data.append("about", formData.about);
      data.append("demoLink", formData.demoLink);

      data.append("profilePhoto", formData.profilePhoto);
      data.append("resume", formData.resume);

      await dispatch(completeTutorRegistration(data)).unwrap();

      toast.success("Application submitted successfully!");
      navigate("/tutor-registration-success");

    } catch (error) {

      toast.error(error?.message || "Registration failed");

    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const activeStep = STEPS.find((item) => item.id === step);
  const ActiveIcon = activeStep.icon;

  return (

    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-slate-200/80 ring-1 ring-slate-200 lg:grid-cols-[360px_1fr]">
        <aside className="relative bg-slate-950 p-8 text-white">
          <div className="absolute inset-x-0 top-0 h-1 bg-blue-500" />

          <div className="flex h-full flex-col">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-950/30">
                <Award className="h-6 w-6" />
              </div>

              <h1 className="mt-8 text-3xl font-bold tracking-normal">
                Tutor Onboarding
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Complete your profile details so students and admins can understand what you teach.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {STEPS.map((item) => {
                const StepIcon = item.icon;
                const isActive = item.id === step;
                const isComplete = item.id < step;

                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
                      isActive
                        ? "border-blue-400 bg-white/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        isComplete
                          ? "bg-emerald-500 text-white"
                          : isActive
                            ? "bg-blue-500 text-white"
                            : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {isComplete ? <Check className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300 lg:block">
              Step {step} of {STEPS.length}
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${(step / STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </aside>

        <main className="p-5 sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <ActiveIcon className="h-4 w-4" />
                {activeStep.title}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">
                {activeStep.subtitle}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-500">
                Keep the details accurate. These values are used to create your tutor profile.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 lg:hidden">
              {STEPS.map((item) => (
                <span
                  key={item.id}
                  className={`h-2.5 rounded-full transition-all ${
                    item.id === step ? "w-8 bg-blue-600" : "w-2.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <section className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="First Name"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  handleChange={handleChange}
                />

                <InputField
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  handleChange={handleChange}
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  handleChange={handleChange}
                />

                <FileField
                  name="profilePhoto"
                  label="Profile Photo"
                  helper="Upload a clear profile image."
                  handleChange={handleChange}
                  accept="image/*"
                  file={formData.profilePhoto}
                />
              </section>
            )}

            {step === 2 && (
              <section className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Highest Qualification"
                  name="qualification"
                  placeholder="e.g. M.Sc Mathematics"
                  value={formData.qualification}
                  handleChange={handleChange}
                />

                <InputField
                  label="University / College"
                  name="university"
                  placeholder="Enter institution name"
                  value={formData.university}
                  handleChange={handleChange}
                />

                <InputField
                  label="Graduation Year"
                  name="graduationYear"
                  type="number"
                  placeholder="e.g. 2022"
                  value={formData.graduationYear}
                  handleChange={handleChange}
                />

                <InputField
                  label="Experience"
                  name="experienceYears"
                  type="number"
                  placeholder="Years of teaching experience"
                  value={formData.experienceYears}
                  handleChange={handleChange}
                />
              </section>
            )}

            {step === 3 && (
              <section className="space-y-5">
                <SelectField label="Primary Subject">
                  <Select
                    options={subjectOptions}
                    styles={selectStyles}
                    value={subjectOptions.find(s => s.value === formData.subjectId) || null}
                    placeholder="Select subject"
                    onChange={(opt) => {

                      setFormData((prev) => ({
                        ...prev,
                        subjectId: opt.value,
                        courseIds: []
                      }));

                      dispatch(fetchCoursesBySubject(opt.value));

                    }}
                  />
                </SelectField>

                <SelectField label="Courses">
                  <Select
                    isMulti
                    options={courseOptions}
                    styles={selectStyles}
                    value={courseOptions.filter(c => formData.courseIds.includes(c.value))}
                    placeholder="Select courses"
                    onChange={(opts) =>
                      setFormData((prev) => ({
                        ...prev,
                        courseIds: opts.map(o => o.value)
                      }))
                    }
                  />
                </SelectField>

                <SelectField label="Classes">
                  <Select
                    isMulti
                    options={classOptions}
                    styles={selectStyles}
                    value={classOptions.filter(c => formData.classIds.includes(c.value))}
                    placeholder="Select classes"
                    onChange={(opts) =>
                      setFormData((prev) => ({
                        ...prev,
                        classIds: opts.map(o => o.value)
                      }))
                    }
                  />
                </SelectField>

                <FileField
                  name="resume"
                  label="Upload Resume"
                  helper="PDF resume helps admins verify your credentials."
                  handleChange={handleChange}
                  accept=".pdf"
                  file={formData.resume}
                />
              </section>
            )}

            <div className="flex items-center justify-between border-t border-slate-200 pt-6">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                )}
              </div>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-w-32 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    <>
                      Submit
                      <Check className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </main>
      </div>
    </div>

  );

};

const InputField = ({ name, label, placeholder, type = "text", value, handleChange }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      required
      onChange={handleChange}
      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
    />
  </label>
);

const SelectField = ({ label, children }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {label}
    </label>
    {children}
  </div>
);

const FileField = ({ name, label, helper, handleChange, accept, file }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
    <div className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm transition hover:border-blue-400 hover:bg-blue-50">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
        {accept === ".pdf" ? <FileText className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate-800">
          {file?.name || "Choose file"}
        </p>
        {helper && <p className="mt-0.5 text-xs text-slate-500">{helper}</p>}
      </div>
      <input
        type="file"
        name={name}
        accept={accept}
        required
        onChange={handleChange}
        className="sr-only"
      />
    </div>
  </label>
);

export default TutorRegister;
