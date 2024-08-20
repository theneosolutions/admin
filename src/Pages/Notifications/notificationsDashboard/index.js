import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Services/redux/reducer";

import withAuthorization from "../../../constants/authorization";
function NotificationsScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = useSelector((state) => state.Notifications);

  useEffect(() => {
    getAllNotifictions();
  }, []);
  function getAllNotifictions() {
    dispatch({
      type: "GET_ALL_NOTIFICATIONS",
    });
  }

  return (
    <div className="py-5">
      <div className="flex md:flex-row flex-col  md:space-x-6 rtl:space-x-reverse">
        <Notifications
          value={notifications?.length || 0}
          heading={t("Total Notifications")}
          color="text-blue-500 text-xl"
        />
        <Notifications
          value="1"
          heading={t("Clicked")}
          color="text-green-500 text-xl"
        />
        <Notifications
          value="3"
          heading={t("Delivered")}
          color="text-orange-500 text-xl"
        />
        <Notifications
          value="8"
          heading={t("Not Click Yet")}
          color="text-red-700 text-xl"
        />
      </div>
      <CardMain
        width="w-full mt-10"
        heading={t("Notifications")}
        icon={<IoNotifications className="text-primary text-xl" />}
        showButton={true}
        buttonValue={t("Add New Notification")}
        onButtonClick={() => navigate("/create-notifications")}
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Icon")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Subject")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Content")}
                </th>
              </tr>
            </thead>
            <tbody>
              {notifications?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <img
                      src={v?.img}
                      className="avatar h-10 w-10 rounded-full cursor-pointer"
                    />
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {v?.subject}
                  </td>
                  <td className="px-3 py-4">{v?.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>
    </div>
  );
}
export default withAuthorization(
  NotificationsScreen,
  "notifications_dashboard"
);
function Notifications({ heading, value, color }) {
  return (
    <div className="flex font-semibold flex-col bg-gray-300  px-10 py-8 text-center rounded-md md:w-1/4 w-full md:mt-0 mt-4 hover:bg-opacity-70 cursor-pointer shadow-xl duration-300">
      <a className={color}>{value}</a>
      <a className="text-xs text-gray-700 mt-2">{heading}</a>
    </div>
  );
}
