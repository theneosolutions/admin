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

  //Loan start
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
      const { user, islogin } = action.payload;
      state.islogin = islogin;
      state.user = user;
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
} = Reducer.actions;

export default Reducer.reducer;
