import { axiosInstance } from "./constant";
import config from "../config";

var baseUrlUser = `${config.API_URL}/api/v1/auth`;
var baseUrlDecisions = `${config.API_URL}/api/v1/dms`;
var baseUrlLos = `${config.API_URL}/api/v1/los`;
var baseUrlCms = `${config.API_URL}/api/v1/cms`;

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
  try {
    const response = await axiosInstance.get(baseUrlCms + `/selaApi/history`);
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
  try {
    const response = await axiosInstance.put(
      `${baseUrlLos}/dbr/calculation/updateDBRcalculation`,
      data
    );

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

async function TransferRajhi(id) {
  try {
    const response = await axiosInstance.post(
      baseUrlLos +
        `/alrajhi/transfer/paymentTransferBusinessToCustomer?userId=${id}`
    );
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return message;
  }
}

async function TransactionHistory(id) {
  try {
    const response = await axiosInstance.get(
      baseUrlLos + `/alrajhi/transfer/fetchUserTransactions?userId=${id}`
    );
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return message;
  }
}

async function ResetFailedAttemps(id) {
  try {
    const response = await axiosInstance.post(
      baseUrlUser + `/user/resetFailedAttempts?idNumber=${id}`
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("response error", error?.response);
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
  }
}

async function UpdatePermissions(id, permissions) {
  console.log("role Id ==== ", id, "permissions === ", permissions);
  try {
    const response = await axiosInstance.put(
      baseUrlUser + `/role/${id}/permissions?permissionIds=${permissions}`
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("response error", error?.response);
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
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
  TransferRajhi,
  TransactionHistory,
  ResetFailedAttemps,
  UpdatePermissions,
};
