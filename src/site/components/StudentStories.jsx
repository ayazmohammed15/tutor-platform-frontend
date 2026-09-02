import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote, CheckCircle2, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/content';

export const StudentStories = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="py-20 bg-slate-50 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Real Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Real students. Real learning journeys.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Hear from students and parents across India who use ScienceEdu for daily learning, school excellence, and competitive entrance preparation.
          </p>
        </div>

        {/* 3 Authentic Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              id={`story-${item.id}`}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                {/* Star Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-100" />
                </div>

                {/* Quote Body */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info with Photograph */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-600/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.name}
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-xs font-semibold text-blue-700">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item.tag}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  );
};
