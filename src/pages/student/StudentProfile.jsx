import React from 'react';
import { Pencil } from 'lucide-react';

const StudentProfile = () => {
  // Placeholder data - you will eventually replace this with your Redux/Context state
  const studentData = {
    firstName: 'Praveen',
    lastName: 'Kumar',
    email: 'praveen.kumar@example.com',
    phone: '+91 98765 43210',
    bio: 'Electrical and Electronics Engineering Student',
    role: 'Student',
    location: 'Hyderabad, India',
    country: 'India',
    cityState: 'Hyderabad, Telangana',
    postalCode: '500001',
    studentId: 'STU-45645756', // Replaced "TAX ID" with a more student-appropriate label
  };

  // Reusable Edit Button Component
  const EditButton = () => (
    <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
      Edit <Pencil className="w-3.5 h-3.5" />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* 1. Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
             {/* You can replace this with an actual <img src="..." /> later */}
            <span className="text-2xl font-bold text-white">
              {studentData.firstName.charAt(0)}{studentData.lastName.charAt(0)}
            </span>
          </div>
          
          {/* User Info */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {studentData.firstName} {studentData.lastName}
            </h1>
            <p className="text-gray-500 font-medium">{studentData.role}</p>
            <p className="text-gray-400 text-sm mt-1">{studentData.location}</p>
          </div>
        </div>
        <EditButton />
      </div>

      {/* 2. Personal Information Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
          <EditButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">First Name</p>
            <p className="text-base font-semibold text-gray-900">{studentData.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Last Name</p>
            <p className="text-base font-semibold text-gray-900">{studentData.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email address</p>
            <p className="text-base font-semibold text-gray-900">{studentData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Phone</p>
            <p className="text-base font-semibold text-gray-900">{studentData.phone}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Bio</p>
            <p className="text-base font-semibold text-gray-900">{studentData.bio}</p>
          </div>
        </div>
      </div>

      {/* 3. Address Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Address</h2>
          <EditButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Country</p>
            <p className="text-base font-semibold text-gray-900">{studentData.country}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">City/State</p>
            <p className="text-base font-semibold text-gray-900">{studentData.cityState}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Postal Code</p>
            <p className="text-base font-semibold text-gray-900">{studentData.postalCode}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Student ID</p>
            <p className="text-base font-semibold text-gray-900">{studentData.studentId}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentProfile;