import { useState, useEffect, useRef } from 'react';
import { tutorService } from '../../services/tutorService';
import { UPLOADS_BASE_URL } from '../../services/api';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [pendingTutors, setPendingTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  const [inviteData, setInviteData] = useState({ full_name: '', email: '', description: '' });
  const [inviteLoading, setInviteLoading] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

 const fetched = useRef(false);

useEffect(() => {
  if (fetched.current) return;
  fetched.current = true;
  fetchPendingTutors();
}, []);

  const fetchPendingTutors = async () => {
    try {
      const response = await tutorService.getTutorsByStatus("pending");
      setPendingTutors(response.data.tutors || []);
    } catch (error) {
      console.error("Error fetching pending tutors:", error);
      toast.error("Failed to load pending tutors");
    } finally {
      setLoading(false);
    }
  };
  console.log('Pending Tutors:', pendingTutors);
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

  const handleReject = async (tutorId) => {
    if (!window.confirm('Are you sure you want to reject this tutor application?')) return;
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

  const handleSendInvite = async (e) => {
    e.preventDefault();
    setInviteLoading(true);
    try {
      await tutorService.sendRegistrationInvite(inviteData);
      toast.success('Registration link sent successfully!');
      setInviteData({ full_name: '', email: '', description: '' });
      setShowInviteModal(false);
    } catch (error) {
      console.error('Error sending invite:', error);
      toast.error('Failed to send registration link');
    } finally {
      setInviteLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header Title & Actions */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor platform metrics and handle pending approvals.</p>
        </div>
        <Button onClick={() => setShowInviteModal(true)} className="text-sm">
          + Invite Tutor
        </Button>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '₹1,24,500', trend: '+12.5%', isUp: true },
          { title: 'Total Students', value: '1,240', trend: '+5.2%', isUp: true },
          { title: 'Active Tutors', value: '185', trend: '+2.1%', isUp: true },
          { title: 'Active Sessions', value: '42', trend: '-1.4%', isUp: false },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Graphs & Subscriptions Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-end justify-between space-x-2 border-b border-gray-100 pb-4">
            {[40, 60, 45, 80, 65, 90, 75, 100, 85, 110, 95, 120].map((height, i) => (
              <div key={i} className="w-full bg-blue-100 rounded-t hover:bg-blue-600 transition-colors" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Active Subscriptions</h2>
          <div className="space-y-4">
            {[
              { plan: 'Monthly', count: 450, color: 'bg-slate-100 text-slate-700' },
              { plan: 'Quarterly', count: 210, color: 'bg-blue-100 text-blue-700' },
              { plan: 'Yearly', count: 115, color: 'bg-indigo-100 text-indigo-700' }
            ].map((sub) => (
              <div key={sub.plan} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded ${sub.color.split(' ')[0]}`}></div>
                  <span className="text-sm font-medium text-gray-700">{sub.plan}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{sub.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TUTOR APPROVAL SECTION */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Pending Tutor Applications
          </h2>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
            {pendingTutors.length} Pending
          </span>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : pendingTutors.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No pending applications at this time.
          </div>
        ) : (
          <div className="p-6 grid md:grid-cols-2 gap-6">
            {pendingTutors.map((tutor) => (
              <div
                key={tutor.user_id}
                className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`${UPLOADS_BASE_URL}/${tutor.profile_image}`}
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tutor.first_name} {tutor.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">{tutor.email}</p>
                  </div>
                </div>

                {/* Teaching Info */}
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-medium">Board:</span> {tutor.board_name || "N/A"}</p>
                  <p><span className="font-medium">Classes:</span> {tutor.classes || "N/A"}</p>
                  <p><span className="font-medium">Subjects:</span> {tutor.subjects || "N/A"}</p>
                  <p><span className="font-medium">Experience:</span> {tutor.experience_years} years</p>
                  <p><span className="font-medium">Rate:</span> ₹{tutor.hourly_rate || "Not set"} / hr</p>
                  <p><span className="font-medium">Teaching Mode:</span> {tutor.teaching_mode || "N/A"}</p>
                </div>

                {/* Education */}
                <div className="mt-3 text-sm text-gray-600">
                  <p className="font-medium text-gray-800">Education</p>
                  <p>{tutor.education}</p>
                </div>

                {/* Bio */}
                <div className="mt-3 text-sm text-gray-600">
                  <p className="font-medium text-gray-800">About</p>
                  <p className="line-clamp-3">{tutor.bio}</p>
                </div>

                {/* Resume */}
                {tutor.resume && (
                  <div className="mt-4">
                    <a
                      href={`${UPLOADS_BASE_URL}/${tutor.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      View Resume →
                    </a>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="success"
                    onClick={() => handleApprove(tutor.user_id)}
                    loading={processing === tutor.user_id}
                    className="!px-4 !py-2 text-sm"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(tutor.user_id)}
                    loading={processing === tutor.user_id}
                    className="!px-4 !py-2 text-sm"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INVITE MODAL */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Invite New Tutor</h2>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-gray-600 transition">✕</button>
            </div>

            <form onSubmit={handleSendInvite} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={inviteData.full_name} onChange={(e) => setInviteData({ ...inviteData, full_name: e.target.value })} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" value={inviteData.email} onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Internal Note / Description</label>
                <textarea value={inviteData.description} onChange={(e) => setInviteData({ ...inviteData, description: e.target.value })} rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="secondary" onClick={() => setShowInviteModal(false)}>Cancel</Button>
                <Button type="submit" loading={inviteLoading}>Send Invite Link</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;