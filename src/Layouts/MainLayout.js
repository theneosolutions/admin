import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Header from "../Layouts/Header";
import appRoutes from "Routes/appRoutes";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const MainLayout = () => {
  const role = useSelector((state) => state.role);
  const islogin = useSelector((state) => state.islogin);
  const token = useSelector((state) => state.token);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false); // Close sidebar when screen width is less than or equal to 768px
      }
    };
    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs only once after initial render
  useEffect(() => {
    if (islogin && role && token && location?.pathname === "/") {
      const value = appRoutes.find((item) =>
        item?.child?.find(
          (sub) => sub.code === role?.permissions[0]?.subMenus[0]?.code
        )
      );

      if (value?.child[0]?.path) {
        navigate(value?.child[0]?.path);
      } else {
        navigate("/dashboard/account");
      }
    }
  }, [islogin, role, token]);
  return islogin ? (
    <div className={` bg-gray-200 flex flex-row fixed w-full `}>
      <Sidebar isOpen={isOpen} toggleSidebar={() => toggleSidebar()} />
      <div className="w-full bg-gray-200 h-screen  relative overflow-scroll">
        <Header toggleSidebar={() => toggleSidebar()} isOpen={isOpen} />
        <div className="md:px-10 px-3 pb-8  md:pt-6">{<Outlet />}</div>
      </div>
    </div>
  ) : (
    <Outlet />
  );
};

export default MainLayout;
