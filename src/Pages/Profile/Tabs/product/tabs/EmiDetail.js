import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Calculations() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [data, setData] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const UserId = queryParams.get("user");
  const getAllUsersEmi = useSelector((state) => state.getAllUsersEmi);

  useEffect(() => {
    getAllUsersEmiData();
  }, []);
  function getAllUsersEmiData() {
    dispatch({
      type: "GET_ALL_USERS_EMI",
    });
  }
  useEffect(() => {
    if (getAllUsersEmi?.length > 0) {
      const EmiDetail = getAllUsersEmi?.filter(
        (user) => user?.userId === parseInt(UserId)
      );

      setData(EmiDetail);
    }
  }, [getAllUsersEmi]);

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
                {t("Gross Salary")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Include Mtg")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Net Income")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Simah Libilities")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Total Dependents")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Final Eligible EMI")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Domestic Worker")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Disposable Income")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Children")}
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
                  {v?.grossSalary || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.includeMtg === true ? "True" : "False"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.netIncome || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.simahLibilities || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.totalDependents || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.finalEligibleEMI || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.domesticWorker || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.disposableIncome || "NAN"}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.children || "NAN"}
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
