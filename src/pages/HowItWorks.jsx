import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, CalendarCheck, CreditCard, GraduationCap, Search, ShieldCheck, Video } from "lucide-react";

const Motion = motion;
const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } };
const processSteps = [
  { icon: Search, title: "Find the right tutor", text: "Search approved tutors by subject, class, experience, fee, and availability." },
  { icon: CalendarCheck, title: "Choose a slot", text: "Pick a tutor-defined time that fits your schedule and send the booking request." },
  { icon: BadgeCheck, title: "Get confirmation", text: "The tutor accepts your request or suggests a better time before payment." },
  { icon: Video, title: "Join live class", text: "After payment, receive the online class link and learn through Google Meet." },
];
const highlights = [{ icon: ShieldCheck, label: "Verified tutor profiles" }, { icon: CalendarCheck, label: "Availability based booking" }, { icon: CreditCard, label: "Secure online payments" }];

const HowItWorks = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const goToRegister = () => navigate("/register");
  const goHome = () => { window.scrollTo({ top: 0, behavior: "auto" }); navigate("/"); };
  const goToCourses = () => {
    navigate("/#courses");
    window.setTimeout(() => document.getElementById("courses")?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" }), 50);
  };
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-white font-sans text-slate-950">
      <header className="sticky top-0 z-50 border-b border-blue-950/5 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-2.5 sm:px-8 lg:px-12 xl:px-6">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "auto" })} className="flex items-center gap-3"><img src="/ScienceEdu-logo.png" alt="ScienceEdu" className="h-12 w-12 rounded-xl object-cover" /><span className="text-2xl font-extrabold tracking-tight">Science<span className="text-blue-600">Edu</span></span></Link>
          <div className="hidden items-center gap-10 text-[15px] font-semibold text-slate-800 lg:flex">
            <button onClick={goHome} className="transition hover:text-blue-600">Home</button><Link to="/how-it-works" className="relative text-blue-600">How it Works<span className="absolute -bottom-5 left-1/2 h-0.5 w-7 -translate-x-1/2 rounded-full bg-blue-600" /></Link><button onClick={goToCourses} className="transition hover:text-blue-600">Courses</button><button onClick={goToRegister} className="transition hover:text-blue-600">Find Tutors</button><Link to="/about-us" className="transition hover:text-blue-600">About Us</Link><button onClick={goToRegister} className="transition hover:text-blue-600">Contact</button>
          </div>
          <div className="flex items-center gap-3 sm:gap-4"><Link to="/login" className="hidden rounded-xl border border-blue-500/70 bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-blue-500/15 sm:inline-flex">Login</Link><Motion.button onClick={goToRegister} whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25">Register</Motion.button></div>
        </nav>
      </header>
      <main>
        <section className="relative isolate overflow-hidden bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 xl:px-6">
          <Motion.div aria-hidden="true" className="absolute right-0 top-12 -z-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" animate={shouldReduceMotion ? undefined : { x: [0, -20, 0], y: [0, 15, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
          <Motion.div aria-hidden="true" className="absolute bottom-0 left-10 -z-10 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" animate={shouldReduceMotion ? undefined : { x: [0, 18, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <Motion.div className="relative mx-auto max-w-3xl text-center" initial={shouldReduceMotion ? false : "hidden"} animate="visible" variants={stagger}>
            <Motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.18em] text-[#2f5f90]">How ScienceEdu Works</Motion.p><Motion.h1 variants={fadeUp} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">A simple path from tutor search to live class</Motion.h1><Motion.p variants={fadeUp} className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">ScienceEdu keeps discovery, scheduling, confirmation, payment, and online class access in one clear learning flow.</Motion.p>
            <Motion.div variants={fadeUp} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Motion.button onClick={goToRegister} whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f3f66] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/15">Start Booking <Motion.span animate={shouldReduceMotion ? undefined : { x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity }}><ArrowRight className="h-4 w-4" /></Motion.span></Motion.button><Link to="/about-us" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-[#2f5f90] hover:text-[#2f5f90]">Learn About Us</Link></Motion.div>
          </Motion.div>
        </section>
        <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 xl:px-6"><Motion.div className="relative mx-auto grid max-w-6xl gap-5 lg:grid-cols-4" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}><Motion.div aria-hidden="true" className="absolute left-0 top-10 hidden h-0.5 w-full origin-left bg-blue-100 lg:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: shouldReduceMotion ? 0 : 0.8 }} />{processSteps.map((step, index) => { const Icon = step.icon; return <Motion.article key={step.title} variants={fadeUp} whileHover={shouldReduceMotion ? undefined : { y: -7 }} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-blue-950/10"><div className="mb-6 flex items-center justify-between gap-4"><Motion.div whileHover={shouldReduceMotion ? undefined : { rotate: 5, scale: 1.08 }} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2f5f90]"><Icon className="h-6 w-6" /></Motion.div><span className="text-sm font-extrabold text-slate-300">0{index + 1}</span></div><h2 className="text-xl font-bold">{step.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p></Motion.article>; })}</Motion.div></section>
        <section className="bg-[#1f3f66] px-5 py-20 text-white sm:px-8 lg:px-12 xl:px-6"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-100">Built for clarity</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Students always know what happens next</h2><p className="mt-5 text-base leading-8 text-blue-50/80">Every booking moves through visible stages, so students can track requests, payments, session links, and upcoming classes without confusion.</p></Motion.div><Motion.div className="grid gap-4 sm:grid-cols-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>{highlights.map((item) => { const Icon = item.icon; return <Motion.div key={item.label} variants={fadeUp} whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.02 }} className="rounded-2xl border border-white/10 bg-white/[0.08] p-5 shadow-lg shadow-blue-950/5"><Icon className="h-6 w-6 text-blue-100" /><p className="mt-4 text-sm font-bold leading-6">{item.label}</p></Motion.div>; })}</Motion.div></div></section>
      </main>
    </div>
  );
};
export default HowItWorks;
