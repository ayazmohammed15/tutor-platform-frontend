import { Link } from "react-router-dom";
import Card from "../common/Card";

const RegistrationCategoryCards = ({ compact = false }) => {
  const categories = [
    {
      title: "School Students",
      description: "State syllabus tuition, CBSE tuition, and guided support for Classes 6-10.",
      highlights: ["State syllabus tuition", "CBSE tuition", "Classes 6-10"],
      route: "/register/school",
    },
    {
      title: "Engineering Students",
      description: "Exam-focused tutoring for IIT JEE, NEET, and IIT Foundation learners.",
      highlights: ["IIT JEE", "NEET", "IIT Foundation"],
      route: "/register/engineering",
    },
  ];

  return (
    <div className={`grid gap-6 ${compact ? "md:grid-cols-2" : "lg:grid-cols-2"}`}>
      {categories.map((category) => (
        <Card
          key={category.title}
          className="rounded-3xl border border-slate-200 bg-white/95 p-7 shadow-sm"
        >
          <div className="flex h-full flex-col">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Student Category
            </p>
            <h3 className="text-2xl font-bold text-slate-900">{category.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>

            <div className="mt-6 space-y-2 text-sm text-slate-700">
              {category.highlights.map((item) => (
                <p key={item} className="rounded-full bg-slate-50 px-3 py-2">
                  {item}
                </p>
              ))}
            </div>

            <Link
              to={category.route}
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700"
            >
              Continue
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RegistrationCategoryCards;
