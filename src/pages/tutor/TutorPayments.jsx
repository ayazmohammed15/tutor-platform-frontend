import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  IndianRupee,
  RefreshCw,
  UserRound,
  Wallet,
} from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const getAmount = (payment) => Number(payment.amount || payment.total_amount || payment.session_fee || 0);

const TutorPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/payments/tutor', {
        suppressGlobalError: true,
      });
      const payload = response.data;
      const paymentList = Array.isArray(payload)
        ? payload
        : payload?.data?.payments || payload?.payments || [];

      setPayments(Array.isArray(paymentList) ? paymentList : []);
    } catch (err) {
      console.error('Error fetching tutor payments:', err);
      setError(err.response?.data?.message || 'Failed to load payments. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const summary = useMemo(() => {
    const totalEarnings = payments.reduce((sum, payment) => sum + getAmount(payment), 0);
    const students = new Set(
      payments
        .map((payment) => payment.student_id || payment.student?.id || payment.student_email)
        .filter(Boolean)
    );

    return {
      totalEarnings,
      totalPayments: payments.length,
      totalStudents: students.size,
    };
  }, [payments]);

  const formatCurrency = (amount, currency = 'INR') =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));

  const formatDate = (date) => {
    if (!date) return 'Not scheduled';

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return 'Not scheduled';

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (time) => {
    if (!time) return '';
    return String(time).slice(0, 5);
  };

  const getStudentName = (payment) =>
    payment.student_name ||
    payment.student?.name ||
    payment.session?.student_name ||
    payment.session?.student?.name ||
    'Student';

  const getStudentEmail = (payment) =>
    payment.student_email ||
    payment.student?.email ||
    payment.session?.student_email ||
    payment.session?.student?.email ||
    '';

  const getStudentPhone = (payment) =>
    payment.student_phone ||
    payment.student?.phone ||
    payment.session?.student_phone ||
    payment.session?.student?.phone ||
    '';

  const getSessionDate = (payment) =>
    payment.scheduled_date ||
    payment.session_date ||
    payment.session?.scheduled_date ||
    payment.session?.session_date;

  const getSessionTime = (payment) =>
    payment.scheduled_time ||
    payment.session_time ||
    payment.session?.scheduled_time ||
    payment.session?.session_time;

  const getSessionLabel = (payment) =>
    payment.subject_name ||
    payment.subject ||
    payment.session?.subject_name ||
    payment.session?.subject ||
    payment.course_name ||
    payment.session?.course_name ||
    'Tutoring session';

  const getPaymentStatus = (payment) => payment.status || payment.payment_status || 'completed';

  const statCards = [
    {
      label: 'Total Earnings',
      value: formatCurrency(summary.totalEarnings),
      icon: IndianRupee,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      label: 'Completed Payments',
      value: summary.totalPayments,
      icon: CheckCircle2,
      color: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      label: 'Paid Students',
      value: summary.totalStudents,
      icon: UserRound,
      color: 'bg-violet-50 text-violet-700 border-violet-100',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Tutor earnings</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-950">Payments & Earnings</h1>
          <p className="mt-2 text-sm text-gray-500">
            Completed student payments from your booked sessions.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchPayments}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.label} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.label}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-950">{card.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg border ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-950">Completed transactions</h2>
              <p className="text-sm text-gray-500">Payment, student, and session details.</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-80 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-950">Could not load payments</h3>
            <p className="mt-2 max-w-md text-sm text-gray-500">{error}</p>
            <button
              type="button"
              onClick={fetchPayments}
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        ) : payments.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-500">
              <CreditCard className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-950">No completed payments yet</h3>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              Completed session payments will appear here once students finish checkout.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Student
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Session
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Payment
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Method
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {payments.map((payment, index) => (
                  <tr
                    key={payment.id || payment.payment_id || payment.razorpay_payment_id || index}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                          {getStudentName(payment).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-950">{getStudentName(payment)}</p>
                          {getStudentEmail(payment) && (
                            <p className="text-sm text-gray-500">{getStudentEmail(payment)}</p>
                          )}
                          {getStudentPhone(payment) && (
                            <p className="text-xs text-gray-400">{getStudentPhone(payment)}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{getSessionLabel(payment)}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          {formatDate(getSessionDate(payment))}
                          {getSessionTime(payment) ? ` at ${formatTime(getSessionTime(payment))}` : ''}
                        </span>
                      </div>
                      {payment.duration_minutes && (
                        <p className="mt-1 text-xs font-medium text-gray-400">
                          {payment.duration_minutes} minute session
                        </p>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(payment.updated_at || payment.completed_at || payment.paid_at || payment.created_at)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payment.razorpay_payment_id || payment.transaction_id || payment.payment_id || `#${payment.id}`}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                        {getPaymentStatus(payment)}
                      </span>
                      {payment.session_status && (
                        <p className="mt-1 text-xs capitalize text-gray-400">Session {payment.session_status}</p>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
                        {payment.payment_method || payment.method || 'Online'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-base font-bold text-gray-950">
                      {formatCurrency(getAmount(payment), payment.currency || 'INR')}
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

export default TutorPayments;
