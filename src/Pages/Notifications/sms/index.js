import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";

import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";
import Model2 from "Components/Model2";
import AddSms from "../sms/addSms";
import Delete from "../../../Assets/Images/delete.svg";

function NotificationsScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const getSmsOtp = useSelector((state) => state.getSmsOtp);
  const [modelOpen, setModelOpen] = useState(true);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

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
  return (
    <div className="py-5">
      <CardMain
        width="w-full "
        heading={t("Sms And Otp")}
        showButton={true}
        buttonValue={t("Add New Notification")}
        onButtonClick={() => setModelOpen(true)}
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
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
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
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
                      {/* <img src={Edit} className="h-6 cursor-pointer" /> */}
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
            // data={selectedData}
            setModelOpen={(e) => (setModelOpen(e), getAllSmsOtp())}
          />
        </Model2>
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
]);
function Notifications({ heading, value, color }) {
  return (
    <div className="flex font-semibold flex-col bg-gray-300  px-10 py-8 text-center rounded-md md:w-1/4 w-full md:mt-0 mt-4 hover:bg-opacity-70 cursor-pointer shadow-xl duration-300">
      <a className={color}>{value}</a>
      <a className="text-xs text-gray-700 mt-2">{heading}</a>
    </div>
  );
}
