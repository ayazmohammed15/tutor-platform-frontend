import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  GraduationCap,
  Search,
  ShieldCheck,
  Video,
} from "lucide-react";

const processSteps = [
  {
    icon: Search,
    title: "Find the right tutor",
    text: "Search approved tutors by subject, class, experience, fee, and availability.",
  },
  {
    icon: CalendarCheck,
    title: "Choose a slot",
    text: "Pick a tutor-defined time that fits your schedule and send the booking request.",
  },
  {
    icon: BadgeCheck,
    title: "Get confirmation",
    text: "The tutor accepts your request or suggests a better time before payment.",
  },
  {
    icon: Video,
    title: "Join live class",
    text: "After payment, receive the online class link and learn through Google Meet.",
  },
];

const highlights = [
  { icon: ShieldCheck, label: "Verified tutor profiles" },
  { icon: CalendarCheck, label: "Availability based booking" },
  { icon: CreditCard, label: "Secure online payments" },
];

const HowItWorks = () => {
  const navigate = useNavigate();
  const goToRegister = () => navigate("/register");

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <header className="sticky top-0 z-50 border-b border-blue-950/5 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-2.5 sm:px-8 lg:px-12 xl:px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/20">
              <GraduationCap className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-slate-950">
              Science<span className="text-blue-600">Edu</span>
            </span>
          </Link>

          <div className="hidden items-center gap-10 text-[15px] font-semibold text-slate-800 lg:flex">
            <Link to="/" className="transition hover:text-blue-600">
              Home
            </Link>
            <Link to="/how-it-works" className="relative text-blue-600">
              How it Works
              <span className="absolute -bottom-5 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-blue-600" />
            </Link>
            <Link to="/#courses" className="transition hover:text-blue-600">
              Courses
            </Link>
            <button onClick={goToRegister} className="transition hover:text-blue-600">
              Find Tutors
            </button>
            <Link to="/about-us" className="transition hover:text-blue-600">
              About Us
            </Link>
            <button onClick={goToRegister} className="transition hover:text-blue-600">
              Contact
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="hidden rounded-xl border border-blue-500/70 bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-600 hover:shadow-blue-500/15 sm:inline-flex"
            >
              Login
            </Link>
            <button
              onClick={goToRegister}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-blue-600/35"
            >
              Register
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 xl:px-6">
          <div className="absolute right-0 top-12 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute left-10 bottom-0 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2f5f90]">
                How ScienceEdu Works
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                A simple path from tutor search to live class
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                ScienceEdu keeps discovery, scheduling, confirmation, payment, and online class
                access in one clear learning flow.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={goToRegister}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f3f66] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-[#183452]"
                >
                  Start Booking
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <Link
                  to="/about-us"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-800 transition hover:border-[#2f5f90] hover:text-[#2f5f90]"
                >
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 xl:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="relative grid gap-5 lg:grid-cols-4">
              <div className="absolute left-0 top-10 hidden h-0.5 w-full bg-blue-100 lg:block" />
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10"
                  >
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2f5f90]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="text-sm font-extrabold text-slate-300">
                        0{index + 1}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-950">{step.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#1f3f66] px-5 py-20 text-white sm:px-8 lg:px-12 xl:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-100">
                Built for clarity
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Students always know what happens next
              </h2>
              <p className="mt-5 text-base leading-8 text-blue-50/80">
                Every booking moves through visible stages, so students can track requests,
                payments, session links, and upcoming classes without confusion.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.08] p-5"
                  >
                    <Icon className="h-6 w-6 text-blue-100" aria-hidden="true" />
                    <p className="mt-4 text-sm font-bold leading-6">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;
