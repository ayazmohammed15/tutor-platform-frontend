import { Link } from "react-router-dom";
import RegistrationCategoryCards from "../../components/register/RegistrationCategoryCards";

const Register = () => {
  return (
    <div className="rounded-[2rem] border border-white bg-white/80 px-5 py-6 shadow-sm sm:px-8 lg:px-10">
  <div className="mx-auto max-w-3xl text-center">
    
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
      Student Registration
    </p>

    <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
      Pick the learning path that fits you
    </h3>

    <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
      Create a student account for school tuition or entrance exam preparation.
      Each path asks only for the details needed to get you matched with the right tutors.
    </p>
  </div>

  <div className="mt-7">
    <RegistrationCategoryCards />
  </div>

  <p className="mt-6 text-center text-sm text-slate-600">
    Already have an account?{" "}
    
    <Link
      to="/login"
      className="font-semibold text-teal-700 hover:text-teal-800 hover:underline"
    >
      Sign in
    </Link>
  </p>
</div>
  );
};

export default Register;
