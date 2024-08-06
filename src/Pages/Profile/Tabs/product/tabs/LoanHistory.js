import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
function Calculations() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [data, setData] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const UserId = queryParams.get("user");
  const getAllUsersEmi = useSelector((state) => state.getUserApplication);

  useEffect(() => {
    getAllUsersEmiData();
  }, []);
  function getAllUsersEmiData() {
    dispatch({
      type: "GET_USER_APPLICATION_DATA",
      payload: UserId,
    });
  }
  function DateSet(newDate) {
    var timestamp = parseInt(newDate); // Example timestamp value
    var date = new Date(timestamp);
    return moment(date.toString()).subtract(10, "days").calendar();
  }
  return (
    <div className="p-1 w-full pb-10">
      <div className="overflow-x-auto relative  ">
        <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-200 font-normal">
            <tr>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Id")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("First Installment Date")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Last Installment Date")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Monthly Installment")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Due Installment Date")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Months")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Interest Amount Table")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Outstanding Principal")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Principal Amount Table")}
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllUsersEmi?.LoanHistory?.map((v, k) => (
              <tr
                key={k}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td scope="row" className="px-3 py-4">
                  {k + 1}
                </td>
                <td scope="row" className="px-3 py-4">
                  {DateSet(v?.firstInstallmentDate)}
                </td>
                <td scope="row" className="px-3 py-4">
                  {DateSet(v?.lastInstallmentDate) || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.monthlyInstallment}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.dueInstallmentDate || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.month || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.interestAmountTable || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.outstandingPrincipal || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.principalAmountTable || "NAN"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Calculations;
