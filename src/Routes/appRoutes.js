import { LuLayoutDashboard } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { IoNotificationsSharp } from "react-icons/io5";
import { AiOutlineCalculator } from "react-icons/ai";
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
import CalculationsPageLayout from "Pages/Calculations/CalculationsPageLayout";
import Calculations from "Pages/Calculations";
import BareMinimumExpense from "Pages/Calculations/BareMinimumExpense";
import TermsAndRates from "Pages/Calculations/termsAndRates";
import AddRoles from "Pages/Administrator/AddRoles";
import AdminPageLayout from "Pages/Administrator/AdminPageLayout";
import ApplicationsPageLayout from "Pages/Applications/AdminPageLayout";
import Sms from "Pages/Notifications/sms";
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
    code: "overview",
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Overview",
      icon: <GrOverview />,
    },
    child: [
      {
        code: "overview_account",
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index",
      },
      {
        code: "overview_account",
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
    code: "applications",
    path: "/applications",
    element: <ApplicationsPageLayout />,
    state: "applications",
    sidebarProps: {
      displayText: "Applications",
      icon: <LuLayoutDashboard />,
    },
    child: [
      {
        code: "loan_applications",
        index: true,
        element: <LoanApplications />,
        state: "applications.index",
      },
      {
        code: "loan_applications",
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
    code: "customers",
    path: "/customers",
    element: <UsersPageLayout />,
    state: "customers",
    sidebarProps: {
      displayText: "Customers",
      icon: <FaUser />,
    },
    child: [
      {
        code: "customers_dashboard",
        index: true,
        element: <UserDashboard />,
        state: "customers.index",
      },

      {
        code: "customers_dashboard",
        path: "/customers/dashboard",
        element: <UserDashboard />,
        state: "customers.dashboard",

        sidebarProps: {
          displayText: "Customers Dashboard",
        },
      },
      {
        code: "all_customers",
        path: "/customers/allcustomers",
        element: <AllUsers />,
        state: "customers.allcustomers",
        sidebarProps: {
          displayText: "All Customers",
        },
      },
      {
        code: "verified_customers",
        path: "/customers/verified",
        element: <Verified />,
        state: "customers.verified",
        sidebarProps: {
          displayText: "Verified Customers",
        },
      },
    ],
  },
  {
    code: "administrator",
    path: "/admin",
    element: <AdminPageLayout />,
    state: "admin",
    sidebarProps: {
      displayText: "Administrator",
      icon: <MdOutlineAdminPanelSettings />,
    },
    child: [
      {
        code: "create_admin",
        index: true,
        element: <AddRoles />,
        state: "admin.index",
      },
      {
        code: "create_admin",
        path: "/admin/create-admin",
        element: <CreateUser />,
        state: "admin.create-admin",
        sidebarProps: {
          displayText: "Create Admin",
        },
      },
      {
        code: "assign_permissions_to_roles",
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
    code: "seela",
    path: "/selaa",
    element: <SelaaPageLayout />,
    state: "selaa",
    sidebarProps: {
      displayText: "Selaa",
      icon: <MdOutlineAdminPanelSettings />,
    },
    child: [
      {
        code: "seela_history",
        index: true,
        element: <SelaaHistory />,
        state: "selaa.index",
      },
      {
        code: "seela_history",
        path: "/selaa/history",
        element: <SelaaHistory />,
        state: "selaa.history",
        sidebarProps: {
          displayText: "History",
        },
      },
      {
        code: "seela_transaction",
        path: "/selaa/transaction",
        element: <SelaaTransaction />,
        state: "selaa.transaction",
        sidebarProps: {
          displayText: "Transaction",
        },
      },
      {
        code: "seela_commodity",
        path: "/selaa/commodity",
        element: <SelaaAccomodity />,
        state: "selaa.commodity",
        sidebarProps: {
          displayText: "Commodity",
        },
      },
      {
        code: "seela_wallet",
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
    code: "policies",
    path: "/policies",
    element: <PoliciesPageLayout />,
    state: "policies",
    sidebarProps: {
      displayText: "Policies",
      icon: <MdOutlineAdminPanelSettings />,
    },
    child: [
      {
        code: "view_policies",
        index: true,
        element: <ViewPolicies />,
        state: "policies.index",
      },
      {
        code: "view_policies",
        path: "/policies/view-policies",
        element: <ViewPolicies />,
        state: "policies.view-policies",
        sidebarProps: {
          displayText: "View Policies",
        },
      },
    ],
  },
  {
    code: "loan_management",
    path: "/los",
    element: <DecisionLayout />,
    state: "los",
    sidebarProps: {
      displayText: "Loan Management",
      icon: <TbMoneybag />,
    },
    child: [
      {
        code: "create_type",
        index: true,
        element: <LosPageLayout />,
        state: "los.index",
      },
      {
        code: "create_type",
        path: "/los/create-type",
        element: <CreateType />,
        state: "los.create-type",
        sidebarProps: {
          displayText: "Create Type",
        },
      },
      {
        code: "customer_emi",
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
    code: "decisions",
    path: "/decisions",
    element: <DecisionLayout />,
    state: "decisions",
    sidebarProps: {
      displayText: "Decisions",
      icon: <IoMdCheckboxOutline />,
    },
    child: [
      {
        code: "questions",
        index: true,
        element: <QuestionsAnswers />,
        state: "decisions.index",
      },
      {
        code: "questions",
        path: "/decisions/q/a",
        element: <QuestionsAnswers />,
        state: "decisions.qa",
        sidebarProps: {
          displayText: "Questions",
        },
      },
      {
        code: "create_set",
        path: "/decisions/create-set",
        element: <CreateSet />,
        state: "decisions.create-set",
        sidebarProps: {
          displayText: "Create Set",
        },
      },

      {
        code: "create_decisions",
        path: "/decisions/create-decision",
        element: <CreateDecision />,
        state: "decisions.create-decision",
        sidebarProps: {
          displayText: "Create Decision",
        },
      },
    ],
  },
  {
    code: "notifications",
    path: "/response",
    element: <ResponsePageLayout />,
    state: "response",
    sidebarProps: {
      displayText: "Notifications",
      icon: <IoNotificationsSharp />,
    },
    child: [
      {
        code: "notifications_dashboard",
        index: true,
        element: <Response />,
        state: "response.index",
      },

      {
        code: "notifications_dashboard",
        path: "/response/notifications",
        element: <Notifications />,
        state: "response.notifications",
        sidebarProps: {
          displayText: "Notifications",
        },
      },
      {
        code: "terms_and_conditions",
        path: "/response/term-conditions",
        element: <TermAndConditions />,
        state: "response.term-conditions",
        sidebarProps: {
          displayText: "Term And Conditions",
        },
      },
      {
        code: "awareness_messages",
        path: "/response/awareness-messages",
        element: <AwareNessMessage />,
        state: "response.awareness-messages",
        sidebarProps: {
          displayText: "Awareness Messages",
        },
      },

      {
        code: "add_sms",
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
    code: "simah",
    path: "/simah",
    element: <SimahPageLayout />,
    state: "simah",
    sidebarProps: {
      displayText: "Simah",
      icon: <MdOutlineQuestionAnswer />,
    },
    child: [
      {
        code: "simah_dashboard",
        index: true,
        element: <Simah />,
        state: "simah.index",
      },
      {
        code: "simah_dashboard",
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
    code: "calculations",
    path: "/calculations",
    element: <CalculationsPageLayout />,
    state: "calculations",
    sidebarProps: {
      displayText: "Calculations",
      icon: <AiOutlineCalculator />,
    },
    child: [
      {
        code: "calculations_dbr",
        index: true,
        element: <Calculations />,
        state: "calculations.index",
      },
      {
        code: "calculations_dbr",
        path: "/calculations/dbr",
        element: <Calculations />,
        state: "calculations.dbr",
        sidebarProps: {
          displayText: "DBR",
        },
      },
      {
        code: "calculations_bare_minimum_expenses",
        path: "/calculations/bare-minimum-expense",
        element: <BareMinimumExpense />,
        state: "calculations.bare-minimum-expense",
        sidebarProps: {
          displayText: "Bare Minimum Expense",
        },
      },
      {
        code: "calculations_terms_and_rates",
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
