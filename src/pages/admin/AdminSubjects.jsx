import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, createCourse } from '../../features/courses/courseSlice';
import {
  fetchSubjects, createSubject,
  fetchCourseSubjects,
  saveCourseSubjects
} from '../../features/subjects/subjectSlice';
import toast from 'react-hot-toast';

const AdminSubjects = () => {
  const dispatch = useDispatch();

  const { courses, loading } = useSelector(
    (state) => state.courses
  );

  const {
    subjects,
    selectedSubjects: reduxSelectedSubjects
  } = useSelector(
    (state) => state.subjects
  );

  const [courseName, setCourseName] = useState("");
  const [courseType, setCourseType] = useState("general");
  const [subjectName, setSubjectName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    setSelectedSubjects(reduxSelectedSubjects);
  }, [reduxSelectedSubjects]);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchSubjects());
  }, [dispatch]);



  const handleAddCourse = async () => {

    if (!courseName.trim()) {
      return;
    }

    await dispatch(
      createCourse({
        course_name: courseName,
        course_type: courseType
      })
    );
    dispatch(fetchCourses());
    setCourseName("");
  };
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subjects & Curriculum</h1>
        <p className="text-sm text-gray-500 mt-1">Configure boards (CBSE, State), classes (6-10), and available subjects.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-lg font-semibold mb-4">
            Courses
          </h2>

          <div className="space-y-3">

            <input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Course Name"
              className="w-full border rounded-lg p-2"
            />

            <select
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="general">General</option>
              <option value="entrance">Entrance</option>
            </select>

            <button
              onClick={handleAddCourse}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Course
            </button>

          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-lg font-semibold mb-4">
            Subjects
          </h2>

          <input
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Subject Name"
            className="w-full border rounded-lg p-2 mb-3"
          />

          <button
            onClick={async () => {

              await dispatch(
                createSubject({
                  subject_name: subjectName
                })
              );

              dispatch(fetchSubjects());

              setSubjectName("");

            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Add Subject
          </button>

        </div>

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-lg font-semibold mb-4">
            Course Subject Mapping
          </h2>

          <select
            value={selectedCourse}
            onChange={async (e) => {
              console.log("Course Selected:", e.target.value);
              const courseId = e.target.value;

              setSelectedCourse(courseId);

              dispatch(
                fetchCourseSubjects(courseId)
              );

            }}
            className="w-full border rounded-lg p-2 mb-4"
          >
            <option value="">
              Select Course
            </option>

            {courses.map(course => (
              <option
                key={course.id}
                value={course.id}
              >
                {course.course_name}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-3 gap-2">
            {subjects.map(subject => (

              <label
                key={subject.id}
                className="flex items-center gap-2 mb-2"
              >

                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subject.id)}
                  onChange={(e) => {

                    if (e.target.checked) {

                      setSelectedSubjects([
                        ...selectedSubjects,
                        subject.id
                      ]);

                    } else {

                      setSelectedSubjects(
                        selectedSubjects.filter(
                          id => id !== subject.id
                        )
                      );

                    }

                  }}
                />

                {subject.subject_name}

              </label>

            ))}
          </div>

          <div className="text-sm text-gray-500 mt-3 mb-3">
            {selectedSubjects.length} subject(s) selected
          </div>

          <button
            disabled={!selectedCourse}
            onClick={async () => {

              await dispatch(
                saveCourseSubjects({
                  courseId: selectedCourse,
                  subjectIds: selectedSubjects
                })
              );

              await dispatch(
                fetchCourseSubjects(selectedCourse)
              );

              toast.success("Mapping saved successfully");

            }}
            className={`mt-4 px-4 py-2 rounded-lg text-white transition ${selectedCourse
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Save Mapping
          </button>

        </div>

        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-lg font-semibold mb-4">
            Existing Courses
          </h2>

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 font-medium text-gray-700">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border rounded-lg p-3 flex justify-between"
                >
                  <div>
                    <div className="font-medium">
                      {course.course_name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {course.course_type}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminSubjects;