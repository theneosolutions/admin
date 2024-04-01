import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import User from "./users";

import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";
function NotificationsScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const notifications = useSelector((state) => state.Notifications);
  const users = useSelector((state) => state.getAllUsersAll || []);
  const [usersData, setUsersData] = useState([]);

  const [modelOpen, setModelOpen] = useState(false);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  useEffect(() => {
    getAllNotifictions();
  }, []);
  function getAllNotifictions() {
    dispatch({
      type: "GET_ALL_USERS_ALL",
    });
  }
  function reset() {
    setModelOpen(false);
  }

  useEffect(() => {
    console.log("users", users);
    if (users) {
      const data = users.filter(
        (person) => person?.roles[0]?.name !== "ROLE_USER"
      );
      setUsersData(data);
    }
  }, [users]);
  return (
    <div className="py-5">
      <CardMain
        width="w-full "
        heading={t("All Admins and Moderators")}
        showButton={true}
        buttonValue={t("Add New User")}
        onButtonClick={() => setModelOpen(true)}
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("First Name")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Email")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Id Number")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Mobile Number")}
                </th>

                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Role")}
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    {v?.firstName + " " + v?.lastName}
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {v?.email}
                  </td>
                  <td className="px-3 py-4">{v?.idNumber}</td>
                  <td className="px-3 py-4">{v?.mobileNumber}</td>
                  <td className="px-3 py-4">{v?.roles[0]?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>

      {modelOpen ? (
        <Model setModelOpen={(e) => setModelOpen(e)} reset={() => reset()}>
          <User setModelOpen={(e) => setModelOpen(e)} />
        </Model>
      ) : null}

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

export default withAuthorization(NotificationsScreen, [
  ROLES.ADMIN,
  ROLES.CUSTOMER_CARE,
  ROLES.COMPLIANCE,
]);

function Model({ children, reset }) {
  const { t } = useTranslation();

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      className="bg-gray-200 bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
    >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t("Add User")}
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
