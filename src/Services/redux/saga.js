import axios from "axios";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import * as action from "./reducer";

var baseUrlUser = "https://6066-82-167-87-137.ngrok-free.app";
var baseUrlDecisions = "https://6066-82-167-87-137.ngrok-free.app/api/v1/dms";
var baseUrlLos = "https://6066-82-167-87-137.ngrok-free.app/api/v1/los";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    // Add any other common headers here
  },
});

function* GetAllQuestionsData() {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions + "/eligibilityQuestions/getAllQuestions"
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "ngrok-skip-browser-warning": "69420",
      //   },
      // }
    );
    yield put(action.GetAllQuestions(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
    yield put(action.Loading({ Loading: false }));
  }
}
function* GetAllSetsData(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions + "/questionSet/getAllQuestionSet"
    );
    yield put(action.GetAllSets(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetSingleQuestion(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions +
        `/eligibilityQuestions/getQuestionById?id=${payload.payload.id}`
    );

    yield put(action.GetSingleQuestion(response.data.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetSingleSetData(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions +
        `/questionSet/getQuestionSetByNumericAndString?id=${payload.payload.id}&forUser=${payload.payload.forUser}`
    );
    yield put(action.GetSingleSetData(response.data.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* DeleteQuestion(payload) {
  try {
    const response = yield call(
      axiosInstance.delete,
      baseUrlDecisions +
        `/eligibilityQuestions/delete-question?id=${payload.id}`
    );
    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    // yield put(action.GetAllQuestions(response));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* AddQuestions({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.post,
      baseUrlDecisions + "/eligibilityQuestions/save-question",
      payload
    );

    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.AddQuestions(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
    yield put(action.Loading({ Loading: false }));
  }
}

function* AddQuestionsSet({ payload }) {
  try {
    const response = yield call(
      axiosInstance.post,
      baseUrlDecisions + `/questionSet/saveSet?setName=${payload.name}`,
      payload.selectedIds
    );

    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.AddNewQuestionsSet(response));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetLabels(payload) {
  try {
    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions + "/api/v1/admin/get-all-labels"
    );

    yield put(action.getLables(response));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetQuestionOfSet(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions +
        `/questionSet/getQuestionByIdAndSetId?questionId=${payload.payload.id}&setId=${payload.payload.setid}`
    );
    yield put(action.GetQuestionOfSet(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* AddNewFormula({ payload }) {
  try {
    const response = yield call(
      axiosInstance.post,
      baseUrlDecisions + `/formula/create?setId=${payload.setId}`,
      payload
    );

    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.AddFormula(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* AddAnswertoQuestion({ payload }) {
  try {
    const response = yield call(
      axiosInstance.post,
      baseUrlDecisions +
        `/questionSet/updateAnswer?id=${payload.id}&questionId=${payload.questionId}`,
      payload.answers
    );

    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.AddFormula(response));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAllDecisions(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions + `/questionSet/getAllDecision`
    );
    yield put(action.GetAllDecisions(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* AddUsersAnswersToSet({ payload }) {
  try {
    const response1 = yield call(
      axiosInstance.post,
      baseUrlDecisions + `/questionSet/updateUserAnswer?id=${payload.id}`,
      payload.data
    );

    const response2 = yield call(
      axiosInstance.post,
      baseUrlDecisions +
        `/formula/calculateFormula?setId=${payload.id}&userId=8`,
      payload.numericData
    );
    console.log("response2", response2.data.data);
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAllUsers(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions +
        `/formula/checkAllUserEligibility?userVerifiedType=${payload.payload}`
    );
    yield put(action.GetAllUsers(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* AddNewUser({ payload }) {
  console.log("data", payload);

  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      baseUrlUser + `/api/auth/signup`,
      payload
    );
    yield put(action.Loading({ Loading: false }));
    yield put(
      action.Message({
        message: response1.data.message,
        open: true,
        error: false,
      })
    );
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* UserLogin({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.post,
      baseUrlUser + `/api/auth/signin`,
      payload
    );
    if (response.data.accessToken) {
      yield put(action.Auth({ user: response.data, islogin: true }));
      localStorage.setItem(
        "user",
        JSON.stringify({ islogin: true, data: response.data })
      );
      yield put(
        action.Message({ message: "Login Success", open: true, error: false })
      );
    }
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* SetDecisionResponse({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response1 = yield call(
      axiosInstance.post,
      baseUrlDecisions + `/apiResponse/create`,
      payload
    );
    yield put(
      action.Message({
        message: response1.data.message,
        open: true,
        error: false,
      })
    );

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: "error", open: true, error: true }));
  }
}
function* CreateScreen({ payload }) {
  const data = {
    screenHeading: payload.name,
    questionIds: payload.selectedIds,
    setId: payload.id,
  };

  try {
    const response = yield call(
      axiosInstance.post,
      baseUrlDecisions + `/screen/addQuestion`,
      data
    );
    yield put(
      action.Message({
        message: response?.data?.message,
        open: true,
        error: false,
      })
    );
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* CreateLoanType({ payload }) {
  try {
    const formData = new FormData();
    formData.append("file", payload.image);
    formData.append("tenureTex", JSON.stringify(payload.transformedObject));

    const response = yield call(
      axiosInstance.post,
      baseUrlLos + `/loanType/create?requestReason=${payload.reason}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
      }
    );
    yield put(
      action.Message({
        message: response?.data?.message,
        open: true,
        error: false,
      })
    );
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetAllLoanReasons() {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlLos + `/loanType/getAllLoanType`
    );
    yield put(action.GetAllLoanReasons(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* CreateLoanTax({ payload }) {
  try {
    const response = yield call(
      axiosInstance.post,
      baseUrlLos + `/loanType/createLoanTypeTex`,
      payload
    );
    yield put(
      action.Message({
        message: response?.data?.message,
        open: true,
        error: false,
      })
    );
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetResponseOfSet(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions +
        `/apiResponse/getResponseBySetId?setId=${payload.payload.id}`
    );
    yield put(action.GetSetResponse(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetScreenSet(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions + `/screen/getScreenBySetId?setId=${payload.payload}`
    );
    yield put(action.GetScreenSets(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetLoanApplications(payload) {
  console.log(" loan applications running ");
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlLos + `/loanTypeFormula/getAllLoanTypeFormula`
    );
    yield put(action.GetApplications(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetLoanTypeTax(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlLos +
        `/loanType/getLoanTypeTexByLoanTypeId?loanTypeId=${payload.payload}`
    );
    yield put(action.GetLoanTax(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    // yield put(action.Message({ message: message, open: true, error: true }));
  }
}

export default function* HomeSaga() {
  yield takeLatest("ADD_QUESTION", AddQuestions);
  yield takeLatest("GET_ALL_QUESTIONS", GetAllQuestionsData);
  yield takeLatest("DELETE_QUESTION", DeleteQuestion);
  yield takeLatest("ADD_QUESTIONS_SET", AddQuestionsSet);
  yield takeLatest("GET_ALL_SETS", GetAllSetsData);
  yield takeLatest("GET_SINGLE_SET_DATA", GetSingleSetData);
  yield takeLatest("GET_LABLES", GetLabels);
  yield takeLatest("GET_SINGLE_QUESTION", GetSingleQuestion);
  yield takeLatest("ADD_NEW_FORMULA", AddNewFormula);
  yield takeLatest("ADD_ANSWER_THE_QUESTION", AddAnswertoQuestion);
  yield takeLatest("GET_QUESTION_OF_SET", GetQuestionOfSet);
  yield takeLatest("GET_ALL_DECISIONS", GetAllDecisions);
  yield takeLatest("ADD_USER_ANSWER_TO_SET", AddUsersAnswersToSet);
  yield takeLatest("GET_ALL_USERS", GetAllUsers);
  yield takeLatest("Add_NEW_USER", AddNewUser);
  yield takeLatest("LOGIN_USER", UserLogin);
  yield takeLatest("SET_DECISION_RESPONSE", SetDecisionResponse);
  yield takeLatest("CREATE_SCREEN", CreateScreen);
  yield takeLatest("GET_RESPONSE_OF_SET", GetResponseOfSet);
  yield takeLatest("GET_SCEENS_SET", GetScreenSet);

  // Loan Start
  yield takeLatest("CREATE_LOAN_TYPE", CreateLoanType);
  yield takeLatest("CREATE_LOAN_TAX", CreateLoanTax);
  yield takeLatest("GET_LOAN_TYPE_TAX", GetLoanTypeTax);

  yield takeLatest("GET_LOAN_APPLICATIONS", GetLoanApplications);
  yield takeLatest("GET_ALL_LOAN_REASONS", GetAllLoanReasons);
}
