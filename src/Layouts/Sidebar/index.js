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

  const filteredRoutes2 = appRoutes
    .map((route) => {
      // Check if the main route matches by name
      const isRouteMatch = data.some((item) => item.code === route.code);

      // Filter subMenus if they exist and match by code
      const filteredSubMenus = route.child
        ? route.child.filter((subMenu) =>
            data.some((item) =>
              item.subMenus.some((sub) => sub.code === subMenu.code)
            )
          )
        : [];

      // Include the route if it matches or has matching subMenus
      if (isRouteMatch || filteredSubMenus.length > 0) {
        return {
          ...route,
          child: filteredSubMenus.length > 0 ? filteredSubMenus : route.child,
        };
      }
      return null;
    })
    .filter((route) => route !== null);

  console.log("Filtered Routes 2: ", filteredRoutes2);
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

          {filteredRoutes2?.map((route, index) =>
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

const data = [
  {
    id: 1,
    name: "Overview",
    code: "overview",
    subMenus: [
      {
        id: 2,
        name: "Account",
        code: "overview_account",
      },
    ],
  },
  {
    id: 3,
    name: "Applications",
    code: "applications",
    subMenus: [
      {
        id: 4,
        name: "Loan Applications",
        code: "loan_applications",
      },
    ],
  },
  {
    id: 5,
    name: "Customers",
    code: "customers",
    subMenus: [
      {
        id: 6,
        name: "Customers Dashboard",
        code: "customers_dashboard",
      },
      {
        id: 7,
        name: "All Customers",
        code: "all_customers",
      },
      {
        id: 8,
        name: "Verified Customers",
        code: "verified_customers",
      },
    ],
  },
  {
    id: 9,
    name: "Administrator",
    code: "administrator",
    subMenus: [
      {
        id: 10,
        name: "Create Admin",
        code: "create_admin",
      },
      {
        id: 11,
        name: "Assign Permissions to Roles",
        code: "assign_permissions_to_roles",
      },
    ],
  },
  {
    id: 12,
    name: "Seela",
    code: "seela",
    subMenus: [
      {
        id: 13,
        name: "History",
        code: "seela_history",
      },
      {
        id: 14,
        name: "Transaction",
        code: "seela_transaction",
      },
      {
        id: 15,
        name: "Commodity",
        code: "seela_commodity",
      },
      {
        id: 16,
        name: "Wallet",
        code: "seela_wallet",
      },
    ],
  },
  {
    id: 17,
    name: "Policies",
    code: "policies",
    subMenus: [
      {
        id: 18,
        name: "View Policies",
        code: "view_policies",
      },
      {
        id: 19,
        name: "Approve Policy",
        code: "approve_policy",
      },
      {
        id: 20,
        name: "Reject Policy",
        code: "reject_policy",
      },
    ],
  },
  {
    id: 21,
    name: "Loan Management",
    code: "loan_management",
    subMenus: [
      {
        id: 22,
        name: "Create Type",
        code: "create_type",
      },
      {
        id: 23,
        name: "Customer EMI",
        code: "customer_emi",
      },
    ],
  },
  {
    id: 24,
    name: "Decisions",
    code: "decisions",
    subMenus: [
      {
        id: 25,
        name: "Questions",
        code: "questions",
      },
      {
        id: 26,
        name: "Create Set",
        code: "create_set",
      },
      {
        id: 27,
        name: "Create Decisions",
        code: "create_decisions",
      },
    ],
  },
  {
    id: 28,
    name: "Notifications",
    code: "notifications",
    subMenus: [
      {
        id: 29,
        name: "Notifications",
        code: "notifications_dashboard",
      },
      {
        id: 30,
        name: "Terms and Conditions",
        code: "terms_and_conditions",
      },
      {
        id: 31,
        name: "Awareness Messages",
        code: "awareness_messages",
      },
      {
        id: 32,
        name: "Add SMS",
        code: "add_sms",
      },
    ],
  },
  {
    id: 33,
    name: "Simah",
    code: "simah",
    subMenus: [
      {
        id: 34,
        name: "Simah",
        code: "simah_dashboard",
      },
    ],
  },
  {
    id: 35,
    name: "Calculations",
    code: "calculations",
    subMenus: [
      {
        id: 36,
        name: "DBR",
        code: "calculations_dbr",
      },
      {
        id: 37,
        name: "Bare Minimum Expenses",
        code: "calculations_bare_minimum_expenses",
      },
      {
        id: 38,
        name: "Terms and Rates",
        code: "calculations_terms_and_rates",
      },
    ],
  },
];
