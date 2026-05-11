
import { useState, useEffect } from 'react';
import { sessionService } from '../../services/sessionService';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const TutorSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error(error);
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString();

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">My Sessions</h1>

      {/* Pending Requests */}
      {requests.filter(r => r.status === 'pending').length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
          <div className="space-y-4">
            {requests
              .filter(r => r.status === 'pending')
              .map((req) => (
                <Card key={req.id}>
                  <h3 className="font-semibold">
                    Request from {req.student_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(req.requested_date)} at {req.requested_time.slice(0, 5)}
                  </p>
                  <span className="text-yellow-600 font-medium">
                    Awaiting your approval
                  </span>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Confirmed Sessions */}
      {sessions.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600">
            No sessions yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {sessions.map((session) => (
            <Card key={session.id}>
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    Session with {session.student_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {session.student_email}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
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

              {/* Meet Link */}
              {session.status === 'paid' && session.zoom_meeting_link && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Session Link
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

export default TutorSessions;

