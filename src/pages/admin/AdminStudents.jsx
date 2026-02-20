import React from 'react';

const AdminStudents = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Students Management</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage all registered students on the platform.</p>
      </div>

      {/* Main Content Area (Empty State) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center text-center h-96">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">
          👨‍🎓 {/* Change this emoji for each page: 👨‍🏫 for Tutors, 📚 for Subjects, etc. */}
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Students UI Coming Soon</h2>
        <p className="text-gray-500 max-w-sm">
          This module is currently being scaffolded. The data table and management tools will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default AdminStudents;