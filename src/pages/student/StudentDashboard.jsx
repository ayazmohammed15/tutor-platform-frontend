import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tutorService } from "../../services/tutorService";
import { boardService } from "../../services/boardService";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [boards, setBoards] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);

  const [filters, setFilters] = useState({
    board_id: "",
    class_id: "",
    subject_id: "",
    chapter_ids: []
  });

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  /* ================= LOAD BOARDS ================= */
  useEffect(() => {
    const loadBoards = async () => {
      try {
        const data = await boardService.getBoards();
        setBoards(data);
      } catch (err) {
        toast.error("Failed to load boards");
      }
    };
    loadBoards();
  }, []);

  /* ================= LOAD CLASSES ================= */
  useEffect(() => {
    if (!filters.board_id) return;

    const loadClasses = async () => {
      try {
        const data = await boardService.getClassesByBoard(filters.board_id);
        setClasses(data);
      } catch (err) {
        toast.error("Failed to load classes");
      }
    };

    loadClasses();
  }, [filters.board_id]);

  /* ================= LOAD SUBJECTS ================= */
  useEffect(() => {
    if (!filters.board_id || !filters.class_id) return;

    const loadSubjects = async () => {
      try {
        const data = await boardService.getSubjectsByClasses(
          filters.board_id,
          [filters.class_id]   // send as array
        );
        setSubjects(data);
      } catch (err) {
        toast.error("Failed to load subjects");
      }
    };

    loadSubjects();
  }, [filters.board_id, filters.class_id]);

  useEffect(() => {
    if (!filters.subject_id) return;

    const loadChapters = async () => {
      try {
        const data = await boardService.getChaptersBySubject(
          filters.subject_id
        );
        setChapters(data);
      } catch (err) {
        toast.error("Failed to load chapters");
      }
    };

    loadChapters();
  }, [filters.subject_id]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "board_id" && {
        class_id: "",
        subject_id: ""
      }),
      ...(name === "class_id" && {
        subject_id: ""
      })
    }));
  };

  /* ================= SEARCH TUTORS ================= */
  const handleSearch = async () => {
    if (!filters.subject_id) {
      toast.error("Please select Board, Class and Subject");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await tutorService.searchTutors(filters);
      setTutors(res.data.tutors);

      if (res.data.tutors.length === 0) {
        toast.info("No tutors found for selected subject");
      } else {
        toast.success(`Found ${res.data.tutors.length} tutor(s)`);
      }
    } catch (err) {
      toast.error("Something went wrong while searching");
    } finally {
      setLoading(false);
    }
  };

  const handleTutorClick = (id) => {
    navigate(`/student/tutor/${id}`, {
      state: { subject_id: filters.subject_id,
        chapter_ids: filters.chapter_ids
       }
    });
  };

  return (
    <div className="space-y-10">

      {/* ================= HEADER ================= */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100">
        <h1 className="text-3xl font-bold text-gray-900">
          Find Your Tutor
        </h1>
        <p className="mt-2 text-gray-600">
          Select board, class and subject to discover qualified tutors.
        </p>
      </section>

      {/* ================= FILTER CARD ================= */}
      <Card className="rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">
          Search Filters
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Select
            label="Board"
            name="board_id"
            value={filters.board_id}
            onChange={handleChange}
            options={boards.map((b) => ({
              value: b.id,
              label: b.board_name
            }))}
            placeholder="Select board"
          />

          <Select
            label="Class"
            name="class_id"
            value={filters.class_id}
            onChange={handleChange}
            options={classes.map((c) => ({
              value: c.id,
              label: c.class_name
            }))}
            disabled={!filters.board_id}
            placeholder="Select class"
          />

          <Select
            label="Subject"
            name="subject_id"
            value={filters.subject_id}
            onChange={handleChange}
            options={subjects.map((s) => ({
              value: s.id,
              label: s.subject_name
            }))}
            disabled={!filters.class_id}
            placeholder="Select subject"
          />

          <Select
            label="Chapters (Optional)"
            name="chapter_ids"
            value={filters.chapter_ids}
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                option => option.value
              );

              setFilters(prev => ({
                ...prev,
                chapter_ids: selected
              }));
            }}
            options={chapters.map((c) => ({
              value: c.id,
              label: c.chapter_name
            }))}
            disabled={!filters.subject_id}
            multiple
          />

        </div>

        <div className="mt-6 flex gap-4">
          <Button onClick={handleSearch} loading={loading}>
            Find Tutors
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/student/sessions")}
          >
            My Sessions
          </Button>
        </div>
      </Card>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="flex justify-center py-10">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* ================= RESULTS ================= */}
      {!loading && searched && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            {tutors.length > 0
              ? "Available Tutors"
              : "No Tutors Found"}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <Card
                key={tutor.user_id}
                hover
                onClick={() => handleTutorClick(tutor.user_id)}
                className="cursor-pointer transition hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {tutor.first_name} {tutor.last_name}
                </h3>

                <p className="text-sm text-gray-600">
                  {tutor.email}
                </p>

                <p className="mt-3 text-gray-700 line-clamp-3">
                  {tutor.bio || "No bio available"}
                </p>

                <div className="mt-4 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Experience
                    </span>
                    <span className="font-medium">
                      {tutor.experience_years} years
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Rate
                    </span>
                    <span className="font-medium text-blue-600">
                      ₹{tutor.hourly_rate}/hour
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  fullWidth
                  className="mt-4"
                >
                  View Profile
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
