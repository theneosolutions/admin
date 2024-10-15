import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Model } from "Components";
import Model2 from "Components/Model2";
import AddProductModel from "../addProductModel";
import withAuthorization from "constants/authorization";
import AddCountry from "./addCountryModel";
import { AsyncCountries, DeleteCountryFromBlackList } from "Services/OtherApis";
import * as action from "Services/redux/reducer";
import { useTranslation } from "react-i18next";
function BlackListCountries() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);
  const [activeDelete, setActiveDelete] = useState();
  const blackListCountries = useSelector((state) => state.blackListCountries);

  function reset() {
    setModelOpen(false);
  }

  function funcAsyncCountries() {
    AsyncCountries().then((res) => {
      console.log("helo", res);
      if (res.status === 200) {
        dispatch(
          action.Message({
            message: res?.data,
            open: true,
            error: false,
          })
        );
      } else {
        dispatch(
          action.Message({
            message: "Error",
            open: true,
            error: true,
          })
        );
      }
    });
  }
  useEffect(() => {
    getList();
  }, []);
  function getList() {
    dispatch({
      type: "GET_BLACK_LIST_COUNTRIES",
    });
  }
  function DeleteCountry(id) {
    DeleteCountryFromBlackList(activeDelete).then((res) => {
      if (res.status === 200) {
        dispatch(
          action.Message({
            message: res?.data,
            open: true,
            error: false,
          })
        );
        setModelOpen2(false);
        getList();
      } else {
        dispatch(
          action.Message({
            message: "Error",
            open: true,
            error: true,
          })
        );
      }
    });
  }

  return (
    <div className="  bg-white  border border-primary w-full rounded-lg mt-4 md:mt-0 p-4">
      <div className="flex flex-row  overflow-x-auto  justify-between items-center">
        <h1>{t("Blacklisted countries")}</h1>
        <div className="space-x-4 rtl:space-x-reverse">
          <Button
            onButtonClick={() => setModelOpen(true)}
            buttonValue={t("Add Country")}
            buttonStyle="px-20 py-2"
          />
          <Button
            onButtonClick={() => funcAsyncCountries()}
            buttonValue={t("Sync Countries")}
            buttonStyle="px-20 py-2"
          />
        </div>
      </div>

      <div className="py-5  w-full">
        <div className="overflow-x-auto relative">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-200 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Country Name English")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Country Name Arbic")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Country Code")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Reason")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {blackListCountries?.map((v, k) => (
                <tr key={k} className="bg-white border-b dark:border-gray-200">
                  <td className="px-3 py-4">{v?.countryDetails.nameEN}</td>
                  <td className="px-3 py-4 amiri-regular">
                    {v?.countryDetails?.nameAR}
                  </td>
                  <td className="px-3 py-4">
                    {v?.countryDetails?.countryCode}
                  </td>
                  <td className="px-3 py-4">{v?.blacklistReason}</td>

                  <td
                    className="px-3 py-4"
                    onClick={() => (
                      setModelOpen2(true), setActiveDelete(v?.id)
                    )}
                  >
                    <div className="bg-red-500 rounded-md px-4 py-1 text-white text-center items-center w-min hover:bg-opacity-80 cursor-pointer duration-300">
                      {t("Delete")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modelOpen ? (
        <Model2
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading={t("Add Country")}
        >
          <AddCountry
            setModelOpen={(e) => setModelOpen(e)}
            getBlackListCountries={() => getList()}
          />
        </Model2>
      ) : null}

      <Model
        heading={t("Delete Country")}
        isOpen={modelOpen2}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen2(!modelOpen2)}
        action1Value={t("Cancel")}
        action2Value={t("Delete")}
        action2={() => DeleteCountry()}
        action1={() => setModelOpen2(!modelOpen)}
      >
        <a className=" text-xl text-gray-800 dark:text-white">
          {t("Are you sure to delete this ?")}
          <span className="font-semibold"> </span>
        </a>
      </Model>
    </div>
  );
}

export default withAuthorization(BlackListCountries);
