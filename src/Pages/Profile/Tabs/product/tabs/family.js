import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
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
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
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
      console.log("getAllUsersEmi", EmiDetail);
      setData(EmiDetail);
    }
  }, [getAllUsersEmi]);
  console.log("data", data);
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
export default Calculations;

const data = [
  {
    bracket: "Food",
    Level: "Monthly",
    DBR: "100",
    GDBR_Without_MTG: "45",
    GDBR_Including_MTG: "200",
  },
  {
    bracket: "Housing Rent",
    Level: "Monthly",
    DBR: "1200",
    GDBR_Without_MTG: "45",
    GDBR_Including_MTG: "200",
  },
  {
    bracket: "Utility",
    Level: "Monthly",
    DBR: "200",
    GDBR_Without_MTG: "65",
    GDBR_Including_MTG: "65",
  },
  {
    bracket: "Domestic Labour Wage",
    Level: "Monthly",
    DBR: "800",
    GDBR_Without_MTG: "65",
    GDBR_Including_MTG: "65",
  },
  {
    bracket: "Education Expenses",
    Level: "Monthly",
    DBR: "300",
    GDBR_Without_MTG: "65",
    GDBR_Including_MTG: "65",
  },
  {
    bracket: "Transport Expenses",
    Level: "Monthly",
    DBR: "400",
    GDBR_Without_MTG: "65",
    GDBR_Including_MTG: "65",
  },
  {
    bracket: "Health Care Expenses",
    Level: "Monthly",
    DBR: "200",
    GDBR_Without_MTG: "65",
    GDBR_Including_MTG: "65",
  },
  {
    bracket: "Insurance Expenses",
    Level: "Monthly",
    DBR: "200",
    GDBR_Without_MTG: "65",
    GDBR_Including_MTG: "65",
  },
  {
    bracket: "Liabilities Other then SIMAH",
    Level: "Monthly",
    DBR: "0",
    GDBR_Without_MTG: "0",
    GDBR_Including_MTG: "0",
  },
  {
    bracket: "Other Expenses",
    Level: "0",
    DBR: "0",
    GDBR_Without_MTG: "0",
    GDBR_Including_MTG: "0",
  },
];
