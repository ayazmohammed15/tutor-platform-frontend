import { useState, useEffect } from 'react';
import { sessionService } from '../../services/sessionService';
import { paymentService } from '../../services/paymentService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const StudentSessions = () => {
  const { user, logout } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const sessionRes = await sessionService.getMySessions();
      const requestRes = await sessionService.getMyRequests();

      setSessions(sessionRes.data.sessions || []);
      setRequests(requestRes.data.requests || []);
    } catch (error) {
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (session) => {
    if (user?.role !== 'student') {
      toast.error('Please log in with a student account to make payments');
      logout();
      return;
    }

    setProcessingPayment(session.id);

    try {
      const orderResponse = await paymentService.createOrder(session.id, 'upi');
      const orderData = orderResponse?.data || orderResponse;

      if (
        !orderData?.orderId ||
        !orderData?.keyId ||
        !orderData?.amount ||
        !orderData?.currency
      ) {
        throw new Error('Invalid payment order response');
      }

      await paymentService.initiateRazorpay(
        orderData,
        async (response) => {
          try {
            const verifyResponse = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              payment_method: 'upi',
            });

            if (!verifyResponse.success) {
              throw new Error(verifyResponse.message || 'Payment verification failed');
            }

            toast.success('Payment successful!');
            await fetchAllData();
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error(error.message || 'Payment verification failed');
          }
        },
        (message) => {
          toast.error(message || 'Payment failed');
        }
      );
    } catch (error) {
      console.error('Payment error:', error);
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Payment failed';

      if (error?.response?.status === 403) {
        toast.error(`${message}. Please log in again as a student.`);
        logout();
      } else {
        toast.error(message);
      }
    } finally {
      setProcessingPayment(null);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString();

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Sessions</h1>

      {requests.filter((request) => request.status === 'pending').length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
          <div className="space-y-4">
            {requests
              .filter((request) => request.status === 'pending')
              .map((request) => (
                <Card key={request.id}>
                  <h3 className="font-semibold text-lg">
                    Request to {request.tutor_name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(request.requested_date)} at {request.requested_time.slice(0, 5)}
                  </p>
                  <span className="text-yellow-600 font-medium">
                    Waiting for tutor approval
                  </span>
                </Card>
              ))}
          </div>
        </div>
      )}

      {requests.filter((request) => request.status === 'rejected').length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Rejected Requests</h2>
          <div className="space-y-4">
            {requests
              .filter((request) => request.status === 'rejected')
              .map((request) => (
                <Card key={request.id}>
                  <h3 className="font-semibold text-lg">
                    Request to {request.tutor_name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(request.requested_date)} at {request.requested_time.slice(0, 5)}
                  </p>
                  <span className="text-red-600 font-medium">
                    Rejected
                  </span>
                </Card>
              ))}
          </div>
        </div>
      )}

      {sessions.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600">
            No confirmed sessions yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {sessions.map((session) => (
            <Card key={session.id}>
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    Session with {session.tutor_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {session.tutor_email}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100">
                  {session.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">
                    {formatDate(session.scheduled_date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">
                    {session.scheduled_time.slice(0, 5)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">
                    {session.duration_minutes} minutes
                  </p>
                </div>
              </div>

              {session.status === 'scheduled' && (
                <Button
                  onClick={() => handlePayment(session)}
                  loading={processingPayment === session.id}
                >
                  Pay Now
                </Button>
              )}

              {session.status === 'paid' && session.zoom_meeting_link && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Session Confirmed
                  </h4>
                  <a
                    href={session.zoom_meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 break-all"
                  >
                    {session.zoom_meeting_link}
                  </a>
                  {session.zoom_password && (
                    <p className="mt-2 font-mono">
                      Password: {session.zoom_password}
                    </p>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSessions;
