import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import { getLanguage } from "functions/getLanguage";

function AllUsers() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data = useSelector((state) => state.getSeelahTransaction);
  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_SELAA_TRANSACTION",
    });
  }

  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("Customer Transaction")}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-scroll  mt-4 relative h-[70vh]">
          <table
            className={`w-full whitespace-nowrap  text-sm  text-gray-500 dark:text-gray-400 ${
              getLanguage() === "ar" ? "text-right" : "text-left"
            }`}
          >
            <thead className=" text-xs text-gray-400 bg-white uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Amount")}
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
                  {t("Lender Id")}
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
            <tbody className=" ">
              {data?.map((v, k) => (
                <tr key={k} className="bg-white border-b  dark:border-gray-200">
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <a>{v?.amount}</a>
                  </td>
                  <td className="px-3">{v?.lenderId}</td>
                  <td className="px-3">{v?.type}</td>
                  <td className="px-3">{v?.walletName || "null"}</td>
                  <td className="px-3">
                    {v?.transaction?.active ? "true" : "false"}
                  </td>
                  <td className="px-3">{v?.certificates}</td>

                  <td className="px-3">{v?.lenderId}</td>
                  <td className="px-3">{v?.lenderInternalId}</td>
                  <td className="px-3">{v?.lendersCustomerId || "null"}</td>
                  <td className="px-3">{v?.owner}</td>
                  <td className="px-3">{v?.ownershipId}</td>
                  <td className="px-3">
                    {v?.redeemAllowed ? "true" : "false"}
                  </td>
                  <td className="px-3">{v?.wallet}</td>
                  <td className="px-3">
                    <div
                      onClick={() =>
                        window.open(v?.ownershipFileUrl, "_blank", "noopener")
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
export default withAuthorization(AllUsers);
