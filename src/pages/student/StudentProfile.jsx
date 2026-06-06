import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { fetchClasses, fetchCourses } from '../../features/register/registerSlice';
import { UPLOADS_BASE_URL } from '../../services/api';

const StudentProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  const { courses, classes } = useSelector((state) => state.register);
  const avatarUrl = user?.profile_image ? `${UPLOADS_BASE_URL}/${user.profile_image}` : null;

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
    <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
      Edit <Pencil className="w-3.5 h-3.5" />
    </button>
  );

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
          <EditButton />
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
        </div>
      </div>

      {/* 3. Academic Information Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Academic Information</h2>
          <EditButton />
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
          <div>
            <p className="text-sm text-gray-500 mb-1">Student ID</p>
            <p className="text-base font-semibold text-gray-900">{displayValue(studentData.studentId)}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentProfile;
