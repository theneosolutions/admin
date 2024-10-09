import { LuLayoutDashboard } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { IoNotificationsSharp } from "react-icons/io5";
import { AiOutlineCalculator } from "react-icons/ai";
import NotFound from "Pages/NotFound";
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
import CreateUser from "Pages/Administrator/createNewAdmin";
import Response from "Pages/Response/decisionsResponse";
import ResponsePageLayout from "Pages/Response/ResponsePageLayout";
import LosPageLayout from "Pages/LOS/LosPageLayout";
import CreateType from "Pages/LOS/createType";
import LoanApplications from "Pages/Applications/UserApplications";
import Notifications from "Pages/Notifications/notificationsDashboard";
import UserDashboard from "Pages/Users/dashboard";
import TermAndConditions from "Pages/Notifications/termsConditions";
import Simah from "Pages/Simah/simah";
import BlackListCountries from "Pages/Simah/blackListCountries";
import SimahPageLayout from "Pages/Simah/SimahLayout";
import CalculationsPageLayout from "Pages/Calculations/Layout";
import Calculations from "Pages/Calculations";
import BareMinimumExpense from "Pages/Calculations/BareMinimumExpense";
import TermsAndRates from "Pages/Calculations/termsAndRates";
import AddRoles from "Pages/Administrator/AddPermissionsToRoles";
import AdminPageLayout from "Pages/Administrator/Layout";
import ApplicationsPageLayout from "Pages/Applications/Layout";
import Sms from "Pages/Notifications/sms";
import CustomerEmi from "Pages/Users/customerEmi";
import PoliciesPageLayout from "Pages/Policies/PoliciesPageLayout";
import ViewPolicies from "Pages/Policies/viewPolicies";
import SelaaPageLayout from "Pages/Selaa/selahPageLayout";
import SelaaHistory from "Pages/Selaa/history";
import SelaaTransaction from "Pages/Selaa/Transaction";
import SelaaAccomodity from "Pages/Selaa/accomodity";
import SelaaWallet from "Pages/Selaa/wallet";
import AwareNessMessage from "Pages/Notifications/AwarnessMessage";
import { CODE } from "../constants/codes";
import BankAccountPageLayout from "Pages/BankAccounts/bankAccountPageLayout";
import Disbursement from "Pages/BankAccounts/disburstment";
import RepaymentAccount from "Pages/BankAccounts/repayment";

