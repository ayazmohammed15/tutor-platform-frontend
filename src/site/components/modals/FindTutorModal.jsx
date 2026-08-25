import React, { useState } from 'react';
import {
  X,
  Search,
  Filter,
  Star,
  ShieldCheck,
  Clock,
  Calendar,
  ArrowRight,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { TUTORS_DATA } from '../../data/content';

export const FindTutorModal = ({
  isOpen,
  onClose,
  onSelectTutor,
  initialQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedExam, setSelectedExam] = useState('All');

  if (!isOpen) return null;

  const filteredTutors = TUTORS_DATA.filter((tutor) => {
    const matchesQuery = !searchQuery.trim() ||
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject = selectedSubject === 'All' || tutor.subject.toLowerCase().includes(selectedSubject.toLowerCase());

    const matchesExam = selectedExam === 'All' || tutor.examFocus.some(f => f.toLowerCase().includes(selectedExam.toLowerCase()));

    return matchesQuery && matchesSubject && matchesExam;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="text-xl font-semibold text-slate-900">
                Find Verified Tutors
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Browse academic profiles, review hourly fees, and book live Google Meet sessions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-white grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, topic, mechanics, calculus..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700"
          >
            <option value="All">All Subjects (Physics, Math, Bio, Chem)</option>
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology (Botany & Zoology)</option>
            <option value="Chemistry">Chemistry (Organic, Physical)</option>
          </select>

          {/* Exam Focus Filter */}
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700"
          >
            <option value="All">All Target Exams</option>
            <option value="JEE">JEE Main Focus</option>
            <option value="NEET">NEET Medical Focus</option>
            <option value="Foundation">IIT Foundation (Class 7-10)</option>
            <option value="School">School CBSE/ICSE</option>
          </select>
        </div>

        {/* Tutor Cards List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
          {filteredTutors.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-slate-500 text-sm">No verified tutors matched your filter criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubject('All');
                  setSelectedExam('All');
                }}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">
                          {tutor.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{tutor.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {tutor.title}
                      </p>

                      <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1">
                        <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                          {tutor.subject}
                        </span>
                        <span>•</span>
                        <span>{tutor.experience}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {tutor.bio}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {tutor.examFocus.map((f, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Session Fee</span>
                      <span className="text-sm font-extrabold text-blue-900">{tutor.hourlyRate}</span>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectTutor(tutor);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-xs transition-colors"
                    >
                      <span>Book Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-600 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            Showing {filteredTutors.length} verified educators
          </span>
          <span className="text-slate-500 text-[11px]">
            Google Meet links generated automatically upon booking
          </span>
        </div>

      </div>
    </div>
  );
};
