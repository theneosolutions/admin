import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import withAuthorization from "../../constants/authorization";
import { ROLES } from "../../constants/roles";
import CreateBME from "./createBareMinimum";

function BareMinimumExpense() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const users = useSelector((state) => state.getAllUsersAll);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);

  const [modelOpen, setModelOpen] = useState(false);

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
  function reset() {
    setModelOpen(false);
  }
  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("Bare Minimum Expense")}
        iconStyle="text-3xl text-primary"
        showButton={true}
        buttonValue={"Add Bare Minimum Expense"}
        onButtonClick={() => setModelOpen(true)}
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-gray-200 uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Expenses")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Bare Minimum expense Per Person")}
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
                    <a>{v?.title}</a>
                  </td>

                  <td className="px-3 py-4 ">
                    <a>{v?.expense}</a>
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

      {modelOpen ? (
        <Model setModelOpen={(e) => setModelOpen(e)} reset={() => reset()}>
          <CreateBME setModelOpen={(e) => setModelOpen(e)} />
        </Model>
      ) : null}
    </div>
  );
}
export default withAuthorization(BareMinimumExpense, [
  ROLES.ADMIN,
  ROLES.UNDER_WRITER,
]);
function Model({ children, reset }) {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      className="bg-gray-200 bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
    >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create Bare Minimum Expense
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => reset()}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const data = [
  {
    title: "Food",
    expense: "100",
  },
  {
    title: "Housing Rent",
    expense: "1200",
  },
  {
    title: "Utility",
    expense: "200",
  },
  {
    title: "Domestic Labour Wage",
    expense: "800",
  },
  {
    title: "Education Expenses",
    expense: "300",
  },
  {
    title: "Transportation Expenses",
    expense: "400",
  },
  {
    title: "Healthcare Expenses",
    expense: "200",
  },
  {
    title: "Insurance Expenses",
    expense: "200",
  },
  {
    title: "Liabilities Other then SIMAH",
    expense: "0",
  },
  {
    title: "Other Expenses",
    expense: "0",
  },
];
