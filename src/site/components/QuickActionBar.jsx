import React from 'react';
import { Search, PhoneCall, ArrowUp, Calendar, ShieldCheck } from 'lucide-react';

export const QuickActionBar = ({
  onOpenFindTutor,
  onOpenConsultation
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Floating Quick Action Pill */}
      <div className="bg-slate-900/90 text-white backdrop-blur-md px-3 py-2 rounded-full shadow-2xl border border-slate-700/80 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">

        <button
          id="quick-find-tutor-btn"
          onClick={onOpenFindTutor}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-xs"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Find Tutor</span>
        </button>

        <button
          id="quick-consult-btn"
          onClick={onOpenConsultation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-xs transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Book Consult</span>
        </button>

        <div className="w-px h-4 bg-slate-700 mx-0.5" />

        <button
          id="quick-scroll-top-btn"
          onClick={scrollToTop}
          className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
