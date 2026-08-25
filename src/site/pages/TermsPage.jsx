import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  CreditCard,
  Video,
  Scale,
  Mail,
  ArrowLeft
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>Legal & Governance</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Last Updated: August 2026 • Effective for all ScienceEdu students, parents, and educator accounts.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">

            {/* Summary Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Overview & Acceptance</span>
              </div>
              <p className="text-blue-800 text-xs leading-relaxed">
                By accessing, registering an account on, or purchasing services through <strong>ScienceEdu</strong>, you agree to be bound by these Terms and Conditions. Please review them carefully. If you do not agree, please discontinue using the platform.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">1</span>
                <span>User Accounts & Eligibility</span>
              </h2>
              <p>
                <strong>1.1 Student & Minor Accounts:</strong> Students under the age of 18 must have the consent and supervision of a parent or legal guardian to register, book paid sessions, and attend online tutoring classes.
              </p>
              <p>
                <strong>1.2 Account Security:</strong> You are solely responsible for safeguarding the credentials associated with your ScienceEdu account. Any activity conducted under your credentials will be treated as authorized by you.
              </p>
              <p>
                <strong>1.3 Tutor Verification:</strong> Educators registering on ScienceEdu must provide authentic academic credentials, government identification, and degree certificates. ScienceEdu reserves the right to suspend or terminate accounts providing fraudulent information.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">2</span>
                <span>Live Tutoring Sessions & Google Meet Conduct</span>
              </h2>
              <p>
                <strong>2.1 Class Delivery:</strong> All live tutoring sessions are hosted via Google Meet integrations. Upon session confirmation, a unique link and calendar invite are issued to the student and tutor dashboards.
              </p>
              <p>
                <strong>2.2 Punctuality:</strong> Both students and tutors are expected to join the virtual classroom within 5 minutes of the scheduled start time.
              </p>
              <p>
                <strong>2.3 Code of Conduct:</strong> Respectful and professional decorum is strictly enforced. Any form of harassment, abusive language, discrimination, or inappropriate behavior during live sessions will result in immediate termination of account access without refund.
              </p>
              <p>
                <strong>2.4 Recordings:</strong> Classes may be recorded for academic quality assurance and review with prior participant notice. Unsanctioned distribution or commercial sale of classroom recordings is strictly prohibited.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">3</span>
                <span>Fees, Payments & Digital Invoicing</span>
              </h2>
              <p>
                <strong>3.1 Pricing Transparency:</strong> All session fees, hourly tutor rates, and structured course fees are displayed in Indian Rupees (INR) inclusive of applicable taxes.
              </p>
              <p>
                <strong>3.2 Payment Gateway:</strong> Payments are processed through RBI-authorized payment aggregators (UPI, Net Banking, Credit/Debit Cards). ScienceEdu does not store sensitive credit card or banking PIN numbers on its servers.
              </p>
              <p>
                <strong>3.3 Digital Invoices:</strong> Instant automated invoices and payment receipts are generated upon successful transactions and remain accessible in the student dashboard.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">4</span>
                <span>Cancellations, Rescheduling & Refunds</span>
              </h2>
              <p>
                <strong>4.1 Rescheduling Window:</strong> Students or tutors may reschedule a session free of charge up to <strong>4 hours</strong> prior to the scheduled session time.
              </p>
              <p>
                <strong>4.2 Tutor Unavailability:</strong> In the rare event an educator is unable to attend, the student is entitled to an immediate full refund or a complimentary rescheduled session with an equivalent expert mentor.
              </p>
              <p>
                For complete details on cancellation terms and multi-session package refunds, please refer to our dedicated <Link to="/refund" className="text-blue-700 font-semibold underline">Refund & Cancellation Policy</Link>.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">5</span>
                <span>Intellectual Property & Study Material</span>
              </h2>
              <p>
                All curriculum notes, mock test papers, video lectures, diagrams, algorithms, and visual interfaces provided on ScienceEdu are the exclusive intellectual property of ScienceEdu or its licensed educators. They are provided solely for personal, non-commercial educational use by the enrolled student.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">6</span>
                <span>Limitation of Liability & Jurisdiction</span>
              </h2>
              <p>
                ScienceEdu strives to deliver premier educational mentorship. However, exam performance and rank achievements depend on individual student dedication and practice. ScienceEdu shall not be held liable for any indirect or consequential damages. Any legal disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts in <strong>Bengaluru, Karnataka, India</strong>.
              </p>
            </div>

            {/* Section 7 */}
            <div className="border-t border-slate-200 pt-6 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">
                Contact Legal & Compliance
              </h3>
              <p className="text-slate-600">
                For questions regarding these Terms & Conditions, please contact us at:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="font-semibold text-slate-800">ScienceEdu Legal Department</div>
                <div>Email: legal@scienceedu.in</div>
                <div>Address: Level 4, ScienceEdu Tech Center, 100 Feet Road, Koramangala, Bengaluru, Karnataka 560034</div>
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
