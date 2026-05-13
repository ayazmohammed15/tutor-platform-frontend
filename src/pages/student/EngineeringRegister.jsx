import StudentRegisterForm from "../../components/register/StudentRegisterForm";

const EngineeringRegister = () => {
  return (
    <StudentRegisterForm
      category="engineering"
      title="Entrance Exam Prep Registration"
      subtitle="Set up your student profile for IIT JEE, NEET, or foundation coaching with subject-focused tutor matching."
      allowedCourseSlugs={["iit-jee", "neet", "foundation-iit-jee"]}
      classSelectionMode="hidden"
    />
  );
};

export default EngineeringRegister;
