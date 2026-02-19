import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-red-600 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <Link to="dashboard">Dashboard</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
