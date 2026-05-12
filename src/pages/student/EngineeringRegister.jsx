import StudentRegisterForm from "../../components/register/StudentRegisterForm";

const EngineeringRegister = () => {
  return (
    <StudentRegisterForm
      category="engineering"
      title="Engineering Student Registration"
      subtitle="Register for IIT JEE, NEET, or IIT Foundation tutoring with subject-focused onboarding."
      allowedCourseSlugs={["iit-jee", "neet", "foundation-iit-jee"]}
      classSelectionMode="hidden"
    />
  );
};

export default EngineeringRegister;
