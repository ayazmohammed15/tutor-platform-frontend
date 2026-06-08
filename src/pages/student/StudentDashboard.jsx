import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
import { tutorService } from "../../services/tutorService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import TutorFilterBar from "../../components/tutor/TutorFilterBar";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import {
  fetchCourses,
  fetchClasses,
  fetchSubjects,
} from "../../features/register/registerSlice";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courses, subjects, classes } = useSelector((state) => state.register);

  const [filters, setFilters] = useState({
    tutor_name: "",
    course_id: "",
    course_ids: "",
    class_id: "",
    class_ids: "",
    subject_id: "",
    subject_ids: "",
  });
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchClasses());
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);

    try {
      // Pass filters to the backend API
      const res = await tutorService.searchTutors(filters);
      const tutorsList = res?.data?.tutors || [];
      setTutors(tutorsList);

      if (tutorsList.length === 0) {
        toast("No tutors found for the selected filters");
      } else {
        toast.success(`Found ${tutorsList.length} tutor(s)`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while searching");
    } finally {
      setLoading(false);
    }
  };

  const handleTutorClick = (id) => {
    navigate(`/student/tutor/${id}`, {
      state: {
        subject_id: filters.subject_id || undefined,
      },
    });
  };

  const tutorResults = Array.isArray(tutors) ? tutors : [];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 mt-9">
      {/* Filter Bar Component */}
      <TutorFilterBar
        courses={courses}
        classes={classes}
        subjects={subjects}
        filters={filters}
        onFilterChange={setFilters}
        onSearch={handleSearch}
        loading={loading}
      />

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
          <LoadingSpinner size="lg" />
          <p className="mt-4 font-medium text-gray-500">Searching for the best tutors...</p>
        </div>
      )}

      {!loading && searched && (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {tutorResults.length > 0 ? "Available Experts" : "No Tutors Found"}
            </h2>
            {tutorResults.length > 0 && (
              <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">
                {tutorResults.length} Results
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorResults.map((tutor) => (
              <Card
                key={tutor.user_id}
                hover
                className="group flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border border-gray-100 overflow-hidden rounded-2xl p-0"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-100 to-blue-50 flex items-center justify-center text-indigo-600 font-bold text-xl flex-shrink-0 ring-4 ring-white shadow-sm">
                      {(tutor?.first_name?.[0] || "")}
                      {(tutor?.last_name?.[0] || "")}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {tutor?.first_name || ""} {tutor?.last_name || ""}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">{tutor?.email || ""}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {tutor.bio || "This tutor hasn't added a bio yet, but they are ready to help you learn!"}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Experience</p>
                      <p className="font-bold text-gray-900 flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        {tutor.experience_years} Years
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Hourly Rate</p>
                      <p className="font-bold text-indigo-600">Rs {tutor.hourly_rate}/hr</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={(event) => {
                      event.stopPropagation();
                      handleTutorClick(tutor.user_id);
                    }}
                    className="border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors rounded-xl"
                  >
                    View Full Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
