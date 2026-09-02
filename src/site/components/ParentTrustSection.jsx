import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  CalendarCheck,
  CreditCard,
  CheckCircle,
  BookOpen,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import { IMAGES } from '../data/images';

export const ParentTrustSection = ({
  onOpenConsultation
}) => {
  const reduceMotion = useReducedMotion();
  const trustPoints = [
    {
      icon: ShieldCheck,
      title: 'Verified Tutors',
      desc: 'Only vetted educators with verified academic degrees and background checks teach on the platform.',
    },
    {
      icon: CalendarCheck,
      title: 'Transparent Scheduling',
      desc: 'Book, reschedule, or cancel slots with clear notice periods and live calendar alignment.',
    },
    {
      icon: CreditCard,
      title: 'Secure Online Payments',
      desc: 'Standardized fees, transparent invoices, and protected gateway processing for every booking.',
    },
    {
      icon: CheckCircle,
      title: 'Clear Class Confirmations',
      desc: 'Instant SMS and email notifications with Google Meet links upon tutor slot confirmation.',
    },
    {
      icon: BookOpen,
      title: 'Organized Learning',
      desc: 'Subject syllabi, lecture notes, homework, and test materials stored centrally for each student.',
    },
    {
      icon: TrendingUp,
      title: 'Easy Session Tracking',
      desc: 'View your child’s weekly attendance, syllabus coverage, and tutor feedback remarks anytime.',
    },
  ];

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="py-20 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Large Authentic Indian Parent & Child Photograph */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-900 group">
              <img
                src={IMAGES.parentTrustPhoto}
                alt="Indian parent and student reviewing study plan and schedule"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] sm:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white shadow-xl text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">
                      Parent Peace of Mind
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      No surprise fees, no unverified tutors, no broken communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Copy & 6 Distinct Feature Points */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dedicated Parent Assurance</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
                Built to give parents clarity and confidence
              </h2>

              <p className="text-base text-slate-600">
                We understand that every parent wants transparent academic accountability, trustworthy mentors, and safe online classrooms for their children.
              </p>
            </div>

            {/* 6 Grid Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustPoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={idx}
                    id={`parent-trust-point-${idx}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: idx * 0.06, duration: 0.45 }}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/30 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900">
                          {point.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Parent CTA Button */}
            {/* <div className="pt-2">
              <button
                id="parent-consult-cta"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md shadow-blue-700/25 transition-all active:scale-[0.98]"
              >
                <PhoneCall className="w-4 h-4 text-blue-200" />
                <span>Talk to a Consultant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div> */}

          </motion.div>

        </div>

      </div>
    </motion.section>
  );
};
