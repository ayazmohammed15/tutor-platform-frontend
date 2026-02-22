import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, Calendar, FileText, CreditCard, GraduationCap } from 'lucide-react';

const studentMenu = [
  { label: 'Dashboard', to: '/student/dashboard', icon: LayoutDashboard },
  { label: 'My Sessions', to: '/student/sessions', icon: Calendar },
  { label: 'Assignments', to: '/student/assignments', icon: FileText },
  { label: 'Payments', to: '/student/payments', icon: CreditCard },
  { label: 'My Profile', to: '/student/profile', icon: User },
];

const StudentSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col z-20">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-8 border-b border-gray-50">
        <div className="bg-indigo-600 p-2 rounded-xl">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Student</h2>
          <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider">Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 mt-4">
        {studentMenu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      
      {/* Optional: Bottom user quick-view or logout button could go here */}
    </aside>
  );
};

export default StudentSidebar;