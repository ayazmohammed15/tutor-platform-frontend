import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  GraduationCap,
  MailCheck,
  MonitorPlay,
  LockKeyhole,
  ShieldCheck,
  Star,
  UserCheck,
  Users,
  Video,
} from "lucide-react";

const heroFloatingCards = [
  {
    title: "Live Classes",
    subtitle: "Interactive & engaging",
    icon: MonitorPlay,
    tone: "from-violet-500 to-blue-500",
    position:
      "left-0 top-[13%] sm:left-[6%] lg:-left-2 xl:left-4",
  },
  {
    title: "Verified Tutors",
    subtitle: "Expert & trusted",
    icon: UserCheck,
    tone: "from-blue-500 to-sky-400",
    position:
      "left-1 top-[35%] sm:left-[2%] lg:-left-8 xl:left-0",
  },
  {
    title: "Google Meet",
    subtitle: "Instant class links",
    icon: Video,
    tone: "from-emerald-400 to-blue-500",
    position:
      "left-3 bottom-[26%] sm:left-[4%] lg:-left-10 xl:left-0",
  },
  {
    title: "Secure Payments",
    subtitle: "Protected checkout",
    icon: LockKeyhole,
    tone: "from-blue-500 to-indigo-500",
    position:
      "right-2 top-[21%] sm:right-[4%] lg:-right-2 xl:right-4",
  },
  {
    title: "Student Rating",
    subtitle: "4.8/5 student score",
    icon: Star,
    tone: "from-violet-500 to-fuchsia-500",
    position:
      "right-3 bottom-[33%] sm:right-[3%] lg:-right-4 xl:right-2",
  },
];

const heroStats = [
  { value: "2,000+", label: "Verified Tutors" },
  { value: "50+", label: "Subjects" },
  { value: "10,000+", label: "Live Sessions" },
  { value: "8,000+", label: "Happy Students", accent: "text-amber-500" },
  { value: "4.8/5", label: "Student Rating", accent: "text-emerald-600" },
];

const heroFeatureRow = [
  // { label: "100% Verified Tutors", icon: BadgeCheck, color: "text-emerald-600 bg-emerald-50" },
  // { label: "Secure Payments", icon: CreditCard, color: "text-violet-600 bg-violet-50" },
  // { label: "Google Meet Classes", icon: Video, color: "text-blue-600 bg-blue-50" },
  // { label: "Flexible Scheduling", icon: CalendarClock, color: "text-indigo-600 bg-indigo-50" },
  // { label: "Personalized Learning", icon: BookOpenCheck, color: "text-sky-600 bg-sky-50" },
];

const platformFeatures = [
  {
    icon: ShieldCheck,
    title: "Admin approved tutors",
    description:
      "Tutor applications are reviewed before they can teach, helping students connect with trusted educators.",
  },
  {
    icon: CalendarCheck,
    title: "Smart availability",
    description:
      "Students book from tutor-defined schedules, excluded dates, seat capacity, and subject-based slots.",
  },
  {
    icon: CreditCard,
    title: "Online payments",
    description:
      "Accepted sessions move to payment through Razorpay, with student and tutor payment records.",
  },
  {
    icon: Video,
    title: "Google Meet classes",
    description:
      "After payment, the platform creates a Google Calendar event and shares a Meet link for the session.",
  },
];

const learningOptions = [
  {
    title: "One-to-one tutoring",
    description: "Personal sessions matched by subject, class, course, fee, and tutor experience.",
    image: "/tutor1.jpg",
  },
  {
    title: "Structured courses",
    description: "Admin managed courses, classes, and subjects keep the learning catalogue organized.",
    image: "/online-pedagogy-1.jpeg",
  },
  {
    title: "Small group sessions",
    description: "Capacity-aware booking supports shared slots for students learning the same subject.",
    image: "/studentOnline.png",
  },
];

