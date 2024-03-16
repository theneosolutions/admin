import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import Edit from "../../Assets/Images/edit.svg";
import Delete from "../../Assets/Images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import withAuthorization from "../../constants/authorization";
import { ROLES } from "../../constants/roles";
import CreateDBR from "./dbrCreate";

function Calculations() {
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
        heading={t("DBR Guidlines")}
        iconStyle="text-3xl text-primary"
        showButton={true}
        buttonValue={"Add DBR"}
        onButtonClick={() => setModelOpen(true)}
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-gray-200 uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Income Bracket SAR")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Product Level")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Customer DBR")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("GDBR (Without MTG)")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("GDBR (Including MTG)")}
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
          <CreateDBR setModelOpen={(e) => setModelOpen(e)} />
        </Model>
      ) : null}
    </div>
  );
}
export default withAuthorization(Calculations, [
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
            Add DBR
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
    bracket: "0 to 15,000",
    Level: "33%",
    DBR: "45%",
    GDBR_Without_MTG: "45%",
    GDBR_Including_MTG: "55%",
  },
  {
    bracket: "15,001 to 25,000",
    Level: "33%",
    DBR: "45%",
    GDBR_Without_MTG: "45%",
    GDBR_Including_MTG: "65%",
  },
  {
    bracket: "More than 25,000 ",
    Level: "33%",
    DBR: "65%",
    GDBR_Without_MTG: "65%",
    GDBR_Including_MTG: "65%",
  },
];
