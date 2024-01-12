import axios from "axios";

var baseUrlDecisions =
  "https://84b7-2a00-5400-e053-7ddb-814-655e-5ad6-8116.ngrok-free.app/api/v1/dms";

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
