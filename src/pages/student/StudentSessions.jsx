import { useState, useEffect } from 'react';
import { sessionService } from '../../services/sessionService';
import { paymentService } from '../../services/paymentService';
import { authService } from '../../services/authService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const StudentSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await sessionService.getMySessions();
      setSessions(response.data.sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (session) => {
    setProcessingPayment(session.id);

    try {
      const user = authService.getCurrentUser();
      const orderResponse = await paymentService.createOrder(session.id);
      const orderData = orderResponse.data;

      paymentService.initiateRazorpay(
        {
          ...orderData,
          userName: user.full_name,
          userEmail: user.email,
        },
        async (paymentData) => {
          try {
            await paymentService.verifyPayment(paymentData);
            toast.success('Payment successful! Your session is confirmed.');
            fetchSessions();
          } catch (error) {
            console.error('Payment verification error:', error);
          } finally {
            setProcessingPayment(null);
          }
        },
        (error) => {
          toast.error(error || 'Payment failed');
          setProcessingPayment(null);
        }
      );
    } catch (error) {
      console.error('Payment initiation error:', error);
      setProcessingPayment(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      scheduled: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Scheduled' },
      paid: { bg: 'bg-green-100', text: 'text-green-800', label: 'Paid' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completed' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
    };

    const config = statusConfig[status] || statusConfig.scheduled;

    return (
      <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-sm font-medium`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Sessions</h1>

      {sessions.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600">
            No sessions yet. Start by searching for tutors!
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {sessions.map((session) => (
            <Card key={session.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Session with {session.tutor_name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{session.tutor_email}</p>
                </div>
                {getStatusBadge(session.status)}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium">{new Date(session.scheduled_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">{session.scheduled_time.slice(0, 5)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{session.duration_minutes} minutes</p>
                </div>
                {session.class_name && (
                  <div>
                    <p className="text-sm text-gray-600">Subject</p>
                    <p className="font-medium">{session.class_name} - {session.topic_name}</p>
                  </div>
                )}
              </div>

              {session.notes && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Notes</p>
                  <p className="text-gray-700">{session.notes}</p>
                </div>
              )}

              {session.status === 'scheduled' && (
                <Button
                  onClick={() => handlePayment(session)}
                  loading={processingPayment === session.id}
                  className="mt-4"
                >
                  Pay Now
                </Button>
              )}

              {session.status === 'paid' && session.zoom_meeting_link && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Session Confirmed! 🎉
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-700">Zoom Meeting Link:</p>
                      <a
                        href={session.zoom_meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium break-all"
                      >
                        {session.zoom_meeting_link}
                      </a>
                    </div>
                    {session.zoom_password && (
                      <div>
                        <p className="text-sm text-gray-700">Meeting Password:</p>
                        <p className="font-mono font-semibold">{session.zoom_password}</p>
                      </div>
                    )}
                  </div>
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
