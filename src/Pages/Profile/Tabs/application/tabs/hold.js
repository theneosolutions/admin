import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Edit from "Assets/Images/edit.svg";
import Delete from "Assets/Images/delete.svg";
import { Model, Avatar } from "Components";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
function LaonApplication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);
  const users = useSelector((state) => state.getApplications);

  function onDelete() {
    setModelOpen(true);
  }
  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_LOAN_APPLICATIONS",
    });
  }

  return (
    <div className="py-5  w-full">
      <div className="overflow-x-auto relative">
        <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
            <tr>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("User Id")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Loan Reason")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Loan Ammount")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Duration")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Status")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Action")}
              </th>
              <th
                scope="col"
                className="px-3 py-3 cursor-pointer  sticky right-0 bg-white z-10"
              >
                {t("Edit/Delete")}
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((v, k) => (
              <tr
                key={k}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                >
                  <Avatar
                    icon={
                      "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png"
                    }
                    onClick={() => navigate("/profile")}
                  />

                  <a>{v.userId}</a>
                </td>
                <td scope="row" className="px-3 py-4">
                  {v.formulaName}
                </td>
                <td className="px-3 py-4">{v.loanAmount}</td>
                <td className="px-3 py-4">{v.month + " Months"}</td>
                <td className="px-3 py-4">
                  <div
                    onClick={() => navigate(`/user-applications?id=${v.id}`)}
                    className="bg-red-400 text-white px-3 py-1 w-max rounded-md cursor-pointer hover:bg-primary hover:text-white duration-300"
                  >
                    On Hold
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div
                    onClick={() => navigate(`/user-applications?id=${v.id}`)}
                    className=" border border-primary px-3 py-1 w-max rounded-md cursor-pointer hover:bg-primary hover:text-white duration-300"
                  >
                    View Details
                  </div>
                </td>
                <th
                  scope="row"
                  className=" px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white sticky right-0 bg-white z-10"
                >
                  <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                    <img src={Edit} className="h-6 cursor-pointer" />
                    <img
                      src={Delete}
                      className="h-6 cursor-pointer"
                      onClick={() => onDelete()}
                    />
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Model
        heading={t("Delete User")}
        isOpen={modelOpen}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen(!modelOpen)}
        action1Value={t("Cancel")}
        action2Value={t("Delete")}
        action2={() => setModelOpen(false)}
        action1={() => setModelOpen(!modelOpen)}
      >
        <a className=" text-xl text-gray-800 ">
          {t("Are You Sure To Delete ?")}
          <span className="font-semibold"> Ali Imtayaz</span>
        </a>
      </Model>
    </div>
  );
}
export default LaonApplication;
