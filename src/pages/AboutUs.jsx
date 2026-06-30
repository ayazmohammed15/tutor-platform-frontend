import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Trusted learning",
    text: "Tutor profiles, availability, and class details are managed with clarity before students book.",
  },
  {
    icon: BookOpenCheck,
    title: "Focused support",
    text: "Students can find help by subject, class, course, fee, and learning goals.",
  },
  {
    icon: Users,
    title: "Simple coordination",
    text: "Students, tutors, and admins each get focused tools for a smoother learning experience.",
  },
];

const AboutUs = () => {
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
            <Link to="/how-it-works" className="transition hover:text-blue-600">
              How it Works
            </Link>
            <Link to="/#courses" className="transition hover:text-blue-600">
              Courses
            </Link>
            <button onClick={goToRegister} className="transition hover:text-blue-600">
              Find Tutors
            </button>
            <Link to="/about-us" className="relative text-blue-600">
              About Us
              <span className="absolute -bottom-5 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-blue-600" />
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
        <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 xl:px-6">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2f5f90]">
                About ScienceEdu
              </p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                Online tutoring built around trust, scheduling, and clear next steps
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-600">
                ScienceEdu helps students connect with verified tutors, book sessions from real
                availability, complete payment online, and join live classes through an organized
                digital learning flow.
              </p>
              <button
                onClick={goToRegister}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#1f3f66] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-[#183452]"
              >
                Create Student Account
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/5 sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2f5f90]">
                <BadgeCheck className="h-7 w-7" aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-slate-950">Our mission</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                We make quality tutoring easier to access by reducing friction between finding a
                tutor, requesting a time, confirming the class, and joining the session.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 xl:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2f5f90]">
                What guides us
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                A platform for students, tutors, and admins
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <article
                    key={value.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2f5f90]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-950">{value.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{value.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
