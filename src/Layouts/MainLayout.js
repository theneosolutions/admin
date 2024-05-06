import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";

import Header from "../Layouts/Header";
const MainLayout = () => {
  const isLogin = useSelector((state) => state.isLogin);
  console.log("isLogin", isLogin);
  const [isOpen, setIsOpen] = useState(true);
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

  return (
    <div className={` bg-gray-200 flex flex-row fixed w-full `}>
      <Sidebar isOpen={isOpen} toggleSidebar={() => toggleSidebar()} />
      <div className="w-full bg-gray-200 h-screen  relative overflow-scroll">
        <Header toggleSidebar={() => toggleSidebar()} isOpen={isOpen} />
        <div className="md:px-10 px-3 pb-8  md:pt-6">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default MainLayout;
