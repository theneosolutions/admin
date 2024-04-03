import React from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";

function SimahProductList() {
  const codes = useSelector((state) => state.getSimahCodes);
  const { t } = useTranslation();

  return (
    <div className="py-5  w-full">
      <div className="overflow-x-auto relative">
        <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-200 font-normal">
            <tr>
              <th scope="col" className="px-10 py-3 cursor-pointer">
                {t("Id")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Serial Number")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Code")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Description")}
              </th>{" "}
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Arabic")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Product Group")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Product Category")}
              </th>
            </tr>
          </thead>
          <tbody>
            {codes?.["SIMAH Product List"]?.map((v, k) => (
              <tr
                key={k}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-10 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                >
                  <a>{v.id}</a>
                </td>

                <td className="px-3 py-4">{v.serialNumber}</td>
                <td className="px-3 py-4">{v.code}</td>
                <td className="px-3 py-4">{v.description}</td>
                <td className="px-3 py-4">{v.arabic}</td>
                <td className="px-3 py-4">{v.productGroup}</td>
                <td className="px-3 py-4">{v.productCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default SimahProductList;
