import { Outlet } from "react-router-dom";
import Navbar from "./nav";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;