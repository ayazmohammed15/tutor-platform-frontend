import StudentRegisterForm from "../../components/register/StudentRegisterForm";

const SchoolRegister = () => {
  return (
    <StudentRegisterForm
      category="school"
      course_type="general"
      title="School Tuition Registration"
      subtitle="Create your student profile for State syllabus or CBSE tuition from Class 6 to Class 10."      
      classSelectionMode="required"
    />
  );
};

export default SchoolRegister;
