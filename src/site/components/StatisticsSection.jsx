import React from 'react';
import { ShieldCheck, Video, Calendar, Users, Award, BookOpen } from 'lucide-react';

export const StatisticsSection = () => {
  const metrics = [
    {
      label: 'Verified Tutors',
      value: '100%',
      subtext: 'Academic credential & demo vetted',
      icon: ShieldCheck,
      color: 'text-emerald-400',
    },
    {
      label: 'Live Classes',
      value: 'Google Meet',
      subtext: 'Integrated 1-on-1 & micro batches',
      icon: Video,
      color: 'text-blue-400',
    },
    {
      label: 'Learning Sessions',
      value: 'On-Demand',
      subtext: 'Flexible morning, evening & weekend slots',
      icon: Calendar,
      color: 'text-indigo-400',
    },
    {
      label: 'Core Streams',
      value: 'JEE • NEET • IITF',
      subtext: 'Structured curriculum & question banks',
      icon: BookOpen,
      color: 'text-amber-400',
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-16 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                id={`stat-metric-${idx}`}
                className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/70 text-center flex flex-col items-center justify-center space-y-2 hover:border-slate-600 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-900/80 flex items-center justify-center mb-1 ${metric.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {metric.value}
                </div>
                <h4 className="text-sm font-semibold text-slate-200">
                  {metric.label}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                  {metric.subtext}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
