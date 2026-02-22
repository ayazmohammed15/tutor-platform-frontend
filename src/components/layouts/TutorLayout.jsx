import { useState } from 'react';
import TutorSidebar from './TutorSidebar';
import { Bell, Search, ChevronDown, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import your AuthContext

const TutorLayout = ({ children }) => {
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
    return "T"; // Default fallback for Tutor
  };

  // Helper to safely display the full name
  const getFullName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.first_name) return user.first_name;
    return "Tutor Account";
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-[#111827]">
      
      {/* Sidebar gets the state passed as props */}
      <TutorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area - Adjusts margin based on sidebar state */}
      <main className={`transition-all duration-300 flex flex-col min-w-0 ${isSidebarOpen ? 'md:ml-[260px]' : 'ml-0'}`}>
        
        {/* Top Header/Navbar */}
        <header className={`fixed top-0 right-0 h-16 bg-white flex items-center justify-between px-4 md:px-8 z-30 shadow-sm transition-all duration-300 ${isSidebarOpen ? 'md:left-[260px] left-0' : 'left-0'}`}>
          
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 hidden sm:block">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Search Bar */}
            <div className="relative w-48 md:w-64 hidden sm:block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#f3f4f6] text-sm rounded-xl pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-[#0fb673]/30 transition-all border-transparent"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 text-gray-600 hover:text-[#0fb673] transition-colors rounded-full border border-gray-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0fb673] rounded-full border-2 border-white"></span>
            </button>
            
            {/* ---------------- PROFILE DROPDOWN WIDGET ---------------- */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
              >
                {/* Dynamic Initials Avatar */}
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-green-50 border border-green-100 text-[#0fb673] flex items-center justify-center font-bold text-sm shadow-sm">
                  {getInitials()}
                </div>
                
                {/* Dynamic Name */}
                <span className="text-sm font-semibold text-gray-700 hidden md:block">
                  {getFullName()}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 hidden md:block transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Popup Dropdown Menu */}
              {isProfileOpen && (
                <>
                  {/* Invisible Overlay to close menu when clicking outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50 transform transition-all animate-in fade-in slide-in-from-top-2">
                    <div className="px-5 py-3 border-b border-gray-50">
                      <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                      <p className="text-sm text-gray-900 font-bold truncate mt-1">
                        {user?.email || 'tutor@tutormatch.com'}
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

export default TutorLayout;