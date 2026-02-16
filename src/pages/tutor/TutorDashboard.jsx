import { useState, useEffect } from 'react';
import { sessionService } from '../../services/sessionService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import TutorAvailability from './TutorAvailability';

const TutorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [suggestingDate, setSuggestingDate] = useState(null);
  const [suggestedDates, setSuggestedDates] = useState({});
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await sessionService.getMyRequests();
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    setProcessing(requestId);
    try {
      await sessionService.acceptRequest(requestId);
      toast.success('Request accepted! Student will be notified.');
      fetchRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (requestId) => {
    if (!window.confirm('Are you sure you want to reject this request?')) {
      return;
    }

    setProcessing(requestId);
    try {
      await sessionService.rejectRequest(requestId);
      toast.success('Request rejected.');
      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleSuggestDate = async (requestId) => {
    const dates = suggestedDates[requestId];

    if (!dates || !dates.suggested_date || !dates.suggested_time) {
      toast.error('Please enter both date and time');
      return;
    }

    setProcessing(requestId);
    try {
      await sessionService.suggestAlternateDate(requestId, dates);
      toast.success('Alternate date suggested to student');
      setSuggestingDate(null);
      setSuggestedDates({ ...suggestedDates, [requestId]: {} });
      fetchRequests();
    } catch (error) {
      console.error('Error suggesting date:', error);
    } finally {
      setProcessing(null);
    }
  };

  const updateSuggestedDate = (requestId, field, value) => {
    setSuggestedDates({
      ...suggestedDates,
      [requestId]: {
        ...suggestedDates[requestId],
        [field]: value,
      },
    });
  };

  const filteredRequests = requests.filter((req) => {
    if (activeTab === 'pending') return req.status === 'pending';
    if (activeTab === 'accepted') return req.status === 'accepted';
    if (activeTab === 'rejected') return req.status === 'rejected';
    return true;
  });

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Session Requests</h1>

      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {['pending', 'accepted', 'rejected', 'all', 'calendar'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
              <span className="ml-2 text-xs">
                ({tab === 'all' ? requests.length : requests.filter(r => r.status === tab).length})
              </span>
            </button>
          ))}
        </div>
      </div>
      {activeTab === 'calendar' && (
        <TutorAvailability />
      )}


      {activeTab !== 'calendar' && (
  filteredRequests.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600">
            No {activeTab !== 'all' ? activeTab : ''} requests found
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredRequests.map((request) => (
            <Card key={request.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {request.student_name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{request.student_email}</p>
                  {request.student_phone && (
                    <p className="text-gray-600 text-sm">Phone: {request.student_phone}</p>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${request.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : request.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Requested Date</p>
                  <p className="font-medium">{new Date(request.requested_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Requested Time</p>
                  <p className="font-medium">{request.requested_time.slice(0, 5)}</p>
                </div>
                {request.class_name && (
                  <>
                    <div>
                      <p className="text-sm text-gray-600">Class</p>
                      <p className="font-medium">{request.class_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Topic</p>
                      <p className="font-medium">{request.topic_name}</p>
                    </div>
                  </>
                )}
              </div>

              {request.notes && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Student Notes</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">{request.notes}</p>
                </div>
              )}

              {request.suggested_date && (
                <div className="mb-4 p-3 bg-blue-50 rounded">
                  <p className="text-sm font-medium text-blue-900">Suggested Alternate Date</p>
                  <p className="text-sm text-blue-700">
                    {new Date(request.suggested_date).toLocaleDateString()} at {request.suggested_time.slice(0, 5)}
                  </p>
                </div>
              )}

              {request.status === 'pending' && (
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <Button
                      variant="success"
                      onClick={() => handleAccept(request.id)}
                      loading={processing === request.id}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleReject(request.id)}
                      loading={processing === request.id}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setSuggestingDate(request.id)}
                    >
                      Suggest Another Date
                    </Button>
                  </div>

                  {suggestingDate === request.id && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-3">Suggest Alternate Date & Time</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <Input
                          label="Date"
                          type="date"
                          value={suggestedDates[request.id]?.suggested_date || ''}
                          onChange={(e) =>
                            updateSuggestedDate(request.id, 'suggested_date', e.target.value)
                          }
                          min={new Date().toISOString().split('T')[0]}
                        />
                        <Input
                          label="Time"
                          type="time"
                          value={suggestedDates[request.id]?.suggested_time || ''}
                          onChange={(e) =>
                            updateSuggestedDate(request.id, 'suggested_time', e.target.value)
                          }
                        />
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button
                          onClick={() => handleSuggestDate(request.id)}
                          loading={processing === request.id}
                        >
                          Send Suggestion
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setSuggestingDate(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TutorDashboard;
