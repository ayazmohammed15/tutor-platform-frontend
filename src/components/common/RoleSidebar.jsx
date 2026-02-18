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
    <aside className="sticky top-24 h-full overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
          {role}
        </h2>
        <p className="mt-1 text-lg font-semibold text-white">Navigation</p>
      </div>

      <nav className="space-y-1 p-3">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
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
