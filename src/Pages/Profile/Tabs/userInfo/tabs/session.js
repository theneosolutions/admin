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
            <th scope="col" className="px-3 py-3 cursor-pointer">
              {t("City")}
            </th>
            <th scope="col" className="px-3 py-3 cursor-pointer">
              {t("Country")}
            </th>
            <th scope="col" className="px-3 py-3 cursor-pointer">
              {t("Ip Address")}
            </th>
            <th scope="col" className="px-3 py-3 cursor-pointer">
              {t("Mac Address")}
            </th>
          </tr>
        </thead>
        <tbody>
          {user?.map((v, k) => (
            <tr key={k} className="bg-white border-b dark:border-gray-200">
              <td className="px-3 py-3 ">
                {moment(v?.loggedInTime).format("LLLL")}
              </td>
              {v?.loggedOutTime ? (
                <td className="px-3">
                  {" "}
                  {moment(v?.loggedOutTime).format("LLLL")}
                </td>
              ) : (
                <td className="px-3">{t("Currently Logged In")} </td>
              )}
              <td className="px-3">{v?.cityInfo}</td>
              <td className="px-3">{v?.countryInfo}</td>
              <td className="px-3">{v?.ipAddress}</td>
              <td className="px-3">{v?.macAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PersonalDetailCard;
