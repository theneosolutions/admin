import axios from "axios";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import * as action from "./reducer";

var baseUrlUser = "https://seulah.ngrok.app/api/v1/auth";
var baseUrlDecisions = "https://seulah.ngrok.app/api/v1/dms";
var baseUrlLos = "https://seulah.ngrok.app/api/v1/los";
var baseUrlCms = "https://seulah.ngrok.app/api/v1/cms";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  },
});

function* GetAllQuestionsData() {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions + "/eligibilityQuestions/getAllQuestions"
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
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      baseUrlUser + `/signup`,
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
      baseUrlUser + `/signin`,
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
    const formData = new FormData();
    formData.append("successImage", payload.successImage);
    formData.append("successMessage", payload.successMessage);
    formData.append("successDescription", payload.successDescription);
    formData.append("errorImage", payload.errorImage);
    formData.append("errorMessage", payload.errorMessage);
    formData.append("errorDescription", payload.errorDescription);
    formData.append("setId", payload.setId);
    const response1 = yield call(
      axios.post,
      baseUrlDecisions + "/apiResponse/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
    yield put(action.Message({ message: "", open: false, error: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));
    yield put(action.Message({ message: "", open: false, error: true }));

    // yield put(action.Message({ message: message, open: true, error: true }));
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
function* GetAppFlow() {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/apiFlow/getAppFlow?brandId=123`
    );
    yield put(action.GetappFlow(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));
    // yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetGosiApi(payload) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions + `/formula/getGosiByUserId?idNumber=${payload.payload}`
    );
    yield put(action.GetGosiData(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));
  }
}

function* CreateNotification({ payload }) {
  try {
    const formData = new FormData();
    formData.append("subject", payload.subject);
    formData.append("content", payload.content);
    formData.append("file", payload.image);
    formData.append(
      "topic",
      "dKmakUsaR3GIRJ1Apfkk7R:APA91bFFJizSKS5Z2OIlCwyZPmM9Ce6D6eNsLzvRljb0-756-fu4VHQ3hDHA0VOBHq2ivSIOVxN-4WBIWH08aG3b1PQJI9aX5lz3JnTw7Jf4EPSCvJQ4r0jkfDDirjkfCgnQaCvB44xB"
    );
    const response = yield call(
      axiosInstance.post,
      baseUrlCms + `/notification`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response", response);
    yield put(
      action.Message({
        message: "Notification Sent!",
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
function* AddNewProduct({ payload }) {
  try {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("desc", payload.desc);
    formData.append("price", payload.price);
    formData.append("months", payload.months);
    formData.append("file", payload.image);

    const response = yield call(
      axios.post,
      baseUrlCms + "/addCardInstallment",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response?.status === 200) {
      yield put(
        action.Message({
          message: "Product Added Successfully !",
          open: true,
          error: false,
        })
      );
    }
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetAllCards() {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/getAllCardInstallment`
    );
    yield put(action.GetAllCards(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));
    // yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* SetStatusOfApplication({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.patch,
      baseUrlLos +
        `/loanTypeFormula/createLoanTypeCalculation?id=${payload?.id}&status=${payload?.status}`
    );
    yield put(action.Loading({ Loading: false }));

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

function* GetUserApllicationData({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.get,
      baseUrlLos + `/loanTypeFormula/getLoanDetailsByUser?userId=${payload}`
    );
    yield put(action.GetUserApplication(response?.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetUserById({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlUser + `/user/getUserById?userId=${payload}`
    );
    yield put(action.GetUserById(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* DeleteUserById({ payload }) {
  console.log("payload 2", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.delete,
      baseUrlUser + `/user/deleteUser?userId=${payload}`
    );
    console.log("response", response);
    yield put(
      action.Message({ message: "User Deleted !", open: true, error: false })
    );

    // yield put(action.GetUserById(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAllNotifications({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlLos + `/getAllnotification`
    );
    console.log("notifications 1111111111", response);
    yield put(action.Notifications(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* AddTermsAndConditions({ payload }) {
  console.log("payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      baseUrlCms + `/terms/saveTerms`,
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

function* GetAllTermsAndConditions({ payload }) {
  console.log("payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/terms/getTerms`
    );
    yield put(action.GetTermsConditions(response));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
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
  yield takeLatest("GET_APP_FLOW", GetAppFlow);
  yield takeLatest("GET_GOSI_API", GetGosiApi);
  yield takeLatest("CREATE_NOTIFICATION", CreateNotification);
  yield takeLatest("Add_NEW_PRODUCT", AddNewProduct);
  yield takeLatest("GET_ALL_CARDS", GetAllCards);
  yield takeLatest("SET_STATUS_OF_APPLICATION", SetStatusOfApplication);
  yield takeLatest("GET_USER_APPLICATION_DATA", GetUserApllicationData);
  yield takeLatest("GET_USER_BY_ID", GetUserById);
  yield takeLatest("DELETE_USER_BY_ID", DeleteUserById);
  yield takeLatest("GET_ALL_NOTIFICATIONS", GetAllNotifications);
  yield takeLatest("ADD_TERM_CONDITIONS", AddTermsAndConditions);
  yield takeLatest("GET_ALL_TERMS", GetAllTermsAndConditions);
}
