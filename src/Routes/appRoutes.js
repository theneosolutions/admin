import { LuLayoutDashboard } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { ROLES } from "../constants/roles";
import DashboardIndex from "../Pages/Dashboard/DashboardIndex";
import DashboardPageLayout from "../Pages/Dashboard/DashboardPageLayout";
import UserList from "../Pages/Dashboard/UserList";
import UsersPageLayout from "../Pages/Users/UsersPageLayout";
import Verified from "../Pages/Users/verified";
import AllUsers from "../Pages/Users/AllUsers";
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
import TermAndConditions from "Pages/Notifications/termsConditions";
import Simah from "Pages/Simah/simah";
import SimahPageLayout from "Pages/Simah/SimahLayout";
import Aggreement from "Pages/Notifications/termsConditions/agreement";
import CalculationsPageLayout from "Pages/Calculations/CalculationsPageLayout";
import Calculations from "Pages/Calculations";
import BareMinimumExpense from "Pages/Calculations/BareMinimumExpense";
import TermsAndRates from "Pages/Calculations/termsAndRates";
import AddRoles from "Pages/Administrator/AddRoles";
import AdminPageLayout from "Pages/Administrator/AdminPageLayout";
import ApplicationsPageLayout from "Pages/Applications/AdminPageLayout";
import { GrOverview } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { IoNotificationsSharp } from "react-icons/io5";
import { AiOutlineCalculator } from "react-icons/ai";
import Sms from "Pages/Notifications/sms";

import UserSimah from "Pages/Simah/simahDownlaod";
import CustomerEmi from "Pages/Users/customerEmi";
import PoliciesPageLayout from "Pages/Policies/PoliciesPageLayout";
import ViewPolicies from "Pages/Policies/viewPolicies";
import SelaaPageLayout from "Pages/Selaa/selahPageLayout";
import SelaaHistory from "Pages/Selaa/history";
import SelaaTransaction from "Pages/Selaa/Transaction";
import SelaaAccomodity from "Pages/Selaa/accomodity";
import SelaaWallet from "Pages/Selaa/wallet";
import AwareNessMessage from "Pages/AwarnessMessage";

