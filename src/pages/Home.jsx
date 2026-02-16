import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Home = () => {
  const { user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.role === 'student') return '/student/dashboard';
    if (user.role === 'tutor') return '/tutor/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to TutorBook
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with expert tutors and excel in your studies
          </p>

          {!user ? (
            <div className="flex justify-center space-x-4">
              <Link to="/register">
                <Button className="px-8 py-3 text-lg">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="px-8 py-3 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <Link to={getDashboardLink()}>
              <Button className="px-8 py-3 text-lg">Go to Dashboard</Button>
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card className="text-center">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold mb-2">Find Expert Tutors</h3>
            <p className="text-gray-600">
              Search and connect with qualified tutors for any subject
            </p>
          </Card>

          <Card className="text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Schedule sessions based on tutor availability
            </p>
          </Card>

          <Card className="text-center">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-bold mb-2">Online Learning</h3>
            <p className="text-gray-600">
              Join sessions via Zoom with automatic meeting links
            </p>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div>
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Register</h4>
              <p className="text-sm text-gray-600">Create your account as a student or tutor</p>
            </div>

            <div>
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Search</h4>
              <p className="text-sm text-gray-600">Find tutors by subject and availability</p>
            </div>

            <div>
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Book</h4>
              <p className="text-sm text-gray-600">Request a session and make payment</p>
            </div>

            <div>
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h4 className="font-semibold mb-2">Learn</h4>
              <p className="text-sm text-gray-600">Join the Zoom meeting and start learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
