import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  Bell,
  FileCheck,
  Mail,
  Scale
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Last Updated: August 2026 • Compliant with Digital Personal Data Protection Act (DPDP), 2023.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">

            {/* Commitment Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>Our Privacy Commitment to Students & Parents</span>
              </div>
              <p className="text-emerald-800 text-xs leading-relaxed">
                At <strong>ScienceEdu</strong>, we take the confidentiality of your personal information, academic data, and contact records with paramount seriousness. We never sell or monetize student data to advertisers.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">1</span>
                <span>Information We Collect</span>
              </h2>
              <p>
                We collect personal information to provide seamless tutor matching, session scheduling, and academic progress tracking:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Account Data:</strong> Student/Parent full name, email address, mobile phone number, grade level, and school curriculum (CBSE/ICSE/State Board).</li>
                <li><strong>Tutor Data:</strong> Educator qualifications, degree certificates, verified academic credentials, bank account details for payouts, and subject specializations.</li>
                <li><strong>Academic Records:</strong> Homework submissions, diagnostic quiz results, topic strengths and weaknesses, attendance records, and mentor feedback notes.</li>
                <li><strong>Technical & Session Data:</strong> IP address, device type, browser information, and Google Meet session connection timestamps to ensure class delivery.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">2</span>
                <span>How We Use Your Data</span>
              </h2>
              <p>Your data is used strictly to power educational workflows on ScienceEdu:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="font-semibold text-slate-800 mb-1">📅 Automated Class Scheduling</div>
                  <div className="text-xs text-slate-500">Generating Google Calendar invites, Google Meet links, and automated SMS/WhatsApp reminders.</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="font-semibold text-slate-800 mb-1">📊 Academic Growth Analytics</div>
                  <div className="text-xs text-slate-500">Compiling progress reports, quiz performance tracking, and syllabus completion milestones for parents.</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="font-semibold text-slate-800 mb-1">💳 Billing & Invoicing</div>
                  <div className="text-xs text-slate-500">Processing secure transactions, issuing GST invoices, and disbursing tutor earnings.</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="font-semibold text-slate-800 mb-1">🛡️ Quality & Safety Oversight</div>
                  <div className="text-xs text-slate-500">Monitoring tutor credential authenticity and ensuring classroom safety standards for minors.</div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">3</span>
                <span>Protection of Minor & Student Information</span>
              </h2>
              <p>
                ScienceEdu prioritizes the security of students under 18 years old. We do not publicly display minor contact information, phone numbers, or residential addresses on public tutor directories. Only assigned, verified tutors are granted access to essential academic context necessary to teach scheduled classes.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">4</span>
                <span>Data Storage & Security Standards</span>
              </h2>
              <p>
                All data transmission between your browser and ScienceEdu is protected using <strong>256-bit SSL encryption (HTTPS)</strong>. Our databases are hosted in ISO 27001-certified Indian data centers with multi-layered role-based access control, periodic vulnerability assessments, and automated backups.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">5</span>
                <span>Your Data Rights</span>
              </h2>
              <p>
                Under applicable Indian data privacy regulations, you hold the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Access and download a summary of all your stored academic and profile data.</li>
                <li>Request rectification of inaccurate personal or contact records.</li>
                <li>Withdraw consent and request complete deletion of your student account.</li>
                <li>Opt out of non-essential email notifications and marketing communications.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="border-t border-slate-200 pt-6 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">
                Data Protection Officer (DPO) Contact
              </h3>
              <p className="text-slate-600">
                To exercise any of your data rights or report a privacy concern, please contact our Data Protection Officer:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="font-semibold text-slate-800">DPO — ScienceEdu Technologies</div>
                <div>Email: privacy@scienceedu.in</div>
                <div>Direct Line: +91 80 4920 1105</div>
                <div>Address: Level 4, ScienceEdu Tech Center, 100 Feet Road, Koramangala, Bengaluru 560034</div>
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
