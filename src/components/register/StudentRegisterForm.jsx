import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CheckCircle2, Sparkles } from "lucide-react";
import {
  registerStudent,
  resetRegisterState,
} from "../../features/register/studentRegisterSlice";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

const StudentRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.studentRegister);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.first_name.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!formData.last_name.trim()) {
      toast.error("Last name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Mobile number is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      toast.error("Please enter a valid 10 digit mobile number");
      return;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
    };

    const resultAction = await dispatch(registerStudent(payload));

    if (registerStudent.fulfilled.match(resultAction)) {
      toast.success("Student registration successful");
      dispatch(resetRegisterState());
      navigate("/login", {
        state: { email: payload.email },
      });
      return;
    }

    toast.error(resultAction.payload || "Registration failed");
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-[2rem] border border-white bg-white/80 px-5 py-6 shadow-sm sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2f5f90]">
              Student Registration
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Create Your Student Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Sign up to connect with tutors and start your learning journey.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-sm font-semibold text-slate-500">Step 1 of 1</p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">Account details</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#2f5f90]">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

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

              <Button
                type="submit"
                loading={loading}
                fullWidth
                className="mt-2 bg-[#1f3f66] py-3 hover:bg-[#183452] active:bg-[#12273f]"
              >
                Create Student Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#2f5f90] hover:text-[#1f3f66] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </Card>

          <Card className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-[#132238] via-[#1f3f66] to-[#315f91] p-6 text-white shadow-2xl shadow-blue-950/15 sm:p-8">
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                Quick Setup
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-white">
                Start learning with the right tutor match
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-200">
                Create your account, sign in, and explore tutors who fit your goals,
                schedule, and learning style.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Create your student account",
                  "Sign in with your email",
                  "Connect with tutors",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 backdrop-blur-sm"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200/15">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-blue-100"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="text-sm font-medium text-slate-100">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterForm;
