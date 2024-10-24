import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Model from "Components/Model2";
import { useLocation } from "react-router-dom";
import * as action from "Services/redux/reducer";

import { GetSeelaInvestMent } from "Services/OtherApis";
import { getLanguage } from "functions/getLanguage";
function SeelaInvestment() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const UserId = queryParams.get("user");
  const [activeData, setActiveData] = useState();
  const [activeData2, setActiveData2] = useState();

  useEffect(() => {
    GetSelaInvestmentsData();
  }, []);

  function GetSelaInvestmentsData() {
    GetSeelaInvestMent(UserId)
      .then((data) => {
        // dispatch(
        //   action.Message({ open: true, message: "Success", error: false })
        // );
        setData(data?.data);
      })
      .catch((error) =>
        dispatch(action.Message({ open: true, message: "Error", error: true }))
      );
  }

  return (
    <div className="p-1 w-full pb-10">
      <div className="overflow-x-auto relative  ">
        <table
          className={`w-full whitespace-nowrap  text-sm  text-gray-500 dark:text-gray-400 ${
            getLanguage() === "ar" ? "text-right" : "text-left"
          }`}
        >
          <thead className="text-xs text-gray-400 uppercase bg-gray-200 font-normal">
            <tr>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Application Id")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Amount")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Status")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Owner ship Id")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Certificates")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("View")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Action")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((v, k) => (
              <tr key={k} className="bg-white border-b dark:border-gray-200">
                <td scope="row" className="px-3 py-4">
                  {v?.applicationId}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.amount}
                </td>
                <td scope="row" className="px-3 py-4">
                  {v?.status}
                </td>

                <td scope="row" className="px-3 py-4">
                  {JSON.parse(v?.buyResponse)?.ownershipId}
                </td>
                <td scope="row" className="px-3 py-4">
                  {JSON.parse(v?.buyResponse)?.certificates}
                </td>
                <td className="px-3">
                  {v?.ownershipFileUrl ? (
                    <div
                      onClick={() =>
                        window.open(v?.ownershipFileUrl, "_blank", "noopener")
                      }
                      className="w-max px-3 py-1 rounded-md text-white bg-green-500 cursor-pointer hover:opacity-80 duration-200"
                    >
                      {t("View Investment Certificate")}
                    </div>
                  ) : (
                    "Not Found"
                  )}
                </td>
                <td className="px-3">
                  <div
                    className="w-max px-3 py-1 rounded-md text-white bg-green-500 cursor-pointer hover:opacity-80 duration-200"
                    onClick={() => (
                      setActiveData2(JSON.parse(v?.buyRequest)),
                      setModelOpen2(true)
                    )}
                  >
                    {t("View Request")}
                  </div>
                </td>
                <td className="px-3">
                  <div
                    className="w-max px-3 py-1 rounded-md text-white bg-green-500 cursor-pointer hover:opacity-80 duration-200"
                    onClick={() => (
                      setActiveData(JSON.parse(v?.buyResponse)),
                      setModelOpen(true)
                    )}
                  >
                    {t("View Response")}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modelOpen ? (
        <Model
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => (setModelOpen(false), setActiveData(""))}
          heading="View Response"
        >
          <Response data={activeData} />
        </Model>
      ) : null}
      {modelOpen2 ? (
        <Model
          setModelOpen={(e) => setModelOpen2(e)}
          reset={() => (setModelOpen2(false), setActiveData2(""))}
          heading="View Request"
        >
          <Response data={activeData2} />
        </Model>
      ) : null}
    </div>
  );
}
export default SeelaInvestment;

function Response({ data }) {
  const { t } = useTranslation();

  return (
    <div
      className="px-5 py-4 flex flex-row pb-7 overflow-auto"
      style={{ maxHeight: "85vh" }}
    >
      <div className="w-44 space-y-4 flex flex-col opacity-80">
        {Object.keys(data || {}).map((key, index) => (
          <a key={index}>{t(key)} :</a>
        ))}
      </div>
      <div className="w-72 space-y-4 flex flex-col">
        {Object.values(data || {}).map((value, index) => (
          <a
            key={index}
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {value}
          </a>
        ))}
      </div>
    </div>
  );
}
