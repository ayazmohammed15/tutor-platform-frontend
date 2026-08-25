import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { TrustStrip } from '../components/TrustStrip';
import { ExamPreparation } from '../components/ExamPreparation';
import { WhyScienceEdu } from '../components/WhyScienceEdu';
import { LearningOptions } from '../components/LearningOptions';
import { HowItWorks } from '../components/HowItWorks';
import { PlatformSaaSSection } from '../components/PlatformSaaSSection';
import { RoleBasedPlatform } from '../components/RoleBasedPlatform';
import { TutorSection } from '../components/TutorSection';
import { StudentStories } from '../components/StudentStories';
import { ParentTrustSection } from '../components/ParentTrustSection';
import { StatisticsSection } from '../components/StatisticsSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { Footer } from '../components/Footer';

// Modals
import { FindTutorModal } from '../components/modals/FindTutorModal';
import { BookTutorSlotModal } from '../components/modals/BookTutorSlotModal';
import { ConsultationModal } from '../components/modals/ConsultationModal';
import { AuthModal } from '../components/modals/AuthModal';

export function HomePage() {
  const navigate = useNavigate();

  // Modal states
  const [findTutorOpen, setFindTutorOpen] = useState(false);
  const [findTutorInitialQuery, setFindTutorInitialQuery] = useState('');

  const [selectedTutorForBooking, setSelectedTutorForBooking] = useState(null);

  const [consultationOpen, setConsultationOpen] = useState(false);

  const [authOpen, setAuthOpen] = useState(false);
  const [authInitialRole, setAuthInitialRole] = useState('student');
  const [authInitialMode, setAuthInitialMode] = useState('signin');

  // Modal Handlers
  const handleOpenFindTutor = (query) => {
    setFindTutorInitialQuery(query || '');
    setFindTutorOpen(true);
  };

  const handleOpenConsultation = () => {
    setConsultationOpen(true);
  };

  const handleOpenAuth = (roleOrMode) => {
    if (roleOrMode === 'signin' || roleOrMode === 'register') {
      setAuthInitialMode(roleOrMode);
      setAuthInitialRole('student');
    } else if (roleOrMode === 'tutor' || roleOrMode === 'admin' || roleOrMode === 'student') {
      setAuthInitialRole(roleOrMode);
      setAuthInitialMode('register');
    } else {
      setAuthInitialMode('signin');
      setAuthInitialRole('student');
    }
    setAuthOpen(true);
  };

  const handleOpenCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const handleSelectTutor = (tutor) => {
    setSelectedTutorForBooking(tutor);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenFindTutor={handleOpenFindTutor}
        onOpenConsultation={handleOpenConsultation}
        onOpenAuth={handleOpenAuth}
        onOpenCourse={handleOpenCourse}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection
          onFindTutorClick={() => handleOpenFindTutor()}
          onExploreCoursesClick={() => {
            const el = document.getElementById('courses');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 2. Trust Strip */}
        <TrustStrip />

        {/* 3. Exam Preparation Section (IIT Foundation, JEE, NEET) */}
        <div id="jee-section">
          <div id="neet-section">
            <ExamPreparation
              onSelectCourse={handleOpenCourse}
              onOpenFindTutor={handleOpenFindTutor}
            />
          </div>
        </div>

        {/* 4. Why ScienceEdu Editorial Section */}
        <div id="why-section">
          <WhyScienceEdu />
        </div>

        {/* 5. Learning Options (1-on-1, Structured Courses, Group Batches) */}
        <LearningOptions
          onOpenFindTutor={handleOpenFindTutor}
          onExploreCourses={() => {
            const el = document.getElementById('courses');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. How It Works 4-Step Interactive Timeline */}
        <HowItWorks
          onStartBooking={() => handleOpenFindTutor()}
        />

        {/* 7. Product / SaaS Platform Dashboard Showcase */}
        <PlatformSaaSSection />

        {/* 8. Role-Based Platform (Students, Tutors) */}
        <RoleBasedPlatform
          onOpenAuth={handleOpenAuth}
          onOpenFindTutor={() => handleOpenFindTutor()}
        />

        {/* 9. Tutor Section */}
        <TutorSection
          onSelectTutor={handleSelectTutor}
          onOpenAllTutorsModal={() => handleOpenFindTutor()}
        />

        {/* 10. Student Stories */}
        <StudentStories />

        {/* 11. Parent Trust Section */}
        <ParentTrustSection
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 12. Statistics / Verified Metrics */}
        <StatisticsSection />

        {/* 13. FAQ Accordion */}
        <FaqSection />

        {/* 14. Final Full-Width CTA */}
        <FinalCtaSection
          onFindTutor={() => handleOpenFindTutor()}
          onOpenConsultation={handleOpenConsultation}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenFindTutor={() => handleOpenFindTutor()}
        onOpenAuth={handleOpenAuth}
        onOpenConsultation={handleOpenConsultation}
        onOpenCourse={handleOpenCourse}
      />

      {/* Interactive Modals */}
      <FindTutorModal
        isOpen={findTutorOpen}
        onClose={() => setFindTutorOpen(false)}
        onSelectTutor={handleSelectTutor}
        initialQuery={findTutorInitialQuery}
      />

      <BookTutorSlotModal
        tutor={selectedTutorForBooking}
        onClose={() => setSelectedTutorForBooking(null)}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialRole={authInitialRole}
        initialMode={authInitialMode}
      />
    </div>
  );
}
