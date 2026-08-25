import { ArrowLeft, BookOpen, Home, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ScienceEduLogo } from "../site/components/ScienceEduLogo";

const dashboardDestinations = {
  admin: { to: "/admin/dashboard", label: "Back to Admin Dashboard" },
  student: { to: "/student/dashboard", label: "Back to Student Dashboard" },
  tutor: { to: "/tutor/dashboard", label: "Back to Tutor Dashboard" },
};

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const destination = dashboardDestinations[user?.role] || { to: "/", label: "Back to Home" };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/60 to-sky-100/70 px-5 py-12 text-center">
      <div className="pointer-events-none absolute left-[8%] top-[15%] h-48 w-48 rounded-full border border-blue-200/70" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-sky-200/45 blur-3xl" aria-hidden="true" />

      <section className="relative w-full max-w-3xl animate-hero-fade">
        <Link to="/" className="mx-auto inline-flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 shadow-sm ring-1 ring-blue-100 transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-200">
          <ScienceEduLogo />
        </Link>

        <div className="relative mx-auto mt-10 flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40" aria-hidden="true">
          <div className="absolute inset-0 rounded-full border-[10px] border-white/90 shadow-[0_18px_48px_rgba(37,99,235,0.16)]" />
          <div className="absolute inset-3 rounded-full bg-blue-100" />
          <BookOpen className="relative h-12 w-12 text-blue-600 sm:h-14 sm:w-14" />
          <span className="absolute -right-3 top-2 h-4 w-4 rounded-full bg-sky-400" />
          <span className="absolute -bottom-2 left-2 h-3 w-3 rounded-full bg-blue-500" />
        </div>

        <p className="mt-8 text-7xl font-black leading-none tracking-[-0.08em] text-blue-600 sm:text-9xl">404</p>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">This page may have moved, been renamed, or taken a study break. Your account remains signed in and ready to continue.</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to={destination.to} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200">
            {user ? <LayoutDashboard className="h-4 w-4" aria-hidden="true" /> : <Home className="h-4 w-4" aria-hidden="true" />}
            {destination.label}
          </Link>
          <button type="button" onClick={() => navigate(-1)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white/80 px-5 py-3 text-sm font-bold text-blue-700 transition duration-200 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Go Back
          </button>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
