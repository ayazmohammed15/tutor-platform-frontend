import React from 'react';
import {
  CheckCircle2,
  Star,
  Video,
  Search,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Calendar,
  Zap,
  Users
} from 'lucide-react';
import { IMAGES } from '../data/images';

export const HeroSection = ({
  onFindTutorClick,
  onExploreCoursesClick,
  onOpenConsultation,
}) => {
  return (
    <section
      id="home"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 overflow-hidden"
    >
      {/* Subtle Academic Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-bold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>LEARN FROM THE BEST</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.12]">
              Learn Better.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800">
                Prepare Smarter.
              </span>{' '}
              Achieve More.
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Connect with verified tutors, join structured courses, and prepare for JEE, NEET, IIT Foundation, and competitive exams through personalized online learning.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-find-tutor-btn"
                onClick={onFindTutorClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-700/25 hover:shadow-lg hover:shadow-blue-700/35 transition-all active:scale-[0.98] group"
              >
                <Search className="w-4 h-4 text-blue-200" />
                <span>Find a Tutor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-explore-courses-btn"
                onClick={onExploreCoursesClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 hover:border-slate-300 shadow-xs transition-all active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Explore Courses</span>
              </button>
            </div>

            {/* Trust statement & pills */}
            <div className="pt-4 border-t border-slate-200/80">
              <p className="text-xs font-semibold text-slate-700 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1.5">
                <span className="inline-flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Tutors
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-blue-700">
                  <Video className="w-3.5 h-3.5" /> Live Classes
                </span>
                {/* <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-indigo-700">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure Payments
                </span> */}
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-slate-700">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Google Meet
                </span>
              </p>
            </div>

            {/* Quick Consultation Ribbon */}
            {/* <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">Need guidance on which tutor or course fits your child?</p>
                  <p className="text-[11px] text-slate-500">Free 15-min academic consultation with our senior counselor.</p>
                </div>
              </div>
              <button
                id="hero-free-counsel-btn"
                onClick={onOpenConsultation}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-100/50 px-3 py-1.5 rounded-lg border border-blue-200 shrink-0 transition-colors"
              >
                Book Free
              </button>
            </div> */}

          </div>

          {/* Right Column: High-End Photorealistic Composition with Floating SaaS UI */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">

              {/* Main Photo Container with Decorative Framing */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 ring-1 ring-slate-200">
                <img
                  src={IMAGES.heroStudent}
                  alt="High school science and mathematics student in live 1-on-1 tutoring session"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to alternate high-res study photo if network blocks initial load
                    e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85";
                  }}
                  className="w-full h-[380px] sm:h-[450px] lg:h-[480px] object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
                />

                {/* Gradient vignette for text clarity on card overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={IMAGES.heroTutorLive}
                        alt="Online Indian Physics Faculty"
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
                    </div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>Live: Dr. Priya Sharma</span>
                        <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] rounded border border-emerald-400/30">
                          Physics
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">Rotational Dynamics • JEE Main Focus</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-red-500/90 text-white px-2 py-0.5 rounded-full animate-pulse">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    LIVE
                  </span>
                </div>
              </div>

              {/* Floating UI Element 1: Top Right - Verified Tutor Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 animate-in fade-in zoom-in duration-500 z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900">Verified Tutor</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-600 font-bold ml-1">4.9/5</span>
                  </div>
                </div>
              </div>

              {/* Floating UI Element 2: Middle Left - Live Class / JEE Prep */}
              <div className="absolute top-1/3 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 z-10 hidden sm:flex">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Live Class</span>
                  <p className="text-xs font-bold text-slate-800">JEE Preparation</p>
                  <p className="text-[10px] text-slate-500">Google Meet Connected</p>
                </div>
              </div>

              {/* Floating UI Element 3: Bottom Right - 120+ Sessions */}
              <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 z-10">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-slate-900">120+ Sessions</span>
                  <p className="text-[11px] text-slate-500">Conducted This Week</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
