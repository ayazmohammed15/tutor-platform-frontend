import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, FileText, BookOpen, CreditCard, User, Settings, CalendarDays, X, ChevronDown } from 'lucide-react';

const tutorMenu = [
  { label: 'Dashboard', to: '/tutor/dashboard', icon: LayoutDashboard },
  { label: 'My Sessions', to: '/tutor/sessions', icon: Calendar },
  { label: 'Availability', to: '/tutor/availability', icon: CalendarDays },
  { label: 'Assignments', to: '/tutor/assignments', icon: FileText },
  { label: 'Payments', to: '/tutor/payments', icon: CreditCard },
  { label: 'My Profile', to: '/tutor/profile', icon: User },
];

const settingsOptions = [
  'Account & Security',
  'Notifications',
  'Integrations',
  'General Preferences'
];

const TutorSidebar = memo(({ isOpen, setIsOpen }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[260px] bg-[#0c1813] text-gray-300 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 h-16 flex-shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl">
              <BookOpen className="w-5 h-5 text-[#0fb673]" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">TutorBook<span className="text-[#0fb673]">.</span></h2>
              <p className="text-[10px] font-semibold text-[#0fb673] uppercase tracking-widest">Tutor Portal</p>
            </div>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 mt-6 space-y-1 custom-scrollbar">
          {tutorMenu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#152920] text-white border-l-4 border-[#0fb673]'
                      : 'border-l-4 border-transparent hover:bg-[#152920]/50 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#0fb673]' : 'text-gray-400'}`} />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 mb-4 flex-shrink-0 border-t border-gray-800/50 mt-2">
          <button
            onClick={() => setIsSettingsOpen((prev) => !prev)}
            className={`w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-all border-l-4 ${
              isSettingsOpen
                ? 'bg-[#152920] text-white border-[#0fb673]'
                : 'text-gray-400 hover:text-white hover:bg-[#152920]/50 border-transparent'
            }`}
          >
            <div className="flex items-center gap-4">
              <Settings className={`w-5 h-5 ${isSettingsOpen ? 'text-[#0fb673]' : 'text-gray-400'}`} />
              Settings
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isSettingsOpen ? 'rotate-180 text-[#0fb673]' : 'text-gray-500'}`} />
          </button>

          {isSettingsOpen && (
            <div className="mt-2 ml-4 pl-6 border-l border-gray-700/50 space-y-1 animate-in slide-in-from-top-2 fade-in duration-200">
              {settingsOptions.map((option) => (
                <div
                  key={option}
                  className="block px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition-colors rounded-lg hover:bg-[#152920]/50"
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
});

export default TutorSidebar;
