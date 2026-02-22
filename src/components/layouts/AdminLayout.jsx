import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'; // Ensure this path is correct for your project
import { UserCog } from 'lucide-react';

// --- SVG Icons ---
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
  </svg>
);

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Students", path: "/admin/students" },
    { name: "Tutors", path: "/admin/tutors" },
    { name: "Subjects", path: "/admin/subjects" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Payments", path: "/admin/payments" },
  ];

  // 🔴 ADD THIS LOG HERE:
  console.log("DEBUG: Current User Object ->", user);
  
  // Helper function to safely get user initials (e.g., John Doe -> JD)
  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.first_name) {
      return user.first_name[0].toUpperCase();
    }
    return "A"; // Default fallback
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-col hidden md:flex flex-shrink-0">
        
        {/* BRAND HEADER - FIXED SPACING */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800 flex-shrink-0">
          <div className="bg-white/10 p-2 rounded-xl flex items-center justify-center">
            <UserCog className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-bold tracking-tight text-white leading-none mt-1">
              TutorBook<span className="text-blue-400">.</span>
            </h2>
            <p className="text-[10px] font-semibold text-blue-200 uppercase tracking-widest mt-1">
              Admin Portal
            </p>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Sidebar Bottom Profile Widget */}
        <div className="p-4 border-t border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-white font-medium shadow-sm flex-shrink-0">
              {getInitials()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-slate-400 truncate">
                {user?.email || "admin@TutorBook.com"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* 2. TOP HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-10">
          
          {/* Global Search */}
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search tutors, students, or bookings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>
          
          {/* Header Actions (Notifications & Profile Menu) */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-400 hover:text-gray-600 relative transition-colors">
              <BellIcon />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* Profile Dropdown Container */}
            <div className="relative">
              {/* Profile Avatar Button */}
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold hover:bg-blue-100 transition-colors shadow-sm">
                  {getInitials()}
                </div>
              </button>

              {/* Popup Dropdown Menu */}
              {isProfileOpen && (
                <>
                  {/* Invisible Overlay: Closes menu if user clicks outside */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 transform transition-all">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                      <p className="text-sm text-gray-900 font-medium truncate mt-0.5">
                        {user?.email || 'admin@TutorBook.com'}
                      </p>
                    </div>
                    
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout(); 
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* 3. DYNAMIC CONTENT (This renders AdminDashboard based on Route) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;