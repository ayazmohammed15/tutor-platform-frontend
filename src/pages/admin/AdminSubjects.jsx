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

  // Course Modal State
  const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
  const [modalCourseName, setModalCourseName] = useState("");
  const [modalCourseType, setModalCourseType] = useState("general");

  // Subject Modal State
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [modalCourseId, setModalCourseId] = useState("");
  const [modalSubjectName, setModalSubjectName] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchSubjects());
  }, [dispatch]);

  const formatDate = (dateValue) => {
    if (!dateValue) return '-';

    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(dateValue));
  };

  const getStatusLabel = (isActive) => Number(isActive) === 1 ? 'Active' : 'Inactive';

  // Course Modal Handlers
  const openCoursesModal = () => {
    setModalCourseName("");
    setModalCourseType("general");
    setIsCoursesModalOpen(true);
  };

  const closeCoursesModal = () => {
    setIsCoursesModalOpen(false);
  };

  const handleSaveCourse = async () => {
    if (!modalCourseName.trim()) {
      toast.error("Please enter a course name");
      return;
    }

    try {
      await dispatch(
        createCourse({
          course_name: modalCourseName.trim(),
          course_type: modalCourseType
        })
      );
      await dispatch(fetchCourses());
      toast.success("Course added successfully");
      setModalCourseName("");
      setModalCourseType("general");
      setIsCoursesModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add course");
    }
  };

  // Subject Modal Handlers
  const openSubjectModal = () => {
    setModalSubjectName("");
    setModalCourseId("");
    setIsSubjectModalOpen(true);
  };

  const closeSubjectModal = () => {
    setIsSubjectModalOpen(false);
  };

  const handleSaveSubject = async () => {
    if (!modalSubjectName.trim()) {
      toast.error("Please enter a subject name");
      return;
    }

    if (!modalCourseId) {
      toast.error("Please select a course");
      return;
    }

    try {
      // 1) create subject
      const createAction = await dispatch(
        createSubject({ subject_name: modalSubjectName.trim() })
      );

      // Try to get new subject id from response
      let newSubjectId = null;

      if (createAction.payload) {
        newSubjectId = createAction.payload.insertId || createAction.payload.id || (createAction.payload.subject && createAction.payload.subject.id);
      }

      // 2) If backend didn't return id, refetch subjects and find by name (newest)
      if (!newSubjectId) {
        const subsAction = await dispatch(fetchSubjects());
        const subs = subsAction.payload || [];
        const candidates = subs.filter(s => s.subject_name === modalSubjectName.trim());
        if (candidates.length > 0) {
          candidates.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          newSubjectId = candidates[0].id;
        }
      }

      if (!newSubjectId) {
        throw new Error("Unable to determine created subject id");
      }

      // 3) get existing course subjects
      const existingAction = await dispatch(fetchCourseSubjects(modalCourseId));
      const existingIds = existingAction.payload || [];

      // 4) save updated mapping
      const updated = Array.from(new Set([...(existingIds || []), newSubjectId]));

      await dispatch(saveCourseSubjects({ courseId: modalCourseId, subjectIds: updated }));

      // refresh
      await dispatch(fetchSubjects());
      await dispatch(fetchCourseSubjects(modalCourseId));

      toast.success("Subject created and mapped to course");

      // cleanup
      setModalSubjectName("");
      setModalCourseId("");
      setIsSubjectModalOpen(false);

    } catch (error) {
      console.error(error);
      toast.error("Failed to create or map subject");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subjects & Curriculum</h1>
          <p className="text-sm text-gray-500 mt-1">Configure boards (CBSE, State), classes (6-10), and available subjects.</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={openCoursesModal}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Add Course
          </button>
          <button
            onClick={openSubjectModal}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            Add Subject
          </button>
        </div>
      </div>

      {/* Existing Courses & Subjects */}
      <div className="space-y-6">
        <div className="rounded-xl border bg-white p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Courses</h2>
            <span className="text-sm text-gray-500">{courses.length} total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">S.No</th>
                  <th className="px-4 py-3 font-semibold">Course Name</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  {/* <th className="px-4 py-3 font-semibold">Created</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">{index + 1}</td>
                      <td className="min-w-48 px-4 py-3 font-medium text-gray-900">{course.course_name || '-'}</td>
                      <td className="min-w-40 px-4 py-3 text-gray-600">{course.slug || '-'}</td>
                      <td className="whitespace-nowrap px-4 py-3 capitalize text-gray-600">{course.course_type || '-'}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${Number(course.is_active) === 1 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {getStatusLabel(course.is_active)}
                        </span>
                      </td>
                      {/* <td className="whitespace-nowrap px-4 py-3 text-gray-600">{formatDate(course.created_at)}</td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-8 text-center text-gray-500" colSpan="6">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Subjects</h2>
            <span className="text-sm text-gray-500">{subjects.length} total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Subject Name</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  {/* <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3 font-semibold">Updated</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {subjects.length > 0 ? (
                  subjects.map((subject, index) => (
                    <tr key={subject.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">{index + 1}</td>
                      <td className="min-w-48 px-4 py-3 font-medium text-gray-900">{subject.subject_name || '-'}</td>
                      <td className="min-w-40 px-4 py-3 text-gray-600">{subject.slug || '-'}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${Number(subject.is_active) === 1 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {getStatusLabel(subject.is_active)}
                        </span>
                      </td>
                      {/* <td className="whitespace-nowrap px-4 py-3 text-gray-600">{formatDate(subject.created_at)}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">{formatDate(subject.updated_at)}</td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-4 py-8 text-center text-gray-500" colSpan="6">
                      No subjects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Courses Modal */}
      {isCoursesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeCoursesModal}></div>

          <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add Course</h3>

            <input
              value={modalCourseName}
              onChange={(e) => setModalCourseName(e.target.value)}
              placeholder="Course Name"
              className="w-full border rounded-lg p-2 mb-3"
            />

            <select
              value={modalCourseType}
              onChange={(e) => setModalCourseType(e.target.value)}
              className="w-full border rounded-lg p-2 mb-3"
            >
              <option value="general">General</option>
              <option value="entrance">Entrance</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeCoursesModal}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveCourse}
                className={`px-4 py-2 rounded-lg text-white ${modalCourseName.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!modalCourseName.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subjects Modal */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeSubjectModal}></div>

          <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add Subject & Map to Course</h3>

            <select
              value={modalCourseId}
              onChange={(e) => setModalCourseId(e.target.value)}
              className="w-full border rounded-lg p-2 mb-3"
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.course_name}</option>
              ))}
            </select>

            <input
              value={modalSubjectName}
              onChange={(e) => setModalSubjectName(e.target.value)}
              placeholder="Subject Name"
              className="w-full border rounded-lg p-2 mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={closeSubjectModal}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveSubject}
                className={`px-4 py-2 rounded-lg text-white ${modalSubjectName.trim() && modalCourseId ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!modalSubjectName.trim() || !modalCourseId}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminSubjects;
