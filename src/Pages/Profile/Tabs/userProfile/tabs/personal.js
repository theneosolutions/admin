import { getLanguage } from "functions/getLanguage";
import React from "react";
import { useTranslation } from "react-i18next";

function PersonalDetailCard({ data = [] }) {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col  overflow-x-auto">
      <table
        className={`w-full text-sm  text-gray-500 dark:text-gray-400 ${
          getLanguage() === "ar" ? "text-right" : "text-left"
        }`}
      >
        <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
          <tr>
            {/* <th scope="col" className="px-2 py-3">
              {t("Heading")}
            </th> */}
            <th scope="col" className="px-2 py-3">
              {t("Question")}
            </th>
            <th scope="col" className="px-2 py-3">
              {t("Type")}
            </th>
            <th scope="col" className="px-2 py-3">
              {t("Field / Options")}
            </th>
            <th scope="col" className="px-2 py-3">
              {t("User Answers")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data?.map((v, k) => (
              <tr key={k} className="bg-white border-b dark:border-gray-200">
                <td className="px-2 py-4 overflow-wrap text-sky-700">
                  {v?.question}
                </td>

                <td className="px-2 py-4">{v?.type}</td>
                <td className="px-2 py-4">
                  <a>
                    {v?.options?.length > 0 ? v?.options?.join(", ") : v?.field}
                  </a>
                </td>
                <td className="px-2 py-4">
                  <a>
                    {v?.userAnswer?.length > 0
                      ? v?.userAnswer?.join(", ")
                      : v?.field}
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default PersonalDetailCard;
