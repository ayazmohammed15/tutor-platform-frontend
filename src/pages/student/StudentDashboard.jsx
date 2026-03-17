import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tutorService } from "../../services/tutorService";
// import { boardService } from "../../services/boardService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import { Search, BookOpen, Star, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  fetchClasses,
  fetchSubjectsByCourse
} from "../../features/register/registerSlice";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("Authenticated user:", user);

  const dispatch = useDispatch();

  const { courses, subjects, classes } = useSelector(
    (state) => state.register
  );

  /* ================= STATE ================= */
  // ... (Keep ALL your existing state variables here exactly as they are)
  // const [courses, setCourses] = useState([]);
  // const [boards, setBoards] = useState([]);
  // const [classes, setClasses] = useState([]);
  // const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);

  const [filters, setFilters] = useState({
    course_id: "",
    class_id: "",
    subject_id: "",
    chapter_ids: []
  });

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFilters({
      course_id: user.course_id || "",
      class_id: user.class_id || "",
      subject_id: user.subject_id || "",
      chapter_ids: []
    });
  }, [user]);

  useEffect(() => {
    if (filters.course_id && filters.class_id) {
      handleSearch();
    }
  }, [filters.course_id, filters.class_id]);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    if (filters.course_id) {
      dispatch(fetchSubjectsByCourse(filters.course_id));
    }
  }, [filters.course_id, dispatch]);
  /* ================= LOAD BOARDS ================= */
  // useEffect(() => {
  //   const loadBoards = async () => {
  //     try {
  //       const data = await boardService.getBoards();
  //       setBoards(data);
  //     } catch (err) {
  //       toast.error("Failed to load boards");
  //     }
  //   };
  //   loadBoards();
  // }, []);

  /* ================= LOAD CLASSES ================= */
  // useEffect(() => {
  //   if (!filters.board_id) return;

  //   const loadClasses = async () => {
  //     try {
  //       const data = await boardService.getClassesByBoard(filters.board_id);
  //       setClasses(data);
  //     } catch (err) {
  //       toast.error("Failed to load classes");
  //     }
  //   };

  //   loadClasses();
  // }, [filters.board_id]);

  /* ================= LOAD SUBJECTS ================= */
  // useEffect(() => {
  //   if (!filters.board_id || !filters.class_id) return;

  //   const loadSubjects = async () => {
  //     try {
  //       const data = await boardService.getSubjectsByClasses(
  //         filters.board_id,
  //         [filters.class_id]   // send as array
  //       );
  //       setSubjects(data);
  //     } catch (err) {
  //       toast.error("Failed to load subjects");
  //     }
  //   };

  //   loadSubjects();
  // }, [filters.board_id, filters.class_id]);

  // useEffect(() => {
  //   if (!filters.subject_id) return;

  //   const loadChapters = async () => {
  //     try {
  //       const data = await boardService.getChaptersBySubject(
  //         filters.subject_id
  //       );
  //       setChapters(data);
  //     } catch (err) {
  //       toast.error("Failed to load chapters");
  //     }
  //   };

  //   loadChapters();
  // }, [filters.subject_id]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "course_id" && {
        subject_id: "",
        class_id: "",
        chapter_ids: []
      }),
      ...(name === "class_id" && {
        subject_id: "",
        chapter_ids: []
      }),
      ...(name === "subject_id" && {
        chapter_ids: []
      })
    }));
  };

  /* ================= SEARCH TUTORS ================= */
  const handleSearch = async () => {
    if (!filters.course_id || !filters.class_id) {
      toast.error("Please select Course and Class");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      console.log("Search filters:", filters);

      const res = await tutorService.searchTutors({
        course_id: filters.course_id,
        class_id: filters.class_id,
        subject_id: filters.subject_id || undefined
      });

      const tutorsList = res?.data?.tutors || [];

      console.log("Tutors response:", tutorsList);

      setTutors(tutorsList);

      if (tutorsList.length === 0) {
        toast("No tutors found for selected subject");
      } else {
        toast.success(`Found ${tutorsList.length} tutor(s)`);
      }

    } catch (err) {
      console.error(err);
      console.log(err.response?.data);
      toast.error("Something went wrong while searching");
    } finally {
      setLoading(false);
    }
  };

  const handleTutorClick = (id) => {
    navigate(`/student/tutor/${id}`, {
      state: {
        subject_id: filters.subject_id,
        chapter_ids: filters.chapter_ids
      }
    });
  };

  const tutorResults = Array.isArray(tutors) ? tutors : [];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 ">


      {/* ================= FILTER CARD ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 -mt-12 relative z-20 mx-4 sm:mx-8">
        <div className="flex items-center gap-2 mb-6 text-gray-800">
          <Search className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold">Search Parameters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          <Select
            label="Course"
            name="course_id"
            value={filters.course_id}
            onChange={handleChange}
            options={courses.map((c) => ({
              value: c.id,
              label: c.course_name
            }))}
            placeholder="Select course..."
          />

          <Select
            label="Class"
            name="class_id"
            value={filters.class_id}
            onChange={handleChange}
            options={classes.map((c) => ({ value: c.id, label: c.class_name }))}
            disabled={!filters.course_id}
            placeholder="Select class..."
          />
          <Select
            label="Subject"
            name="subject_id"
            value={filters.subject_id}
            onChange={handleChange}
            options={subjects.map((s) => ({ value: s.id, label: s.subject_name }))}
            disabled={!filters.course_id}
            placeholder="Select subject..."
          />
          <Select
            label="Chapters (Optional)"
            name="chapter_ids"
            value={filters.chapter_ids?.[0] || ""}
            onChange={(e) => {
              const selectedChapterId = e.target.value;
              setFilters((prev) => ({
                ...prev,
                chapter_ids: selectedChapterId ? [selectedChapterId] : []
              }));
            }}
            options={chapters.map((c) => ({ value: c.id, label: c.chapter_name }))}
            disabled={!filters.subject_id}
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

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
          <LoadingSpinner size="lg" />
          <p className="mt-4 font-medium text-gray-500">Searching for the best tutors...</p>
        </div>
      )}

      {/* ================= RESULTS ================= */}
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
                    {/* Fake Avatar - Replace with tutor.profile_image if you have it */}
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
                        ₹{tutor.hourly_rate}/hr
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click if they click the button directly
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
