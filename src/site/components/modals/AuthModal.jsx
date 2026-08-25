import React, { useState } from 'react';
import { X, GraduationCap, ShieldCheck, User, Briefcase, Lock, Mail, ArrowRight } from 'lucide-react';

export const AuthModal = ({
  isOpen,
  onClose,
  initialRole = 'student',
  initialMode = 'signin'
}) => {
  const [authMode, setAuthMode] = useState(initialMode);
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [subjectOrClass, setSubjectOrClass] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in your email and password.');
      return;
    }
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">

        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {authMode === 'signin' ? 'Sign In to ScienceEdu' : 'Create ScienceEdu Account'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {authMode === 'signin' ? 'Access your classes & schedules' : 'Join verified Indian learning network'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSuccess(false);
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            {/* Role Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    role === 'student' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('tutor')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    role === 'tutor' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tutor
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    role === 'admin' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* If Register Mode */}
            {authMode === 'register' && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {role === 'tutor' ? 'Primary Teaching Subject *' : 'Target Exam / Class *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={subjectOrClass}
                    onChange={(e) => setSubjectOrClass(e.target.value)}
                    placeholder={role === 'tutor' ? 'e.g. Physics (JEE / NEET)' : 'e.g. Class 11 JEE 2027'}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs shadow-md transition-all active:scale-[0.98]"
              >
                {authMode === 'signin' ? `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}` : 'Create Account'}
              </button>
            </div>

            {/* Toggle Mode */}
            <div className="text-center pt-2 text-xs text-slate-500">
              {authMode === 'signin' ? (
                <p>
                  New to ScienceEdu?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="font-bold text-blue-700 hover:underline"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    className="font-bold text-blue-700 hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>

          </form>
        ) : (
          <div className="p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Welcome to ScienceEdu!
            </h3>
            <p className="text-xs text-slate-600">
              Authenticated successfully as <strong>{email}</strong> ({role}). Your personalized dashboard has been loaded.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-700 text-white font-semibold text-xs"
            >
              Continue to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
