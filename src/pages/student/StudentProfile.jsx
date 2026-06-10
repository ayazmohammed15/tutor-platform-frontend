import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { fetchClasses, fetchCourses } from '../../features/register/registerSlice';
import { UPLOADS_BASE_URL } from '../../services/api';
import api from '../../services/api';
import toast from 'react-hot-toast';

const StudentProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  console.log("USER DATA:", user);
  const { courses, classes } = useSelector((state) => state.register);
  const avatarUrl = user?.profile_image ? `${UPLOADS_BASE_URL}/${user.profile_image}` : null;
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editData, setEditData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
    course_id: user?.course_id || "",
    class_id: user?.class_id || "",
  });
  useEffect(() => {
    if (!courses.length) {
      dispatch(fetchCourses());
    }

    if (!classes.length) {
      dispatch(fetchClasses());
    }
  }, [classes.length, courses.length, dispatch]);

  const findById = (items, id) =>
    items.find((item) => String(item.id) === String(id));

  const course = findById(courses, user?.course_id);
  const studentClass = findById(classes, user?.class_id);

  const studentData = {
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'student',
    course: course?.course_name || user?.course_name || user?.course_id || '',
    className: studentClass?.class_name || user?.class_name || user?.class_id || '',
    studentId: user?.id ? `STU-${user.id}` : '',
  };

  const fullName =
    `${studentData.firstName} ${studentData.lastName}`.trim() || 'Student Account';

  const initials =
    `${studentData.firstName?.[0] || ''}${studentData.lastName?.[0] || ''}`.toUpperCase() ||
    studentData.email?.[0]?.toUpperCase() ||
    'S';

  const formatRole = (role) =>
    role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Student';

  const displayValue = (value) => value || 'Not provided';

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Reusable Edit Button Component
  const EditButton = () => (
    <button
      onClick={() => {
        setEditData({
          first_name: user?.first_name || "",
          last_name: user?.last_name || "",
          phone: user?.phone || "",
          course_id: user?.course_id || "",
          class_id: user?.class_id || "",
        });
        setIsEditOpen(true);
      }}
      className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
    >
      Edit <Pencil className="w-3.5 h-3.5" />
    </button>
  );

  const handleSaveProfile = async () => {
    try {
      await api.put("/auth/profile", editData);

      toast.success("Profile updated successfully");

      setIsEditOpen(false);

      window.location.reload(); // simple refresh
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">

      {/* 1. Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-[#0fb673] flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white uppercase overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${studentData.firstName} ${studentData.lastName}`.trim() || 'Student profile'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {fullName}
            </h1>
            <p className="text-gray-500 font-medium">{formatRole(studentData.role)}</p>
            <p className="text-gray-400 text-sm mt-1">{displayValue(studentData.email)}</p>
          </div>
        </div>
        <EditButton />
      </div>

      {/* 2. Personal Information Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">First Name</p>
            <p className="text-base font-semibold text-gray-900">{displayValue(studentData.firstName)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Last Name</p>
            <p className="text-base font-semibold text-gray-900">{displayValue(studentData.lastName)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email address</p>
            <p className="text-base font-semibold text-gray-900">{displayValue(studentData.email)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <p className="text-base font-semibold text-gray-900">{formatRole(studentData.role)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
            <p className="text-base font-semibold text-gray-900">{displayValue(studentData.phone)}</p>
          </div>
        </div>
      </div>

      {/* 3. Academic Information Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Academic Information</h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Course</p>
            <p className="text-base font-semibold text-gray-900">{displayValue(studentData.course)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Class</p>
            <p className="text-base font-semibold text-gray-900">{displayValue(studentData.className)}</p>
          </div>
        </div>
      </div>
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Edit Profile
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={editData.first_name}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      first_name: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={editData.last_name}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      last_name: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Course
                </label>

                <select
                  value={editData.course_id}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      course_id: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Course</option>

                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Class
                </label>

                <select
                  value={editData.class_id}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      class_id: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="">Select Class</option>

                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.class_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsEditOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveProfile}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
