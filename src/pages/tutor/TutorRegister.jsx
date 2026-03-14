import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSubjects,
  fetchClasses,
  fetchCoursesBySubject
} from "../../features/register/registerSlice";

import { completeTutorRegistration }
  from "../../features/register/tutorRegisterSlice";

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

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-200 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10">

        <h2 className="text-3xl font-bold text-center mb-6">
          Tutor Onboarding
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* STEP 1 */}

          {step === 1 && (

            <div className="grid md:grid-cols-2 gap-4">

              <InputField
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                handleChange={handleChange}
              />

              <InputField
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                handleChange={handleChange}
              />

              <InputField
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                handleChange={handleChange}
              />

              <FileField
                name="profilePhoto"
                label="Profile Photo"
                handleChange={handleChange}
                accept="image/*"
                file={formData.profilePhoto}
              />

            </div>

          )}

          {/* STEP 2 */}

          {step === 2 && (

            <div className="grid md:grid-cols-2 gap-4">

              <InputField
                name="qualification"
                placeholder="Highest Qualification"
                value={formData.qualification}
                handleChange={handleChange}
              />

              <InputField
                name="university"
                placeholder="University / College"
                value={formData.university}
                handleChange={handleChange}
              />

              <InputField
                name="graduationYear"
                type="number"
                placeholder="Graduation Year"
                value={formData.graduationYear}
                handleChange={handleChange}
              />

              <InputField
                name="experienceYears"
                type="number"
                placeholder="Experience (Years)"
                value={formData.experienceYears}
                handleChange={handleChange}
              />

            </div>

          )}

          {/* STEP 3 */}

          {step === 3 && (

            <div className="space-y-5">

              <div>

                <label className="block text-sm font-medium mb-1">
                  Primary Subject
                </label>

                <Select
                  options={subjectOptions}
                  value={subjectOptions.find(s => s.value === formData.subjectId) || null}
                  placeholder="Select Subject"
                  onChange={(opt) => {

                    setFormData((prev) => ({
                      ...prev,
                      subjectId: opt.value,
                      courseIds: []
                    }));

                    dispatch(fetchCoursesBySubject(opt.value));

                  }}
                />

              </div>

              <div>

                <label className="block text-sm font-medium mb-1">
                  Courses
                </label>

                <Select
                  isMulti
                  options={courseOptions}
                  value={courseOptions.filter(c => formData.courseIds.includes(c.value))}
                  placeholder="Select Courses"
                  onChange={(opts) =>
                    setFormData((prev) => ({
                      ...prev,
                      courseIds: opts.map(o => o.value)
                    }))
                  }
                />

              </div>

              <div>

                <label className="block text-sm font-medium mb-1">
                  Classes
                </label>

                <Select
                  isMulti
                  options={classOptions}
                  value={classOptions.filter(c => formData.classIds.includes(c.value))}
                  placeholder="Select Classes"
                  onChange={(opts) =>
                    setFormData((prev) => ({
                      ...prev,
                      classIds: opts.map(o => o.value)
                    }))
                  }
                />

              </div>

              <FileField
                name="resume"
                label="Upload Resume"
                handleChange={handleChange}
                accept=".pdf"
              />

            </div>

          )}

          <div className="flex justify-between pt-4">

            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2 bg-gray-200 rounded-lg"
              >
                Back
              </button>
            )}

            {step < 3 ? (

              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-5 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Next
              </button>

            ) : (

              <button
                type="submit"
                disabled={loading}
                className="ml-auto px-5 py-2 bg-green-600 text-white rounded-lg"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

            )}

          </div>

        </form>

      </div>

    </div>

  );

};

const InputField = ({ name, placeholder, type = "text", value, handleChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    required
    onChange={handleChange}
    className="w-full border rounded-lg px-3 py-2"
  />
);

const FileField = ({ name, label, handleChange, accept }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <input
      type="file"
      name={name}
      accept={accept}
      required
      onChange={handleChange}
      className="w-full border rounded-lg px-3 py-2"
    />
  </div>
);

export default TutorRegister;