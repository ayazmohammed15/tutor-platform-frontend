import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { tutorService } from "../../services/tutorService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import {
  fetchCourses,
  fetchClasses,
  fetchSubjectsByCourse,
} from "../../features/register/registerSlice";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { courses, subjects, classes } = useSelector((state) => state.register);

  const [chapters] = useState([]);
  const [filters, setFilters] = useState({
    course_id: "",
    class_id: "",
    subject_id: "",
    chapter_ids: [],
  });
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const studentCategory = user?.student_category || "general";
  const requiresClassSelection = studentCategory !== "engineering";

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }

    setFilters({
      course_id: user.course_id || "",
      class_id: user.class_id || "",
      subject_id: "",
      chapter_ids: [],
    });
  }, [user]);

  useEffect(() => {
    if (!user?.course_id) {
      return;
    }

    dispatch(fetchSubjectsByCourse(user.course_id));
  }, [dispatch, user?.course_id]);

  useEffect(() => {
    if (!user?.course_id) {
      return;
    }

    if (requiresClassSelection && !user?.class_id) {
      return;
    }

    const autoSearchTutors = async () => {
      setLoading(true);
      setSearched(true);

      try {
        const res = await tutorService.searchTutors();
        const tutorsList = res?.data?.tutors || [];
        setTutors(tutorsList);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while loading tutors");
      } finally {
        setLoading(false);
      }
    };

    autoSearchTutors();
  }, [requiresClassSelection, user?.class_id, user?.course_id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "subject_id" && {
        chapter_ids: [],
      }),
    }));
  };

  const handleSearch = async () => {
    if (!user?.course_id) {
      toast.error("Your account is missing course details");
      return;
    }

    if (requiresClassSelection && !user?.class_id) {
      toast.error("Your account is missing class details");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await tutorService.searchTutors({
        subject_id: filters.subject_id || undefined,
      });

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
    if (!filters.subject_id) {
      toast.error("Please select a subject before viewing tutor details");
      return;
    }

    navigate(`/student/tutor/${id}`, {
      state: {
        subject_id: filters.subject_id,
      },
    });
  };

  const tutorResults = Array.isArray(tutors) ? tutors : [];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 mt-9">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 -mt-12 relative z-20 mx-4 sm:mx-8">
        <div className="flex items-center gap-2 mb-6 text-gray-800">
          <Search className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold">Search Parameters</h2>
        </div>

        <div className="mb-5 rounded-2xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
          Your course and class are locked to your student profile so tutor matching stays aligned with backend rules.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Select
            label="Course"
            name="course_id"
            value={filters.course_id}
            onChange={handleChange}
            options={courses.map((course) => ({
              value: course.id,
              label: course.course_name,
            }))}
            disabled
            placeholder="Assigned course"
          />

          <Select
            label="Class"
            name="class_id"
            value={filters.class_id}
            onChange={handleChange}
            options={classes.map((item) => ({
              value: item.id,
              label: item.class_name,
            }))}
            disabled
            placeholder="Assigned class"
          />

          <Select
            label="Subject"
            name="subject_id"
            value={filters.subject_id}
            onChange={handleChange}
            options={subjects.map((subject) => ({
              value: subject.id,
              label: subject.subject_name,
            }))}
            disabled={!user?.course_id}
            placeholder="Select subject..."
          />

          <Select
            label="Chapters (Optional)"
            name="chapter_ids"
            value={filters.chapter_ids?.[0] || ""}
            onChange={(event) => {
              const selectedChapterId = event.target.value;
              setFilters((prev) => ({
                ...prev,
                chapter_ids: selectedChapterId ? [selectedChapterId] : [],
              }));
            }}
            options={chapters.map((chapter) => ({
              value: chapter.id,
              label: chapter.chapter_name,
            }))}
            disabled={!filters.subject_id}
            placeholder="Select chapter..."
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-4 items-center justify-end border-t border-gray-100 pt-6">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/student/sessions")}
            className="text-gray-600 bg-gray-100 hover:bg-gray-200 border-none"
          >
            <Clock className="w-4 h-4 mr-2 inline" />
            My Sessions
          </Button>
          <Button
            type="button"
            onClick={handleSearch}
            loading={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 shadow-md hover:shadow-lg transition-all"
          >
            Find Tutors
          </Button>
        </div>
      </div>

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
