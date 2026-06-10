import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { UserCog, Menu, X, Bell, Search, LogOut, ChevronDown } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Students", path: "/admin/students" },
    { name: "Tutors", path: "/admin/tutors" },
    { name: "Subjects", path: "/admin/subjects" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Payments", path: "/admin/payments" },
  ];

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.first_name) return user.first_name[0].toUpperCase();
    return "A";
  };

  const getFullName = () => {
    if (user?.first_name && user?.last_name) return `${user.first_name} ${user.last_name}`;
    if (user?.first_name) return user.first_name;
    return "Admin Account";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

      {/* Mobile overlay backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR — fixed, slides in/out */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl flex items-center justify-center">
              <UserCog className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold tracking-tight text-white leading-none mt-1">
                ScienceEdu<span className="text-blue-400">.</span>
              </h2>
              <p className="text-[10px] font-semibold text-blue-200 uppercase tracking-widest mt-1">
                Admin Portal
              </p>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => { if (window.innerWidth < 768) setIsSidebarOpen(false); }}
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

      {/* MAIN CONTENT — shifts right when sidebar is open on desktop */}
      <main className={`transition-all duration-300 flex flex-col min-w-0 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>

        {/* FIXED TOP HEADER */}
        <header
          className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-30 shadow-sm transition-all duration-300 ${
            isSidebarOpen ? 'md:left-64 left-0' : 'left-0'
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Hamburger toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search bar */}
            <div className="relative w-48 md:w-72 hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tutors, students, or bookings..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Header right actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Notification bell */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors border border-gray-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold hover:bg-blue-100 transition-colors shadow-sm">
                  {getInitials()}
                </div>
                <span className="text-sm font-semibold text-gray-700 hidden md:block">
                  {getFullName()}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 hidden md:block transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50">
                    <div className="px-5 py-3 border-b border-gray-50">
                      <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                      <p className="text-sm text-gray-900 font-bold truncate mt-1">
                        {user?.email || 'admin@TutorBook.com'}
                      </p>
                    </div>
                    <div className="py-2 px-2">
                      <button
                        onClick={() => { setIsProfileOpen(false); logout(); }}
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
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="mt-16 p-4 md:p-8 flex-1 overflow-x-hidden">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;
