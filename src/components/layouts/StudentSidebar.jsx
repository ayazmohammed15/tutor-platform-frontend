import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, Calendar, FileText, CreditCard, GraduationCap, X, Settings, ChevronDown } from 'lucide-react';

const studentMenu = [
  { label: 'Dashboard', to: '/student/dashboard', icon: LayoutDashboard },
  { label: 'My Sessions', to: '/student/sessions', icon: Calendar },
  { label: 'Assignments', to: '/student/assignments', icon: FileText },
  { label: 'Payments', to: '/student/payments', icon: CreditCard },
  { label: 'My Profile', to: '/student/profile', icon: User },
];

const StudentSidebar = ({ isOpen, setIsOpen }) => {
  // State to manage the Settings dropdown
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Settings placeholder options
  const settingsOptions = [
    'Account & Security',
    'Notifications',
    'Preferences'
  ];

  return (
    <>
      {/* Dark background overlay for mobile screens when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed left-0 top-0 h-screen w-[260px] bg-[#1A365D] text-slate-300 flex flex-col z-50 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-6 h-16 flex-shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl">
              <GraduationCap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">TutorBook<span className="text-blue-400">.</span></h2>
              <p className="text-[10px] font-semibold text-blue-200 uppercase tracking-widest">Student Portal</p>
            </div>
          </div>
          {/* Close button strictly for mobile view */}
          <button 
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 mt-6 space-y-1 custom-scrollbar">
          {studentMenu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => window.innerWidth < 768 && setIsOpen(false)} // Auto-close on mobile click
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white border-l-4 border-blue-400'
                      : 'border-l-4 border-transparent text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className={`w-5 h-5 ${window.location.pathname === item.to ? 'text-blue-400' : 'text-slate-400'}`} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Settings with Dropdown */}
        <div className="p-4 mb-4 flex-shrink-0 border-t border-white/10 mt-2">
          
          {/* Settings Toggle Button */}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all border-l-4 ${
              isSettingsOpen 
                ? 'bg-white/10 text-white border-blue-400' 
                : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            <div className="flex items-center gap-4">
              <Settings className={`w-5 h-5 ${isSettingsOpen ? 'text-blue-400' : 'text-slate-400'}`} />
              Settings
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isSettingsOpen ? 'rotate-180 text-white' : 'text-slate-500'}`} />
          </button>

          {/* Dropdown Options */}
          {isSettingsOpen && (
            <div className="mt-2 ml-4 pl-6 border-l border-white/10 space-y-1 animate-in slide-in-from-top-2 fade-in duration-200">
              {settingsOptions.map((option, index) => (
                <div 
                  key={index}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors rounded-lg hover:bg-white/5"
                >
                  {option}
                </div>
              ))}
            </div>
          )}

        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;