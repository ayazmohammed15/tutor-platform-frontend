import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  CreditCard,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const BookTutorSlotModal = ({
  tutor,
  onClose
}) => {
  const [selectedDay, setSelectedDay] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('6:00 PM');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('Class 11 (JEE 2027)');
  const [topicNotes, setTopicNotes] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!tutor) return null;

  const daysList = [
    { label: 'Tomorrow', date: 'Saturday, 22 Aug' },
    { label: 'Sunday', date: '23 Aug' },
    { label: 'Monday', date: '24 Aug' },
    { label: 'Tuesday', date: '25 Aug' },
  ];

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert('Please enter student name.');
      return;
    }
    setIsConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden">

        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <img
              src={tutor.image}
              alt={tutor.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900">{tutor.name}</h3>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-xs text-slate-500">{tutor.subject} • {tutor.hourlyRate}</p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsConfirmed(false);
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isConfirmed ? (
          <form onSubmit={handleConfirmBooking} className="p-6 space-y-6">

            {/* Step 1: Select Day */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                1. Select Date
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {daysList.map((d) => (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => setSelectedDay(d.label)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      selectedDay === d.label
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600 font-medium'
                    }`}
                  >
                    <span className="block text-xs">{d.label}</span>
                    <span className="block text-[10px] text-slate-400 font-normal">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Time Slot */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                2. Select Available Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {tutor.slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      selectedSlot === slot
                        ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Student Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                3. Student & Topic Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Student full name *"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700"
                  >
                    <option value="Class 8 (Foundation)">Class 8 (IIT Foundation)</option>
                    <option value="Class 9 (Foundation)">Class 9 (IIT Foundation)</option>
                    <option value="Class 10 (Board + Foundation)">Class 10 (Foundation)</option>
                    <option value="Class 11 (JEE 2027)">Class 11 (JEE 2027)</option>
                    <option value="Class 12 (JEE 2026)">Class 12 (JEE 2026)</option>
                    <option value="Class 11 (NEET 2027)">Class 11 (NEET 2027)</option>
                    <option value="Class 12 (NEET 2026)">Class 12 (NEET 2026)</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={topicNotes}
                  onChange={(e) => setTopicNotes(e.target.value)}
                  placeholder="Specific chapter or doubt focus (e.g. Kinematics numericals, Organic reaction mechanisms)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Fee summary & CTA */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block">Total for 1-Hour Live Class</span>
                <span className="text-base font-extrabold text-blue-900">{tutor.hourlyRate}</span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md transition-all active:scale-[0.98]"
              >
                <CreditCard className="w-4 h-4" />
                <span>Confirm & Reserve Slot</span>
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-semibold text-slate-900">
                Session Confirmed!
              </h3>
              <p className="text-xs text-slate-500">
                Your live 1-on-1 tutoring class has been scheduled with {tutor.name}.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500 font-medium">Student</span>
                <span className="font-bold text-slate-900">{studentName || 'Student'} ({studentClass})</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500 font-medium">Date & Time</span>
                <span className="font-bold text-slate-900">{selectedDay} • {selectedSlot} IST</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500 font-medium">Classroom Link</span>
                <span className="font-mono font-bold text-blue-700">meet.google.com/sci-edu-live</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Notification</span>
                <span className="text-emerald-700 font-semibold">SMS & Calendar Invite Dispatched</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsConfirmed(false);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md transition-colors"
            >
              Done & Return to Homepage
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
