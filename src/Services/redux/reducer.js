import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appState: "",
  addQuestions: {},
  getAllQuestions: [],
  addQuestionsSet: {},
  getAllSets: [],
  getLables: [],
  getSingleSetData: {},
  getSingleQuestion: {},
  getQuestionOfSet: {},
  getAllDecisions: [],
  addFormula: {},
  getAllUsers: [],
  message: "",
  open: false,
  error: false,
  Notifications: [],
  Loading: false,
  islogin: true, // HARDCODED
  user: {
    id: 1,
    img: null,
    email: "mzain@gmail.com",
    gender: null,
    idNumber: "1234567890",
    firstName: "Zain",
    lastName: null,
    language: "en",
    profileUrl: null,
    guardianName: null,
    mobileNumber: "966530210249",
    accountStatus: "0",
    failedAttempt: 4,
    absherAttempts: 0,
    arabic_fullName: null,
    hijriDateOfBirth: null,
    arabic_guardianName: null,
    relationshipStatus: null,
    ownerVerification: false,
    status: true,
    roles: [
      {
        id: 1,
        name: "Admin",
        code: "admin",
        permissions: [
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
        ],
      },
    ],
    active: true,
    accountNonLocked: false,
  },
  role: {
    id: 1,
    name: "Admin",
    code: "admin",
    permissions: [
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
    ],
  },
  token: null,
  verificationOtp: null,
  forgetVerificationOtp: null,
  getAllLoanReasons: [],
  getSetResponse: {},
  getScreensSets: {},
  getApplications: [],
  getLoanTax: {},
  getAppFlow: {},
  getGosiData: [],
  getAllCards: [],
  getUserApplication: {},
  getUserById: {},
  getTermsConditions: [],
  getNafith: {},
  getNafithSanad: {},
  getNafathDetail: {},
  getSimahCodes: {},
  getAllUsersAll: [],
  selaBalance: {},
  getAgreement: {},
  getScreenName: {},
  getAllDBR: [],
  getAllExpense: [],
  getAllTermsRates: [],
  getAllRoles: [],
  getSimahReport: [],
  getSmsOtp: [],
  getDevicesTokens: [],
  getAmlRecord: {},
  getEmdahReport: {},
  getAllUsersEmi: [],
  getSingleLoanTypeEmi: [],
  getTermRatesCalculations: {},
  getAllPolicies: [],
  getPolicyHistory: [],
  getEligibilityQuestions: [],
  getSeelahTransaction: [],
  getNotificationHeadings: [],
  permissions: [
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
          actions: [
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
  ],
  userPermissions: [
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
          actions: [
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
  ],
};
const Reducer = createSlice({
  name: "seulah",
  initialState,
  reducers: {
    AddQuestions: (state, action) => {
      const { data } = action.payload;
      state.addQuestions = data;
    },
    GetAllQuestions: (state, action) => {
      const { data } = action.payload;
      state.getAllQuestions = data;
    },
    AddNewQuestionsSet: (state, action) => {
      const { data } = action.payload;
      state.addQuestionsSet = data;
    },
    GetAllSets: (state, action) => {
      const { data } = action.payload;
      state.getAllSets = data;
    },
    getLables: (state, action) => {
      const { data } = action.payload;
      state.getLables = data;
    },
    Notifications: (state, action) => {
      const { data } = action.payload;
      state.Notifications = data;
    },
    Loading: (state, action) => {
      const { Loading } = action.payload;
      state.Loading = Loading;
    },
    SetAppState: (state, action) => {
      state.appState = action.payload;
    },
    GetSingleSetData: (state, action) => {
      state.getSingleSetData = action.payload;
    },
    GetSingleQuestion: (state, action) => {
      state.getSingleQuestion = action.payload;
    },
    AddFormula: (state, action) => {
      const { data } = action.payload;
      state.addFormula = data;
    },
    GetQuestionOfSet: (state, action) => {
      const { data } = action.payload;
      state.getQuestionOfSet = data;
    },
    GetAllDecisions: (state, action) => {
      const { data } = action.payload;
      state.getAllDecisions = data;
    },
    GetAllUsers: (state, action) => {
      const { data } = action.payload;
      state.getAllUsers = data;
    },
    Message: (state, action) => {
      const { message, open, error } = action.payload;
      state.message = message;
      state.open = open;
      state.error = error;
    },
    Auth: (state, action) => {
      const { user, islogin, role, token } = action.payload;
      state.islogin = islogin;
      state.user = user;
      state.role = role;
      state.token = token;
    },
    GetAllLoanReasons: (state, action) => {
      const { data } = action.payload;
      state.getAllLoanReasons = data;
    },
    GetSetResponse: (state, action) => {
      const { data } = action.payload;
      state.getSetResponse = data;
    },
    GetScreenSets: (state, action) => {
      const { data } = action.payload;
      state.getScreensSets = data;
    },
    GetApplications: (state, action) => {
      const { data } = action.payload;
      state.getApplications = data;
    },
    GetLoanTax: (state, action) => {
      const { data } = action.payload;
      state.getLoanTax = data;
    },
    GetappFlow: (state, action) => {
      const { data } = action.payload;
      state.getAppFlow = data;
    },
    GetGosiData: (state, action) => {
      const { data } = action.payload;
      state.getGosiData = data;
    },
    GetAllCards: (state, action) => {
      const { data } = action.payload;
      state.getAllCards = data;
    },
    GetUserApplication: (state, action) => {
      const { data } = action.payload;
      state.getUserApplication = data;
    },
    GetUserById: (state, action) => {
      const { data } = action.payload;
      state.getUserById = data;
    },
    GetTermsConditions: (state, action) => {
      const { data } = action.payload;
      state.getTermsConditions = data;
    },
    GetNafith: (state, action) => {
      const { data } = action.payload;
      state.getNafith = data;
    },
    GetNafithSanad: (state, action) => {
      const { data } = action.payload;
      state.getNafithSanad = data;
    },
    GetNafathDetails: (state, action) => {
      const { data } = action.payload;
      state.getNafathDetail = data;
    },
    GetSimahCodes: (state, action) => {
      const { data } = action.payload;
      state.getSimahCodes = data;
    },
    GetAllUsersAll: (state, action) => {
      // const { data } = action.payload;
      state.getAllUsersAll = action.payload;
    },
    SelaBalance: (state, action) => {
      const { data } = action.payload;
      state.selaBalance = data;
    },
    GetAgreement: (state, action) => {
      const { data } = action.payload;
      state.getAgreement = data;
    },
    GetScreenName: (state, action) => {
      const { data } = action.payload;
      state.getScreenName = data;
    },
    // VerificationOtp: (state, action) => {
    //   const { otp } = action.payload;
    //   state.verificationOtp = otp;
    // },
    GetAllDBR: (state, action) => {
      const { data } = action.payload;
      state.getAllDBR = data;
    },
    GetAllExpense: (state, action) => {
      const { data } = action.payload;
      state.getAllExpense = data;
    },
    ForgetVerificationOtp: (state, action) => {
      const { otp } = action.payload;
      state.forgetVerificationOtp = otp;
    },
    GetAllTermsRates: (state, action) => {
      const { data } = action.payload;
      state.getAllTermsRates = data;
    },
    GetAllRoles: (state, action) => {
      const { data } = action.payload;
      state.getAllRoles = data;
    },
    GetSimahReport: (state, action) => {
      const { data } = action.payload;
      state.getSimahReport = data;
    },
    GetSmsOtp: (state, action) => {
      const { data } = action.payload;
      state.getSmsOtp = data;
    },
    GetDevicesTokens: (state, action) => {
      const { data } = action.payload;
      state.getDevicesTokens = data;
    },
    GetAmlRecord: (state, action) => {
      const { data } = action.payload;
      state.getAmlRecord = data;
    },
    GetEmdahReport: (state, action) => {
      const { data } = action.payload;
      state.getEmdahReport = data;
    },
    GetAllUsersEmi: (state, action) => {
      const { data } = action.payload;
      state.getAllUsersEmi = data;
    },
    GetSimgleLoanTypeEmi: (state, action) => {
      const { data } = action.payload;
      state.getSingleLoanTypeEmi = data;
    },
    GetTermRatesCalculations: (state, action) => {
      const { data } = action.payload;
      state.getTermRatesCalculations = data;
    },
    GetAllPolicies: (state, action) => {
      const { data } = action.payload;
      state.getAllPolicies = data;
    },
    GetPolicyHistory: (state, action) => {
      const { data } = action.payload;
      state.getPolicyHistory = data;
    },
    GetEligibilityQuestions: (state, action) => {
      const { data } = action.payload;
      state.getEligibilityQuestions = data;
    },
    GetSeelahTransaction: (state, action) => {
      const { data } = action.payload;
      state.getSeelahTransaction = data;
    },
    GetNotificationHeadings: (state, action) => {
      const { data } = action.payload;
      state.getNotificationHeadings = data;
    },
    GetPermissions: (state, action) => {
      const { data } = action.payload;
      state.permissions = data;
    },
    GetUserPermissions: (state, action) => {
      const { data } = action.payload;
      state.userPermissions = data;
    },
  },
});
export const {
  Message,
  AddQuestions,
  GetAllQuestions,
  AddNewQuestionsSet,
  getLables,
  Loading,
  GetAllSets,
  SetAppState,
  GetSingleSetData,
  GetSingleQuestion,
  AddFormula,
  GetQuestionOfSet,
  GetAllDecisions,
  GetAllUsers,
  Auth,
  Message2,
  GetAllLoanReasons,
  GetSetResponse,
  GetScreenSets,
  GetApplications,
  GetLoanTax,
  GetappFlow,
  GetGosiData,
  GetAllCards,
  GetUserApplication,
  GetUserById,
  Notifications,
  GetTermsConditions,
  GetNafith,
  GetNafithSanad,
  GetNafathDetails,
  GetSimahCodes,
  GetAllUsersAll,
  SelaBalance,
  GetAgreement,
  GetScreenName,
  VerificationOtp,
  GetAllDBR,
  GetAllExpense,
  ForgetVerificationOtp,
  GetAllTermsRates,
  GetAllRoles,
  GetSimahReport,
  GetSmsOtp,
  GetDevicesTokens,
  GetAmlRecord,
  GetEmdahReport,
  GetAllUsersEmi,
  GetSimgleLoanTypeEmi,
  GetTermRatesCalculations,
  GetAllPolicies,
  GetPolicyHistory,
  GetEligibilityQuestions,
  GetSeelahTransaction,
  GetNotificationHeadings,
  GetPermissions,
  GetUserPermissions,
} = Reducer.actions;

export default Reducer.reducer;
