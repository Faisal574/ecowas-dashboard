import SideNav from "./SideNav";

const Layout = ({ children }) => {
  return (
    <main className="flex items-start min-h-screen">
      <SideNav />
      {children}
    </main>
  );
};

export default Layout;
