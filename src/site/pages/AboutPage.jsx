import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ShieldCheck,
  Target,
  Award,
  Users,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  Building2,
  PhoneCall
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { IMAGES } from '../data/images';

export const AboutPage = () => {
  const leadership = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Head of Academic Curriculum (Ex-IIT Delhi)',
      bio: 'Over 12 years of high-tier physics instruction and competitive syllabus design for premier engineering institutions.',
      image: IMAGES.tutor1,
    },
    {
      name: 'Prof. Rajesh Varma',
      role: 'Mathematics Pedagogy Lead',
      bio: 'Author and master educator who has mentored more than 15,000 students in higher secondary mathematics and Olympiads.',
      image: IMAGES.tutor2,
    },
    {
      name: 'Dr. Ananya Iyer',
      role: 'Director of Medical Entrance Sciences',
      bio: 'MBBS graduate from Grant Medical College Mumbai with a deep commitment to high-yield NCERT biology pedagogy.',
      image: IMAGES.tutor3,
    },
  ];

  const milestones = [
    { number: '15,000+', label: 'Live Classes Conducted' },
    { number: '98.4%', label: 'Parent Satisfaction Rate' },
    { number: '250+', label: 'Verified Subject Mentors' },
    { number: '4.9 / 5', label: 'Average Session Rating' },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'Vetted & Verified Mentors',
      desc: 'Only the top 4% of educator applicants clear our rigorous 4-step credential check, teaching demo, and background verification.',
    },
    {
      icon: Target,
      title: 'Outcome-Oriented Pedagogy',
      desc: 'We replace rote memorization with fundamental conceptual clarity, rigorous numerical practice, and systematic error analysis.',
    },
    {
      icon: HeartHandshake,
      title: 'Parent-Tutor Transparency',
      desc: 'Real-time session updates, shared Google Calendar schedules, and detailed progress reports after every completed module.',
    },
    {
      icon: Lightbulb,
      title: 'Modern Learning Technology',
      desc: 'Seamless Google Meet HD classes, integrated digital whiteboards, automated homework tracking, and instant slot booking.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>About ScienceEdu</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
              Empowering India’s Future Scientists, Engineers & Doctors
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              ScienceEdu was founded with a singular mission: to make top-tier 1-on-1 and micro-batch academic mentoring accessible, transparent, and structured for every aspiring student in India.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {/* <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition-all inline-flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Talk to Academic Advisor</span>
              </Link> */}
            </div>
          </div>
        </section>

        {/* Milestones Ribbon */}
        <section className="bg-blue-700 text-white py-8 border-y border-blue-600 shadow-inner">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {milestones.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                    {item.number}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-100 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Story */}
        <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100 uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  <span>Our Mission</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  Bridging the gap between school curriculum and competitive excellence
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Too often, students entering Class 11 face an overwhelming gap between rote school examinations and analytical competitive tests like JEE and NEET. ScienceEdu bridges this divide through disciplined foundation courses in Classes 7–10 and targeted mentorship in Classes 11–12.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700">
                      <strong>Personalized Attention:</strong> 1-on-1 pacing tailored to each student’s strong and weak chapters.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700">
                      <strong>IIT & Medical Mentors:</strong> Learn problem-solving frameworks directly from educators with proven rank records.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700">
                      <strong>Zero Hidden Fees:</strong> Complete transparency in session fees, flexible scheduling, and instant refunds for cancellations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white p-2">
                  <img
                    src={IMAGES.roleStudent}
                    alt="Students engaged in online mentorship"
                    className="w-full h-80 sm:h-96 object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 max-w-xs hidden sm:flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">National Excellence</div>
                    <div className="text-xs text-slate-500">Rank-oriented test series & personalized mentorship</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Our Core Principles
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                Every feature, teacher qualification standard, and syllabus framework is built around these non-negotiable standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const IconComponent = v.icon;
                return (
                  <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:shadow-md transition-shadow space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Academic Leadership Board */}
        <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100 uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Academic Board</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Led by Seasoned Educators
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                Our faculty leadership team reviews every curriculum path, mock question bank, and tutor onboarding submission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="h-64 overflow-hidden bg-slate-100">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-bold text-slate-900 text-lg">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-700">
                      {leader.role}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-slate-900 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to experience structured science & math mentoring?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Book a 1-on-1 session with a verified educator or speak with our academic counselors today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/courses"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
              >
                Browse All Courses
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm transition-all"
              >
                Create Student Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer
        onOpenFindTutor={() => {}}
        onOpenAuth={() => {}}
        onOpenConsultation={() => {}}
        onOpenCourse={() => {}}
      />
    </div>
  );
};
