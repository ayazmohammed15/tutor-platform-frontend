import React, { useState } from 'react';
import { X, PhoneCall, CheckCircle2, Calendar, Clock, User, Sparkles } from 'lucide-react';

export const ConsultationModal = ({
  isOpen,
  onClose
}) => {
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [targetExam, setTargetExam] = useState('JEE Main 2027');
  const [preferredTime, setPreferredTime] = useState('Evening (5 PM - 8 PM)');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!parentName || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Book Free Academic Consultation
              </h3>
              <p className="text-xs text-slate-500">
                15-min 1-on-1 guidance with our Senior Academic Counselor
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                What we will cover in this call:
              </span>
              <p className="text-[11px] text-slate-600">
                • Target exam roadmap (JEE / NEET / Foundation)<br />
                • Matching verified subject tutors to your child’s learning style<br />
                • Scheduling flexibility and syllabus timeline
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Parent / Student Full Name *
              </label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Ramesh Kumar / Ananya Sharma"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Mobile Number (for SMS & Call) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Target Exam Goal
                </label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700"
                >
                  <option value="JEE Main 2026">JEE Main 2026</option>
                  <option value="JEE Main 2027">JEE Main 2027</option>
                  <option value="NEET 2026">NEET Medical 2026</option>
                  <option value="NEET 2027">NEET Medical 2027</option>
                  <option value="IIT Foundation (Class 8-10)">IIT Foundation (Class 8-10)</option>
                  <option value="School CBSE/ICSE Board">School CBSE/ICSE Board</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Preferred Call Time
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700"
                >
                  <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                  <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                  <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md transition-all active:scale-[0.98]"
              >
                Schedule My Free Call
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-slate-900">
                Consultation Request Received!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you, <strong>{parentName}</strong>. Our senior academic counselor will call you during <strong>{preferredTime}</strong> at <strong>{phone}</strong>.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-left">
              <p className="font-semibold text-slate-800">Target Track: {targetExam}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">We will prepare custom tutor suggestions and syllabus maps before the call.</p>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md transition-colors"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
