import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Button from "../common/Button";
import Select from "../common/Select";

const TutorFilterBar = ({
  courses, 
  classes, 
  subjects, 
  filters, 
  onFilterChange, 
  onSearch, 
  loading 
}) => {
  const [isAdvanced, setIsAdvanced] = useState(false);

  const handleSimpleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const handleMultiSelect = (name, value) => {
    // For advanced mode: handle comma-separated values
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mx-4 sm:mx-8">
      {/* Toggle Button */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Search Tutors</h3>
        <button
          onClick={() => setIsAdvanced(!isAdvanced)}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors"
        >
          {isAdvanced ? "Simple Mode" : "Advanced Mode"}
          <ChevronDown className={`w-4 h-4 transition-transform ${isAdvanced ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Simple Mode */}
      {!isAdvanced && (
        <div className="space-y-4">
          {/* Tutor Name Search */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tutor Name
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                name="tutor_name"
                value={filters.tutor_name || ""}
                onChange={handleSimpleChange}
                placeholder="Search by tutor name"
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Single Select Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Course"
              name="course_id"
              value={filters.course_id || ""}
              onChange={handleSimpleChange}
              options={courses.map((course) => ({
                value: course.id,
                label: course.course_name,
              }))}
              placeholder="All courses"
            />

            <Select
              label="Class"
              name="class_id"
              value={filters.class_id || ""}
              onChange={handleSimpleChange}
              options={classes.map((item) => ({
                value: item.id,
                label: item.class_name,
              }))}
              placeholder="All classes"
            />

            <Select
              label="Subject"
              name="subject_id"
              value={filters.subject_id || ""}
              onChange={handleSimpleChange}
              options={subjects.map((subject) => ({
                value: subject.id,
                label: subject.subject_name,
              }))}
              placeholder="All subjects"
            />
          </div>

          {/* Search Button */}
          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              onClick={onSearch}
              loading={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 shadow-md hover:shadow-lg transition-all"
            >
              Find Tutors
            </Button>
          </div>
        </div>
      )}

      {/* Advanced Mode */}
      {isAdvanced && (
        <div className="space-y-4">
          {/* Tutor Name Search */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tutor Name
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                name="tutor_name"
                value={filters.tutor_name || ""}
                onChange={handleSimpleChange}
                placeholder="Search by tutor name"
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Multiple Select Inputs */}
          <div className="space-y-4">
            {/* Courses Input */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Courses (comma-separated)
              </label>
              <input
                type="text"
                value={filters.course_ids || ""}
                onChange={(e) => handleMultiSelect("course_ids", e.target.value)}
                placeholder="e.g., Mathematics, English or 1,2,3"
                className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Available: {courses.map((c) => c.course_name).join(", ")}
              </p>
            </div>

            {/* Classes Input */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Classes (comma-separated)
              </label>
              <input
                type="text"
                value={filters.class_ids || ""}
                onChange={(e) => handleMultiSelect("class_ids", e.target.value)}
                placeholder="e.g., Class A, Class B or 1,2"
                className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Available: {classes.map((c) => c.class_name).join(", ")}
              </p>
            </div>

            {/* Subjects Input */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Subjects (comma-separated)
              </label>
              <input
                type="text"
                value={filters.subject_ids || ""}
                onChange={(e) => handleMultiSelect("subject_ids", e.target.value)}
                placeholder="e.g., Physics, Chemistry or 1,2,3"
                className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Available: {subjects.map((s) => s.subject_name).join(", ")}
              </p>
            </div>
          </div>

          {/* Advanced Search Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Enter multiple items separated by commas. Results will be ranked by match count—tutors matching more filters appear first.
            </p>
          </div>

          {/* Search Button */}
          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              onClick={onSearch}
              loading={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 shadow-md hover:shadow-lg transition-all"
            >
              Find Tutors
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorFilterBar;
