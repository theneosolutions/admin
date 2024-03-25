import { LuLayoutDashboard } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import DashboardIndex from "../Pages/Dashboard/DashboardIndex";
import DashboardPageLayout from "../Pages/Dashboard/DashboardPageLayout";
import UserList from "../Pages/Dashboard/UserList";
import UsersPageLayout from "../Pages/Users/UsersPageLayout";
import Verified from "../Pages/Users/verified";
import AllUsers from "../Pages/Users/AllUsers";
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
import Notifications from "Pages/Notifications/notificationsDashboard";
import UserDashboard from "Pages/Users/dashboard";
import AllInstallments from "Pages/LOS/installments/allinstallments";
import TermAndConditions from "Pages/Notifications/termsConditions";
import Simah from "Pages/Simah/simah";
import SimahPageLayout from "Pages/Simah/SimahLayout";
import Aggreement from "Pages/Notifications/termsConditions/agreement";
import { ROLES } from "../constants/roles";
import CalculationsPageLayout from "Pages/Calculations/CalculationsPageLayout";
import Calculations from "Pages/Calculations";
import BareMinimumExpense from "Pages/Calculations/BareMinimumExpense";
import TermsAndRates from "Pages/Calculations/termsAndRates";

const appRoutes = [
  {
    index: true,
    element: <UserList />,
    state: "home",
  },
  {
    roles: [ROLES.ADMIN, ROLES.SALES], // Example roles allowed to access this route
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
    ],
  },

  {
    roles: [ROLES.ADMIN, ROLES.CUSTOMER_CARE, ROLES.COMPLIANCE], // Example roles allowed to access this route
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

      {
        path: "/users/dashboard",
        element: <UserDashboard />,
        state: "users.dashboard",
        sidebarProps: {
          displayText: "User Dashboard",
        },
      },
      {
        path: "/users/allusers",
        element: <AllUsers />,
        state: "users.allusers",
        sidebarProps: {
          displayText: "All Users",
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
      // {
      //   path: "/users/unverified",
      //   element: <Unverified />,
      //   state: "users.unverified",
      //   sidebarProps: {
      //     displayText: "Unverified",
      //   },
      // },
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
    ],
  },
  {
    roles: [ROLES.ADMIN, ROLES.UNDER_WRITER], // Example roles allowed to access this route

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
    roles: [ROLES.ADMIN, ROLES.UNDER_WRITER, ROLES.MODERATOR], // Example roles allowed to access this route

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
    roles: [ROLES.ADMIN, ROLES.CUSTOMER_CARE], // Example roles allowed to access this route

    path: "/response",
    element: <ResponsePageLayout />,
    state: "response",
    sidebarProps: {
      displayText: "Notifications",
      icon: <MdOutlineQuestionAnswer />,
    },
    child: [
      {
        index: true,
        element: <Response />,
        state: "response.index",
      },
      // {
      //   path: "/response/response",
      //   element: <Response />,
      //   state: "response.response",
      //   sidebarProps: {
      //     displayText: "Decision Responses",
      //   },
      // },
      {
        path: "/response/notifications",
        element: <Notifications />,
        state: "response.notifications",
        sidebarProps: {
          displayText: "Notifications",
        },
      },
      {
        path: "/response/term-conditions",
        element: <TermAndConditions />,
        state: "response.term-conditions",
        sidebarProps: {
          displayText: "Term And Conditions",
        },
      },
      {
        path: "/response/aggrement",
        element: <Aggreement />,
        state: "response.aggrement",
        sidebarProps: {
          displayText: "Aggrement",
        },
      },
    ],
  },
  {
    roles: [ROLES.ADMIN, ROLES.UNDER_WRITER], // Example roles allowed to access this route

    path: "/simah",
    element: <SimahPageLayout />,
    state: "simah",
    sidebarProps: {
      displayText: "Simah",
      icon: <MdOutlineQuestionAnswer />,
    },
    child: [
      {
        index: true,
        element: <Simah />,
        state: "simah.index",
      },
      {
        path: "/simah/codes",
        element: <Simah />,
        state: "simah.codes",
        sidebarProps: {
          displayText: "Simah",
        },
      },
    ],
  },
  {
    roles: [ROLES.ADMIN, ROLES.UNDER_WRITER], // Example roles allowed to access this route
    path: "/calculations",
    element: <CalculationsPageLayout />,
    state: "calculations",
    sidebarProps: {
      displayText: "calculations",
      icon: <MdOutlineQuestionAnswer />,
    },
    child: [
      {
        index: true,
        element: <Calculations />,
        state: "calculations.index",
      },
      {
        path: "/calculations/dbr",
        element: <Calculations />,
        state: "calculations.dbr",
        sidebarProps: {
          displayText: "DBR",
        },
      },
      {
        path: "/calculations/bare-minimum-expense",
        element: <BareMinimumExpense />,
        state: "calculations.bare-minimum-expense",
        sidebarProps: {
          displayText: "Bare Minimum Expense",
        },
      },
      {
        path: "/calculations/terms-rates",
        element: <TermsAndRates />,
        state: "calculations.terms-rates",
        sidebarProps: {
          displayText: "Terms And Rates",
        },
      },
    ],
  },
];
export default appRoutes;
