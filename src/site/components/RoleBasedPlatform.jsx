import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { User, CheckCircle2, Sparkles, Briefcase } from 'lucide-react';
import { ROLE_FEATURES } from '../data/content';

export const RoleBasedPlatform = ({
  onOpenAuth,
  onOpenFindTutor,
}) => {
  const [selectedRole, setSelectedRole] = useState('students');
  const reduceMotion = useReducedMotion();

  const currentRoleData = ROLE_FEATURES.find(r => r.id === selectedRole) || ROLE_FEATURES[0];

  return (
    <motion.section
      id="role-dashboards"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="py-20 bg-slate-50 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Role-Engineered Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            One product, two focused dashboards
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Students and tutors each get the tools they need without mixing responsibilities across the platform.
          </p>

          {/* Role Switcher Pill Bar */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm gap-2">
            <button
              id="role-btn-students"
              onClick={() => setSelectedRole('students')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                selectedRole === 'students'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>For Students</span>
            </button>

            <button
              id="role-btn-tutors"
              onClick={() => setSelectedRole('tutors')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                selectedRole === 'tutors'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>For Tutors</span>
            </button>
          </div>
        </div>

        {/* Active Role Visual & Feature Breakdown */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

            {/* Left: Distinct Human Photograph for the Role */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 relative bg-slate-900 min-h-[350px] lg:min-h-[480px]"
            >
              <img
                src={currentRoleData.image}
                alt={currentRoleData.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 uppercase tracking-wide">
                  {currentRoleData.title}
                </span>
                <h3 className="text-xl font-semibold text-white pt-1">
                  {currentRoleData.title === 'For Students' && 'Empowering Indian Aspirants'}
                  {currentRoleData.title === 'For Tutors' && 'Educators Teaching with Independence'}
                  {currentRoleData.title === 'For Admins' && 'Strict Academic Quality Assurance'}
                </h3>
                <p className="text-xs text-slate-300">
                  {currentRoleData.subtitle}
                </p>
              </div>
            </motion.div>

            {/* Right: Role Feature Grid & Action Button */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 22 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-8"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">
                      {currentRoleData.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tailored workflows designed for zero friction and high productivity.
                    </p>
                  </div>
                </div>

                {/* 6 Grid Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentRoleData.features.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: idx * 0.06, duration: 0.4 }}
                      className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 transition-colors space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <h4 className="text-xs font-semibold text-slate-900">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              
              {/* <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500 text-center sm:text-left">
                  Ready to test drive the interface? Try our interactive view.
                </p>

                <button
                  id={`role-cta-${currentRoleData.id}`}
                  onClick={() => {
                    if (currentRoleData.id === 'students') {
                      onOpenFindTutor();
                    } else if (currentRoleData.id === 'tutors') {
                      onOpenAuth('tutor');
                    } else {
                      onOpenAuth('admin');
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md shadow-blue-700/20 transition-all active:scale-[0.98]"
                >
                  <span>{currentRoleData.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div> */}

            </motion.div>

          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};
