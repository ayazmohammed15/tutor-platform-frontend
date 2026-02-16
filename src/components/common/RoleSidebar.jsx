import { NavLink } from 'react-router-dom';

const roleMenu = {
  student: [
    { label: 'Dashboard', to: '/student/dashboard' },
    { label: 'My profile', to: '/student/profile' },
    { label: 'My sessions', to: '/student/sessions' },
    { label: 'Assigments', to: '/student/assignments' },
    { label: 'Payments', to: '/student/payments' },
  ],
  tutor: [
    { label: 'Dashboard', to: '/tutor/dashboard' },
    { label: 'My profile', to: '/tutor/profile' },
    { label: 'My sessions', to: '/tutor/sessions' },
    { label: 'Assigments', to: '/tutor/assignments' },
    { label: 'Payments', to: '/tutor/payments' },
  ],
};

const RoleSidebar = ({ role }) => {
  const items = roleMenu[role] || [];

  return (
    <aside className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
        {role} menu
      </h2>
      <nav className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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
