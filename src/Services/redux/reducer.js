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
  islogin: false,
  user: null,
  // role: "ROLE_ADMIN", //null
  role: null,
  roleModules: ["Overview", "APPLICATIONS"],
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
      const { data } = action.payload;
      state.getAllUsersAll = data;
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
    VerificationOtp: (state, action) => {
      const { otp } = action.payload;
      state.verificationOtp = otp;
    },
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
} = Reducer.actions;

export default Reducer.reducer;
