import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Menu,
  X,
  UserCheck,
  LogIn,
  UserPlus
} from 'lucide-react';
import { ScienceEduLogo } from './ScienceEduLogo';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
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

          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => scrollToSection('home')}
            className="flex items-center group cursor-pointer shrink-0"
            id="nav-brand-logo"
          >
            <ScienceEduLogo size="md" />
          </Link>

          {/* Simple Desktop Navigation Links */}
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

          {/* Right Action: Login / Sign Up Page Links */}
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

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center ml-1">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
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
        </div>
      )}
    </header>
  );
};
