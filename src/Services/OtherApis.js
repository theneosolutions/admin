import axios from "axios";

var baseUrlDecisions = "https://seulah.ngrok.app/api/v1/dms";

async function CheckQuestionStatusInScreen(id) {
  try {
    const response = await axios.get(
      baseUrlDecisions + `/screen/questionCheckInScreen?questionId=${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
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

export { CheckQuestionStatusInScreen };
