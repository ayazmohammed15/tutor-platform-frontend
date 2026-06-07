import StudentRegisterForm from "../../components/register/StudentRegisterForm";

const EngineeringRegister = () => {
  return (
    <StudentRegisterForm
      category="engineering"
      course_type="entrance"
      title="Entrance Exam Prep Registration"
      subtitle="Set up your student profile for IIT JEE, NEET, or foundation coaching with subject-focused tutor matching."      
      classSelectionMode="required"
    />
  );
};

export default EngineeringRegister;
