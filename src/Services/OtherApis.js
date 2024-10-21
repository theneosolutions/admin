import { axiosInstance } from "./constant";
import config from "../config";
import { GetEncryptUser } from "functions/encryption";

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

// async function TransferMoney(data) {
//   try {
//     const response = await axiosInstance.post(
//       baseUrlCms + `/selaApi/transfer`,
//       data
//     );
//     return response.data;
//   } catch (error) {
//     const message = error.response
//       ? error.response.data.message
//       : "An error occurred";
//     return message;
//   }
// }
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

    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
  }
}

async function UpdatePermissions(id, permissions) {
  try {
    const response = await axiosInstance.put(
      baseUrlUser + `/role/${id}/permissions?permissionIds=${permissions}`
    );

    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
  }
}

async function BankCreate(payload) {
  try {
    const response = await axiosInstance.post(
      baseUrlLos + `/seulah/bank`,
      payload
    );

    return response;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
  }
}

async function GetBankList() {
  try {
    const response = await axiosInstance.get(baseUrlLos + `/seulah/bank`);

    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
  }
}
async function DeleteBank(payload) {
  try {
    const response = await axiosInstance.delete(
      baseUrlLos + `/seulah/bank?accountType=${payload}`
    );

    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
  }
}

async function AsyncCountries(payload) {
  try {
    const response = await axiosInstance.put(
      baseUrlLos + `/simah/countries/sync`
    );

    return response;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
  }
}
async function AddBlackListCountry(payload) {
  let temp;
  if (payload?.discription) {
    temp = `/country/${payload.country}/blacklist?blacklistReason=${
      payload?.discription
    }&blacklistedById=${User()?.user?.id}`;
  }
  if (!payload?.discription) {
    temp = `/country/${payload.country}/blacklist?blacklistedById=${
      User()?.user?.id
    }`;
  }
  try {
    const response = await axiosInstance.put(baseUrlLos + temp);

    return response;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
  }
}

async function DeleteCountryFromBlackList(payload) {
  try {
    const response = await axiosInstance.put(
      baseUrlLos + `/country/${payload}/whitelist`
    );

    return response;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
  }
}

async function UpdatePolicyOther(payload) {
  try {
    const response = await axiosInstance.post(
      baseUrlDecisions +
        `/policy/update?policyId=${payload?.policyId}&userId=${payload?.userId}`,
      payload?.data
    );

    return response;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return error.response;
  }
}
async function GetSeelaInvestMent(id) {
  try {
    const response = await axiosInstance.get(
      baseUrlCms + `/selaApi/buy-ownerships-by_user?userId=${id}`
    );
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return message;
  }
}
async function GetSelaaSellRadeemValues(id) {
  try {
    const response = await axiosInstance.get(
      baseUrlCms + `/selaApi/transfer-redeem-status?userId=${id}`
    );
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    return message;
  }
}
async function SeelaOperationBuy(payload) {
  try {
    const response = await axiosInstance.post(
      baseUrlCms + `/selaApi/buy`,
      payload
    );
    // console.log("Response status:", response.status); // Success status code
    // console.log("Response data:", response.data);
    return { status: response?.status, message: response?.data?.messsage };
  } catch (error) {
    const status = error.response ? error.response.status : null; // Error status code
    const message = error.response
      ? error.response.data.message
      : "An error occurred";
    // console.log("Error status:", status);
    // console.log("Error message:", message);
    return { status: status, message: message };
  }
}

async function TransferInvetmentCertificate(data) {
  try {
    const response = await axiosInstance.post(
      baseUrlCms + `/selaApi/transfer`,
      data
    );
    return {
      status: response?.status,
      message: response?.data?.messsage,
      response: response?.data,
    };
  } catch (error) {
    const status = error.response ? error.response.status : null; // Error status code
    const message = error.response
      ? error.response.data.message || error?.message
      : "An error occurred";

    return { status: status, message: message };
  }
}
async function RadeemInvestmentSelaa(data) {
  try {
    const response = await axiosInstance.post(
      baseUrlCms +
        `/selaApi/redeem?ownershipId=${data?.ownershipId}&userId=${data?.userId}`
    );
    return {
      status: response?.status,
      message: response?.data?.messsage,
      response: response?.data,
    };
  } catch (error) {
    const status = error.response ? error.response.status : null; // Error status code
    const message = error.response
      ? error.response.data.message || error?.message
      : "An error occurred";

    return { status: status, message: message };
  }
}
async function GetOwnerShipIdOfApplication(data) {
  try {
    const response = await axiosInstance.post(
      baseUrlCms + `/selaApi/buy-ownerships`,
      data
    );

    return {
      status: response?.status,
      message: response?.data?.messsage,
      response: response?.data,
    };
  } catch (error) {
    const status = error.response ? error.response.status : null; // Error status code
    const message = error.response
      ? error.response.data.message || error?.message
      : "An error occurred";

    return { status: status, message: message };
  }
}

export {
  GetOwnerShipIdOfApplication,
  RadeemInvestmentSelaa,
  TransferInvetmentCertificate,
  GetSelaaSellRadeemValues,
  SeelaOperationBuy,
  GetSeelaInvestMent,
  UpdatePolicyOther,
  AsyncCountries,
  DeleteBank,
  CheckQuestionStatusInScreen,
  UpdateDbr,
  GetSeelahHistory,
  RadeemMoney,
  GetAllOwnersShipIds,
  TopUpWalletFunction,
  TransferRajhi,
  TransactionHistory,
  ResetFailedAttemps,
  UpdatePermissions,
  BankCreate,
  GetBankList,
  AddBlackListCountry,
  DeleteCountryFromBlackList,
};
function User() {
  const user = GetEncryptUser();

  if (user) {
    if (user?.data) {
      return user?.data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
