import { LuLayoutDashboard } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineQuestionAnswer } from "react-icons/md";

import DashboardIndex from "../Pages/Dashboard/DashboardIndex";
import DashboardPageLayout from "../Pages/Dashboard/DashboardPageLayout";
import Applications from "../Pages/Dashboard/Applications";
import Demo from "../Pages/Dashboard/Demo";
import UserList from "../Pages/Dashboard/UserList";
import UsersPageLayout from "../Pages/Users/UsersPageLayout";
import Verified from "../Pages/Users/verified";
import Unverified from "../Pages/Users/unverified";
import Dump from "../Pages/Users/dump";
import DecisionLayout from "../Pages/Decision/DecisionPageLayout";
import QuestionsAnswers from "../Pages/Decision/Question&Answers";
import CreateSet from "../Pages/Decision/CreateSet";
import CreateDecision from "../Pages/Decision/CreateDecision";
import AllDecisions from "../Pages/Decision/AllDecisions";
import CreateUser from "Pages/Users/create-user";
import Response from "Pages/Response/decisionsResponse";
import ResponsePageLayout from "Pages/Response/ResponsePageLayout";
import LosPageLayout from "Pages/LOS/LosPageLayout";
import CreateType from "Pages/LOS/createType";
import LoanApplications from "Pages/LOS/loanApplications";
import UserProfile from "Pages/Users/userProfile";
import Notifications from "Pages/Notifications/notificationsDashboard";
import UserDashboard from "Pages/Users/dashboard";
import AllInstallments from "Pages/LOS/installments/allinstallments";

const appRoutes = [
  {
    index: true,
    element: <UserList />,
    state: "home",
  },

  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <LuLayoutDashboard />,
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index",
      },
      {
        path: "/dashboard/userlist",
        element: <UserList />,
        state: "dashboard.userlist",
        sidebarProps: {
          displayText: "User List",
        },
      },
      {
        path: "/dashboard/application",
        element: <Applications />,
        state: "dashboard.application",
        sidebarProps: {
          displayText: "Applications",
        },
      },

      {
        path: "/dashboard/demo",
        element: <Demo />,
        state: "dashboard.demo",
        sidebarProps: {
          displayText: "Demo",
        },
      },
    ],
  },

  {
    path: "/users",
    element: <UsersPageLayout />,
    state: "users",
    sidebarProps: {
      displayText: "Users",
      icon: <FaUser />,
    },
    child: [
      {
        index: true,
        element: <UserDashboard />,
        state: "users.index",
      },
      // {
      //   index: true,
      //   element: <DashboardIndex />,
      //   state: "users.index",
      // },
      {
        path: "/users/dashboard",
        element: <UserDashboard />,
        state: "users.dashboard",
        sidebarProps: {
          displayText: "User Dashboard",
        },
      },
      {
        path: "/users/verified",
        element: <Verified />,
        state: "users.verified",
        sidebarProps: {
          displayText: "Verified",
        },
      },
      {
        path: "/users/unverified",
        element: <Unverified />,
        state: "users.unverified",
        sidebarProps: {
          displayText: "Unverified",
        },
      },
      {
        path: "/users/dump",
        element: <Dump />,
        state: "users.dump",
        sidebarProps: {
          displayText: "Dump",
        },
      },
      {
        path: "/users/create-user",
        element: <CreateUser />,
        state: "users.create-user",
        sidebarProps: {
          displayText: "Create User",
        },
      },
      // {
      //   path: "/users/user-profile",
      //   element: <UserProfile />,
      //   state: "users.user-profile",
      //   sidebarProps: {
      //     displayText: "User Profile",
      //   },
      // },
    ],
  },
  {
    path: "/los",
    element: <DecisionLayout />,
    state: "los",
    sidebarProps: {
      displayText: "Loan Management",
      icon: <IoMdCheckboxOutline />,
    },
    child: [
      {
        index: true,
        element: <LosPageLayout />,
        state: "los.index",
      },
      {
        path: "/los/create-type",
        element: <CreateType />,
        state: "los.create-type",
        sidebarProps: {
          displayText: "Create Type",
        },
      },
      {
        path: "/los/applications",
        element: <LoanApplications />,
        state: "los.applications",
        sidebarProps: {
          displayText: "Loan Applications",
        },
      },
      {
        path: "/los/installments",
        element: <AllInstallments />,
        state: "los.insallments",
        sidebarProps: {
          displayText: "Installments",
        },
      },
    ],
  },
  {
    path: "/decisions",
    element: <DecisionLayout />,
    state: "decisions",
    sidebarProps: {
      displayText: "Decisions",
      icon: <IoMdCheckboxOutline />,
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "decisions.index",
      },
      {
        path: "/decisions/q/a",
        element: <QuestionsAnswers />,
        state: "decisions.qa",
        sidebarProps: {
          displayText: "Questions",
        },
      },
      {
        path: "/decisions/create-set",
        element: <CreateSet />,
        state: "decisions.create-set",
        sidebarProps: {
          displayText: "Create Set",
        },
      },

      {
        path: "/decisions/create-decision",
        element: <CreateDecision />,
        state: "decisions.create-decision",
        sidebarProps: {
          displayText: "Create Decision",
        },
      },
      {
        path: "/decisions/all-decisions",
        element: <AllDecisions />,
        state: "decisions.all-decisions",
        sidebarProps: {
          displayText: "All Decisions",
        },
      },
    ],
  },
  {
    path: "/response",
    element: <ResponsePageLayout />,
    state: "response",
    sidebarProps: {
      displayText: "Response",
      icon: <MdOutlineQuestionAnswer />,
    },
    child: [
      {
        index: true,
        element: <Response />,
        state: "response.index",
      },
      {
        path: "/response/response",
        element: <Response />,
        state: "response.response",
        sidebarProps: {
          displayText: "Decision Responses",
        },
      },
      {
        path: "/response/notifications",
        element: <Notifications />,
        state: "response.notifications",
        sidebarProps: {
          displayText: "Notifications",
        },
      },
    ],
  },
];
export default appRoutes;
