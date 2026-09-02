import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Search,
  Calendar,
  CheckCircle2,
  Video,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Zap
} from 'lucide-react';
import { IMAGES } from '../data/images';

export const HowItWorks = ({ onStartBooking }) => {
  const [activeStep, setActiveStep] = useState(0);
  const reduceMotion = useReducedMotion();

  const steps = [
    {
      number: '01',
      title: 'Find Tutor',
      desc: 'Search by subject, level, exam target, or tutor rating with verified credentials.',
      image: IMAGES.howItWorksSearch,
      icon: Search,
      tag: 'Step 1: Discovery',
      accentColor: 'from-blue-600 to-indigo-600',
      uiMockup: (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 border-b border-slate-100 pb-2">
            <span className="flex items-center gap-1.5 text-blue-700">
              <Search className="w-3.5 h-3.5" />
              Filter: Physics • JEE Advanced
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              8 Available
            </span>
          </div>
          <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-lg border border-slate-100">
            <img src={IMAGES.tutor1} alt="Tutor" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">Dr. Priya Sharma</p>
              <p className="text-[10px] text-slate-500 truncate">Ex-IIT Delhi • 4.9 ★ (142 reviews)</p>
            </div>
            <span className="text-xs font-semibold text-blue-700 shrink-0">₹950/hr</span>
          </div>
        </div>
      )
    },
    {
      number: '02',
      title: 'Choose Slot',
      desc: 'Select a convenient time slot from the tutor\'s live calendar availability.',
      image: IMAGES.howItWorksSlot,
      icon: Calendar,
      tag: 'Step 2: Scheduling',
      accentColor: 'from-amber-600 to-orange-600',
      uiMockup: (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 border-b border-slate-100 pb-2">
            <span className="flex items-center gap-1.5 text-amber-700">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              Live Availability
            </span>
            <span className="text-[10px] text-slate-500 font-normal">Saturday, 22 Aug</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <span className="p-1.5 text-center text-xs font-medium rounded bg-slate-100 text-slate-400 line-through">4:00 PM</span>
            <span className="p-1.5 text-center text-xs font-semibold rounded bg-blue-600 text-white shadow-xs">6:00 PM</span>
            <span className="p-1.5 text-center text-xs font-medium rounded bg-slate-100 text-slate-700">7:30 PM</span>
          </div>
          <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Slot reserved for instant booking
          </p>
        </div>
      )
    },
    {
      number: '03',
      title: 'Confirmation',
      desc: 'Get instant booking confirmation with session link and preparation materials.',
      image: IMAGES.howItWorksConfirmation,
      icon: ShieldCheck,
      tag: 'Step 3: Verification',
      accentColor: 'from-emerald-600 to-teal-600',
      uiMockup: (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 border-b border-slate-100 pb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Booking Confirmed & Approved</span>
          </div>
          <div className="p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-200/60">
            <p className="text-xs font-semibold text-slate-900">Rotational Dynamics Numerical Drill</p>
            <p className="text-[11px] text-slate-600">Sat, 6:00 PM - 7:00 PM IST</p>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">Invoice #SE-8924 • Guaranteed</p>
          </div>
        </div>
      )
    },
    {
      number: '04',
      title: 'Join Class',
      desc: 'Meet your tutor directly via 1-on-1 HD live classroom with digital whiteboard.',
      image: IMAGES.howItWorksLiveMeet,
      icon: Video,
      tag: 'Step 4: Live Session',
      accentColor: 'from-rose-600 to-indigo-600',
      uiMockup: (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-left space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 border-b border-slate-100 pb-2">
            <span className="flex items-center gap-1.5 text-rose-700">
              <Video className="w-4 h-4 text-rose-600" />
              Live HD Classroom
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="p-2.5 bg-blue-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-900">meet.google.com/sci-edu-2026</p>
              <p className="text-[10px] text-blue-600">HD Video • Whiteboard • Notes</p>
            </div>
            <button className="px-2.5 py-1 text-[11px] font-semibold bg-blue-700 text-white rounded-md shadow-xs">
              Join
            </button>
          </div>
        </div>
      )
    },
  ];

  return (
    <motion.section
      id="how-it-works"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="py-20 bg-slate-50/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Structured Learning Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Your Journey to Success
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A seamless, transparent 4-stage learning timeline designed for measurable academic milestones.
          </p>
        </div>

        {/* Journey / Timeline Design Container */}
        <div className="relative">

          {/* Desktop Connecting Horizontal Timeline Bar */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-1 bg-gradient-to-r from-blue-200 via-indigo-200 via-emerald-200 to-rose-200 rounded-full z-0" />

          {/* Interactive Timeline Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <motion.div
                  key={idx}
                  id={`how-step-${idx}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isActive
                      ? 'border-blue-500 bg-white shadow-xl ring-2 ring-blue-500/20 translate-y-[-4px]'
                      : 'border-slate-200/90 bg-white/90 hover:bg-white hover:border-slate-300 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Timeline Badge Node at Top */}
                  <div className="p-5 pb-0 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Timeline Circular Indicator */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs transition-transform duration-300 shadow-md ${
                        isActive
                          ? 'bg-blue-700 text-white scale-110 ring-4 ring-blue-100'
                          : 'bg-slate-900 text-white group-hover:bg-blue-600'
                      }`}>
                        {step.number}
                      </div>
                      <div>
                        <span className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
                          {step.tag}
                        </span>
                        <h3 className="text-base font-semibold text-slate-900">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-400 group-hover:text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Step Image */}
                  <div className="px-5 pt-4">
                    <div className="relative h-32 rounded-xl overflow-hidden bg-slate-900 shadow-inner">
                      <img
                        src={step.image}
                        alt={step.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-400" /> Milestone {idx + 1}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                      </div>
                    </div>
                  </div>

                  {/* Step Description & Interactive UI Mockup */}
                  <div className="p-5 space-y-3.5">
                    <p className="text-xs text-slate-600 leading-relaxed font-normal min-h-[36px]">
                      {step.desc}
                    </p>

                    {/* Realistic contextual UI snippet */}
                    <div>
                      {step.uiMockup}
                    </div>
                  </div>

                  {/* Card Bottom Progress Accent */}
                  <div className={`h-1 w-full transition-all duration-300 ${
                    isActive ? 'bg-blue-600' : 'bg-transparent group-hover:bg-slate-200'
                  }`} />
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Interactive Bottom Journey Action */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="mt-14 text-center"
        >
          <button
            id="how-it-works-start-cta"
            onClick={onStartBooking}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-700/20 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Start Your Learning Journey — Find a Tutor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </motion.section>
  );
};
