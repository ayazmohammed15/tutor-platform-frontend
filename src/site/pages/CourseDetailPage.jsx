import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Users,
  Clock,
  Video,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
// import { COURSES_DATA } from '../data/content';
import { tutorService } from '../../services/tutorService';
import { IMAGES } from '../data/images';
import { ConsultationModal } from '../components/modals/ConsultationModal';
import { FindTutorModal } from '../components/modals/FindTutorModal';

export const CourseDetailPage = () => {
  const { id } = useParams();

  const [consultationOpen, setConsultationOpen] = useState(false);
  const [findTutorOpen, setFindTutorOpen] = useState(false);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        const response = await tutorService.getCourses();

        const foundCourse = response?.find(
          (item) => String(item.id) === String(id)
        );

        setCourse(foundCourse || null);
      } catch (error) {
        console.error('Failed to fetch course:', error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const getCourseImage = (courseName) => {
    const name = courseName?.toLowerCase() || '';

    if (name.includes('neet')) {
      return IMAGES.examNeetPrep;
    }

    if (name.includes('jee')) {
      return IMAGES.examJeePrep;
    }

    if (name.includes('foundation')) {
      return IMAGES.examIitFoundation;
    }

    return IMAGES.examIitFoundation;
  };

  const courseImage = getCourseImage(course.course_name);
  const getCourseExamFocus = (courseName) => {
    const name = courseName?.toLowerCase() || '';

    if (name.includes('neet')) {
      return 'NEET';
    }

    if (name.includes('jee')) {
      return 'JEE';
    }

    if (name.includes('foundation')) {
      return 'Foundation';
    }

    if (name.includes('school') || name.includes('cbse')) {
      return 'School';
    }

    return 'All';
  };

  const courseExamFocus = getCourseExamFocus(course.course_name);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Banner */}
        <section className="relative h-72 sm:h-96 bg-slate-900 overflow-hidden">
          <img
            src={courseImage}
            alt={course.course_name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/10" />

          <div className="absolute top-6 left-4 sm:left-8">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Courses</span>
            </Link>
          </div>

          <div className="absolute bottom-6 sm:bottom-10 left-4 right-4 sm:left-8 sm:right-8 max-w-3xl text-white space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 uppercase tracking-wide">
              {course.course_type}
            </span>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              {course.course_name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300">
              {course.slug}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-semibold text-slate-900 text-lg sm:text-xl mb-3">
                Course Information
              </h2>

              <div className="space-y-3">

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] text-slate-400 block font-medium">
                    Course Name
                  </span>

                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {course.course_name}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] text-slate-400 block font-medium">
                    Course Type
                  </span>

                  <p className="text-sm font-semibold text-slate-800 mt-1 capitalize">
                    {course.course_type}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <span className="text-[11px] text-slate-400 block font-medium">
                    Course Slug
                  </span>

                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {course.slug}
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Faculty Leadership</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{course.mentorName}</p>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{course.batchSize}</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-700">
                <Video className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{course.deliveryMode}</span>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => setFindTutorOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md transition-colors cursor-pointer"
                >
                  <span>Match with Course Mentors</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {/* <button
                  onClick={() => setConsultationOpen(true)}
                  className="w-full px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Speak to Academic Counselor
                </button> */}
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer
        onOpenFindTutor={() => setFindTutorOpen(true)}
        onOpenAuth={() => { }}
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenCourse={() => { }}
      />

      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
      <FindTutorModal
        isOpen={findTutorOpen}
        onClose={() => setFindTutorOpen(false)}
        onSelectTutor={() => { }}
        initialQuery=""
        initialExam={courseExamFocus}
      />
    </div>
  );
};
