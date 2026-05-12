import StudentRegisterForm from "../../components/register/StudentRegisterForm";

const SchoolRegister = () => {
  return (
    <StudentRegisterForm
      category="school"
      title="School Student Registration"
      subtitle="Register for state syllabus or CBSE tuition for Classes 6 through 10."
      allowedCourseSlugs={["school-tuition", "cbse-school-tuition"]}
      classSelectionMode="required"
    />
  );
};

export default SchoolRegister;
