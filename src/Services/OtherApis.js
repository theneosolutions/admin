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

async function GetSeelahHistory() {
  console.log("GetSeelahHistoryGetSeelahTransaction");
  try {
    const response = await axios.get(baseUrlCms + `/selaApi/history`);
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

async function UpdateDbr(data) {
  console.log("Starting UpdateDbr function", data);

  try {
    const response = await axiosInstance.put(
      `${baseUrlLos}/dbr/calculation/updateDBRcalculation`,
      data
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

async function TransferMoney(data) {
  try {
    const response = await axiosInstance.post(
      baseUrlCms + `/selaApi/transfer`,
      data
    );
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return message;
  }
}
async function RadeemMoney(id) {
  try {
    const response = await axiosInstance.post(
      baseUrlCms + `/selaApi/redeem?ownershipId=${id}`
    );
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return message;
  }
}
async function GetAllOwnersShipIds() {
  try {
    const response = await axiosInstance.get(
      baseUrlCms + `/selaApi/getAllOwnerShipIds`
    );
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return message;
  }
}

async function TopUpWalletFunction(data) {
  console.log("helo", data);
  try {
    const response = await axiosInstance.post(
      baseUrlCms + `/selaApi/topUpWalletAmount`,
      data
    );
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return message;
  }
}

export {
  CheckQuestionStatusInScreen,
  CheckToken,
  UpdateDbr,
  GetSeelahHistory,
  TransferMoney,
  RadeemMoney,
  GetAllOwnersShipIds,
  TopUpWalletFunction,
};
