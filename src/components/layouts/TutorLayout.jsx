import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';

const TutorLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // 🔔 Mock Student Requests
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New session request from Rahul (Mathematics)",
      read: false,
      time: "5 mins ago"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">

      {/* ===== NAVBAR ===== */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">

        <Link to="/tutor/dashboard" className="text-2xl font-bold text-emerald-600">
          TutorBook
        </Link>

        <div className="flex items-center space-x-8">

          <Link
            to="/tutor/dashboard"
            className="text-gray-700 hover:text-emerald-600 font-medium transition"
          >
            Dashboard
          </Link>

          <Link
            to="/tutor/profile"
            className="text-gray-700 hover:text-emerald-600 font-medium transition"
          >
            Manage Profile
          </Link>

          {/* 🔔 Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative"
            >
              <span className="text-2xl">🔔</span>

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white shadow-2xl rounded-xl py-3 z-50">
                <div className="flex justify-between items-center px-4 pb-2 border-b">
                  <h3 className="font-semibold text-gray-800">
                    Student Requests
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-emerald-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? "bg-emerald-50" : ""
                      }`}
                    >
                      <p className="text-sm text-gray-700">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 👤 Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                {user?.full_name?.charAt(0).toUpperCase()}
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl py-2">
                <div className="px-4 py-2 text-sm text-gray-600">
                  {user?.full_name}
                </div>
                <div className="px-4 py-2 text-xs text-gray-400">
                  {user?.email}
                </div>

                <hr className="my-2" />

                <Link
                  to="/tutor/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Edit Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* ===== CONTENT ===== */}
      <main className="max-w-7xl mx-auto px-8 py-10">
        <Outlet />
      </main>

    </div>
  );
};

export default TutorLayout;
