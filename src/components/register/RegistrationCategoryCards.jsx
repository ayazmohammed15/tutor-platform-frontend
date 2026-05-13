import { Link } from "react-router-dom";
import { ArrowRight, BookOpenCheck, GraduationCap } from "lucide-react";
import Card from "../common/Card";

const RegistrationCategoryCards = ({ compact = false }) => {
  const categories = [
    {
      eyebrow: "Classes 6-10",
      title: "School Tuition",
      description: "Personalized support for State syllabus and CBSE students who want stronger fundamentals and steady marks.",
      highlights: ["State syllabus", "CBSE curriculum", "Class-wise tutor matching"],
      route: "/register/school",
      accent: "teal",
      Icon: BookOpenCheck,
    },
    {
      eyebrow: "JEE / NEET / Foundation",
      title: "Entrance Exam Prep",
      description: "Focused coaching for ambitious learners preparing for competitive exams with subject-specific guidance.",
      highlights: ["IIT JEE preparation", "NEET preparation", "Foundation programs"],
      route: "/register/engineering",
      accent: "indigo",
      Icon: GraduationCap,
    },
  ];

  return (
    <div className={`grid gap-5 ${compact ? "md:grid-cols-2" : "lg:grid-cols-2"}`}>
      {categories.map((category) => (
        <Card
          key={category.title}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
        >
          <div className="flex h-full flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-[0.18em] ${
                    category.accent === "teal" ? "text-teal-700" : "text-indigo-700"
                  }`}
                >
                  {category.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-slate-950">{category.title}</h3>
              </div>
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  category.accent === "teal"
                    ? "bg-teal-50 text-teal-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                <category.Icon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>

            <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-600">
              {category.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-700">
              {category.highlights.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>

            <Link
              to={category.route}
              className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-200 ${
                category.accent === "teal"
                  ? "bg-teal-700 hover:bg-teal-800"
                  : "bg-indigo-700 hover:bg-indigo-800"
              }`}
            >
              Start Registration
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RegistrationCategoryCards;
