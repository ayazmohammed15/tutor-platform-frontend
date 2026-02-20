import RoleSidebar from './RoleSidebar';

const RoleLayout = ({ role, children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <RoleSidebar role={role} />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
      
    </div>
  );
};

export default RoleLayout;
