import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";

function VerifiedUsers() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getAllUsersEmi = useSelector((state) => state.getAllUsersEmi);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const [newUsersData, setNewUsersData] = useState([1]);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  console.log("getAllUsersEmi", getAllUsersEmi);
  useEffect(() => {
    getAllUsersEmiData();
  }, []);
  function getAllUsersEmiData() {
    dispatch({
      type: "GET_ALL_USERS_EMI",
    });
  }

  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("Customers Emi")}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-white font-normal">
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
                {/* <th
                  scope="col"
                  className="px-3 py-3 cursor-pointer  sticky right-0 bg-white z-10"
                >
                  {t("Edit/Delete")}
                </th> */}
              </tr>
            </thead>
            <tbody>
              {getAllUsersEmi?.map((v, k) => (
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
      </CardMain>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default withAuthorization(VerifiedUsers, [
  ROLES.ADMIN,
  ROLES.CUSTOMER_CARE,
  ROLES.COMPLIANCE,
]);
