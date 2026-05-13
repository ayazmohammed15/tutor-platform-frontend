import StudentRegisterForm from "../../components/register/StudentRegisterForm";

const SchoolRegister = () => {
  return (
    <StudentRegisterForm
      category="school"
      title="School Tuition Registration"
      subtitle="Create your student profile for State syllabus or CBSE tuition from Class 6 to Class 10."
      allowedCourseSlugs={["school-tuition", "cbse-school-tuition"]}
      classSelectionMode="required"
    />
  );
};

export default SchoolRegister;
