import { useEffect, useState } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const normalizeBookings = (payload) => {
  const source = payload?.data?.bookings ?? payload?.bookings ?? payload?.data ?? payload;
  if (Array.isArray(source)) return source;
  if (source && Array.isArray(source.data)) return source.data;
  return [];
};

const getBookingId = (booking) => booking?.booking_id || booking?.id || booking?.bookingId || '—';

const getStudentName = (booking) =>
  booking?.student_first_name ||
  booking?.student?.full_name ||
  booking?.student?.name ||
  booking?.student_name ||
  'Student';

const getTutorName = (booking) =>
  booking?.tutor_first_name ||
  booking?.tutor?.full_name ||
  booking?.tutor?.name ||
  'Tutor';

const getSubjectName = (booking) =>
  booking?.subject_name ||
  booking?.subject?.subject_name ||
  booking?.subject?.name ||
  booking?.course_name ||
  'Subject';

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatTime = (value) => {
  if (!value) return '—';
  const text = String(value).trim();
  if (text.length <= 5) return text;
  return text.slice(0, 5);
};

const getDurationLabel = (booking) => {
  const duration = booking?.duration_minutes ?? booking?.duration ?? booking?.session_duration;
  if (duration === null || duration === undefined || duration === '') return '—';
  return `${duration} min`;
};

const getStatusClasses = (status = '') => {
  const normalized = String(status).toLowerCase();

  if (['paid', 'confirmed', 'completed', 'accepted', 'approved'].includes(normalized)) {
    return 'bg-green-100 text-green-700';
  }

  if (['pending', 'in_progress', 'in-progress', 'scheduled', 'waiting', 'requested'].includes(normalized)) {
    return 'bg-yellow-100 text-yellow-700';
  }

  if (['cancelled', 'rejected', 'failed', 'declined'].includes(normalized)) {
    return 'bg-red-100 text-red-700';
  }

  return 'bg-gray-100 text-gray-700';
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/admin/bookings', {
        suppressGlobalError: true,
        skipAuthRedirect: true,
      });

      setBookings(normalizeBookings(response.data));
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Failed to load bookings.';

      if (status === 401) {
        setError('Your session has expired. Please log in again.');
      } else if (status === 403) {
        setError('You do not have permission to view admin bookings.');
      } else {
        setError(message);
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Session Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">Track upcoming trial classes, scheduled sessions, and booking history.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-2xl mb-3">⚠️</div>
            <h2 className="text-lg font-semibold text-gray-900">Could not load bookings</h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md">{error}</p>
            <button
              type="button"
              onClick={fetchBookings}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm border border-blue-100">
              📅
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h2>
            <p className="text-gray-500 max-w-sm">There are no bookings available for this admin account yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm font-semibold text-gray-600">
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Tutor</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Duration</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {bookings.map((booking, index) => (
                  <tr key={booking?.id || booking?.booking_id || `${booking?.student_name}-${booking?.tutor_name}-${index}`} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900">{index+1}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getStudentName(booking)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getTutorName(booking)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getSubjectName(booking)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatDate(booking?.scheduled_date || booking?.session_date || booking?.date)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatTime(booking?.scheduled_time || booking?.session_time || booking?.time)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getDurationLabel(booking)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(booking?.status || booking?.booking_status)}`}>
                        {booking?.status || booking?.booking_status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;