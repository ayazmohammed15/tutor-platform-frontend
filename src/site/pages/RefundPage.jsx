import React from 'react';
import { Link } from 'react-router-dom';
import {
  RotateCcw,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  HelpCircle,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const RefundPage = () => {
  const policies = [
    {
      scenario: 'Student Reschedules > 4 Hours in Advance',
      outcome: '100% Free Rescheduling',
      details: 'Select any alternate open slot on the tutor’s live calendar at zero penalty.',
      status: 'No Fee',
    },
    {
      scenario: 'Student Cancels > 4 Hours in Advance',
      outcome: '100% Full Refund / Credit',
      details: 'Instant wallet balance credit or full refund to original bank/UPI account within 5–7 working days.',
      status: 'Full Refund',
    },
    {
      scenario: 'Tutor Cancels / No-Show Emergency',
      outcome: '100% Refund + Bonus Makeup',
      details: 'Full immediate refund plus optional priority reassignment with a senior faculty mentor.',
      status: 'Full Refund + Bonus',
    },
    {
      scenario: 'Student Cancels < 4 Hours / No-Show',
      outcome: 'Partial Fee Retention (50%)',
      details: 'Compensates the educator who held the dedicated slot exclusively for the student.',
      status: '50% Refund / Credit',
    },
    {
      scenario: 'Technical & Connectivity Disruptions (>15 mins)',
      outcome: 'Free Makeup Class',
      details: 'If Google Meet or server disruptions persist for >15 mins, a complimentary makeup session is scheduled.',
      status: 'Free Replacement',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
              <span>Customer Protection</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Refund & Cancellation Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Transparent, flexible policies ensuring peace of mind for every learning session.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">

            {/* Guarantee Highlight */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-5 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm">100% Student Satisfaction & Honor Policy</div>
                <p className="text-emerald-900 text-xs leading-relaxed">
                  We believe student schedules can change. ScienceEdu offers simple, single-click rescheduling and transparent cancellations directly from your student dashboard.
                </p>
              </div>
            </div>

            {/* Refund Matrix Table */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">1</span>
                <span>Session Cancellation & Rescheduling Matrix</span>
              </h2>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                      <th className="py-3 px-4">Situation / Event</th>
                      <th className="py-3 px-4">Policy Outcome</th>
                      <th className="py-3 px-4">Resolution Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {policies.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          {p.scenario}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <div className="font-medium text-slate-800">{p.outcome}</div>
                          <div className="text-[11px] text-slate-500">{p.details}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Course Package / Multi-Session Policy */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">2</span>
                <span>Structured Course & Multi-Session Bundles</span>
              </h2>
              <p>
                For multi-month structured courses (such as IIT Foundation, JEE Main, or NEET Comprehensive batches):
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>First-Week Guarantee:</strong> If after attending the first 2 classes you feel the batch pace does not suit your learning style, you may request a <strong>100% full pro-rated refund</strong> for all remaining sessions or switch batches at zero extra cost.</li>
                <li><strong>Pro-Rated Calculations:</strong> Cancellations made mid-course will be refunded pro-rata for all remaining unattended classes, calculated from the date of the formal cancellation request.</li>
              </ul>
            </div>

            {/* Refund Processing Timelines */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">3</span>
                <span>Processing Methods & SLA Timelines</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>ScienceEdu Wallet Credit</span>
                  </div>
                  <p className="text-[11.5px] text-slate-600">
                    <strong>Instant (0–5 minutes)</strong>. Can be immediately used to book another tutor or enroll in any program.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    <span>Original Payment Mode (UPI/Bank/Card)</span>
                  </div>
                  <p className="text-[11.5px] text-slate-600">
                    <strong>5 to 7 business days</strong> depending on your issuing bank’s standard clearing cycle.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Raise a Refund Claim */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">4</span>
                <span>How to Request a Refund</span>
              </h2>
              <p>
                To request a refund or dispute a session:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
                <li>Go to your <strong>Student Dashboard → My Sessions</strong>.</li>
                <li>Click <strong>Request Cancellation / Refund</strong> on the specific session card.</li>
                <li>Alternatively, send an email to <strong>refunds@scienceedu.in</strong> with your booking ID and registered mobile number.</li>
                <li>Our billing team will review and approve eligible requests within 24 hours.</li>
              </ol>
            </div>

            {/* Contact Box */}
            <div className="border-t border-slate-200 pt-6 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">
                Need Help With a Refund?
              </h3>
              <p className="text-slate-600">
                Our support team is available 7 days a week to assist with any billing queries:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-800">ScienceEdu Billing Desk</div>
                  <div className="text-slate-500">Email: refunds@scienceedu.in • Phone: +91 98765 43210</div>
                </div>
                <Link
                  to="/contact"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl text-xs inline-flex items-center gap-1.5"
                >
                  <span>Contact Support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
