import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  Filter,
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Award,
  Video,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
// import { COURSES_DATA } from '../data/content';
import { tutorService } from '../../services/tutorService';
import { IMAGES } from '../data/images';
import { ConsultationModal } from '../components/modals/ConsultationModal';

export const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const response = await tutorService.getCourses();

        setCourses(response || []);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  const categories = [
    'All',
    ...new Set(
      courses
        .map((course) => course.course_type)
        .filter(Boolean)
    )
  ];
  const getCourseImage = (courseName) => {
    const name = courseName?.toLowerCase() || '';

    if (name.includes('neet')) {
      return IMAGES.examNeetPrep;
    }

    if (name.includes('jee')) {
      return IMAGES.examJeePrep;
    }

    if (name.includes('foundation')) {
      return IMAGES.examIitFoundation;
    }

    return IMAGES.examIitFoundation;
  };
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        course.course_type === selectedCategory;

      const matchesSearch =
        course.course_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        course.slug
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [courses, searchQuery, selectedCategory]);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">

        {/* Top Hero Banner */}
        <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Structured Syllabi & Mentorship</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Explore Academic Programs & Entrance Courses
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Designed by experienced educators to bridge the school syllabus with competitive entrance exams like JEE Main, JEE Advanced, NEET, and Science Olympiads.
            </p>
          </div>
        </section>

        {/* Filter & Search Bar Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, subjects, mentors..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${selectedCategory === cat
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  {cat === 'All' ? 'All Programs' : cat}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Course Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Available Courses ({filteredCourses.length})
            </h2>
            {/* <button
              onClick={() => setConsultationOpen(true)}
              className="text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline flex items-center gap-1"
            >
              <span>Need help choosing? Request Free Counseling</span>
              <ChevronRight className="w-4 h-4" />
            </button> */}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No courses match your search</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                Try clearing your search query or selecting a different category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-xl bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Card Header & Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={getCourseImage(course.course_name)}
                      alt={course.course_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-900/90 text-blue-100 backdrop-blur-sm shadow-xs">
                        {course.course_type}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">

                      <div className="flex items-center justify-between">
                        <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 text-[11px] font-semibold uppercase">
                          {course.course_type}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {course.course_name}
                      </h3>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* Free Academic Consultation Banner */}
        {/* <section className="bg-slate-900 text-white py-14 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Personalized Study Path</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Unsure which batch or 1-on-1 mentor matches your goal?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Schedule a 15-minute diagnostic call with our senior academic counselors. We will assess your syllabus coverage and recommend the best roadmap.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setConsultationOpen(true)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                Schedule Free Academic Consultation
              </button>
            </div>
          </div>
        </section> */}

      </main>

      <Footer
        onOpenFindTutor={() => { }}
        onOpenAuth={() => { }}
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenCourse={() => { }}
      />

      {/* Modals */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />

    </div>
  );
};
