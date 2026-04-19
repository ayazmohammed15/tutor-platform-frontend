import { useState } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import toast from 'react-hot-toast';

const Login = () => {
   const location = useLocation();
  const prefillEmail = location.state?.email || '';

  const [formData, setFormData] = useState({
    email: prefillEmail,
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("FORM SUBMIT TRIGGERED");
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData);

      if (response?.success) {
        toast.success('Login successful!');

        const role = response.data.user.role;
        if (role === 'student') {
          navigate('/student/dashboard');
        } else if (role === 'tutor') {
          navigate('/tutor/dashboard');
        } else if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        console.log("LOGIN RESPONSE:", response);
        toast.error(response?.message || 'Invalid credentials. Please try again.');
      }

      console.log("LOGIN RESPONSE:", response);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Login failed. Please check your credentials and try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autocomplete="email"
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autocomplete="current-password"
            required
          />

          <Button type="submit" loading={loading} fullWidth className="mt-6">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Register here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
