import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  ShieldCheck,
  Bell,
  MapPin,
  Sparkles
} from 'lucide-react';
import { ScienceEduLogo } from './ScienceEduLogo';

export const Footer = ({
  onOpenFindTutor,
  onOpenAuth,
  onOpenConsultation,
  onOpenCourse
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">

          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group">
              <ScienceEduLogo size="md" variant="dark" showBadge={false} />
            </Link>

            <p className="text-slate-300 leading-relaxed text-xs pr-4">
              A tutor booking and learning platform for verified tutors, smart scheduling, online payments, structured courses, and live online classes.
            </p>

            <div className="pt-2 space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11.5px] text-slate-300">Govt. Registered Academic Mentorship Entity</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-[11.5px]">support@scienceedu.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Platform Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  JEE Preparation
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  NEET Preparation
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  IIT Foundation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Account (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Account
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Create Student Account
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors text-blue-400 font-semibold">
                  Tutor Registration
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & Policies (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Policies & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-white transition-colors text-emerald-400">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Help & Support Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Stay Connected & Notifications (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
              Stay Connected
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Platform emails keep students and tutors updated about requests, approvals, payments, and session confirmations.
            </p>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold text-[11px]">
                <Bell className="w-3.5 h-3.5" />
                <span>Automated notifications</span>
              </div>
              <p className="text-[10px] text-slate-500">
                Direct SMS, WhatsApp & Google Calendar sync.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>
            Copyright © 2026 ScienceEdu. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link to="/refund" className="hover:text-slate-300 transition-colors">Refunds</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <span>256-bit SSL Encrypted</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
