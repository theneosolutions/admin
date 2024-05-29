import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";
import { GetSeelahHistory } from "Services/OtherApis";
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
        heading={t("Selaa Transaction")}
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
                  {t("owner ship Id")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("redeemAllowed")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("wallet")}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>
    </div>
  );
}
export default withAuthorization(AllUsers, [
  ROLES.ADMIN,
  ROLES.CUSTOMER_CARE,
  ROLES.COMPLIANCE,
]);
