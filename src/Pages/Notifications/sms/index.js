import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";

import withAuthorization from "../../../constants/authorization";
import Model2 from "Components/Model2";
import AddSms from "../sms/addSms";
import Delete from "../../../Assets/Images/delete.svg";
import Edit from "../../../Assets/Images/edit.svg";
import { getLanguage } from "functions/getLanguage";

function NotificationsScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getSmsOtp = useSelector((state) => state.getSmsOtp);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    getAllSmsOtp();
  }, []);
  function getAllSmsOtp() {
    dispatch({
      type: "GET_ALL_SMS",
    });
  }
  function reset() {
    setModelOpen(false);
  }
  function onDelete(id) {
    dispatch({
      type: "DELETE_SMS",
      payload: id,
    });
    setTimeout(() => getAllSmsOtp(), 500);
  }

  function onEdit(data) {
    setSelectedData(data);
    setModelOpen(true);
  }

  return (
    <div className="py-5">
      <CardMain
        width="w-full "
        heading={t("Sms & Otp")}
        showButton={true}
        buttonValue={t("Add New Sms or Otp")}
        onButtonClick={() => (setModelOpen(true), setSelectedData(null))}
      >
        <div className="overflow-x-auto relative  mt-4">
          <table
            className={`w-full whitespace-nowrap  text-sm  text-gray-500 dark:text-gray-400 ${
              getLanguage() === "ar" ? "text-right" : "text-left"
            }`}
          >
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("description")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Heading")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Language Code")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Type")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getSmsOtp?.map((v, k) => (
                <tr key={k} className=" border-b  dark:border-gray-200">
                  <td
                    scope="row"
                    className="px-3 py-4  w-1/3 overflow-hidden text-wrap whitespace"
                    title={v?.description}
                  >
                    {v?.description}
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {v?.heading}
                  </td>
                  <td className="px-3 py-4">{v?.languageCode}</td>
                  <td className="px-3 py-4">{v?.type}</td>
                  <th
                    scope="row"
                    className=" px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white sticky right-0 bg-white z-10"
                  >
                    <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                      <img
                        src={Edit}
                        className="h-6 cursor-pointer"
                        onClick={() => onEdit(v)}
                      />
                      <img
                        src={Delete}
                        className="h-6 cursor-pointer"
                        onClick={() => onDelete(v?.smsId)}
                      />
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>
      {modelOpen ? (
        <Model2
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading={t("Add SMS And OTP")}
        >
          <AddSms
            selectedData={selectedData}
            setModelOpen={(e) => setModelOpen(false)}
          />
        </Model2>
      ) : null}
    </div>
  );
}
export default withAuthorization(NotificationsScreen);
