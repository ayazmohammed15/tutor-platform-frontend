import { useState, useEffect } from 'react';
import { tutorService } from '../../services/tutorService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [pendingTutors, setPendingTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
const [inviteData, setInviteData] = useState({
  full_name: '',
  email: '',
  description: ''
});
const [inviteLoading, setInviteLoading] = useState(false);
const [showInviteModal, setShowInviteModal] = useState(false);


  useEffect(() => {
    fetchPendingTutors();
  }, []);

  const fetchPendingTutors = async () => {
    try {
      const response = await tutorService.getPendingTutors();
      setPendingTutors(response.data.tutors);
    } catch (error) {
      console.error('Error fetching pending tutors:', error);
      toast.error('Failed to load pending tutors');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (tutorId) => {
    setProcessing(tutorId);
    try {
      await tutorService.approveTutor(tutorId);
      toast.success('Tutor approved successfully!');
      fetchPendingTutors();
    } catch (error) {
      console.error('Error approving tutor:', error);
    } finally {
      setProcessing(null);
    }
  };
const handleSendInvite = async (e) => {
  e.preventDefault();
  setInviteLoading(true);

  try {
    await tutorService.sendRegistrationInvite(inviteData);
    toast.success('Registration link sent successfully!');
    setInviteData({ full_name: '', email: '', description: '' });
  } catch (error) {
    console.error('Error sending invite:', error);
    toast.error('Failed to send registration link');
  } finally {
    setInviteLoading(false);
  }
};

  const handleReject = async (tutorId) => {
    if (!window.confirm('Are you sure you want to reject this tutor application?')) {
      return;
    }

    setProcessing(tutorId);
    try {
      await tutorService.rejectTutor(tutorId);
      toast.success('Tutor application rejected');
      fetchPendingTutors();
    } catch (error) {
      console.error('Error rejecting tutor:', error);
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold text-gray-900">
    Tutor Approval Dashboard
  </h1>

  <Button onClick={() => setShowInviteModal(true)}>
    + Invite Tutor
  </Button>
</div>


      {pendingTutors.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600">
            No pending tutor applications at this time.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900">
              <strong>{pendingTutors.length}</strong> tutor application(s) pending review
            </p>
          </div>

          {pendingTutors.map((tutor) => (
            <Card key={tutor.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {tutor.first_name} {tutor.last_name}
                  </h3>
                  <p className="text-gray-600 mt-1">{tutor.email}</p>
                  {tutor.phone && (
                    <p className="text-gray-600 text-sm">Phone: {tutor.phone}</p>
                  )}
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Pending Review
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                  <p className="text-gray-700">{tutor.experience_years} years</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Hourly Rate</h4>
                  <p className="text-gray-700">₹{tutor.hourly_rate}/hour</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Biography</h4>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {tutor.bio || 'No bio provided'}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {tutor.education || 'Not specified'}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Subjects</h4>
                <p className="text-gray-700">
                  {tutor.subjects || 'Not specified'}
                </p>
              </div>

              <div className="flex space-x-3 pt-4 border-t">
                <Button
                  variant="success"
                  onClick={() => handleApprove(tutor.id)}
                  loading={processing === tutor.id}
                >
                  Approve Tutor
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleReject(tutor.id)}
                  loading={processing === tutor.id}
                >
                  Reject Application
                </Button>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Applied on: {new Date(tutor.created_at).toLocaleString()}
              </div>
            </Card>
          ))}
        </div>
      )}


      {showInviteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">

      {/* Close Button */}
      <button
        onClick={() => setShowInviteModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-4">
        Send Tutor Registration Invite
      </h2>

      <form onSubmit={handleSendInvite} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={inviteData.full_name}
            onChange={(e) =>
              setInviteData({ ...inviteData, full_name: e.target.value })
            }
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={inviteData.email}
            onChange={(e) =>
              setInviteData({ ...inviteData, email: e.target.value })
            }
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={inviteData.description}
            onChange={(e) =>
              setInviteData({ ...inviteData, description: e.target.value })
            }
            rows="3"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowInviteModal(false)}
          >
            Cancel
          </Button>

          <Button type="submit" loading={inviteLoading}>
            Send Invite
          </Button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
    
  );
};

export default AdminDashboard;
