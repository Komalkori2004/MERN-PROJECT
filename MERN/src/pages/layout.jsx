import { Outlet } from "react-router-dom";
import Navbar from "./nav";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Layout = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;