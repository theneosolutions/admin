import axios from "axios";
import { axiosInstance } from "./constant";

var baseUrlDecisions = "https://seulah.com/api/v1/dms";
var baseUrlUser = "https://seulah.com/api/v1/auth";
var baseUrlLos = "https://seulah.com/api/v1/los";
var baseUrlCms = "https://seulah.com/api/v1/cms";

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

async function GetSeelahTransaction() {
  console.log("GetSeelahTransactionGetSeelahTransaction");
  try {
    // Assuming "/api" is the endpoint on your backend that proxies requests to the API server
    const response = await axios.get("/api/selaApi/transactions");
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

async function UpdateDbr(id, token) {
  console.log("Starting UpdateDbr function");

  try {
    const response = await axios.put(
      `${baseUrlLos}/dbr/calculation/updateDBRcalculation`,
      {
        consumerDbr: 2,
        gdbrIncludingMtg: 2,
        gdbrWithoutMtg: 2,
        incomeBracket: "27 to 2",
        productLevel: 23,
        id: 6,
      },
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response", response);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response error:", error.response.data);
      console.error("Status code:", error.response.status);
      console.error("Headers:", error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network error:", error.request);
      return "Network error: No response received from the server.";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
      return error.message;
    }
  }
}

export {
  CheckQuestionStatusInScreen,
  CheckToken,
  UpdateDbr,
  GetSeelahTransaction,
};

// function* UpdateDbr({ payload }) {
//   console.log("dbr update", payload);
//   try {
//     yield put(action.Loading({ Loading: true }));

//     const response1 = yield call(
//       axiosInstance.put,
//       baseUrlLos + `/dbr/calculation/dbrcalculation`,
//       payload
//     );
//     yield put(action.Loading({ Loading: false }));
//     yield put(
//       action.Message({
//         message: response1.data.message,
//         open: true,
//         error: false,
//       })
//     );
//   } catch (error) {
//     yield put(action.Loading({ Loading: false }));
//     const message = error.response.data.message;
//     yield put(action.Message({ message: message, open: true, error: true }));
//   }
// }
