import { FileText } from 'lucide-react';

const TutorAssignments = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Assignments</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Assignment Management</h2>
        <p className="text-gray-500 max-w-md">
          Create, distribute, and grade homework assignments for your students. We are currently building this feature!
        </p>
      </div>
    </div>
  );
};

export default TutorAssignments;