const courseCards = [
  {
    title: "School Science",
    level: "Classes 6-10",
    description: "Build strong fundamentals in physics, chemistry, biology, and practical concepts.",
    icon: BookOpenCheck,
    image: "/online-pedagogy-1.jpeg",
  },
  {
    title: "IIT Foundation",
    level: "Classes 8-10",
    description: "Strengthen problem solving early with structured math and science mentoring.",
    icon: GraduationCap,
    image: "/studentOnline.png",
  },
  {
    title: "JEE Preparation",
    level: "Engineering entrance",
    description: "Learn concepts, practice numericals, and plan preparation with expert tutors.",
    icon: BadgeCheck,
    image: "/tutor1.jpg",
  },
  {
    title: "NEET Preparation",
    level: "Medical entrance",
    description: "Get focused biology, chemistry, and physics support for medical entrance goals.",
    icon: Star,
    image: "/boyWaving.png",
  },
  {
    title: "Live Doubt Sessions",
    level: "All levels",
    description: "Book targeted sessions when you need quick help before tests or assignments.",
    icon: MonitorPlay,
    image: "/student.jpg",
  },
];

const journeySteps = [
  {
    title: "Find Tutor",
    text: "Search by subject, level, or rating.",
  },
  {
    title: "Choose Slot",
    text: "Select a time that works for you.",
  },
  {
    title: "Confirmation",
    text: "The tutor accepts your request.",
  },
  {
    title: "Join Class",
    text: "Meet via integrated video call.",
  },
];

const audiences = [
  {
    icon: GraduationCap,
    title: "For students",
    items: ["Search verified tutors", "Book available slots", "Track sessions and payments"],
  },
  {
    icon: Users,
    title: "For tutors",
    items: ["Set availability", "Manage requests", "Connect Google Calendar"],
  },
  {
    icon: BadgeCheck,
    title: "For admins",
    items: ["Invite and approve tutors", "Manage courses and subjects", "Monitor bookings"],
  },
];

const testimonials = [
  {
    name: "Rahul Kumar",
    role: "Class 8, Foundation",
    quote: "The booking process is simple, and I can choose tutors based on the subject I need.",
    image: "/student.jpg",
  },
  {
    name: "Anjali Sharma",
    role: "Parent",
    quote: "The schedule is clear, payments are handled online, and the Meet link comes after confirmation.",
    image: "/mom.jpg",
  },
  {
    name: "Suresh Reddy",
    role: "Class 9, IIT Foundation",
    quote: "I can see my pending and confirmed sessions in one place, which makes learning easier.",
    image: "/boyWaving.png",
  },
];

