import { NavLink } from 'react-router-dom';

const roleMenu = {
  student: [
    { label: 'Dashboard', to: '/student/dashboard' },
    { label: 'My Profile', to: '/student/profile' },
    { label: 'My Sessions', to: '/student/sessions' },
    { label: 'Assignments', to: '/student/assignments' },
    { label: 'Payments', to: '/student/payments' },
  ],
  tutor: [
    { label: 'Dashboard', to: '/tutor/dashboard' },
    { label: 'My Profile', to: '/tutor/profile' },
    { label: 'My Sessions', to: '/tutor/sessions' },
    { label: 'Assignments', to: '/tutor/assignments' },
    { label: 'Payments', to: '/tutor/payments' },
  ],
};

const RoleSidebar = ({ role }) => {
  const items = roleMenu[role] || [];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-100">
          {role}
        </h2>
        <p className="mt-1 text-lg font-semibold text-white">
          Navigation
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};

export default RoleSidebar;
