import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQ_DATA } from '../data/content';

export const FaqSection = () => {
  const [openFaqId, setOpenFaqId] = useState('faq-1');
  const [faqSearch, setFaqSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const reduceMotion = useReducedMotion();

  const categories = ['All', 'Tutors', 'Subjects', 'Classes', 'Booking & Payments'];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = !faqSearch.trim() ||
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? '' : id);
  };

  return (
    <motion.section
      id="faq-section"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="py-20 bg-white relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Clear, transparent answers about tutor verification, subject coverage, cancellation policies, and live classes.
          </p>

          {/* Search & Category filter */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search question..."
                className="w-full text-xs pl-8 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            return (
              <motion.div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 hover:border-slate-300 transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none bg-white cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-900">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-blue-50 text-blue-700' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/70 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                    <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-blue-700">Category: {faq.category}</span>
                      <span>Verified by Academic Support</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.section>
  );
};
