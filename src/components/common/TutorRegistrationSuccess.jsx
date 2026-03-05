import { Link } from "react-router-dom";

const TutorRegistrationSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-200 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center border border-gray-200">

        <div className="text-5xl mb-4">🎉</div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Application Submitted Successfully!
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for registering as a tutor with us.
          <br />
          Your application is currently <span className="font-semibold text-yellow-600">under review</span>.
          <br />
          You will receive an email notification once the admin approves your profile.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-lg"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default TutorRegistrationSuccess;