import { useState, useEffect } from 'react';
import { sessionService } from '../../services/sessionService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import TutorAvailability from './TutorAvailability';
import { Calendar as CalendarIcon, Clock, Users, ArrowUpRight, MoreHorizontal } from 'lucide-react';

const TutorDashboard = () => {
  /* ================= STATE ================= */
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [suggestingDate, setSuggestingDate] = useState(null);
  const [suggestedDates, setSuggestedDates] = useState({});
  const [processing, setProcessing] = useState(null);

  /* ================= EFFECTS & LOGIC ================= */
  // (Your exact logic remains unchanged)
  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const response = await sessionService.getMyRequests();
      setRequests(response.data.requests);
    } catch (error) {
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
      console.error(error);
    } finally { setProcessing(null); }
  };

  const handleReject = async (requestId) => {
    if (!window.confirm('Are you sure you want to reject this request?')) return;
    setProcessing(requestId);
    try {
      await sessionService.rejectRequest(requestId);
      toast.success('Request rejected.');
      fetchRequests();
    } catch (error) {
      console.error(error);
    } finally { setProcessing(null); }
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
      toast.success('Alternate date suggested');
      setSuggestingDate(null);
      fetchRequests();
    } catch (error) {
      console.error(error);
    } finally { setProcessing(null); }
  };

  const updateSuggestedDate = (requestId, field, value) => {
    setSuggestedDates({ ...suggestedDates, [requestId]: { ...suggestedDates[requestId], [field]: value } });
  };

  const filteredRequests = requests.filter((req) => {
    if (activeTab === 'pending') return req.status === 'pending';
    if (activeTab === 'accepted') return req.status === 'accepted';
    if (activeTab === 'rejected') return req.status === 'rejected';
    return true;
  });

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* ================= TOP ROW: STAT CARDS (Matched to image) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Class Banner */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
              <CalendarIcon className="w-7 h-7 text-[#0fb673]" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 flex items-baseline gap-3">
                12 <span className="text-xl font-semibold text-gray-800">Upcoming Class</span>
              </h3>
              <p className="text-gray-500 text-sm mt-1">This Week</p>
            </div>
          </div>
          <button className="bg-[#0fb673] hover:bg-[#0da065] text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm shadow-[#0fb673]/30">
            See Schedules
          </button>
        </div>

        {/* Small Stat Cards */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-gray-600 font-medium mb-4">Tutoring Hours</p>
          <div className="flex items-center justify-between">
            <h4 className="text-4xl font-bold text-gray-900">242</h4>
            <span className="flex items-center text-xs font-bold text-[#0fb673] bg-green-50 px-2 py-1 rounded-md">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 3.15%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">in August 2026</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-gray-600 font-medium mb-4">Students</p>
          <div className="flex items-center justify-between">
            <h4 className="text-4xl font-bold text-gray-900">104</h4>
            <span className="flex items-center text-xs font-bold text-[#0fb673] bg-green-50 px-2 py-1 rounded-md">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 2.11%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">in August 2026</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-gray-600 font-medium mb-4">Classes</p>
          <div className="flex items-center justify-between">
            <h4 className="text-4xl font-bold text-gray-900">20</h4>
            <span className="flex items-center text-xs font-bold text-[#0fb673] bg-green-50 px-2 py-1 rounded-md">
              <ArrowUpRight className="w-3 h-3 mr-1" /> 0.22%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">in August 2026</p>
        </div>
      </div>

      {/* ================= REQUESTS SECTION ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900">Session Requests</h2>
          
          {/* Custom Tabs matching the "Weeks / Month / Year" style from the image */}
          <div className="flex bg-[#f3f4f6] rounded-full p-1">
            {['pending', 'accepted', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-[#0fb673] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

     

        
          {(filteredRequests.length === 0 ? (
            <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              No {activeTab !== 'all' ? activeTab : ''} requests found
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredRequests.map((request) => (
                <div key={request.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
                        {request.student_name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{request.student_name}</h3>
                        <p className="text-xs text-gray-500">{request.student_email}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      request.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                      request.status === 'accepted' ? 'bg-green-100 text-[#0fb673]' : 
                      'bg-red-100 text-red-600'
                    }`}>
                      {request.status}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6 bg-gray-50 p-4 rounded-xl text-sm">
                    <div>
                      <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Date & Time</p>
                      <p className="font-medium text-gray-900 flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                        {new Date(request.requested_date).toLocaleDateString()}
                      </p>
                      <p className="font-medium text-gray-900 flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {request.requested_time.slice(0, 5)}
                      </p>
                    </div>
                    {request.class_name && (
                      <div>
                        <p className="text-gray-500 text-xs uppercase font-semibold mb-1">Subject / Topic</p>
                        <p className="font-medium text-gray-900">{request.class_name}</p>
                        <p className="text-gray-600 mt-1 line-clamp-1">{request.topic_name}</p>
                      </div>
                    )}
                  </div>

                  {request.suggested_date && (
                    <div className="mb-6 p-4 bg-green-50/50 border border-green-100 rounded-xl">
                      <p className="text-xs font-bold text-[#0fb673] uppercase mb-1">You Suggested Alternate Time:</p>
                      <p className="text-sm font-medium text-gray-800">
                        {new Date(request.suggested_date).toLocaleDateString()} at {request.suggested_time.slice(0, 5)}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {request.status === 'pending' && (
                    <div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="flex-1 bg-[#0fb673] hover:bg-[#0da065] text-white py-2.5 rounded-xl font-medium transition-colors text-sm"
                        >
                          {processing === request.id ? 'Loading...' : 'Accept'}
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 py-2.5 rounded-xl font-medium transition-colors text-sm"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => setSuggestingDate(suggestingDate === request.id ? null : request.id)}
                          className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-600 p-2.5 rounded-xl transition-colors"
                          title="Suggest different time"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Suggestion Form Dropdown */}
                      {suggestingDate === request.id && (
                        <div className="mt-4 p-5 bg-white border border-gray-200 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2">
                          <h4 className="font-bold text-gray-900 mb-4 text-sm">Propose New Time</h4>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <Input
                              type="date"
                              value={suggestedDates[request.id]?.suggested_date || ''}
                              onChange={(e) => updateSuggestedDate(request.id, 'suggested_date', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                            />
                            <Input
                              type="time"
                              value={suggestedDates[request.id]?.suggested_time || ''}
                              onChange={(e) => updateSuggestedDate(request.id, 'suggested_time', e.target.value)}
                            />
                          </div>
                          <button
                            onClick={() => handleSuggestDate(request.id)}
                            className="w-full bg-gray-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-black transition-colors"
                          >
                            Send Proposal
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}
        
      </div>

    </div>
  );
};

export default TutorDashboard;