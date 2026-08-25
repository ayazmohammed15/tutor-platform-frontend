import { Navbar } from '../site/components/Navbar';
import { Footer } from '../site/components/Footer';
import { HowItWorks as HowItWorksSection } from '../site/components/HowItWorks';
import { useNavigate } from 'react-router-dom';

// This page literally reuses the AYAZ HowItWorks section component's markup
// (site/components/HowItWorks.jsx) as its body, wrapped in the copied
// Navbar/Footer, since AYAZ has no standalone How It Works page of its own.
const HowItWorksPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <HowItWorksSection onStartBooking={() => navigate('/register')} />
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

export default HowItWorksPage;
