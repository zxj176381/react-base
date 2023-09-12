import {} from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};

export default Layout;
