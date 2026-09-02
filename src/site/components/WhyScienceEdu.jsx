import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, CalendarRange, Video, LayoutGrid, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/images';

export const WhyScienceEdu = () => {
  const reduceMotion = useReducedMotion();
  const features = [
    {
      icon: ShieldCheck,
      title: 'Verified Tutors',
      desc: 'Tutor applications are reviewed before they can teach, helping students connect with trusted educators.',
      accent: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    },
    {
      icon: CalendarRange,
      title: 'Smart Availability',
      desc: 'Students book from tutor-defined schedules, excluded dates, seat capacity, and subject-based slots.',
      accent: 'border-blue-200 bg-blue-50 text-blue-700',
    },
    {
      icon: Video,
      title: 'Live Interactive Classes',
      desc: 'Learn directly with tutors through engaging online classes and real-time interaction.',
      accent: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    },
    {
      icon: LayoutGrid,
      title: 'Structured Learning',
      desc: 'Courses, subjects, classes, schedules, and sessions are organized in one platform.',
      accent: 'border-amber-200 bg-amber-50 text-amber-700',
    },
  ];

  return (
    <motion.section
      id="why-science-edu"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="py-20 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic Rigor & Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
            More than tutoring. A complete learning experience.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Engineered from the ground up to support Indian students preparing for competitive benchmarks through structured mentoring, seamless scheduling, and transparent verification.
          </p>
        </div>

        {/* Editorial Layout: Large Photo + Feature Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: Large Editorial Photograph */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -26 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group">
              <img
                src={IMAGES.whyTeacherTeaching}
                alt="Indian tutor teaching students interactively"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Quote on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white shadow-lg text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                    SE
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      "Real learning happens when concepts are questioned, solved, and mastered together."
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      ScienceEdu Academic Teaching Standard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: 4 Detailed Feature Blocks */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 26 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    id={`why-feature-${idx}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: idx * 0.08, duration: 0.45 }}
                    className="p-5 rounded-xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-blue-200 hover:shadow-md transition-all duration-200 flex flex-col justify-start"
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3.5 ${feat.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom highlight pill */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-center gap-3"
            >
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <span>
                <strong>100% Verified Profile Guarantee:</strong> Every tutor’s credentials, degree certificates, and teaching demo are vetted by our academic council.
              </span>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
};
