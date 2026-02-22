import StudentSidebar from './StudentSidebar';
import { Bell, Search, ChevronDown, Calendar } from 'lucide-react';

const StudentLayout = ({ children }) => {
  // We can format today's date to display in the header
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <StudentSidebar />

      {/* Main Content Area */}
      <main className="ml-64 flex-1 flex flex-col">
        
        {/* Top Header/Navbar */}
        <header className="fixed top-0 right-0 left-64 h-20 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-30 transition-all duration-300">
          
          {/* Left Side: Greeting & Date */}
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">Welcome back! 👋</h2>
              <div className="flex items-center text-sm text-gray-500 font-medium mt-0.5">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                {currentDate}
              </div>
            </div>
          </div>

          {/* Right Side: Search, Notifications, Profile */}
          <div className="flex items-center gap-5">
            
            {/* Search Bar - Styled for a cleaner look */}
            <div className="relative hidden md:block w-72">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search subjects, tutors..." 
                className="w-full bg-slate-100/80 text-sm rounded-full pl-11 pr-4 py-2.5 outline-none border border-transparent focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200 hidden md:block mx-1"></div>

            {/* Notification Bell */}
            <button className="relative p-2.5 bg-slate-100 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {/* Profile Dropdown Button */}
            <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-colors pr-3 border border-transparent hover:border-slate-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-sm">
                S
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-bold text-gray-700 leading-tight">Student Name</span>
                <span className="text-xs font-semibold text-indigo-600">Student Account</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block ml-1" />
            </button>

          </div>
        </header>

        {/* Page Content */}
        <div className="mt-20 p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
        
      </main>
    </div>
  );
};

export default StudentLayout;