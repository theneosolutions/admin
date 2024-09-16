import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import { GetSeelahHistory } from "Services/OtherApis";
import * as action from "../../../Services/redux/reducer";

function AllUsers() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch(action.Loading({ Loading: true }));
    GetSeelahHistory()
      .then(
        (data) => (setData(data), dispatch(action.Loading({ Loading: false })))
      )
      .catch(
        (error) => (
          console.error("Error received:", error),
          dispatch(action.Loading({ Loading: true }))
        )
      );
  }

  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("Selaa History")}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Amount")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Action")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Lended Id")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Type")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Wallet Name")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Active")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Certificates")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Lender Internal Id")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("lenders Customer Id")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("owner")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("ownership Id")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("redeem Allowed")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Wallet")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("File")}
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
                    <a>{v?.amount}</a>
                  </td>
                  <td className="px-3">{v?.action}</td>
                  <td className="px-3">{v?.lenderId}</td>
                  <td className="px-3">{v?.type}</td>
                  <td className="px-3">{v?.walletName || "null"}</td>
                  <td className="px-3">
                    {v?.transaction?.active ? "true" : "false"}
                  </td>
                  <td className="px-3">{v?.transaction?.certificates}</td>
                  <td className="px-3">{v?.transaction?.lenderInternalId}</td>
                  <td className="px-3">
                    {v?.transaction?.lendersCustomerId || "null"}
                  </td>
                  <td className="px-3">{v?.transaction?.owner}</td>
                  <td className="px-3">{v?.transaction?.ownershipId}</td>
                  <td className="px-3">
                    {v?.transaction?.redeemAllowed ? "true" : "false"}
                  </td>
                  <td className="px-3">{v?.transaction?.wallet}</td>
                  <td className="px-3">
                    <div
                      onClick={() =>
                        window.open(
                          v?.transaction?.ownershipFileUrl,
                          "_blank",
                          "noopener"
                        )
                      }
                      className="w-max px-3 py-1 rounded-md text-white bg-green-500 cursor-pointer hover:opacity-80 duration-200"
                    >
                      {t("Owner Ship File")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>
    </div>
  );
}
export default withAuthorization(AllUsers, "seela_history");
