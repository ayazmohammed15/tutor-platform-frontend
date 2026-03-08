import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import toast from "react-hot-toast";
import { boardService } from "../../services/boardService";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

const Register = () => {

  const { register } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ---------------------------
     DROPDOWN OPTIONS
  --------------------------- */

  const [courseOptions, setCourseOptions] = useState([]);
  const [boardOptions, setBoardOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  /* ---------------------------
     FORM DATA
  --------------------------- */

  const [formData, setFormData] = useState({

    course_id: "",
    board_id: "",
    class_id: "",
    subject_id: "",

    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""

  });

  /* ---------------------------
     LOAD COURSES
  --------------------------- */

  useEffect(() => {

    const fetchCourses = async () => {

      try {

        const data = await boardService.getCourses();

        const formatted = data.map(c => ({
          value: c.id,
          label: c.course_name
        }));

        setCourseOptions(formatted);

      } catch (error) {

        toast.error("Failed to load courses");

      }

    };

    fetchCourses();

  }, []);


  /* ---------------------------
     LOAD BOARDS
  --------------------------- */

  useEffect(() => {

    const fetchBoards = async () => {

      try {

        const data = await boardService.getBoards();

        const formatted = data.map(b => ({
          value: b.id,
          label: b.board_name
        }));

        setBoardOptions(formatted);

      } catch (error) {

        toast.error("Failed to load boards");

      }

    };

    fetchBoards();

  }, []);


  /* ---------------------------
     HANDLERS
  --------------------------- */

  const handleBoardChange = async (opt) => {

    setFormData(prev => ({

      ...prev,
      board_id: opt.value,
      class_id: "",
      subject_id: ""

    }));

    try {

      const data = await boardService.getClassesByBoard(opt.value);

      const formatted = data.map(c => ({

        value: c.id,
        label: c.class_name

      }));

      setClassOptions(formatted);
      setSubjectOptions([]);

    } catch (error) {

      toast.error("Failed to load classes");

    }

  };


  const handleClassChange = async (opt) => {

    setFormData(prev => ({

      ...prev,
      class_id: opt.value,
      subject_id: ""

    }));

    try {

      const data = await boardService.getSubjectsByClasses(
        formData.board_id,
        [opt.value]
      );

      const formatted = data.map(s => ({

        value: s.id,
        label: s.subject_name

      }));

      setSubjectOptions(formatted);

    } catch (error) {

      toast.error("Failed to load subjects");

    }

  };


  /* ---------------------------
     STEP VALIDATION
  --------------------------- */

  const nextStep = () => {

    if (
      !formData.course_id ||
      !formData.board_id ||
      !formData.class_id ||
      !formData.subject_id
    ) {

      toast.error("Please select course, board, class and subject");
      return;

    }

    setStep(2);

  };


  /* ---------------------------
     SUBMIT
  --------------------------- */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {

      toast.error("Passwords do not match");
      return;

    }

    try {

      setLoading(true);

      const response = await register({

        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,

        course_id: formData.course_id,
        board_id: formData.board_id,
        class_id: formData.class_id,
        subject_id: formData.subject_id

      });

      if (response.success) {

        toast.success("Registration successful!");
        navigate("/login");

      }

    } catch (error) {

      toast.error("Registration failed");

    }
    finally {

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">

      <Card className="w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Student Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">


          {/* STEP 1 */}

          {step === 1 && (

            <>

              <Select
                options={courseOptions}
                placeholder="Select Course"
                onChange={(opt) => {

                  setFormData(prev => ({

                    ...prev,
                    course_id: opt.value

                  }));

                }}
              />

              <Select
                options={boardOptions}
                placeholder="Select Board"
                onChange={handleBoardChange}
              />

              <Select
                options={classOptions}
                placeholder="Select Class"
                onChange={handleClassChange}
              />

              <Select
                options={subjectOptions}
                placeholder="Select Subject"
                onChange={(opt) => {

                  setFormData(prev => ({

                    ...prev,
                    subject_id: opt.value

                  }));

                }}
              />

              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-blue-600 text-white py-3 rounded-lg"
              >
                Next
              </button>

            </>

          )}



          {/* STEP 2 */}

          {step === 2 && (

            <>

              <Input label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />

              <Input label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />

              <Input label="Email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <Input label="Phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <Input label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <Input label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />

              <div className="flex justify-between">

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Back
                </button>

                <Button type="submit" loading={loading}>
                  Register
                </Button>

              </div>

            </>

          )}

        </form>

      </Card>

    </div>

  );

};

export default Register;