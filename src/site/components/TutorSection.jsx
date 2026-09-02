import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { tutorService } from '../../services/tutorService';
import { UPLOADS_BASE_URL } from '../../services/api';

export const TutorSection = ({
  onSelectTutor,
  onOpenAllTutorsModal
}) => {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await tutorService.getPublicTutors({
          limit: 50
        });

        const tutorData = response?.data?.tutors || [];

        setTutors(tutorData);
      } catch (error) {
        console.error('Failed to fetch public tutors:', error);
        setError('Unable to load tutors.');
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const subjects = ['All', 'Physics', 'Mathematics', 'Biology', 'Chemistry'];

  const filteredTutors =
    selectedSubject === 'All'
      ? tutors
      : tutors.filter(
        (tutor) =>
          tutor.subject_name?.toLowerCase() ===
          selectedSubject.toLowerCase()
      );

  return (
    <motion.section
      id="tutors"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="py-20 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Academic Verification Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Learn from tutors you can trust
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Subject specialists, IIT alumni, and experienced educators vetted for subject mastery, communication clarity, and pedagogical excellence.
          </p>

          {/* Subject Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {subjects.map((sub) => (
              <button
                key={sub}
                id={`tutor-filter-${sub.toLowerCase()}`}
                onClick={() => setSelectedSubject(sub)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedSubject === sub
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Professional Indian Tutor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTutors.map((tutor, index) => (
            <motion.div
              key={tutor.tutor_profile_id}
              id={`tutor-card-${tutor.tutor_profile_id}`}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group p-5"
            >
              {/* Top: Portrait & Badge */}
              <div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-900 mb-4">
                  <img
                    src={
                      tutor.profile_image
                        ? `${UPLOADS_BASE_URL}/${tutor.profile_image}`
                        : '/default-tutor.png'
                    }
                    alt={tutor.full_name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Verified Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 text-emerald-800 backdrop-blur-md shadow-xs">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </div>

                  {/* Subject Tag on Image */}
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white shadow-xs">
                      {tutor.subject_name}
                    </span>
                  </div>
                </div>

                {/* Tutor Info */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                      {tutor.full_name}
                    </h3>
                    {/* <div className="flex items-center gap-1 text-xs font-bold text-amber-600 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{tutor.rating}</span>
                    </div> */}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-1">
                    {tutor.education || 'Experienced Educator'}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-600 pt-1">
                    <span className="font-medium">{tutor.experience_years
                      ? `${tutor.experience_years} years experience`
                      : 'Experienced Tutor'}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">{tutor.classes || 'Classes not specified'}</span>
                  </div>

                  {/* Exam Tags
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {tutor.examFocus.map((focus, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {focus}
                      </span>
                    ))}
                  </div> */}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* View All Tutors Button */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-12 text-center"
        >
          <button
            id="view-all-tutors-cta"
            onClick={onOpenAllTutorsModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:border-blue-600 text-slate-800 hover:text-blue-700 bg-white font-semibold text-xs transition-all shadow-xs"
          >
            <span>View All Verified Tutors & Filter by Time</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </motion.section>
  );
};
