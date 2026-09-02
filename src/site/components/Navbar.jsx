import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { ScienceEduLogo } from './ScienceEduLogo';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const targetId = id || 'home';
    const triggerScroll = () => {
      const element = document.getElementById(targetId);
      if (!element) return;

      const headerOffset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(triggerScroll, 180);
      return;
    }

    triggerScroll();
  };

  const navItems = [
    { label: 'Home', path: '/', targetId: 'home' },
    { label: 'Courses', path: '/courses' },
    { label: 'About Us', path: '/about' },
    { label: 'Tutors', targetId: 'tutors' },
    { label: 'Why ScienceEdu', targetId: 'why-science-edu' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', targetId: 'faq-section' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={(event) => {
              event.preventDefault();
              if (location.pathname === '/') {
                scrollToSection('home');
              } else {
                navigate('/');
                setTimeout(() => scrollToSection('home'), 180);
              }
            }}
            className="flex items-center group cursor-pointer shrink-0"
            id="nav-brand-logo"
          >
            <ScienceEduLogo size="md" />
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              item.path ? (
                <Link
                  key={item.label}
                  to={item.path}
                  className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-slate-50 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  id={`nav-${item.targetId}-btn`}
                  onClick={() => item.targetId && scrollToSection(item.targetId)}
                  className="px-3 py-2 rounded-lg hover:text-blue-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              id="nav-login-btn"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </Link>

            <Link
              to="/register"
              id="nav-register-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </Link>

            <div className="flex md:hidden items-center ml-1">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen((value) => !value)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-slate-200 bg-white shadow-xl"
          >
            <div className="px-4 py-4 flex flex-col space-y-1">
              {navItems.map((item) => (
                item.path ? (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => item.targetId && scrollToSection(item.targetId)}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {item.label}
                  </button>
                )
              ))}

              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors shadow-xs"
                >
                  Create Student Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
