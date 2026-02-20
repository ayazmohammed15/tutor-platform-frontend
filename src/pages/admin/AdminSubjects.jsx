import React from 'react';

const AdminSubjects = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subjects & Curriculum</h1>
        <p className="text-sm text-gray-500 mt-1">Configure boards (CBSE, State), classes (6-10), and available subjects.</p>
      </div>

      {/* Main Content Area (Empty State) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center text-center h-96">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm border border-blue-100">
          📚
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Curriculum Setup Coming Soon</h2>
        <p className="text-gray-500 max-w-sm">
          Tools to add, edit, or disable specific subjects and educational boards will be implemented in this module.
        </p>
      </div>
    </div>
  );
};

export default AdminSubjects;