import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  Briefcase,
  CheckCircle,
  Eye,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Video,
  X,
  XCircle,
} from "lucide-react";
import { tutorService } from "../../services/tutorService";
import { UPLOADS_BASE_URL } from "../../services/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Button from "../../components/common/Button";
import toast from "react-hot-toast";

const AdminTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedTutor, setSelectedTutor] = useState(null);

  const fetchTutors = useCallback(async () => {
    setLoading(true);

    try {
      const response = await tutorService.getTutorsByStatus(activeTab);
      setTutors(response.data.tutors || []);
    } catch (err) {
      console.error("Error fetching tutors:", err);
      toast.error("Failed to load tutors");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  const handleApprove = async (id) => {
    setProcessing(id);

    try {
      await tutorService.approveTutor(id);
      toast.success("Tutor Approved");
      setSelectedTutor(null);
      fetchTutors();
    } catch (error) {
      console.error("Error approving tutor:", error);
      toast.error("Failed to approve tutor");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id) => {
    setProcessing(id);

    try {
      await tutorService.rejectTutor(id);
      toast.success("Tutor Rejected");
      setSelectedTutor(null);
      fetchTutors();
    } catch (error) {
      console.error("Error rejecting tutor:", error);
      toast.error("Failed to reject tutor");
    } finally {
      setProcessing(null);
    }
  };

  const getFullName = (tutor) =>
    [tutor?.first_name, tutor?.last_name].filter(Boolean).join(" ") || "Tutor";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tutor Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review tutor profiles before giving them access to availability and bookings.
          </p>
        </div>

        <div className="flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
          {["pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold capitalize text-gray-900">
              {activeTab} Tutors
            </h2>
            <p className="text-sm text-gray-500">
              {tutors.length} {tutors.length === 1 ? "record" : "records"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : tutors.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <UserRound className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-700">
              No {activeTab} tutors found.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 p-6 md:grid-cols-2">
            {tutors.map((tutor) => (
              <div
                key={tutor.user_id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <TutorAvatar tutor={tutor} />
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold text-gray-900">
                        {getFullName(tutor)}
                      </h3>
                      <p className="truncate text-sm text-gray-500">{tutor.email}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedTutor(tutor)}
                    className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700 transition hover:bg-blue-600 hover:text-white"
                    aria-label={`View ${getFullName(tutor)} details`}
                    title="View details"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-5 grid gap-3 text-sm text-gray-700">
                  <InfoLine label="Courses" value={tutor.courses} />
                  <InfoLine label="Classes" value={tutor.classes} />
                  <InfoLine label="Subject" value={tutor.subject_name || tutor.subjects} />
                  <InfoLine label="Experience" value={formatYears(tutor.experience_years)} />
                  <InfoLine label="Rate" value={tutor.hourly_rate ? `Rs ${tutor.hourly_rate}` : ""} />
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-5">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTutor(tutor)}
                    className="!border-gray-300 !text-gray-700 hover:!bg-gray-50"
                  >
                    <Eye className="mr-2 inline h-4 w-4" />
                    View
                  </Button>

                  {activeTab === "pending" && (
                    <div className="flex justify-end gap-3">
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
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTutor && (
        <TutorDetailsModal
          tutor={selectedTutor}
          activeTab={activeTab}
          processing={processing}
          onClose={() => setSelectedTutor(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

const TutorDetailsModal = ({
  tutor,
  activeTab,
  processing,
  onClose,
  onApprove,
  onReject,
}) => {
  const fullName = [tutor?.first_name, tutor?.last_name].filter(Boolean).join(" ") || "Tutor";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
          <div className="flex min-w-0 items-center gap-4">
            <TutorAvatar tutor={tutor} size="lg" />
            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold text-gray-900">{fullName}</h2>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {tutor.email || "N/A"}
                </span>
                {tutor.phone && (
                  <span className="inline-flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {tutor.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close tutor details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-6">
              <DetailSection title="Teaching Details" icon={BookOpen}>
                <DetailGrid>
                  <DetailItem label="Subject" value={tutor.subject_name || tutor.subjects} />
                  <DetailItem label="Courses" value={tutor.courses} />
                  <DetailItem label="Classes" value={tutor.classes} />
                  <DetailItem label="Teaching Mode" value="Online" />
                  <DetailItem label="Hourly Rate" value={tutor.hourly_rate ? `Rs ${tutor.hourly_rate}` : ""} />
                  <DetailItem label="Experience" value={formatYears(tutor.experience_years)} />
                </DetailGrid>
              </DetailSection>

              <DetailSection title="Credentials" icon={GraduationCap}>
                <DetailGrid>
                  <DetailItem label="Education" value={tutor.education} />
                  <DetailItem label="Qualification" value={tutor.qualification} />
                  <DetailItem label="University" value={tutor.university} />
                  <DetailItem label="Graduation Year" value={tutor.graduation_year} />
                </DetailGrid>
              </DetailSection>

              <DetailSection title="About Tutor" icon={Briefcase}>
                <p className="min-h-24 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                  {tutor.bio || tutor.about || "No bio provided."}
                </p>
              </DetailSection>
            </div>

            <div className="space-y-6">
              <DetailSection title="Application Status" icon={activeTab === "approved" ? CheckCircle : activeTab === "rejected" ? XCircle : UserRound}>
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Current status
                  </p>
                  <p className="mt-2 text-lg font-bold capitalize text-gray-900">{activeTab}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Pending tutors need approval before they can manage availability or receive bookings.
                  </p>
                </div>
              </DetailSection>

              <DetailSection title="Documents & Links" icon={FileText}>
                <div className="space-y-3">
                  <DocumentLink
                    label="Resume"
                    file={tutor.resume}
                    icon={FileText}
                  />
                  <DocumentLink
                    label="Profile Image"
                    file={tutor.profile_image}
                    icon={UserRound}
                  />
                  {tutor.demo_link ? (
                    <a
                      href={tutor.demo_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                    >
                      <Video className="h-5 w-5" />
                      Demo Link
                    </a>
                  ) : (
                    <EmptyDocument label="Demo Link" icon={Video} />
                  )}
                </div>
              </DetailSection>

              <DetailSection title="Extra Details" icon={MapPin}>
                <DetailGrid single>
                  <DetailItem label="Board" value={tutor.board_name} />
                  <DetailItem label="Created At" value={formatDate(tutor.created_at)} />
                  <DetailItem label="Updated At" value={formatDate(tutor.updated_at)} />
                </DetailGrid>
              </DetailSection>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
            className="!bg-white !text-gray-700 hover:!bg-gray-100"
          >
            Close
          </Button>

          {activeTab === "pending" && (
            <>
              <Button
                variant="danger"
                loading={processing === tutor.user_id}
                onClick={() => onReject(tutor.user_id)}
              >
                Reject
              </Button>
              <Button
                variant="success"
                loading={processing === tutor.user_id}
                onClick={() => onApprove(tutor.user_id)}
              >
                Approve Tutor
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const TutorAvatar = ({ tutor, size = "md" }) => {
  const initials = `${tutor?.first_name?.[0] || ""}${tutor?.last_name?.[0] || ""}` || "T";
  const sizeClass = size === "lg" ? "h-16 w-16 text-xl" : "h-14 w-14 text-base";

  if (tutor?.profile_image) {
    return (
      <img
        src={`${UPLOADS_BASE_URL}${tutor.profile_image}`}
        className={`${sizeClass} flex-shrink-0 rounded-2xl border border-gray-200 object-cover`}
        alt=""
      />
    );
  }

  return (
    <div className={`${sizeClass} flex flex-shrink-0 items-center justify-center rounded-2xl bg-blue-100 font-bold text-blue-700`}>
      {initials}
    </div>
  );
};

const InfoLine = ({ label, value }) => (
  <div className="flex gap-2">
    <span className="w-24 flex-shrink-0 font-semibold text-gray-900">{label}:</span>
    <span className="min-w-0 text-gray-600">{value || "N/A"}</span>
  </div>
);

const DetailSection = ({ title, icon: Icon, children }) => (
  <section className="rounded-2xl border border-gray-200 bg-white p-5">
    <div className="mb-4 flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </section>
);

const DetailGrid = ({ children, single = false }) => (
  <div className={`grid gap-4 ${single ? "grid-cols-1" : "sm:grid-cols-2"}`}>
    {children}
  </div>
);

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
    <p className="mt-1 break-words text-sm font-medium text-gray-900">{value || "N/A"}</p>
  </div>
);

const DocumentLink = ({ label, file, icon: Icon }) => {
  if (!file) {
    return <EmptyDocument label={label} icon={Icon} />;
  }

  return (
    <a
      href={`${UPLOADS_BASE_URL}${file}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
    >
      <Icon className="h-5 w-5" />
      View {label}
    </a>
  );
};

const EmptyDocument = ({ label, icon: Icon }) => (
  <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-200 px-4 py-3 text-sm font-medium text-gray-400">
    <Icon className="h-5 w-5" />
    No {label}
  </div>
);

const formatYears = (value) => {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  return `${value} ${Number(value) === 1 ? "year" : "years"}`;
};

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default AdminTutors;
