import React from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
function Calculations() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const users = useSelector((state) => state.getAllUsersAll);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_ALL_USERS_ALL",
    });
  }

  return (
    <div className="p-1 w-full pb-10">
      <div className="overflow-x-auto relative">
        <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 bg-gray-200 uppercase  font-normal">
            <tr>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Expenses")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Expenses Frequency")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Bare Minimum Expenses")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Customer Declared Expenses")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Final Monthly Expenses")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((v, k) => (
              <tr
                key={k}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                >
                  <a>{v?.bracket}</a>
                </td>

                <td className="px-3 py-4 ">
                  <a>{v?.Level}</a>
                </td>
                <td className="px-3 py-4 ">
                  <a>{v?.DBR}</a>
                </td>
                <td className="px-3 py-4 ">
                  <a>{v?.GDBR_Without_MTG}</a>
                </td>
                <td className="px-3 py-4 ">
                  <a>{v?.GDBR_Including_MTG}</a>
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
