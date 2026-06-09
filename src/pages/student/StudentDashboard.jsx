import { useCallback, useEffect, useState } from "react";
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
  fetchSubjectsByCourse,
} from "../../features/register/registerSlice";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courses, subjects, classes } = useSelector((state) => state.register);

  const EMPTY_FILTERS = {
    search: "",
    course_type: "",
    course_id: "",
    class_id: "",
    subject_id: "",
    qualification: "",
    min_experience: "",
  };

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTutors = useCallback(async (activeFilters, showToast = false) => {
    setLoading(true);
    try {
      const res = await tutorService.searchTutors(activeFilters);
      const list = res?.data?.tutors || [];
      setTutors(list);
      if (showToast) {
        if (list.length === 0) toast("No tutors found for the selected filters");
        else toast.success(`Found ${list.length} tutor(s)`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while searching");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load master data and all tutors on mount
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchClasses());
    dispatch(fetchSubjects());
    loadTutors({});
  }, [dispatch, loadTutors]);

  // Cascade: course_type change → refetch filtered courses + reset subjects
  // Cascade: course_id change → refetch subjects for that course
  const handleFilterChange = (newFilters) => {
    const courseTypeChanged = newFilters.course_type !== filters.course_type;
    const courseChanged = newFilters.course_id !== filters.course_id;

    if (courseTypeChanged) {
      setFilters({ ...newFilters, course_id: "", subject_id: "" });
      dispatch(fetchCourses(newFilters.course_type || null));
      dispatch(fetchSubjects());
      return;
    }

    if (courseChanged) {
      setFilters({ ...newFilters, subject_id: "" });
      if (newFilters.course_id) {
        dispatch(fetchSubjectsByCourse(newFilters.course_id));
      } else {
        dispatch(fetchSubjects());
      }
      return;
    }

    setFilters(newFilters);
  };

  const handleSearch = () => loadTutors(filters, true);

  const handleClear = () => {
    setFilters(EMPTY_FILTERS);
    dispatch(fetchCourses());
    dispatch(fetchSubjects());
    loadTutors({});
  };

  const handleTutorClick = (id) => {
    navigate(`/student/tutor/${id}`, {
      state: { subject_id: filters.subject_id || undefined },
    });
  };

  const tutorResults = Array.isArray(tutors) ? tutors : [];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 mt-9">
      <TutorFilterBar
        courses={courses}
        classes={classes}
        subjects={subjects}
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClear}
        loading={loading}
      />

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
          <LoadingSpinner size="lg" />
          <p className="mt-4 font-medium text-gray-500">Searching for the best tutors...</p>
        </div>
      )}

      {!loading && (
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
                      <p className="font-bold text-indigo-600">
                        {tutor.hourly_rate ? `Rs ${tutor.hourly_rate}/hr` : "Contact for rate"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
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
