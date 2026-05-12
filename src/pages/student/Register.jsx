import { Link } from "react-router-dom";
import RegistrationCategoryCards from "../../components/register/RegistrationCategoryCards";

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-slate-900">Choose Your Student Registration</h1>
          <p className="mt-4 text-base text-slate-600">
            Start with the category that matches your learning path so we can keep the onboarding flow focused and accurate.
          </p>
        </div>

        <div className="mt-10">
          <RegistrationCategoryCards />
        </div>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already registered?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
