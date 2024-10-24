import { getLanguage } from "functions/getLanguage";
import React from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "react-redux";

function SimahExisting() {
  const codes = useSelector((state) => state.getSimahCodes);
  const { t } = useTranslation();

  return (
    <div className="py-5  w-full">
      <div className="overflow-x-auto relative">
        <table
          className={`w-full whitespace-nowrap  text-sm  text-gray-500 dark:text-gray-400 ${
            getLanguage() === "ar" ? "text-right" : "text-left"
          }`}
        >
          <thead className="text-xs text-gray-400 uppercase bg-gray-200 font-normal">
            <tr>
              <th scope="col" className="px-10 py-3 cursor-pointer">
                {t("Id")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Code")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Product")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Simah Description")}
              </th>

              <th scope="col" className="px-3 py-3">
                {t("Product Group")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Issuer")}
              </th>
            </tr>
          </thead>
          <tbody>
            {codes?.["Existing"]?.map((v, k) => (
              <tr key={k} className="bg-white border-b dark:border-gray-200">
                <td
                  scope="row"
                  className="px-10 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                >
                  <a>{v.id}</a>
                </td>

                <td className="px-3 py-4">{v.code}</td>
                <td className="px-3 py-4">{v.product}</td>
                <td className="px-3 py-4">{v.simahDesc}</td>
                <td className="px-3 py-4">{v.productGroup}</td>
                <td className="px-3 py-4">{v.issuer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default SimahExisting;
