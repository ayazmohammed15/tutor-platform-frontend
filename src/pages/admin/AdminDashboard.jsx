import { useState } from 'react';
import { tutorService } from '../../services/tutorService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [pendingTutors, setPendingTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(null);
  const [showPending, setShowPending] = useState(false);

  const fetchPendingTutors = async () => {
    setLoading(true);
    try {
      const response = await tutorService.getPendingTutors();
      setPendingTutors(response.data.tutors);
    } catch (error) {
      toast.error('Failed to load pending tutors');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    if (!showPending) {
      await fetchPendingTutors();
    }
    setShowPending(!showPending);
  };

  const handleApprove = async (tutorId) => {
    setProcessing(tutorId);
    try {
      await tutorService.approveTutor(tutorId);
      toast.success('Tutor approved successfully!');
      await fetchPendingTutors();
    } catch (error) {
      toast.error('Error approving tutor');
    } finally {
      setProcessing(null);
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
      await fetchPendingTutors();
    } catch (error) {
      toast.error('Error rejecting tutor');
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Tutor Approval Dashboard
      </h1>

      <div className="mb-6">
        <Button onClick={handleToggle}>
          {showPending ? 'Hide Pending Tutors' : 'View Pending Tutors'}
        </Button>
      </div>

      {showPending && (
        loading ? (
          <LoadingSpinner />
        ) : pendingTutors.length === 0 ? (
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
              <Card key={tutor.user_id}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {tutor.full_name}
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
                    onClick={() => handleApprove(tutor.user_id)}
                    loading={processing === tutor.user_id}
                  >
                    Approve Tutor
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleReject(tutor.user_id)}
                    loading={processing === tutor.user_id}
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
        )
      )}
    </div>
  );
};

export default AdminDashboard;