const appRoutes = [
  {
    index: true,
    element: <UserList />,
    state: "home",
  },
  {
    id: "Overview",
    roles: [ROLES.ADMIN, ROLES.SALES], // Example roles allowed to access this route
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Overview",
      icon: <GrOverview />,
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index",
      },
      {
        path: "/dashboard/account",
        element: <UserList />,
        state: "dashboard.account",
        sidebarProps: {
          displayText: "Account",
        },
      },
    ],
  },

  {
    id: "APPLICATIONS",
    roles: [ROLES.ADMIN, ROLES.SALES, ROLES.UNDER_WRITER],
    path: "/applications",
    element: <ApplicationsPageLayout />,
    state: "applications",
    sidebarProps: {
      displayText: "Applications",
      icon: <LuLayoutDashboard />,
    },
    child: [
      {
        index: true,
        element: <LoanApplications />,
        state: "applications.index",
      },
      {
        path: "/applications/loan",
        element: <LoanApplications />,
        state: "applications.loan",
        sidebarProps: {
          displayText: "Loan Applications",
        },
      },
    ],
  },

  {
    roles: [
      ROLES.ADMIN,
      ROLES.CUSTOMER_CARE,
      ROLES.COMPLIANCE,
      ROLES.UNDER_WRITER,
    ],
    path: "/customers",
    element: <UsersPageLayout />,
    state: "customers",
    sidebarProps: {
      displayText: "Customers",
      icon: <FaUser />,
    },
    child: [
      {
        index: true,
        element: <UserDashboard />,
        state: "customers.index",
      },

      {
        path: "/customers/dashboard",
        element: <UserDashboard />,
        state: "customers.dashboard",
        sidebarProps: {
          displayText: "Customers Dashboard",
        },
      },
      {
        path: "/customers/allcustomers",
        element: <AllUsers />,
        state: "customers.allcustomers",
        sidebarProps: {
          displayText: "All Customers",
        },
      },
      {
        path: "/customers/verified",
        element: <Verified />,
        state: "customers.verified",
        sidebarProps: {
          displayText: "Verified Customers",
        },
      },

      // {
      //   path: "/customers/dump",
      //   element: <Dump />,
      //   state: "customers.dump",
      //   sidebarProps: {
      //     displayText: "Dump Customers",
      //   },
      // },
    ],
  },
  {
    roles: [ROLES.ADMIN],
    path: "/admin",
    element: <AdminPageLayout />,
    state: "admin",
    sidebarProps: {
      displayText: "Administrator",
      icon: <MdOutlineAdminPanelSettings />,
    },
    child: [
      {
        index: true,
        element: <AddRoles />,
        state: "admin.index",
      },
      {
        path: "/admin/create-admin",
        element: <CreateUser />,
        state: "admin.create-admin",
        sidebarProps: {
          displayText: "Create Admin",
        },
      },
      {
        path: "/admin/add-roles",
        element: <AddRoles />,
        state: "admin./add-roles",
        sidebarProps: {
          displayText: "Create Rights To User",
        },
      },
    ],
  },
  {
    roles: [ROLES.ADMIN, ROLES.UNDER_WRITER],
    path: "/selaa",
    element: <SelaaPageLayout />,
    state: "selaa",
    sidebarProps: {
      displayText: "Selaa",
      icon: <MdOutlineAdminPanelSettings />,
    },
    child: [
      {
        index: true,
        element: <SelaaHistory />,
        state: "selaa.index",
      },
      {
        path: "/selaa/history",
        element: <SelaaHistory />,
        state: "selaa.history",
        sidebarProps: {
          displayText: "History",
        },
      },
      {
        path: "/selaa/transaction",
        element: <SelaaTransaction />,
        state: "selaa.transaction",
        sidebarProps: {
          displayText: "Transaction",
        },
      },
      {
        path: "/selaa/commodity",
        element: <SelaaAccomodity />,
        state: "selaa.commodity",
        sidebarProps: {
          displayText: "Commodity",
        },
      },
      {
        path: "/selaa/wallet",
        element: <SelaaWallet />,
        state: "selaa.wallet",
        sidebarProps: {
          displayText: "Wallet",
        },
      },
    ],
  },
  {
    roles: [ROLES.ADMIN, ROLES.UNDER_WRITER],
    path: "/policies",
    element: <PoliciesPageLayout />,
    state: "policies",
    sidebarProps: {
      displayText: "Policies",
      icon: <MdOutlineAdminPanelSettings />,
    },
    child: [
      {
        index: true,
        element: <ViewPolicies />,
        state: "policies.index",
      },
      {
        path: "/policies/view-policies",
        element: <ViewPolicies />,
        state: "policies.view-policies",
        sidebarProps: {
          displayText: "View Policies",
        },
      },

      // {
      //   path: "/policies/create-policies",
      //   element: <Policies />,
      //   state: "policies.create-policies",
      //   sidebarProps: {
      //     displayText: "Create Policies",
      //   },
      // },
    ],
  },
  {
    roles: [ROLES.ADMIN, ROLES.UNDER_WRITER],

    path: "/los",
    element: <DecisionLayout />,
    state: "los",
    sidebarProps: {
      displayText: "Loan Management",
      icon: <TbMoneybag />,
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
        path: "/los/emi",
        element: <CustomerEmi />,
        state: "los.emi",
        sidebarProps: {
          displayText: "Customers EMI",
        },
      },
    ],
  },
  {
    roles: [ROLES.ADMIN, ROLES.MODERATOR, ROLES.UNDER_WRITER],

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
        element: <QuestionsAnswers />,
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
      // {
      //   path: "/decisions/all-decisions",
      //   element: <AllDecisions />,
      //   state: "decisions.all-decisions",
      //   sidebarProps: {
      //     displayText: "All Decisions",
      //   },
      // },
    ],
  },
  {
    roles: [ROLES.ADMIN, ROLES.CUSTOMER_CARE, ROLES.UNDER_WRITER], // Example roles allowed to access this route

    path: "/response",
    element: <ResponsePageLayout />,
    state: "response",
    sidebarProps: {
      displayText: "Notifications",
      icon: <IoNotificationsSharp />,
    },
    child: [
      {
        index: true,
        element: <Response />,
        state: "response.index",
      },

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
        path: "/response/awareness-messages",
        element: <AwareNessMessage />,
        state: "response.awareness-messages",
        sidebarProps: {
          displayText: "Awareness Messages",
        },
      },
      // {
      //   path: "/response/aggrement",
      //   element: <Aggreement />,
      //   state: "response.aggrement",
      //   sidebarProps: {
      //     displayText: "Agreement",
      //   },
      // },
      {
        path: "/response/sms",
        element: <Sms />,
        state: "response.sms",
        sidebarProps: {
          displayText: "Add SMS",
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
      // {
      //   path: "/simah/usercodes",
      //   element: <UserSimah />,
      //   state: "simah.usercodes",
      //   sidebarProps: {
      //     displayText: "UserSimah",
      //   },
      // },
    ],
  },
  {
    roles: [ROLES.ADMIN, ROLES.UNDER_WRITER], // Example roles allowed to access this route
    path: "/calculations",
    element: <CalculationsPageLayout />,
    state: "calculations",
    sidebarProps: {
      displayText: "Calculations",
      icon: <AiOutlineCalculator />,
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
