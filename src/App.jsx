import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import RolePlaceholder from './components/common/RolePlaceholder';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/student/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import TutorProfile from './pages/student/TutorProfile';
import StudentSessions from './pages/student/StudentSessions';
import TutorDashboard from './pages/tutor/TutorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTutors from './pages/admin/AdminTutors';
import AdminBookings from './pages/admin/AdminBookings';
import AdminPayments from './pages/admin/AdminPayments';
import AdminStudents from './pages/admin/AdminStudents';
import AdminSubjects from './pages/admin/AdminSubjects';
import TutorsProfile from './pages/tutor/TutorsProfile';
import SetPassword from './pages/auth/SetPassword';
import TutorRegister from './pages/tutor/TutorRegister';
import AdminLayout from './components/layouts/AdminLayout';
import StudentLayout from './components/layouts/StudentLayout';
import TutorLayout from './components/layouts/TutorLayout';
import TutorSessions from './pages/tutor/TutorSessions';
import TutorAssignments from './pages/tutor/TutorAssignments';
import TutorPayments from './pages/tutor/TutorPayments';
import TutorAvailability from './pages/tutor/TutorAvailability';
import TutorRegistrationSuccess from "./components/common/TutorRegistrationSuccess";
import StudentProfile from './pages/student/StudentProfile';
import StudentPayments from './pages/student/StudentPayments';
import AboutUs from './pages/AboutUs';
import HowItWorks from './pages/HowItWorks';
import GoogleConnected from './pages/tutor/GoogleConnected';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/school" element={<Navigate to="/register" replace />} />
          <Route path="/register/engineering" element={<Navigate to="/register" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentLayout>
                  <Outlet /> {/* Renders the matching child route inside StudentLayout */}
                </StudentLayout>
              </ProtectedRoute>
            }
          >
            {/* If user goes to /student, redirect to dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="tutor/:tutorId" element={<TutorProfile />} />
            <Route path="sessions" element={<StudentSessions />} />
            <Route
              path="profile"
              element={<StudentProfile />} />
            <Route
              path="payments"
              element={<StudentPayments />}
            />
            <Route
              path="assignments"
              element={<RolePlaceholder title="Assignments" description="Student assignments will appear here." />}
            />
          </Route>

          {/* ================= TUTOR ROUTES ================= */}
          <Route
            path="/tutor"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <TutorLayout>
                  <Outlet /> {/* Renders the matching child route here */}
                </TutorLayout>
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<TutorDashboard />} />
            <Route path="sessions" element={<TutorSessions />} />
            <Route path='availability' element={<TutorAvailability />} />
            <Route path="assignments" element={<TutorAssignments />} />
            <Route path="payments" element={<TutorPayments />} />
            <Route path="profile" element={<TutorsProfile />} />
            <Route path="google-connected" element={<GoogleConnected />} />
          </Route>

          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Default redirect */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="tutors" element={<AdminTutors />} />
            {/* Other sections */}
            <Route path="students" element={<AdminStudents />} />
            <Route path="subjects" element={<AdminSubjects />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="payments" element={<AdminPayments />} />
          </Route>
          <Route path="/set-password" element={<SetPassword />} />

          <Route path="/tutor-register" element={<TutorRegister />} />

          <Route
            path="/tutor-registration-success"
            element={<TutorRegistrationSuccess />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;


