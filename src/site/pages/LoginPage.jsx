import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Lock,
  Mail,
  AlertCircle
} from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your email or mobile number');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 font-sans">

      {/* Top Header Navigation */}
      <header className="w-full bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-blue-100" />
            </div>
            <span className="font-semibold text-lg text-slate-900 tracking-tight">
              Science<span className="text-blue-600">Edu</span>
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-8 sm:py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 relative overflow-hidden">

          <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-700" />

          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Welcome back!
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Signing you into your ScienceEdu learning dashboard...
                </p>
              </div>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider border border-blue-100">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Student Sign In</span>
                </div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-xs sm:text-sm text-slate-600">
                  Sign in to access your courses, live classes, and mentor sessions.
                </p>
              </div>

              {error && (
                <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" id="student-login-form">

                <div>
                  <label
                    htmlFor="identifier"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Email or Mobile Number*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="identifier"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="name@example.com or +91 98765..."
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm focus:outline-none bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="loginPassword"
                      className="block text-xs font-semibold text-slate-700"
                    >
                      Password*
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset instructions sent to your registered contact.')}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="loginPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm focus:outline-none bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-600"
                    />
                    <span className="text-xs text-slate-600 font-medium">Keep me signed in on this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  id="sign-in-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-700/20 hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Signing In...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <div className="pt-3 text-center border-t border-slate-100">
                  <p className="text-xs sm:text-sm text-slate-600">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      id="create-account-link"
                      className="font-semibold text-blue-700 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      Create Student Account
                    </Link>
                  </p>
                </div>

              </form>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        <p>© 2026 ScienceEdu Online Tutoring & Competitive Learning. All rights reserved.</p>
      </footer>

    </div>
  );
};
