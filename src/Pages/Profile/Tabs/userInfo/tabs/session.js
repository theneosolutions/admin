import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";

function PersonalDetailCard() {
  const user = useSelector((state) => state.getUserById?.userMonitoring);
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto relative   w-full">
      <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
          <tr>
            <th scope="col" className="px-3 py-3 cursor-pointer">
              {t("Logged In Time")}
            </th>
            <th scope="col" className="px-3 py-3 cursor-pointer">
              {t("Logged Out Time")}
            </th>
          </tr>
        </thead>
        <tbody>
          {user?.map((v, k) => (
            <tr
              key={k}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-3 py-3 ">
                {moment(v?.loggedInTime).format("LLLL")}

                {/* {moment(v?.loggedInTime).format("MMMM Do YYYY, h:mm:ss a")} */}
              </td>
              {v?.loggedOutTime ? (
                <td> {moment(v?.loggedOutTime).format("LLLL")}</td>
              ) : (
                <td>{t("Currently Logged In")} </td>
              )}
              {/* <td>{v?.loggedOutTime}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PersonalDetailCard;
