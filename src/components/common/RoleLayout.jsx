import RoleSidebar from './RoleSidebar';

const RoleLayout = ({ role, children }) => {
  return (
    <div className="grid min-h-[calc(100vh-8rem)] gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <RoleSidebar role={role} />
      <div className="min-w-0">{children}</div>
    </div>
  );
};

export default RoleLayout;
