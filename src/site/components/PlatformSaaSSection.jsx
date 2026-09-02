import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Video,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { IMAGES } from '../data/images';

export const PlatformSaaSSection = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="py-20 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Subtle Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Unified EdTech Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            One platform. Everything connected.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            From smart tutor scheduling and automated Google Meet links to structured curriculum progression and instant digital invoices.
          </p>
        </div>

        {/* Big SaaS Dashboard Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left: Real Student Using Dashboard Image */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
              <img
                src={IMAGES.saasStudentUsingApp}
                alt="Indian student using ScienceEdu dashboard"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Real-Time Synchronized</span>
                </div>
                <p className="text-xs text-slate-200">
                  "Having all my JEE Physics notes, live Meet links, and tests in one dashboard removed all confusion."
                </p>
                <p className="text-[10px] text-slate-400 mt-1">— Ananya P., Class 12 JEE Aspirant</p>
              </div>
            </div>
          </motion.div>

          {/* Right: High-Fidelity Interactive SaaS Product Mockup */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 order-1 lg:order-2"
          >
            <div className="bg-slate-950/90 rounded-2xl border border-slate-800 shadow-2xl p-4 sm:p-6 backdrop-blur-xl">

              {/* Mockup Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">app.scienceedu.in/dashboard</span>
                </div>

                {/* Dashboard Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'schedule' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Upcoming Classes
                  </button>
                  <button
                    onClick={() => setActiveTab('progress')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'progress' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Course Progress
                  </button>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === 'payments' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Invoices & Payments
                  </button>
                </div>
              </div>

              {/* Dynamic Tab Body */}
              {activeTab === 'schedule' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Live Upcoming Session Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-700/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
                        <Video className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">JEE Physics: Rotational Mechanics</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                            Starts in 15 mins
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">Tutor: Dr. Priya Sharma • Google Meet Connected</p>
                      </div>
                    </div>

                    <a
                      href="https://meet.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors shrink-0"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Live Class</span>
                    </a>
                  </div>

                  {/* Scheduled Upcoming Rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                        <span className="font-semibold text-blue-400">Tomorrow • 5:00 PM</span>
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded">1-on-1 Session</span>
                      </div>
                      <p className="text-xs font-bold text-white">NEET Biology: Human Circulatory System</p>
                      <p className="text-[11px] text-slate-400 mt-1">Faculty: Dr. Ananya Iyer</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                        <span className="font-semibold text-amber-400">Thursday • 6:30 PM</span>
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded">Micro Batch</span>
                      </div>
                      <p className="text-xs font-bold text-white">IIT Foundation: Quadratic Formulations</p>
                      <p className="text-[11px] text-slate-400 mt-1">Faculty: Prof. Rajesh Varma</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[11px] text-slate-400">Physics Completion</span>
                      <p className="text-xl font-bold text-blue-400 mt-1">78%</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-blue-500 h-full w-[78%]" />
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[11px] text-slate-400">Chemistry Mastery</span>
                      <p className="text-xl font-bold text-emerald-400 mt-1">84%</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[84%]" />
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[11px] text-slate-400">Mathematics PYQs</span>
                      <p className="text-xl font-bold text-amber-400 mt-1">91%</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-amber-500 h-full w-[91%]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                    <span>Next Unit Milestone: Electromagnetic Induction & AC Circuits (Sunday Diagnostic)</span>
                    <span className="text-blue-400 font-semibold cursor-pointer hover:underline">View Syllabus &rarr;</span>
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="space-y-3 animate-in fade-in duration-200 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Invoice #SE-9102 • 10-Hour JEE Physics Package</p>
                      <p className="text-[11px] text-slate-400">Paid via UPI / NetBanking • 18 Aug 2026</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400">₹8,550</span>
                      <span className="block text-[10px] text-slate-500 font-mono">Receipt Downloaded</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Invoice #SE-8841 • IIT Foundation Math Trial Slot</p>
                      <p className="text-[11px] text-slate-400">Paid via Debit Card • 12 Aug 2026</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400">₹750</span>
                      <span className="block text-[10px] text-slate-500 font-mono">Receipt Downloaded</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </motion.section>
  );
};
