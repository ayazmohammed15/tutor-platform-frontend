import { Search, X } from "lucide-react";
import Button from "../common/Button";
import Select from "../common/Select";

const COURSE_TYPES = [
  { value: "", label: "All" },
  { value: "general", label: "General" },
  { value: "entrance", label: "Entrance" },
];

const TutorFilterBar = ({ courses, classes, subjects, filters, onFilterChange, onSearch, onClear, loading }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleCourseTypeSelect = (type) => {
    onFilterChange({ ...filters, course_type: type, course_id: "", subject_id: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mx-4 sm:mx-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Search Tutors</h3>

      {/* Course Type Toggle */}
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-gray-700">Course Type</p>
        <div className="flex gap-2 flex-wrap">
          {COURSE_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => handleCourseTypeSelect(t.value)}
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all ${
                filters.course_type === t.value
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cascading Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <Select
          label="Course"
          name="course_id"
          value={filters.course_id || ""}
          onChange={handleChange}
          options={courses.map((c) => ({ value: c.id, label: c.course_name }))}
          placeholder="All courses"
        />
        <Select
          label="Class"
          name="class_id"
          value={filters.class_id || ""}
          onChange={handleChange}
          options={classes.map((c) => ({ value: c.id, label: c.class_name }))}
          placeholder="All classes"
        />
        <Select
          label="Subject"
          name="subject_id"
          value={filters.subject_id || ""}
          onChange={handleChange}
          options={subjects.map((s) => ({ value: s.id, label: s.subject_name }))}
          placeholder={filters.course_id ? "Subjects for this course" : "All subjects"}
        />
      </div>

      {/* Qualification + Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Qualification</label>
          <input
            type="text"
            name="qualification"
            value={filters.qualification || ""}
            onChange={handleChange}
            placeholder="e.g. B.Tech, M.Sc, PhD"
            className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Min. Experience (Years)</label>
          <input
            type="number"
            name="min_experience"
            value={filters.min_experience || ""}
            onChange={handleChange}
            placeholder="e.g. 2"
            min="0"
            max="50"
            className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Search Bar + Buttons — one row */}
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">Search</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              name="search"
              value={filters.search || ""}
              onChange={handleChange}
              placeholder="Search by name or email"
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 shrink-0">
          <Button
            type="button"
            onClick={onSearch}
            loading={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 shadow-md hover:shadow-lg transition-all whitespace-nowrap"
          >
            Find Tutors
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClear}
            disabled={loading}
            className="border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600 px-4 whitespace-nowrap flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TutorFilterBar;
