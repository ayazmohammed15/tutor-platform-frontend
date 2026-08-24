import { useEffect, useState } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const normalizePayments = (payload) => {
  const source = payload?.data?.payments ?? payload?.payments ?? payload?.data ?? payload;
  if (Array.isArray(source)) return source;
  if (source && Array.isArray(source.data)) return source.data;
  return [];
};

const getPaymentId = (payment) => payment?.payment_id || payment?.transaction_id || payment?.id || payment?.paymentId || '—';

const getStudentName = (payment) =>
  payment?.student_first_name ||
  payment?.student?.full_name ||
  payment?.student?.name ||
  'Student';

const getTutorName = (payment) =>
  payment?.tutor_first_name ||
  payment?.tutor?.full_name ||
  payment?.tutor?.name ||
  'Tutor';

const getSubjectName = (payment) =>
  payment?.subject_name ||
  payment?.subject?.subject_name ||
  payment?.subject?.name ||
  payment?.course_name ||
  'Subject';

const getAmount = (payment) => {
  const value = payment?.amount ?? payment?.total_amount ?? payment?.price ?? payment?.session_fee;
  return value == null ? '—' : Number(value).toLocaleString('en-IN', { maximumFractionDigits: 2 });
};

const getCurrency = (payment) => payment?.currency || 'INR';

const getMethod = (payment) => payment?.payment_method || payment?.method || 'N/A';

const getStatus = (payment) => payment?.payment_status || payment?.status || 'Pending';

const getPaymentDate = (payment) => {
  const value = payment?.paid_at || payment?.created_at || payment?.payment_date || payment?.date;
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getStatusClasses = (status = '') => {
  const normalized = String(status).toLowerCase();

  if (['paid', 'completed', 'success', 'succeeded', 'captured'].includes(normalized)) {
    return 'bg-green-100 text-green-700';
  }

  if (['pending', 'processing', 'initiated', 'authorized'].includes(normalized)) {
    return 'bg-yellow-100 text-yellow-700';
  }

  if (['failed', 'cancelled', 'rejected', 'refunded'].includes(normalized)) {
    return 'bg-red-100 text-red-700';
  }

  return 'bg-gray-100 text-gray-700';
};

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/admin/payments', {
        suppressGlobalError: true,
        skipAuthRedirect: true,
      });

      setPayments(normalizePayments(response.data));
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Failed to load payments.';

      if (status === 401) {
        setError('Your session has expired. Please log in again.');
      } else if (status === 403) {
        setError('You do not have permission to view admin payments.');
      } else {
        setError(message);
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments & Invoices</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor platform revenue, student subscriptions, and tutor payouts.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-2xl mb-3">⚠️</div>
            <h2 className="text-lg font-semibold text-gray-900">Could not load payments</h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md">{error}</p>
            <button
              type="button"
              onClick={fetchPayments}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        ) : payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm border border-blue-100">
              💳
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No payments found</h2>
            <p className="text-gray-500 max-w-sm">No payment records are available for the platform yet.</p>
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
                  <th className="px-6 py-3">Amount</th>
                  {/* <th className="px-6 py-3">Currency</th> */}
                  <th className="px-6 py-3">Method</th>
                  <th className="px-6 py-3">Payment Status</th>
                  <th className="px-6 py-3">Payment Date</th>
                  {/* <th className="px-6 py-3">Transaction ID</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {payments.map((payment, index) => (
                  <tr key={payment?.id || payment?.payment_id || `${payment?.student_name}-${payment?.tutor_name}-${index}`} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900">{index+1}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getStudentName(payment)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getTutorName(payment)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getSubjectName(payment)}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">₹{getAmount(payment)}</td>
                    {/* <td className="px-6 py-4 text-sm text-gray-700">{getCurrency(payment)}</td> */}
                    <td className="px-6 py-4 text-sm text-gray-700">{getMethod(payment)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(getStatus(payment))}`}>
                        {getStatus(payment)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{getPaymentDate(payment)}</td>
                    {/* <td className="px-6 py-4 text-sm text-gray-700">{payment?.transaction_id || payment?.razorpay_payment_id || payment?.payment_id || '—'}</td> */}
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

export default AdminPayments;