import React from 'react';
import { User, Users, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../data/images';

export const LearningOptions = ({
  onOpenFindTutor,
  onExploreCourses
}) => {
  const options = [
    {
      id: 'one-to-one',
      title: 'One-to-One Tutoring',
      icon: User,
      badge: 'Individual Focus',
      description: 'Personal sessions matched by subject, class, course, fee, and tutor experience.',
      image: IMAGES.learningOneToOne,
      imageAlt: 'Indian tutor teaching one student through a laptop',
      benefits: [
        '100% personalized attention & custom pacing',
        'Direct doubt solving on Google Meet',
        'Choose your preferred time & tutor',
        'Session recordings & tailored assignments',
      ],
      ctaText: 'Find 1-on-1 Tutor',
      onAction: () => onOpenFindTutor('1-on-1'),
    },
    {
      id: 'structured-courses',
      title: 'Structured Courses',
      icon: Layers,
      badge: 'Complete Syllabus',
      description: 'Admin-managed courses, classes, and subjects keep the learning catalogue organized.',
      image: IMAGES.learningStructuredCourses,
      imageAlt: 'Indian students attending a structured online course',
      benefits: [
        'Curated topic-by-topic curriculum roadmap',
        'Exhaustive question banks & PYQ modules',
        'Scheduled mock tests with error analytics',
        'Comprehensive notes & formula sheets',
      ],
      ctaText: 'Explore Courses',
      onAction: onExploreCourses,
    },
    {
      id: 'group-sessions',
      title: 'Small Group Sessions',
      icon: Users,
      badge: 'Collaborative Learning',
      description: 'Capacity-aware booking supports shared slots for students learning the same subject.',
      image: IMAGES.learningGroupSessions,
      imageAlt: 'Small group of Indian students learning together online',
      benefits: [
        'Cost-effective micro batches (max 4-6 students)',
        'Peer problem-solving and healthy motivation',
        'Fixed weekly schedules & structured milestones',
        'Active classroom interaction & discussion',
      ],
      ctaText: 'Join Group Batch',
      onAction: () => onOpenFindTutor('Group'),
    },
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full">
            Flexible Delivery Models
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Built for personal tutoring, courses, and group learning
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Choose the learning environment that best matches your learning style, preparation goals, and schedule.
          </p>
        </div>

        {/* 3 Distinct Visual Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                id={`learning-option-${option.id}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Large Photograph */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={option.image}
                    alt={option.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 backdrop-blur-md shadow-sm">
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                      <span>{option.badge}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {option.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {option.description}
                    </p>

                    <div className="pt-2 space-y-2">
                      {option.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      id={`learning-cta-${option.id}`}
                      onClick={option.onAction}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-700 text-white font-semibold text-xs transition-colors group-hover:shadow-md"
                    >
                      <span>{option.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
