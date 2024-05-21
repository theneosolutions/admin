import React from "react";

import { FaTimes } from "react-icons/fa";
import appRoutes from "../../Routes/appRoutes";

import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import Logo from "../../Assets/Images/logo.svg";
import "./sidebar.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
function App({ isOpen, toggleSidebar }) {
  const sidebarWidth = isOpen ? "w-72" : "w-0"; // Adjust sidebar width
  const { t } = useTranslation();

  const userRole = useSelector((state) => state.role); // Assuming the user role is stored in the Redux state under `user.role`

  // Filter routes based on user role
  const filteredRoutes = appRoutes.filter((route) => {
    // Assuming each route has a `roles` property containing an array of roles
    if (route.roles) {
      return route.roles.includes(userRole);
    }
    return false; // Include routes without roles or sidebarProps
  });

  return (
    <div className="flex  flex-col bg-greeen-400">
      <div
        style={{ background: "#1C2434" }}
        className={`h-screen ${sidebarWidth} text-white  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out transform`}
      >
        <div style={{ height: "16vh" }} className="">
          <div className=" h-12 justify-end flex">
            <FaTimes
              size={20}
              onClick={() => toggleSidebar()}
              className="mt-5 mx-5 cursor-pointer"
            />
          </div>
          <div className="px-8">
            <img src={Logo} className="mb-5" />
          </div>
        </div>

        <div className="mt-3 overflow-y-auto 	" style={{ height: "84vh" }}>
          <div className="px-8">
            <a className="mt-10  uppercase text-gray-200">{t("Menu")}</a>
          </div>

          {filteredRoutes?.map((route, index) =>
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
