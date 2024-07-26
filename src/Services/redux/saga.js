import { call, put, takeLatest } from "@redux-saga/core/effects";
import * as action from "./reducer";
import { axiosInstance } from "../constant";
import { getLanguage } from "functions/getLanguage";
var baseUrlSMS = "https://seulah.com/api/v1/sms";
var baseUrlUser = "https://seulah.com/api/v1/auth";
var baseUrlDecisions = "https://seulah.com/api/v1/dms";
var baseUrlLos = "https://seulah.com/api/v1/los";
var baseUrlCms = "https://seulah.com/api/v1/cms";
const rolesUrl = "https://seulah.com";

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
    console.log("getLanguage", getLanguage());
    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions +
        `/questionSet/getQuestionSetByNumericAndString?id=${
          payload.payload.id
        }&forUser=${payload.payload.forUser}&languageCode=${getLanguage()}`
    );
    yield put(action.GetSingleSetData(response?.data?.data));
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
      baseUrlDecisions +
        `/questionSet/saveSet?setName=${payload.name}&setNameArabic=${payload?.nameArabic}`,
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
        `/questionSet/getQuestionByIdAndSetId?questionId=${
          payload.payload.id
        }&setId=${payload.payload.setid}&languageCode=${getLanguage()}`
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
function* UpdateAmlRecord({ payload }) {
  console.log("payload", payload);
  try {
    const response = yield call(
      axiosInstance.patch,
      baseUrlCms +
        `/screening/updateAMl?idNumber=${payload?.idNumber}&entityAlertLevel=${payload?.level}&entityAlertScore=${payload?.score}`
    );

    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
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
function* GetAllUsersEmi(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlLos + `/getAllUserDetails`
    );
    console.log("response of emi", response);
    yield put(action.GetAllUsersEmi(response.data));
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
      baseUrlUser + `/user/admin/signup`,
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
function* UpdateUserData({ payload }) {
  console.log("update user", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.put,
      baseUrlUser + `/user/admin/signup`,
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
      baseUrlUser + `/user/signin`,
      payload
    );
    if (response.data.token) {
      yield put(
        action.Auth({
          user: response.data,
          islogin: true,
          role: response.data.roles[0],
          token: response.data.token,
        })
      );
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
    yield put(action.Message({ message: message, open: true, error: true }));
    yield put(action.Loading({ Loading: false }));
  }
}
function* LoginOtpVerification({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.post,
      baseUrlUser + `/user/otpVerification`,
      payload
    );
    if (response?.data?.otp) {
      yield put(action.VerificationOtp(response.data));
      yield put(
        action.Message({ message: "Otp Success", open: false, error: false })
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
    formData.append("languageCode", getLanguage());
    const response1 = yield call(
      axiosInstance.post,
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
    screenHeadingArabic: payload.arabicName,
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
    formData.append("languageCode", payload.language);
    formData.append("tenureTexJson", JSON.stringify(payload.transformedObject));
    formData.append("requestReason", payload.reason);

    const response = yield call(
      axiosInstance.post,
      baseUrlLos + `/loanType/create`,
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
        `/apiResponse/getResponseBySetIdAndLanguageCode?languageCode=${getLanguage()}&setId=${
          payload.payload.id
        }`
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
      baseUrlDecisions +
        `/screen/getScreenBySetId?setId=${
          payload.payload
        }&languageCode=${getLanguage()}`
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
      baseUrlLos + `/loanTypeFormula/getAllLoanApplications`
    );
    yield put(action.GetApplications(response));
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
  console.log("payload", payload?.payload);
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/gosi/getDataById?idNumber=${payload?.payload?.id}`
    );
    yield put(action.GetGosiData(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    console.log("messssage", message);
    yield put(action.GetGosiData({ data: null }));
    yield put(action.Loading({ Loading: false }));
  }
}

function* CreateNotification({ payload }) {
  console.log("payloan notification", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const formData = new FormData();
    formData.append("subject", payload.subject);
    formData.append("content", payload.content);
    formData.append("file", payload.image);
    formData.append("topic", payload.topic);
    formData.append("navigation", payload.navigation);
    const response = yield call(
      axiosInstance.post,
      baseUrlSMS + `/notifications/sendNotificationToAllUsers`,
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
    yield put(action.Loading({ Loading: false }));
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
      axiosInstance.post,
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
  console.log("payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.patch,
      baseUrlLos +
        `/loanTypeFormula/loanStatusChange?status=${payload?.status}&userId=${payload?.id}`
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
    yield put(action.Notifications(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* AddTermsAndConditions({ payload }) {
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
  console.log("payload Terms", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/terms/getTermsByLanguage?lan=${payload}`
    );
    yield put(action.GetTermsConditions(response));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetNafithReport({ payload }) {
  console.log("payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));
    // https://seulah.com/api/v1/cms/nafith/getUUIDByIdNumber?idNumber=1069282455
    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/nafith/getUUIDByIdNumber?idNumber=${payload}`
    );
    console.log(response?.data?.uuid);
    const response2 = yield call(
      axiosInstance.post,
      baseUrlCms + `/nafith/downloadPDF?uuid=${response?.data?.uuid}`
    );
    yield put(action.GetNafith(response2));
    action.Message({ message: "success", open: false, error: false });

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.GetNafith({}));

    yield put(
      action.Message({ message: "Data Not Found!", open: true, error: true })
    );
  }
}
function* GetEmdahReport({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/doc/getAgreementByUserId?idNumber=${payload}`
    );
    console.log("response Emdah", response?.data);
    yield put(action.GetEmdahReport(response?.data));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* getUserLoanEmi({ payload }) {
  console.log("heloooo", payload);
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.get,
      baseUrlLos +
        `/loanType/getSingleLoanType?userId=${
          payload?.userId
        }&setId=1&loanTypeId=${payload?.setId}&languageCode=${getLanguage()}`
    );
    console.log("response Emdah", response?.data);
    yield put(action.GetSimgleLoanTypeEmi(response));
    yield put(action.Message({ message: "successEmi", error: false }));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* getTermsRatesCalculations({ payload }) {
  console.log("heloooo", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlLos +
        `/term/rates/calculate?financeAmount=${payload.financeAmmount}&term=${payload?.term}&userId=${payload.userId}`
    );
    console.log("calculations", response?.data);
    yield put(action.GetTermRatesCalculations(response));
    yield put(action.Message({ message: "successEmi", error: false }));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetNafithSanad({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.post,
      baseUrlCms +
        `/nafith/getSanadDetails?groupUid=${payload.groupUid}&sanadUid=${payload.sanadUid}`
    );
    yield put(action.GetNafithSanad(response));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetNafathDetails({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlUser + `/getUserInfoByNafath?userId=${payload}`
    );
    yield put(action.GetNafathDetails(response));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetSimahCodes({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.post,
      baseUrlLos + `/getSimahCodes`
    );
    yield put(action.GetSimahCodes(response));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAllUsersAll({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.get,
      baseUrlUser + `/user/getAllUser`
    );
    yield put(action.GetAllUsersAll(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* ActiveDeactiveUser({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.post,
      baseUrlUser +
        `/user/deactivateAccount?idNumber=${payload?.idNumber}&status=${payload?.id}`
    );

    yield put(
      action.Message({
        message: response?.data?.message,
        open: true,
        error: true,
      })
    );

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetBalance({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/selaApi/getBalance`
    );

    yield put(action.SelaBalance(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    console.log("error Sila", error);
  }
}

function* AddAgreement({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      baseUrlCms + `/terms/saveAgreement`,
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

function* GetAgreement({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/terms/getAgreement`
    );
    yield put(action.GetAgreement(response));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetScreens({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/screenFlow/getAppFlow?brandId=65cde20b06ee9e18a9569228`
    );
    yield put(action.GetScreenName(response));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAllDBR({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlLos + `/dbr/calculation/getall`
    );

    yield put(action.GetAllDBR(response.data));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* AddNewDbr({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      baseUrlLos + `/dbr/calculation/dbrcalculation`,
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
function* DeleteDbr({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.delete,
      baseUrlLos + `/dbr/calculation/delete?id=${payload}`
    );
    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
    yield put(action.Loading({ Loading: false }));
  }
}

function* UpdateDbr({ payload }) {
  console.log("dbr update", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.put,
      baseUrlLos + `/dbr/calculation/dbrcalculation`,
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

function* LogoutUser({ payload }) {
  console.log("payload logout", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      baseUrlUser + `/user/signout?userId=${payload}`
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

function* GetAllExpense({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlLos + `/expense/getall`
    );
    yield put(action.GetAllExpense(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* AddNewExpense({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      baseUrlLos + `/expense/expense`,
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
function* DeleteExpense({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.delete,
      baseUrlLos + `/expense/delete?id=${payload}`
    );
    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
    yield put(action.Loading({ Loading: false }));
  }
}
function* UpdateExpense({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.put,
      baseUrlLos + `/expense/expense`,
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
// https://seulah.com/api/v1/auth/user/forgot-password?idNumber=${idNumber}
function* ResetOtpVerification({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.post,
      baseUrlUser + `/user/forgot-password?idNumber=${payload.idNumber}`
    );
    if (response?.data?.otp) {
      yield put(action.ForgetVerificationOtp(response.data));
      yield put(
        action.Message({
          message: "reset Otp Success",
          open: false,
          error: false,
        })
      );
    }
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* ChangePassword({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.post,
      baseUrlUser + `/user/otpValidation`,
      {
        idNumber: payload.idNumber,
        newPassword: payload.newPassword,
        otp: payload.otp,
      }
    );
    yield put(
      action.Message({
        message: response?.data?.message,
        open: true,
        error: false,
      })
    );

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetAllTermsRates({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.get,
      baseUrlLos + `/term/rates/termandrates`
    );
    yield put(action.GetAllTermsRates(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* AddNewTermsRates({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      baseUrlLos + `/term/rates/termandrates`,
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
function* UpdateTermAndRates({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.put,
      baseUrlLos + `/term/rates/termandrates`,
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

function* DeleteTermsAndRate({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axiosInstance.delete,
      baseUrlLos + `/term/rates/termandrates?id=${payload}`
    );
    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
    yield put(action.Loading({ Loading: false }));
  }
}

function* AddNewRoleName({ payload }) {
  console.log("payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      rolesUrl + `/v1/roles/create`,
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
function* GetAllRoles({ payload }) {
  console.log("payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.get,
      rolesUrl + `/api/v1/roles/all`
    );
    console.log("response", response1);
    yield put(action.GetAllRoles(response1));

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
function* AddModulesToRole({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.post,
      rolesUrl + `/v1/roles/add-modules`,
      payload
    );
    yield put(action.Loading({ Loading: false }));
    yield put(
      action.Message({
        message: response.data.message,
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

function* DeleteSet({ payload }) {
  console.log("payload", payload);
  try {
    const response = yield call(
      axiosInstance.delete,
      baseUrlDecisions + `/questionSet/deleteQuestionSet?id=${payload}`
    );
    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    // yield put(action.GetAllQuestions(response));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* CreateSMS({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      baseUrlSMS + `/saveSms`,
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

function* GetSimahReport({ payload }) {
  console.log("GetSimahReport payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.get,
      baseUrlLos + `/simah/${payload}/creditBureauReport`
    );
    console.log("response", response1?.data);
    yield put(action.GetSimahReport(response1?.data));

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

function* AddProductInSimah({ payload }) {
  console.log("payload simah", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.post,
      baseUrlLos + `/simah/saveProductList`,
      payload
    );
    yield put(action.Loading({ Loading: false }));
    if (response1?.data?.data === "Product successfully added in system") {
      yield put(
        action.Message({
          message: response1.data.data,
          open: true,
          error: false,
        })
      );
    } else {
      yield put(
        action.Message({
          message: response1.data.data,
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
function* UpdateSimahProduct({ payload }) {
  console.log("payload simah", payload);

  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.post,
      baseUrlLos +
        `/simah/${payload.id}/updateProductList?consideration=${payload.status}`
    );
    yield put(action.Loading({ Loading: false }));
    if (response?.data?.message === "Success") {
      yield put(
        action.Message({
          message: response.data.message,
          open: true,
          error: false,
        })
      );
    } else {
      yield put(
        action.Message({
          message: response.data.message,
          open: true,
          error: true,
        })
      );
    }
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetAllSms({ payload }) {
  console.log("GetAllSms payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(axiosInstance.get, baseUrlSMS + `/getAllSMS`);
    console.log("response", response1?.data);
    yield put(action.GetSmsOtp(response1?.data));

    yield put(action.Loading({ Loading: false }));
    // yield put(
    //   action.Message({
    //     message: response1.data.message,
    //     open: true,
    //     error: false,
    //   })
    // );
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAllDevicesToken({ payload }) {
  console.log("GetAllDevicesToken 22");
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.get,
      baseUrlUser + `/temp_user/getDevices`
    );
    console.log("response", response1?.data);
    yield put(action.GetDevicesTokens(response1));

    yield put(action.Loading({ Loading: false }));
    // yield put(
    //   action.Message({
    //     message: response1.data.message,
    //     open: true,
    //     error: false,
    //   })
    // );
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAmlDetails({ payload }) {
  console.log("Aml Payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.get,
      baseUrlCms + `/screening/getAmlRecordByIdNumber?idNumber=${payload}`
    );
    console.log("response", response1?.data);
    yield put(action.GetAmlRecord(response1?.data));

    yield put(action.Loading({ Loading: false }));
    // yield put(
    //   action.Message({
    //     message: response1.data.message,
    //     open: true,
    //     error: false,
    //   })
    // );
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAllPolicies({ payload }) {
  console.log("Policies Payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));
    const response1 = yield call(
      axiosInstance.get,
      baseUrlDecisions + `/policy/fetchAllPolices`
    );
    console.log("response", response1?.data);
    yield put(action.GetAllPolicies(response1?.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* UpdatePolicy({ payload }) {
  console.log("payload policy", payload);
  try {
    const response = yield call(
      axiosInstance.post,
      baseUrlDecisions +
        `/policy/update?newValue=${payload?.newValue}&policyId=${payload?.policyId}&userId=${payload?.userId}`
    );
    console.log("response policy update", response);
    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* DeleteSMS({ payload }) {
  console.log("Delete SMS", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.delete,
      baseUrlSMS + `/deleteRecordById?smsId=${payload}`
    );
    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAllPoliciesHistory({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axiosInstance.get,
      baseUrlDecisions + `/policy/fetchAuditByPolicyId?policyId=${payload}`
    );
    console.log("response", response1?.data);
    yield put(action.GetPolicyHistory(response1?.data));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetEligibilityQuestions({ payload }) {
  console.log("eligibility Payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlDecisions +
        `/screen/getAllScreenWithQuestionDetail?languageCode=${getLanguage()}&userId=${payload}`
    );
    console.log("response", response?.data);
    yield put(action.GetEligibilityQuestions(response));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* Status_Update_Policy({ payload }) {
  console.log("payload policy status", payload);

  var url;
  if (payload?.status === "approve") {
    url = `/policy/approve?auditId=${payload.id}&userId=${payload.userId}`;
  } else if (payload.status === "reject") {
    url = `/policy/reject?auditId=${payload.id}&userId=${payload.userId}`;
  }
  console.log("urllll", url);
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(axiosInstance.post, baseUrlDecisions + url);
    yield put(action.Loading({ Loading: false }));

    action.Message({
      message: response.data.message,
      open: true,
      error: false,
    });
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetSeelahTransaction() {
  console.log("selaa Payload TRANSCATION");
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlCms + `/selaApi/transactions`
    );
    console.log("response", response);
    yield put(action.GetSeelahTransaction(response));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    console.log("error", error);
  }
}
function* GetNotificationsHeadings() {
  console.log("selaa Payload TRANSCATION");
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axiosInstance.get,
      baseUrlSMS + `/fetchNotificationHeading`
    );
    console.log("response smsmsmsmsmsmsms", response?.data);
    yield put(action.GetNotificationHeadings(response?.data));

    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    console.log("error", error);
  }
}

function* SendNotificationSms({ payload }) {
  let { type, language, role, phone, message } = payload;

  let url;
  if (role === "none") {
    url = `/sendCustomSms?mobileNumber=${phone}&languageCode=${language}&heading=${type}&messageBody=${message}`;
  } else {
    url = `/sendCustomSms?languageCode=${language}&heading=${type}&messageBody=${message}&userRole=${role}`;
  }
  console.log("heloooo from saga", url);

  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(axiosInstance.get, baseUrlSMS + url);
    yield put(action.Loading({ Loading: false }));
    yield put(
      action.Message({
        message: "Success",
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
  yield takeLatest("GET_ALL_USERS_EMI", GetAllUsersEmi);
  yield takeLatest("Add_NEW_USER", AddNewUser);
  yield takeLatest("UPDATE_USER_DATA", UpdateUserData);
  yield takeLatest("LOGIN_USER", UserLogin);
  yield takeLatest("LOGIN_OTP_VERIFICATION", LoginOtpVerification);
  yield takeLatest("SET_DECISION_RESPONSE", SetDecisionResponse);
  yield takeLatest("CREATE_SCREEN", CreateScreen);
  yield takeLatest("GET_RESPONSE_OF_SET", GetResponseOfSet);
  yield takeLatest("GET_SCEENS_SET", GetScreenSet);
  yield takeLatest("CREATE_LOAN_TYPE", CreateLoanType); // Loan Start
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
  yield takeLatest("GET_NAFITH_REPORT", GetNafithReport);
  yield takeLatest("GET_NAFITH_SANAD", GetNafithSanad);
  yield takeLatest("GET_NAFATH_DETAILS", GetNafathDetails);
  yield takeLatest("GET_SIMAH_CODES", GetSimahCodes);
  yield takeLatest("GET_ALL_USERS_ALL", GetAllUsersAll);
  yield takeLatest("ACTIVE_DEACTIVE_USER", ActiveDeactiveUser);
  yield takeLatest("GET_BALANCE", GetBalance);
  yield takeLatest("ADD_AGREEMENT", AddAgreement);
  yield takeLatest("GET_AGREEMENT", GetAgreement);
  yield takeLatest("GET_SCREENS", GetScreens);
  yield takeLatest("GET_ALL_DBR", GetAllDBR);
  yield takeLatest("ADD_NEW_DBR", AddNewDbr);
  yield takeLatest("DELETE_DBR", DeleteDbr);
  yield takeLatest("UPDATE_DBR", UpdateDbr);
  yield takeLatest("LOGOUT_USER", LogoutUser);
  yield takeLatest("GET_ALL_EXPENSE", GetAllExpense);
  yield takeLatest("ADD_NEW_EXPENSE", AddNewExpense);
  yield takeLatest("DELETE_EXPENSE", DeleteExpense);
  yield takeLatest("UPDATE_EXPENSE", UpdateExpense);
  yield takeLatest("RESET_OTP_VERIFICATION", ResetOtpVerification);
  yield takeLatest("CHANGE_PASSWORD", ChangePassword);
  yield takeLatest("GET_ALL_TERMS_RATES", GetAllTermsRates);
  yield takeLatest("ADD_NEW_TERM_AND_RATES", AddNewTermsRates);
  yield takeLatest("UPDATE_TERM_AND_RATES", UpdateTermAndRates);
  yield takeLatest("DELETE_TERMS_AND_RATES", DeleteTermsAndRate);
  yield takeLatest("ADD_NEW_ROLE_NAME", AddNewRoleName);
  yield takeLatest("GET_ALL_ROLES", GetAllRoles);
  yield takeLatest("ADD_MODULES_TO_ROLES", AddModulesToRole);
  yield takeLatest("DELETE_SET", DeleteSet);
  yield takeLatest("CREATE_SMS", CreateSMS);

  yield takeLatest("GET_SIMAH_REPORT", GetSimahReport);
  yield takeLatest("ADD_PRODUCT_IN_SIMAH", AddProductInSimah);
  yield takeLatest("UPDATE_PRODUCT_STATUS", UpdateSimahProduct);
  yield takeLatest("GET_ALL_SMS", GetAllSms);
  yield takeLatest("DELETE_SMS", DeleteSMS);
  yield takeLatest("GET_ALL_DEVICES_TOKENS", GetAllDevicesToken);
  yield takeLatest("GET_AML_DETAILS", GetAmlDetails);
  yield takeLatest("GET_EMDAH_REPORT", GetEmdahReport);
  yield takeLatest("GET_USER_LOAN_EMI", getUserLoanEmi);
  yield takeLatest("GET_TERM_RATES_CALCULATION", getTermsRatesCalculations);
  yield takeLatest("UPDATE_AML_RECORD", UpdateAmlRecord);
  yield takeLatest("UPDATE_POLICY", UpdatePolicy);
  yield takeLatest("GET_ALL_POLICIES", GetAllPolicies);
  yield takeLatest("GET_ALL_POLICIES_HISTORY", GetAllPoliciesHistory);
  yield takeLatest("GET_ELIGIBILITY_QUESTIONS", GetEligibilityQuestions);
  yield takeLatest("STATUS_UPDATE_POLICY", Status_Update_Policy);
  yield takeLatest("GET_SELAA_TRANSACTION", GetSeelahTransaction);
  yield takeLatest("GET_NOTIFICATIONS_HEADINGS", GetNotificationsHeadings);
  yield takeLatest("SEND_NOTIFICATION_SMS", SendNotificationSms);
}

// function getLanguage() {
//   const preferredLanguage = localStorage.getItem("preferredLanguage");
//   if (preferredLanguage) {
//     // const lan = JSON.parse(preferredLanguage);
//     console.log(preferredLanguage);
//     return preferredLanguage;
//   } else {
//     return "ar";
//   }
// }
