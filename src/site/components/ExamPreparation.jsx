import React from 'react';
import { ArrowRight, BookOpen, CheckCircle, Award, Sparkles, Compass } from 'lucide-react';
import { COURSES_DATA } from '../data/content';

export const ExamPreparation = ({
  onSelectCourse,
  onOpenFindTutor
}) => {
  return (
    <section id="courses" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-blue-700" />
            <span>Targeted Competitive Pathways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Prepare for the exams that shape your future
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Expertly designed learning paths connecting you with seasoned Indian tutors for foundational clarity and competitive excellence.
          </p>
        </div>

        {/* Three Large Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COURSES_DATA.map((course) => {
            const isJee = course.id === 'jee-main-prep';
            const isNeet = course.id === 'neet-prep';
            const isFoundation = course.id === 'iit-foundation';

            return (
              <div
                key={course.id}
                id={`exam-card-${course.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Large Photography Container */}
                <div className="relative h-60 overflow-hidden bg-slate-900">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-600/90 text-white backdrop-blur-md shadow-sm">
                      {course.badge}
                    </span>
                  </div>

                  {/* Target Class Pill */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold bg-slate-900/70 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      {course.targetClass}
                    </span>
                    <span className="text-blue-300 font-medium">
                      {course.batchSize}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="pt-2 space-y-1.5">
                      {course.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mentors and CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Faculty Leads</span>
                      <span className="text-xs font-semibold text-slate-800 line-clamp-1">{course.mentorName}</span>
                    </div>

                    <button
                      id={`explore-btn-${course.id}`}
                      onClick={() => onSelectCourse(course.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs transition-all shrink-0"
                    >
                      <span>Explore More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Help Strip under Exam Cards */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-slate-900">Looking for a specific subject tutor for JEE, NEET, or School exams?</h4>
              <p className="text-xs text-slate-600">Search over 8+ verified subject specialists with direct calendar booking.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onOpenFindTutor('Physics')}
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Physics Tutors
            </button>
            <button
              onClick={() => onOpenFindTutor('Mathematics')}
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Math Tutors
            </button>
            <button
              onClick={() => onOpenFindTutor('Biology')}
              className="flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              NEET Biology
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
