import React, { useState } from "react";
import Team from "../../Teams";
import Data from "./_data";
import { useTranslation } from "react-i18next";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Approved from "../../../Assets/Images/approved.svg";
import Hold from "../../../Assets/Images/hold.svg";
import Edit from "../../../Assets/Images/edit.svg";
import Delete from "../../../Assets/Images/delete.svg";
import { getLanguage } from "functions/getLanguage";
function MyApplication2() {
  const { t } = useTranslation();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...Data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [Data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  // const getSortIcon = (key) => {
  //   if (sortConfig.key === key) {
  //     return sortConfig.direction === "ascending" ? (
  //       <IoIosArrowUp />
  //     ) : (
  //       <IoIosArrowDown />
  //     );
  //   }
  //   return null;
  // };

  return (
    <div className="">
      <div className="relative overflow-x-auto">
        <table
          className={`w-full text-sm text-gray-500 dark:text-gray-400 ${
            getLanguage() === "ar" ? "text-right" : "text-left"
          }`}
        >
          <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort("borrower")}
              >
                {t("Borrower")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort("app_id")}
              >
                {t("App Id")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort("status")}
              >
                {t("Status")}
              </th>
              {/* Assuming Team Members is not sortable as it's a component */}
              <th scope="col" className="px-6 py-3">
                {t("Team Members")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort("loan_amount")}
              >
                {t("Loan Amount")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Approved/Hold")}
              </th>
              <th
                scope="col"
                className="px-3 py-3 cursor-pointer"
                onClick={() => requestSort("loan_amount")}
              >
                {t("Edit/Delete")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((v, k) => (
              <tr key={k} className="bg-white border-b dark:border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {v.borrower}
                </th>
                <td className="px-6 py-4">{v.app_id}</td>
                <td className="px-6 py-4">{Status(v.status)}</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <Team />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {v.laon_amount}
                </th>
                <td className="px-3 py-4 flex flex-row space-x-2 rtl:space-x-reverse">
                  <img src={Approved} className="h-6" />
                  <img src={Hold} className="h-6" />
                </td>

                <th
                  scope="row"
                  className="px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {/* {v.lastName} */}
                  <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                    <img src={Edit} className="h-6" />
                    <img src={Delete} className="h-6" />
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default MyApplication2;
function Status(value) {
  const { t } = useTranslation();

  let color;
  if (value === t("Rejected")) {
    color = "bg-blue-400";
  } else if (value === t("Approved")) {
    color = "bg-red-400";
  }
  return (
    <div className="flex flex-row space-x-3 rtl:space-x-reverse items-center">
      <h1> {t(value)}</h1>
      <div className={`rounded-full h-1.5 w-1.5 ${color}`}></div>
    </div>
  );
}
