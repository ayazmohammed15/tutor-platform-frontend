import { useEffect, useState } from "react";
import { tutorService } from "../../services/tutorService";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Button from "../../components/common/Button";
import toast from "react-hot-toast";

const AdminTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  // New state to track which view we are in
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchTutors();
  }, [activeTab]); // Refetch whenever the tab changes

  const fetchTutors = async () => {
    setLoading(true);

    try {
      const response = await tutorService.getTutorsByStatus(activeTab);
      setTutors(response.data.tutors || []);
    } catch (err) {
      toast.error("Failed to load tutors");
    } finally {
      setLoading(false);
    }
  };

  // ... handleApprove and handleReject logic remains similar

  const handleApprove = async (id) => {
    setProcessing(id);
    await tutorService.approveTutor(id);
    toast.success("Tutor Approved");
    fetchTutors();
    setProcessing(null);
  };

  const handleReject = async (id) => {
    setProcessing(id);
    await tutorService.rejectTutor(id);
    toast.success("Tutor Rejected");
    fetchTutors();
    setProcessing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex border-b border-gray-200">
        {["pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 capitalize">
          {activeTab} Tutors
        </h1>
      </div>
      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : tutors.length === 0 ? (
          <p className="text-center text-gray-500">
            No pending tutors found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {tutors.map((tutor) => (
              <div
                key={tutor.user_id}
                className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                {/* Profile */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`http://localhost:5000/uploads/${tutor.profile_image}`}
                    className="w-14 h-14 rounded-full object-cover border"
                    alt=""
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {tutor.first_name} {tutor.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">{tutor.email}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="text-sm space-y-1 text-gray-700">
                  <p><b>Board:</b> {tutor.board_name || "N/A"}</p>
                  <p><b>Classes:</b> {tutor.classes || "N/A"}</p>
                  <p><b>Subjects:</b> {tutor.subjects || "N/A"}</p>
                  <p><b>Experience:</b> {tutor.experience_years} yrs</p>
                  <p><b>Rate:</b> ₹{tutor.hourly_rate || "Not Set"}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-5">
                  <Button
                    variant="success"
                    loading={processing === tutor.user_id}
                    onClick={() => handleApprove(tutor.user_id)}
                  >
                    Approve
                  </Button>

                  <Button
                    variant="danger"
                    loading={processing === tutor.user_id}
                    onClick={() => handleReject(tutor.user_id)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTutors;