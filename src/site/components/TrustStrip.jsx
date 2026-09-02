import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  Video,
  CalendarClock,
  CreditCard,
  VideoIcon,
  Layers
} from 'lucide-react';

export const TrustStrip = () => {
  const reduceMotion = useReducedMotion();
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Verified Tutors',
      desc: 'Rigorous background & subject audit',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      icon: Video,
      title: 'Live Classes',
      desc: 'Real-time 1-on-1 & micro batches',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      icon: CalendarClock,
      title: 'Flexible Scheduling',
      desc: 'Instant booking aligned with your time',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      icon: CreditCard,
      title: 'Secure Online Payments',
      desc: 'Encrypted per-session & package checkout',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
    {
      icon: VideoIcon,
      title: 'Google Meet Classes',
      desc: 'Automated video links & calendar sync',
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      icon: Layers,
      title: 'Structured Courses',
      desc: 'Complete curriculum & question banks',
      color: 'text-teal-600 bg-teal-50 border-teal-200',
    },
  ];

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="bg-slate-900 text-white py-12 relative overflow-hidden"
    >
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 opacity-90 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest font-bold text-blue-400 mb-1">
            ACADEMIC INTEGRITY & RELIABILITY
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            Everything you need to learn with confidence
          </h2>
        </div>

        {/* 6 Clean Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                id={`trust-item-${idx}`}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.06, duration: 0.45 }}
                className="bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 rounded-xl p-4 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-200 mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
};
