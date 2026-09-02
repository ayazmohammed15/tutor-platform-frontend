import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../data/images';

export const FinalCtaSection = ({
  onFindTutor,
  onOpenConsultation
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="relative py-24 bg-slate-950 text-white overflow-hidden"
    >
      {/* Full-width High-Res Indian Students Photography Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.finalCtaGroup}
          alt="Indian students celebrating learning milestones together"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/80" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>TRANSFORM YOUR ACADEMIC GOALS</span>
        </motion.div>

        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.06, duration: 0.45 }}
          className="text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight max-w-3xl mx-auto"
        >
          Ready to start your learning journey?
        </motion.h2>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Find the right tutor, build stronger concepts, and move closer to your academic goals with personalized 1-on-1 attention and structured competitive courses.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button
            id="final-cta-get-started"
            onClick={onFindTutor}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] group"
          >
            <Search className="w-4 h-4 text-blue-200" />
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* <button
            id="final-cta-consult"
            onClick={onOpenConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 shadow-sm transition-all"
          >
            <PhoneCall className="w-4 h-4 text-blue-400" />
            <span>Speak to a Consultant</span>
          </button> */}
        </motion.div>

        {/* Reassurance points */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.24, duration: 0.45 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400 font-medium"
        >
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> 100% Verified Tutors
          </span>
          <span className="flex items-center gap-1.5 text-blue-400">
            <CheckCircle2 className="w-4 h-4" /> Google Meet Live Classes
          </span>
          <span className="flex items-center gap-1.5 text-indigo-400">
            <CheckCircle2 className="w-4 h-4" /> Easy Rescheduling
          </span>
        </motion.div>

      </div>
    </motion.section>
  );
};