const faqs = [
  {
    question: "How do I know if a tutor is good?",
    answer:
      "We verify all credentials and show student reviews on every profile. You can also view a tutor's introductory video and session history before booking.",
  },
  {
    question: "What subjects do you cover?",
    answer:
      "We cover everything from primary school basics to advanced competitive exams like JEE, NEET, UPSC, and university-level specialist subjects.",
  },
  {
    question: "Can I cancel a class?",
    answer:
      "Yes, you can cancel or reschedule classes up to 24 hours before the session start time without any penalty.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const goToRegister = () => navigate("/register");

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <style>
        {`
          @keyframes courseMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
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
            <Link to="/" className="relative text-blue-600">
              Home
              <span className="absolute -bottom-5 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-blue-600" />
            </Link>
            <Link to="/how-it-works" className="transition hover:text-blue-600">
              How it Works
            </Link>
            <a href="#courses" className="transition hover:text-blue-600">
              Courses
            </a>
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
        <section className="relative isolate overflow-hidden bg-white">
  <div className="absolute left-[52%] top-10 -z-10 h-[560px] w-[560px] rounded-full bg-blue-400/14 blur-3xl" />
  <div className="absolute right-0 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-sky-300/18 blur-3xl" />

  <div className="mx-auto grid min-h-[660px] max-w-[1400px] items-center gap-10 px-5 pt-8 pb-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pt-10 lg:pb-14 xl:px-6">
    <div className="animate-hero-fade max-w-[640px]">
      <div className="mb-5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700 shadow-sm shadow-emerald-900/5">
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        Live Online Classes Starting from ₹300 per Session
      </div>

      {/* FIXED: Reduced font scaling from text-5xl/sm:text-[58px]/lg:text-[64px] to more balanced sizes */}
      <h1 className="max-w-[620px] text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-[42px] lg:text-[46px] xl:text-[50px]">
        Find Expert Tutors for Every Subject.{" "}
        <span className="block sm:inline lg:block">
          <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400 bg-clip-text text-transparent">
            Learn
          </span>{" "}
          Anytime, Anywhere.
        </span>
      </h1>

      {/* FIXED: Toned down from text-xl to text-lg for a cleaner body copy weight */}
      {/* <p className="mt-4 max-w-[500px] text-[15px] leading-7 text-slate-600 sm:text-base">
        Book live online classes with verified tutors for School, IIT Foundation,
        JEE, NEET and more. Schedule sessions based on real-time availability
        and attend classes instantly through Google Meet.
      </p> */}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={goToRegister}
          className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-blue-600/35"
        >
          Book Your First Class
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
        <Link
          to="/how-it-works"
          className="inline-flex items-center justify-center gap-3 rounded-2xl border border-blue-500 bg-white px-8 py-4 text-base font-bold text-blue-600 shadow-lg shadow-blue-950/5 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-blue-50"
        >
          Explore Tutors
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-y-5 rounded-2xl bg-white/70">
        {heroFeatureRow.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.label}
              className="flex min-w-[160px] items-center gap-3 pr-5 text-sm font-bold text-slate-800 sm:border-r sm:border-slate-200 last:border-r-0"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feature.color}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="max-w-[110px] leading-tight">{feature.label}</span>
            </div>
          );
        })}
      </div>
    </div>

    <div className="relative mx-auto min-h-[520px] w-full max-w-[660px] lg:mx-0">
      <div className="absolute inset-x-10 top-0 h-[430px] rounded-full bg-blue-500/10 blur-2xl" />
      <div className="absolute left-1/2 top-[10%] h-[470px] w-[470px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-sky-100" />
      <div className="absolute left-[22%] top-[13%] h-[390px] w-[390px] rounded-full border border-dashed border-blue-300/70" />
      <div className="absolute right-[7%] top-[7%] h-64 w-64 rounded-full bg-blue-500/10" />
      <div className="absolute inset-x-[20%] top-8 h-64 bg-[radial-gradient(#60a5fa_1.2px,transparent_1.2px)] [background-size:22px_22px] opacity-40" />

      <div className="absolute inset-x-6 bottom-24 top-1 overflow-hidden rounded-[40px]">
        <img
          src="/boyWaving12.png"
          alt="Student attending an online class on a laptop"
          className="relative z-10 h-full w-full scale-110 object-cover object-[48%_45%]"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-white via-white/0 to-white/0" />
      </div>

      {heroFloatingCards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className={`animate-float-card absolute z-30 hidden min-w-[196px] items-center gap-4 rounded-[22px] border border-white/70 bg-white/[0.82] px-5 py-4 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(37,99,235,0.18)] sm:flex ${card.position}`}
          >
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.tone} text-white shadow-lg shadow-blue-500/20`}>
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-extrabold text-slate-950">{card.title}</span>
              <span className="mt-1 block text-xs font-semibold text-slate-500">{card.subtitle}</span>
            </span>
          </article>
        );
      })}

      <div className="absolute inset-x-4 bottom-3 z-40 grid rounded-[24px] bg-white px-5 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.13)] sm:grid-cols-5 sm:px-7">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="relative px-3 py-2 text-center after:absolute after:right-0 after:top-1/2 after:hidden after:h-10 after:w-px after:-translate-y-1/2 after:bg-slate-200 sm:after:block last:after:hidden"
          >
            <p className={`text-2xl font-extrabold leading-none ${stat.accent || "text-blue-600"}`}>
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

        <section className="border-b border-slate-200 bg-slate-50 py-14">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {platformFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#2f5f90]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-950">{feature.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="courses" className="overflow-hidden bg-white py-20 scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2f5f90]">
                  Popular courses
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Choose the course path that fits your goal
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  Explore focused learning tracks and book tutors who match your level, subject,
                  and schedule.
                </p>
              </div>
              <button
                onClick={goToRegister}
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#1f3f66] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-[#183452]"
              >
                Explore more
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />
              <div className="flex w-max gap-5 [animation:courseMarquee_32s_linear_infinite] hover:[animation-play-state:paused]">
                {[...courseCards, ...courseCards].map((course, index) => {
                  const Icon = course.icon;

                  return (
                    <article
                      key={`${course.title}-${index}`}
                      className="w-[285px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-950/10 sm:w-[320px]"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                        <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-[#2f5f90] shadow-sm">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2f5f90]">
                          {course.level}
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-slate-950">{course.title}</h3>
                        <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                          {course.description}
                        </p>
                        <button
                          onClick={goToRegister}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1f3f66] transition hover:gap-3 hover:text-blue-700"
                        >
                          Explore more
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2f5f90]">
                Learning options
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Built for personal tutoring, courses, and group learning
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {learningOptions.map((option) => (
                <article
                  key={option.title}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                >
                  <img
                    src={option.image}
                    alt={option.title}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-950">{option.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{option.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#1f3f66] py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Your Journey to Success
              </h2>
              <p className="mt-4 text-base text-blue-50/80">
                Simple steps to start your educational transformation.
              </p>
            </div>

            <div className="relative mx-auto flex max-w-5xl flex-col justify-between gap-8 md:flex-row md:gap-4">
              <div className="absolute left-0 top-8 z-0 hidden h-0.5 w-full bg-white/20 md:block" />
              {journeySteps.map((step, index) => (
                <article
                  key={step.title}
                  className="group relative z-10 flex flex-1 flex-col items-center text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white font-bold text-[#1f3f66] shadow-lg shadow-blue-950/15 transition-transform group-hover:scale-110">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                  <p className="text-sm leading-6 text-blue-50/80">{step.text}</p>
                </article>
              ))}
              </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2f5f90]">
                  Role based platform
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  One product, three focused dashboards
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Students, tutors, and admins each get the tools they need without mixing
                  responsibilities across the platform.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {audiences.map((audience) => {
                  const Icon = audience.icon;

                  return (
                    <article
                      key={audience.title}
                      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#2f5f90]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-950">{audience.title}</h3>
                      <ul className="mt-4 space-y-3 text-sm text-slate-600">
                        {audience.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2f5f90]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2f5f90]">
                  Student confidence
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  A smoother way to manage learning sessions
                </h2>
              </div>
              <button
                onClick={goToRegister}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-[#2f5f90] hover:text-[#2f5f90]"
              >
                Create Student Account
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-slate-950">{testimonial.name}</h3>
                      <p className="text-xs font-medium text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600">"{testimonial.quote}"</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 xl:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all open:border-blue-200 open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-bold text-slate-950">
                    {faq.question}
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 xl:px-6">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#1f3f66] px-6 py-12 text-center text-white shadow-xl shadow-blue-950/10 sm:px-10 md:px-24 md:py-24">
            <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute left-[-20%] top-[-50%] h-full w-full rounded-full border-[80px] border-white" />
              <div className="absolute bottom-[-50%] right-[-20%] h-full w-full rounded-full border-[80px] border-white" />
            </div>
            <h2 className="relative z-10 mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Ready to Start Learning?
            </h2>
            <p className="relative z-10 mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-50 sm:text-lg">
              Join thousands of students across India who are achieving their dreams with ScienceEdu.
            </p>
            <div className="relative z-10 mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={goToRegister}
                className="inline-flex h-14 items-center justify-center rounded-lg bg-white px-12 text-sm font-bold text-[#1f3f66] shadow-xl shadow-blue-950/15 transition duration-300 hover:scale-105 hover:bg-blue-50"
              >
                Get Started Now
              </button>
              <button
                onClick={goToRegister}
                className="inline-flex h-14 items-center justify-center rounded-lg border-2 border-white bg-transparent px-12 text-sm font-bold text-white transition duration-300 hover:bg-white/10"
              >
                Speak to a Consultant
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#132238] py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.3fr_0.7fr_0.7fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#1f3f66]">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xl font-bold">ScienceEdu</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              A tutor booking platform for verified tutors, smart scheduling, online payments,
              and Google Meet based classes.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold">Platform</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <button onClick={goToRegister} className="block transition hover:text-white">
                Find a Tutor
              </button>
              <Link to="/how-it-works" className="block transition hover:text-white">
                How it Works
              </Link>
              <Link to="/about-us" className="block transition hover:text-white">
                About Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold">Account</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <Link to="/login" className="block transition hover:text-white">
                Sign In
              </Link>
              <button onClick={goToRegister} className="block transition hover:text-white">
                Register
              </button>
              <Link to="/tutor-register" className="block transition hover:text-white">
                Tutor Invite
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold">Stay connected</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Platform emails keep students and tutors updated about requests, approvals,
              payments, and session confirmations.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-100">
              <MailCheck className="h-4 w-4" aria-hidden="true" />
              Automated notifications included
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 pt-6 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>Copyright 2026 ScienceEdu. All rights reserved.</p>
          <p>Built for online tutoring, booking, and class management.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
