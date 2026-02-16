import RoleSidebar from './RoleSidebar';

const RoleLayout = ({ role, children }) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <RoleSidebar role={role} />
      <div>{children}</div>
    </div>
  );
};

export default RoleLayout;
