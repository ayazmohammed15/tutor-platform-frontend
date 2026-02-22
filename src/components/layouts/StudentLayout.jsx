import { useState } from 'react';
import StudentSidebar from './StudentSidebar';
import { Bell, Search, ChevronDown, Menu, LogOut, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Adjust path if needed

const StudentLayout = ({ children }) => {
  // Sidebar & Dropdown state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Fetch user data and logout function from context
  const { user, logout } = useAuth();

  // Helper to get initials
  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.first_name) {
      return user.first_name[0].toUpperCase();
    }
    return "S"; // Default fallback for Student
  };

  // Helper to safely display the full name
  const getFullName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.first_name) return user.first_name;
    return "Student Account";
  };

  // Format today's date
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      
      {/* Sidebar gets the state passed as props */}
      <StudentSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area - Adjusts margin based on sidebar state */}
      <main className={`transition-all duration-300 flex flex-col min-w-0 ${isSidebarOpen ? 'md:ml-[260px]' : 'ml-0'}`}>
        
        {/* Top Header/Navbar */}
        <header className={`fixed top-0 right-0 h-16 bg-white/90 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-30 shadow-sm transition-all duration-300 ${isSidebarOpen ? 'md:left-[260px] left-0' : 'left-0'}`}>
          
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Greeting & Date */}
            <div className="hidden sm:block">
              <h2 className="text-lg font-bold text-slate-800 tracking-tight">Welcome back! 👋</h2>
              <div className="flex items-center text-xs text-slate-500 font-medium mt-0.5">
                <Calendar className="w-3 h-3 mr-1.5" />
                {currentDate}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Search Bar */}
            <div className="relative w-48 md:w-64 hidden sm:block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search subjects, tutors..." 
                className="w-full bg-slate-100 text-sm rounded-xl pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all border-transparent"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-full border border-slate-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {/* ---------------- PROFILE DROPDOWN WIDGET ---------------- */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-50 transition-colors focus:outline-none"
              >
                {/* Dynamic Initials Avatar */}
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-sm shadow-sm">
                  {getInitials()}
                </div>
                
                {/* Dynamic Name */}
                <span className="text-sm font-semibold text-slate-700 hidden md:block">
                  {getFullName()}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 hidden md:block transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Popup Dropdown Menu */}
              {isProfileOpen && (
                <>
                  {/* Invisible Overlay to close menu when clicking outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 py-2 z-50 transform transition-all animate-in fade-in slide-in-from-top-2">
                    <div className="px-5 py-3 border-b border-slate-50">
                      <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                      <p className="text-sm text-slate-900 font-bold truncate mt-1">
                        {user?.email || 'student@TutorBook.com'}
                      </p>
                    </div>
                    
                    <div className="py-2 px-2">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout(); 
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* ---------------- END PROFILE DROPDOWN ---------------- */}

          </div>
        </header>

        {/* Page Content */}
        <div className="mt-16 p-4 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
        
      </main>
    </div>
  );
};

export default StudentLayout;