const appRoutes = [
  {
    index: true,
    element: <UserList />,
    state: "home",
  },
  {
    id: 1,
    code: CODE.OVERVIEW,
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Overview",
      icon: <GrOverview />,
    },
    child: [
      // {
      //   id: 2,
      //   code: CODE.OVERVIEW_ACCOUNT,
      //   index: true,
      //   element: <UserList />,
      //   state: "dashboard.index",
      // },
      {
        id: 2,
        code: CODE.OVERVIEW_ACCOUNT,
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
    id: 3,
    code: CODE.APPLICATIONS,
    path: "/applications",
    element: <ApplicationsPageLayout />,
    state: "applications",
    sidebarProps: {
      displayText: "Applications",
      icon: <LuLayoutDashboard />,
    },
    child: [
      // {
      //   id: 4,
      //   code: CODE.LOAN_APPLICATIONS,
      //   index: true,
      //   element: <LoanApplications />,
      //   state: "applications.index",
      // },
      {
        id: 4,
        code: CODE.LOAN_APPLICATIONS,
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
    id: 5,
    code: CODE.CUSTOMERS,
    path: "/customers",
    element: <UsersPageLayout />,
    state: "customers",
    sidebarProps: {
      displayText: "Customers",
      icon: <FaUser />,
    },
    child: [
      // {
      //   id: 6,
      //   code: CODE.CUSTOMER_DASHBOARD,
      //   index: true,
      //   element: <UserDashboard />,
      //   state: "customers.index",
      // },

      {
        id: 6,
        code: CODE.CUSTOMER_DASHBOARD,
        path: "/customers/dashboard",
        element: <UserDashboard />,
        state: "customers.dashboard",

        sidebarProps: {
          displayText: "Customers Dashboard",
        },
      },
      {
        id: 7,
        code: CODE.ALL_CUSTOMERS,
        path: "/customers/allcustomers",
        element: <AllUsers />,
        state: "customers.allcustomers",
        sidebarProps: {
          displayText: "All Customers",
        },
      },
      {
        id: 8,
        code: CODE.VERIFIED_CUSTOMERS,
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
    id: 9,
    code: CODE.ADMINISTRATOR,
    path: "/admin",
    element: <AdminPageLayout />,
    state: "admin",
    sidebarProps: {
      displayText: "Administrator",
      icon: <MdOutlineAdminPanelSettings />,
    },
    child: [
      // {
      //   id: 10,
      //   code: CODE.CREATE_ADMIN,
      //   index: true,
      //   element: <AddRoles />,
      //   state: "admin.index",
      // },
      {
        id: 10,
        code: CODE.CREATE_ADMIN,
        path: "/admin/create-admin",
        element: <CreateUser />,
        state: "admin.create-admin",
        sidebarProps: {
          displayText: "Create Admin",
        },
      },
      {
        id: 11,
        code: CODE.ASSIGN_PERMISSIONS_TO_ROLE,
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
    id: 12,
    code: CODE.SEELA,
    path: "/selaa",
    element: <SelaaPageLayout />,
    state: "selaa",
    sidebarProps: {
      displayText: "Selaa",
      icon: <MdOutlineAdminPanelSettings />,
    },
    child: [
      // {
      //   id: 13,
      //   code: CODE.SEELA_HISTORY,
      //   index: true,
      //   element: <SelaaHistory />,
      //   state: "selaa.index",
      // },
      {
        id: 13,
        code: CODE.SEELA_HISTORY,
        path: "/selaa/history",
        element: <SelaaHistory />,
        state: "selaa.history",
        sidebarProps: {
          displayText: "History",
        },
      },
      {
        id: 14,
        code: CODE.SEELA_TRANSACTION,
        path: "/selaa/transaction",
        element: <SelaaTransaction />,
        state: "selaa.transaction",
        sidebarProps: {
          displayText: "Transaction",
        },
      },
      {
        id: 15,
        code: CODE.SEELA_COMMODITY,
        path: "/selaa/commodity",
        element: <SelaaAccomodity />,
        state: "selaa.commodity",
        sidebarProps: {
          displayText: "Commodity",
        },
      },
      {
        id: 16,
        code: CODE.SEELA_WALLET,
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
    id: 17,
    code: CODE.POLICIES,
    path: "/policies",
    element: <PoliciesPageLayout />,
    state: "policies",
    sidebarProps: {
      displayText: "Policies",
      icon: <MdOutlineAdminPanelSettings />,
    },
    child: [
      // {
      //   id: 18,
      //   code: CODE.VIEW_POLICIES,
      //   index: true,
      //   element: <ViewPolicies />,
      //   state: "policies.index",
      // },
      {
        id: 18,
        code: CODE.VIEW_POLICIES,
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
    id: 22,
    code: CODE.LOAN_MANAGEMENT,
    path: "/los",
    element: <DecisionLayout />,
    state: "los",
    sidebarProps: {
      displayText: "Loan Management",
      icon: <TbMoneybag />,
    },
    child: [
      // {
      //   id: 23,
      //   code: CODE.CREATE_TYPE,
      //   index: true,
      //   element: <LosPageLayout />,
      //   state: "los.index",
      // },
      {
        id: 23,
        code: CODE.CREATE_TYPE,
        path: "/los/create-type",
        element: <CreateType />,
        state: "los.create-type",
        sidebarProps: {
          displayText: "Create Type",
        },
      },
      {
        id: 24,
        code: CODE.CUSTOMER_EMI,
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
    id: 25,
    code: CODE.DECISIONS,
    path: "/decisions",
    element: <DecisionLayout />,
    state: "decisions",
    sidebarProps: {
      displayText: "Decisions",
      icon: <IoMdCheckboxOutline />,
    },
    child: [
      // {
      //   id: 26,
      //   code: CODE.QUESTIONS,
      //   index: true,
      //   element: <QuestionsAnswers />,
      //   state: "decisions.index",
      // },
      {
        id: 26,
        code: CODE.QUESTIONS,
        path: "/decisions/q/a",
        element: <QuestionsAnswers />,
        state: "decisions.qa",
        sidebarProps: {
          displayText: "Questions",
        },
      },
      {
        id: 27,
        code: CODE.CREATE_SET,
        path: "/decisions/create-set",
        element: <CreateSet />,
        state: "decisions.create-set",
        sidebarProps: {
          displayText: "Create Set",
        },
      },

      {
        id: 28,
        code: CODE.CREATE_DECISION,
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
    id: 29,
    code: CODE.NOTIFICATIONS,
    path: "/response",
    element: <ResponsePageLayout />,
    state: "response",
    sidebarProps: {
      displayText: "Notifications",
      icon: <IoNotificationsSharp />,
    },
    child: [
      // {
      //   id: 30,
      //   code: CODE.NOTIFICATIONS_DASHBOARD,
      //   index: true,
      //   element: <Response />,
      //   state: "response.index",
      // },

      {
        id: 30,

        code: CODE.NOTIFICATIONS_DASHBOARD,
        path: "/response/notifications",
        element: <Notifications />,
        state: "response.notifications",
        sidebarProps: {
          displayText: "Notifications",
        },
      },
      {
        id: 31,
        code: CODE.TERMS_AND_CONDITIONS,
        path: "/response/term-conditions",
        element: <TermAndConditions />,
        state: "response.term-conditions",
        sidebarProps: {
          displayText: "Term And Conditions",
        },
      },
      {
        id: 32,
        code: CODE.AWARNESS_MESSAGE,
        path: "/response/awareness-messages",
        element: <AwareNessMessage />,
        state: "response.awareness-messages",
        sidebarProps: {
          displayText: "Awareness Messages",
        },
      },

      {
        id: 33,
        code: CODE.ADD_SMS,
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
    id: 34,
    code: CODE.SIMAH,
    path: "/simah",
    element: <SimahPageLayout />,
    state: "simah",
    sidebarProps: {
      displayText: "Simah",
      icon: <MdOutlineQuestionAnswer />,
    },
    child: [
      // {
      //   id: 35,
      //   code: CODE.SIMAH_DASHBOARD,
      //   index: true,
      //   element: <Simah />,
      //   state: "simah.index",
      // },
      {
        id: 35,
        code: CODE.SIMAH_DASHBOARD,
        path: "/simah/codes",
        element: <Simah />,
        state: "simah.codes",
        sidebarProps: {
          displayText: "Simah",
        },
      },
      {
        id: 43,
        code: CODE.SIMAH_BLACKLISTED_COIUNTRIES,
        path: "/simah/blacklist",
        element: <BlackListCountries />,
        state: "simah.blacklist",
        sidebarProps: {
          displayText: "Blacklisted countries",
        },
      },
    ],
  },
  {
    id: 36,
    code: CODE.CALCULATIONS,
    path: "/calculations",
    element: <CalculationsPageLayout />,
    state: "calculations",
    sidebarProps: {
      displayText: "Calculations",
      icon: <AiOutlineCalculator />,
    },
    child: [
      // {
      //   id: 37,
      //   code: CODE.CALCULATIONS_DBR,
      //   index: true,
      //   element: <Calculations />,
      //   state: "calculations.index",
      // },
      {
        id: 37,
        code: CODE.CALCULATIONS_DBR,
        path: "/calculations/dbr",
        element: <Calculations />,
        state: "calculations.dbr",
        sidebarProps: {
          displayText: "DBR",
        },
      },
      {
        id: 38,
        code: CODE.CALCULATION_BARE_MINIMUM_EXPENSE,
        path: "/calculations/bare-minimum-expense",
        element: <BareMinimumExpense />,
        state: "calculations.bare-minimum-expense",
        sidebarProps: {
          displayText: "Bare Minimum Expense",
        },
      },
      {
        id: 39,
        code: CODE.CALCULATIONS_TERMS_AND_RATES,
        path: "/calculations/terms-rates",
        element: <TermsAndRates />,
        state: "calculations.terms-rates",
        sidebarProps: {
          displayText: "Terms And Rates",
        },
      },
    ],
  },

  {
    id: 40,
    code: CODE.SEULAH_BANK_ACCOUNT_DETAILS,
    path: "/seulah_bank_details",
    element: <BankAccountPageLayout />,
    state: "seulah_bank_details",
    sidebarProps: {
      displayText: "Seulah Bank Account Details",
      icon: <MdOutlineQuestionAnswer />,
    },
    child: [
      // {
      //   id: 41,
      //   code: CODE.DISBURSEMENT_ACCOUNT,
      //   index: true,
      //   element: <Disbursement />,
      //   state: "seulah_bank_details.index",
      // },
      {
        id: 41,
        code: CODE.DISBURSEMENT_ACCOUNT,
        path: "/seulah_bank_details/disbursement",
        element: <Disbursement />,
        state: "seulah_bank_details.disbursement",
        sidebarProps: {
          displayText: "Disbursement Account",
        },
      },
      {
        id: 42,
        code: CODE.REPAYMENT_ACCOUNT,
        path: "/seulah_bank_details/repayment",
        element: <RepaymentAccount />,
        state: "seulah_bank_details.repayment",
        sidebarProps: {
          displayText: "Repayment Account",
        },
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
export default appRoutes;
