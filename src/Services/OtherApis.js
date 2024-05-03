import { axiosInstance } from "./constant";

var baseUrlDecisions = "https://seulah.com/api/v1/dms";
var baseUrlUser = "https://seulah.com/api/v1/auth";

async function CheckQuestionStatusInScreen(id) {
  try {
    const response = await axiosInstance.get(
      baseUrlDecisions + `/screen/questionCheckInScreen?questionId=${id}`
    );
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return message;
  }
}

async function CheckToken(id, token) {
  try {
    const response = await axiosInstance.post(
      baseUrlUser + `/user/tokenValidationForAdmin`,
      {
        token: token,
        idNumber: id,
      }
    );
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return message;
  }
}

export { CheckQuestionStatusInScreen, CheckToken };
