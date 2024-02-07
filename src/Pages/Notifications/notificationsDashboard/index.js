import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure

function NotificationsScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  return (
    <div className="py-5">
      <WaveAnimation show={loading} />

      <div className="flex md:flex-row flex-col  md:space-x-6">
        <Notifications
          value="1200"
          heading="Total Notifications"
          color="text-blue-500 text-xl"
        />
        <Notifications
          value="1200"
          heading="Clicked"
          color="text-green-500 text-xl"
        />
        <Notifications
          value="1200"
          heading="Delivered"
          color="text-orange-500 text-xl"
        />
        <Notifications
          value="1200"
          heading="Not Click Yet"
          color="text-red-700 text-xl"
        />
      </div>
      <CardMain
        width="w-full mt-10"
        heading={t("Notifications")}
        icon={<IoNotifications className="text-primary text-xl" />}
        showButton={true}
        buttonValue={"Add New Notification"}
        onButtonClick={() => navigate("/create-notifications")}
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Title")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Type")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Date")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Clicked")}
                </th>
              </tr>
            </thead>
            <tbody>
              {[9, 1, 2, 1].map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td scope="row" className="px-3 py-4">
                    Test Notification
                  </td>
                  <td scope="row" className="px-3 py-4">
                    BroadCast
                  </td>
                  <td className="px-3 py-4">11 May 2023</td>
                  <td className="px-3 py-4">false</td>
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
export default NotificationsScreen;
function Notifications({ heading, value, color }) {
  return (
    <div className="flex font-semibold flex-col bg-gray-300  px-10 py-8 text-center rounded-md md:w-1/4 w-full md:mt-0 mt-4 hover:bg-opacity-70 cursor-pointer shadow-xl duration-300">
      <a className={color}>{value}</a>
      <a className="text-xs text-gray-700 mt-2">{heading}</a>
    </div>
  );
}
