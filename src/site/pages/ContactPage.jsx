import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
  Building,
  HelpCircle,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: 'Student',
    subjectInterest: 'JEE Main Preparation',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `SE-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
    }, 800);
  };

  const offices = [
    {
      city: 'Bengaluru (Headquarters)',
      address: 'Level 4, ScienceEdu Tech Center, 100 Feet Road, Koramangala 4th Block, Bengaluru, Karnataka 560034',
      phone: '+91 80 4920 1100',
      email: 'bangalore@scienceedu.in',
      timing: 'Mon – Sat: 9:00 AM – 8:00 PM IST',
    },
    {
      city: 'Kota Academic Liaison Hub',
      address: 'Plot 18, Vigyan Nagar Academic Corridor, Near City Mall, Kota, Rajasthan 324005',
      phone: '+91 744 2980 450',
      email: 'kota@scienceedu.in',
      timing: 'Mon – Sun: 8:00 AM – 9:00 PM IST',
    },
    {
      city: 'New Delhi Mentorship Center',
      address: 'C-24, 2nd Floor, Ring Road, South Extension Part 1, New Delhi 110049',
      phone: '+91 11 4105 8820',
      email: 'delhi@scienceedu.in',
      timing: 'Mon – Sat: 9:30 AM – 7:30 PM IST',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Header Banner */}
        <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Headphones className="w-3.5 h-3.5 text-blue-400" />
              <span>We’re Here to Help</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Contact ScienceEdu Academic Support
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Have questions about enrolling in a course, booking a 1-on-1 tutor, tutor verification, or scheduling support? Our academic team responds within 2 hours.
            </p>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Toll-Free Helpline</h3>
                <p className="text-base font-bold text-slate-900">+91 98765 43210</p>
                <p className="text-xs text-slate-500">Mon - Sun, 8:00 AM - 10:00 PM IST</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Inquiries</h3>
                <p className="text-base font-bold text-slate-900">support@scienceedu.in</p>
                <p className="text-xs text-slate-500">2-hour guaranteed SLA response</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Student Desk</h3>
                <p className="text-base font-bold text-slate-900">+91 98765 43211</p>
                <p className="text-xs text-slate-500">Instant chat for class links & queries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Form & Office Info */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              {submittedTicket ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Message Received
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Your inquiry has been routed to our academic counseling team. Your reference ticket ID is:
                    </p>
                    <div className="inline-block bg-slate-100 text-slate-800 font-mono text-sm font-bold px-4 py-2 rounded-xl border border-slate-300">
                      {submittedTicket}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 pt-2">
                    An academic counselor will call you at <strong>{formData.phone}</strong> or reply to <strong>{formData.email}</strong> within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        userType: 'Student',
                        subjectInterest: 'JEE Main Preparation',
                        message: '',
                      });
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <div>
                  <div className="space-y-1 mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Send an Inquiry or Schedule a Callback
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Fill out the details below and an academic advisor will guide you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" id="contact-inquiry-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Your Full Name*
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rohan Verma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number (with WhatsApp)*
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="student@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          I am a...*
                        </label>
                        <select
                          value={formData.userType}
                          onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
                        >
                          <option value="Student">Student (Classes 7 to 12 / Dropper)</option>
                          <option value="Parent">Parent / Guardian</option>
                          <option value="Tutor">Educator / Tutor Applicant</option>
                          <option value="School">School / Coaching Partner</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Course or Exam Focus*
                      </label>
                      <select
                        value={formData.subjectInterest}
                        onChange={(e) => setFormData({ ...formData, subjectInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
                      >
                        <option value="IIT Foundation (Classes 7-10)">IIT Foundation (Classes 7-10 Math & Science)</option>
                        <option value="JEE Main & Advanced">JEE Main & Advanced (Physics, Chemistry, Maths)</option>
                        <option value="NEET Medical Entrance">NEET Medical Entrance (Biology, Physics, Chemistry)</option>
                        <option value="CBSE / ICSE Board Mentoring">CBSE / ICSE Class 10 & 12 Board Exam Prep</option>
                        <option value="1-on-1 Doubt Clearing">Custom 1-on-1 Doubt Clearing Session</option>
                        <option value="Tutor Onboarding Inquiry">Tutor Verification & Onboarding</option>
                        <option value="Billing / Refund Support">Billing / Payment / Refund Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        How can we help you? (Optional details)
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about specific chapters you want to master, current test scores, or your preferred timing for classes..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          <span>Routing to Academic Desk...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Inquiry & Request Free Callback</span>
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>We respect your privacy. No spam. 100% confidential.</span>
                    </p>
                  </form>
                </div>
              )}
            </div>

            {/* Office Locations & FAQ Links (5 cols) */}
            <div className="lg:col-span-5 space-y-6">

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Building className="w-5 h-5 text-blue-700" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Our Academic Centers
                  </h3>
                </div>

                <div className="space-y-5">
                  {offices.map((office, idx) => (
                    <div key={idx} className="space-y-1.5 text-xs">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{office.city}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed pl-5">
                        {office.address}
                      </p>
                      <div className="pl-5 pt-1 space-y-0.5 text-slate-500">
                        <div><strong>Phone:</strong> {office.phone}</div>
                        <div><strong>Email:</strong> {office.email}</div>
                        <div><strong>Hours:</strong> {office.timing}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick FAQ Card */}
              <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <HelpCircle className="w-4 h-4 text-blue-700" />
                  <span>Looking for Quick Answers?</span>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Learn about how class booking works, Google Meet integration, tutor verification criteria, and refund policies in our comprehensive FAQ section.
                </p>
                <Link
                  to="/#faq-section"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  <span>View Frequently Asked Questions</span>
                  <span>→</span>
                </Link>
              </div>

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
