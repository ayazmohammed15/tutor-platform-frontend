import { Video } from 'lucide-react';

const TutorSessions = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Sessions</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center min-h-[50vh]">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <Video className="w-10 h-10 text-[#0fb673]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Live Sessions Coming Soon</h2>
        <p className="text-gray-500 max-w-md">
          This is where you will be able to manage your upcoming tutoring sessions, view past class recordings, and join your virtual classrooms.
        </p>
      </div>
    </div>
  );
};

export default TutorSessions;