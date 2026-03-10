import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { boardService } from "../../services/boardService";


const TutorRegister = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [boardOptions, setBoardOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await boardService.getCourses();

        const formatted = data.map((c) => ({
          value: c.id,
          label: c.course_name
        }));

        setCourseOptions(formatted);

      } catch (error) {
        console.error("Courses Load Error:", error);
        toast.error("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await boardService.getBoards();
        console.log("Boards API Response:", data);

        const formatted = data.map((b) => ({
          value: b.id,
          label: b.board_name,
        }));

        console.log("Formatted Boards:", formatted);

        setBoardOptions(formatted);
      } catch (error) {
        console.error("Boards Load Error:", error);
        toast.error("Failed to load boards");
      }
    };

    fetchBoards();
  }, []);



  const teachingModeOptions = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
    { value: "both", label: "Both" },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    qualification: "",
    university: "",
    graduationYear: "",
    experienceYears: "",
    courseId: "",
    boardId: "",
    classIds: [],
    subjects: null,
    teachingMode: "",
    expectedFee: "",
    about: "",
    demoLink: "",
    profilePhoto: null,
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid registration link");
      return;
    }

    if (!formData.resume) {
      toast.error("Resume is mandatory");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("token", token);
      data.append("firstName", formData.firstName);   // ✅ added
      data.append("lastName", formData.lastName);     // ✅ added
      data.append("phone", formData.phone);
      data.append("qualification", formData.qualification);
      data.append("university", formData.university);
      data.append("graduationYear", formData.graduationYear);
      data.append("experienceYears", formData.experienceYears);
      data.append("courseId", formData.courseId);
      data.append("boardId", formData.boardId);
      data.append("classIds", JSON.stringify(formData.classIds));
      data.append("teachingMode", formData.teachingMode);
      data.append("expectedFee", formData.expectedFee);
      data.append("about", formData.about);
      data.append("demoLink", formData.demoLink);

      data.append("subjectId", formData.subjects);


      // Files
      data.append("profilePhoto", formData.profilePhoto);
      data.append("resume", formData.resume);

      await axios.post(
        "http://localhost:5000/api/auth/complete-registration",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Registration submitted successfully!", { replace: true });

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        qualification: "",
        university: "",
        graduationYear: "",
        experienceYears: "",
        boardId: "",
        classIds: [],
        subjects: [],
        teachingMode: "",
        expectedFee: "",
        about: "",
        demoLink: "",
        profilePhoto: null,
        resume: null,
      });

      // Redirect to success page
      navigate("/tutor-registration-success");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };



  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-gray-200">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Tutor Registration
          </h2>
          <p className="text-gray-500 mt-2">
            Complete your professional onboarding
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center mb-8 space-x-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-all duration-300 ${step >= s ? "bg-indigo-600" : "bg-gray-300"
                }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-5">
              <InputField name="firstName" placeholder="First Name" handleChange={handleChange} />
              <InputField name="lastName" placeholder="Last Name" handleChange={handleChange} />
              <InputField name="phone" placeholder="Phone" handleChange={handleChange} />
              <FileField name="profilePhoto" label="Profile Photo" handleChange={handleChange} accept="image/*" />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid md:grid-cols-2 gap-5">
              <InputField name="qualification" placeholder="Qualification" handleChange={handleChange} />
              <InputField name="university" placeholder="University" handleChange={handleChange} />
              <InputField name="graduationYear" placeholder="Graduation Year" type="number" handleChange={handleChange} />
              <InputField name="experienceYears" placeholder="Experience Years" type="number" handleChange={handleChange} />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              {/* COURSE */}
              <Select
                options={courseOptions}
                placeholder="Select Course"
                value={selectedCourse}
                onChange={(opt) => {
                  setSelectedCourse(opt);

                  setFormData((prev) => ({
                    ...prev,
                    courseId: opt.value,
                    boardId: "",
                    classIds: [],
                    subjects: []
                  }));

                  setClassOptions([]);
                  setSubjectOptions([]);
                }}
              />
              {/* BOARD */}
              <Select
                options={boardOptions}
                placeholder="Select Board"
                onChange={async (opt) => {
                  console.log("Selected Board:", opt);

                  setFormData((prev) => ({
                    ...prev,
                    boardId: opt.value,
                    classId: "",
                    subjects: []
                  }));

                  try {
                    const data = await boardService.getClassesByBoard(opt.value);
                    console.log("Classes API Response:", data);

                    const formatted = data.map((c) => ({
                      value: c.id,
                      label: c.class_name,
                    }));

                    console.log("Formatted Classes:", formatted);

                    setClassOptions(formatted);
                    setSubjectOptions([]);
                  } catch (error) {
                    console.error("Classes Load Error:", error);
                    toast.error("Failed to load classes");
                  }
                }}
              />

              {/* CLASS */}
              <Select
                isMulti   // ✅ important
                options={classOptions}
                placeholder="Select Classes"
                onChange={async (opts) => {

                  const selectedClassIds = opts ? opts.map(o => o.value) : [];

                  setFormData(prev => ({
                    ...prev,
                    classIds: selectedClassIds,
                    subjects: []
                  }));

                  if (!selectedClassIds.length) {
                    setSubjectOptions([]);
                    return;
                  }

                  try {
                    const data = await boardService.getSubjectsByClasses(
                      formData.boardId,
                      selectedClassIds
                    );

                    const formatted = data.map((s) => ({
                      value: s.id,
                      label: `${s.subject_name} - ${s.class_name}`,
                    }));

                    setSubjectOptions(formatted);
                  } catch (error) {
                    toast.error("Failed to load subjects");
                  }
                }}
              />
              {/* SUBJECTS */}
              <Select
                options={subjectOptions}
                placeholder="Select Subject"
                onChange={(opt) => {

                  setFormData((prev) => ({
                    ...prev,
                    subjects: opt ? opt.value : null,
                  }));

                }}
              />

            </div>
          )}


          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-5">
              <textarea
                name="about"
                placeholder="About Yourself"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition"
              />

              <InputField
                name="demoLink"
                placeholder="Demo Video Link"
                type="url"
                handleChange={handleChange}
              />

              <FileField
                name="resume"
                label="Upload Resume (PDF)"
                handleChange={handleChange}
                accept=".pdf"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-medium"
              >
                Back
              </button>
            )}

            {step < 4 && (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-lg"
              >
                Next
              </button>
            )}

            {step === 4 && (
              <button
                type="submit"
                className="ml-auto px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition shadow-lg"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ name, placeholder, type = "text", handleChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    required
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition"
  />
);

const FileField = ({ name, label, handleChange, accept }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>
    <input
      type="file"
      name={name}
      required
      accept={accept}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-indigo-500 transition"
    />
  </div>
);

export default TutorRegister;
