import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as action from "Services/redux/reducer";

import { TransactionHistory } from "Services/OtherApis";
function TransactionDetail() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [data, setData] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const UserId = queryParams.get("user");

  useEffect(() => {
    TransactionHistoryFunction();
  }, []);

  function TransactionHistoryFunction() {
    TransactionHistory(UserId)
      .then((data) => {
        dispatch(
          action.Message({ open: true, message: "Success", error: false })
        );
        setData(data?.data);
        console.log("helo", data);
      })
      .catch((error) =>
        dispatch(action.Message({ open: true, message: "Error", error: true }))
      );
  }

  return (
    <div className="p-1 w-full pb-10">
      <div className="overflow-x-auto relative  ">
        <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-200 font-normal">
            <tr>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("User Id")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Transaction Id")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Transaction Type")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Transaction Currency")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Transaction Amount")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Status Check Retry Count")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Status")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Sender Account")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Receiver Account")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((v, k) => (
              <tr
                key={k}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td scope="row" className="px-3 py-4">
                  {v?.userId}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.transactionId}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.transactionType}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.transactionCurrency}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.transactionAmount}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.statusCheckRetryCount || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.status || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.senderAccount}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.receiverAccount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default TransactionDetail;
