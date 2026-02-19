import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // 🔔 Mock Notifications (Replace later with API)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your session with John has been approved.",
      read: false,
      time: "2 mins ago"
    },
    {
      id: 2,
      message: "New tutor available in Mathematics.",
      read: true,
      time: "1 day ago"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  // Close dropdowns on outside click
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
    <div className="min-h-screen bg-gray-100">

      {/* ===== NAVBAR ===== */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <Link to="/student/dashboard" className="text-2xl font-bold text-blue-600">
          TutorBook
        </Link>

        <div className="flex items-center space-x-6">

          <Link
            to="/student/dashboard"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/student/sessions"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Sessions
          </Link>

          {/* 🔔 Notification Bell */}
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
              <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl py-3 z-50">
                <div className="flex justify-between items-center px-4 pb-2 border-b">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-4 text-sm text-gray-500 text-center">
                      No notifications
                    </p>
                  ) : (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-700">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))
                  )}
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
              <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                {user?.full_name?.charAt(0).toUpperCase()}
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-2">
                <div className="px-4 py-2 text-sm text-gray-600">
                  {user?.full_name}
                </div>
                <div className="px-4 py-2 text-xs text-gray-400">
                  {user?.email}
                </div>

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* ===== PAGE CONTENT ===== */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

    </div>
  );
};

export default StudentLayout;
