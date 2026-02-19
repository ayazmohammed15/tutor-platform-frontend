import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';
import RoleLayout from './components/common/RoleLayout';
import RolePlaceholder from './components/common/RolePlaceholder';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import TutorProfile from './pages/student/TutorProfile';
import StudentSessions from './pages/student/StudentSessions';
import TutorDashboard from './pages/tutor/TutorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import TutorsProfile from './pages/tutor/TutorsProfile';
import SetPassword from './pages/auth/SetPassword';
import TutorRegister from './pages/tutor/TutorRegister';
import AdminLayout from './components/layouts/AdminLayout';

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

          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <RoleLayout role="student">
                    <StudentDashboard />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <RoleLayout role="student">
                    <RolePlaceholder
                      title="My Profile"
                      description="Student profile details will appear here."
                    />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/tutor/:tutorId"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <RoleLayout role="student">
                    <TutorProfile />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/sessions"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <RoleLayout role="student">
                    <StudentSessions />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/assignments"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <RoleLayout role="student">
                    <RolePlaceholder
                      title="Assigments"
                      description="Student assignments will appear here."
                    />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/payments"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <RoleLayout role="student">
                    <RolePlaceholder
                      title="Payments"
                      description="Student payment history will appear here."
                    />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tutor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <Layout>
                  <RoleLayout role="tutor">
                    <RolePlaceholder
                      title="Dashboard"
                      description="Tutor dashboard content will appear here."
                    />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tutor/profile"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <Layout>
                  <RoleLayout role="tutor">
                    <TutorsProfile />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tutor/sessions"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <Layout>
                  <RoleLayout role="tutor">
                    <TutorDashboard />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tutor/assignments"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <Layout>
                  <RoleLayout role="tutor">
                    <RolePlaceholder
                      title="Assigments"
                      description="Tutor assignments will appear here."
                    />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/tutor/payments"
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <Layout>
                  <RoleLayout role="tutor">
                    <RolePlaceholder
                      title="Payments"
                      description="Tutor payments and payouts will appear here."
                    />
                  </RoleLayout>
                </Layout>
              </ProtectedRoute>
            }
          />


          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
<Route path="/set-password" element={<SetPassword />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
<Route path="/tutor-register" element={<TutorRegister />} />
      
          

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;


