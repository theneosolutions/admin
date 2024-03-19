import { axiosInstance } from "./constant";

var baseUrlDecisions = "https://seulah.ngrok.app/api/v1/dms";

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

export { CheckQuestionStatusInScreen };
