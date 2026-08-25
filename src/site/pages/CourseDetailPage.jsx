import React, { useState } from 'react';
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
import { COURSES_DATA } from '../data/content';
import { ConsultationModal } from '../components/modals/ConsultationModal';
import { FindTutorModal } from '../components/modals/FindTutorModal';

export const CourseDetailPage = () => {
  const { id } = useParams();
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [findTutorOpen, setFindTutorOpen] = useState(false);

  const course = COURSES_DATA.find((c) => c.id === id);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Banner */}
        <section className="relative h-72 sm:h-96 bg-slate-900 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
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
              {course.badge}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {course.category} • {course.targetClass} • {course.duration}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-semibold text-slate-900 mb-2 text-lg sm:text-xl">
                Course Description & Academic Focus
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">{course.description}</p>
            </div>

            <div className="space-y-3">
              <h2 className="font-semibold text-slate-900 text-lg sm:text-xl flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Core Modules & Curriculum Scope</span>
              </h2>
              <div className="space-y-2">
                {course.curriculum.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3 text-sm text-slate-700"
                  >
                    <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-semibold text-slate-900 text-lg sm:text-xl">Program Inclusions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
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
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="w-full px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Speak to Academic Counselor
                </button>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer
        onOpenFindTutor={() => setFindTutorOpen(true)}
        onOpenAuth={() => {}}
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenCourse={() => {}}
      />

      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
      <FindTutorModal
        isOpen={findTutorOpen}
        onClose={() => setFindTutorOpen(false)}
        onSelectTutor={() => {}}
        initialQuery={course.category}
      />
    </div>
  );
};
