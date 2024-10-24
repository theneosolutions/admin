import React from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { DeliquencyPeriods } from "./json";
import { getLanguage } from "functions/getLanguage";
function DeliquencyModelHistory({
  data,
  priviousValue,
  newValue,
  FunctionApproveReject,
  approve,
  reject,
}) {
  const { t } = useTranslation();
  const getPeriodName = (periodId) => {
    const period = DeliquencyPeriods.find((p) => p.id === periodId);
    return period ? period.name : periodId; // Return the name if found, otherwise return the ID as a fallback
  };
  return (
    <div className="items-center justify-center flex flex-col  w-[500px]">
      <div className=" rtl:space-x-reverse flex flex-col lg:flex-row w-full lg:px-6 px-4 py-5">
        <div className="w-full flex flex-col">
          <a className="underline font-semibold text-primary">
            {t(data?.policyName)}
          </a>

          <div className="w-full mt-4 ">
            <a className="opacity-60 text-md">Previous Values</a>
            <table
              className={`w-full whitespace-nowrap  text-sm  text-gray-500 dark:text-gray-400 ${
                getLanguage() === "ar" ? "text-right" : "text-left"
              }`}
            >
              <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
                <tr>
                  <th scope="col" className=" py-2 cursor-pointer">
                    {t("Period")}
                  </th>
                  <th scope="col" className=" py-2 cursor-pointer">
                    {t("Bucket")}
                  </th>

                  <th scope="col" className=" py-2">
                    {t("Count")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {priviousValue
                  ?.sort((a, b) => a.bucket - b.bucket) // Sort by the bucket value
                  .map((v, k) => (
                    <tr
                      key={k}
                      className="bg-white border-b dark:border-gray-200"
                    >
                      <td className="py-2">{t(getPeriodName(v?.period))}</td>
                      <td className="">{t(v?.bucket)}</td>
                      <td className="">{t(v?.count)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="w-full mt-5">
            <a className="opacity-60 text-md">New Values</a>
            <table
              className={`w-full whitespace-nowrap  text-sm  text-gray-500 dark:text-gray-400 ${
                getLanguage() === "ar" ? "text-right" : "text-left"
              }`}
            >
              <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
                <tr>
                  <th scope="col" className=" py-2 cursor-pointer">
                    {t("Period")}
                  </th>
                  <th scope="col" className=" py-2 cursor-pointer">
                    {t("Bucket")}
                  </th>

                  <th scope="col" className=" py-2">
                    {t("Count")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {newValue
                  ?.sort((a, b) => a.bucket - b.bucket)
                  ?.map((v, k) => (
                    <tr
                      key={k}
                      className="bg-white border-b dark:border-gray-200"
                    >
                      <td className="py-2">{t(getPeriodName(v?.period))}</td>
                      <td className="">{t(v?.bucket)}</td>
                      <td className="">{t(v?.count)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className=" items-center justify-end flex mt-3">
            {data?.status === "PENDING" && (
              <div className="space-x-3  rtl:space-x-reverse">
                {approve && (
                  <Button
                    buttonStyle="px-20"
                    buttonValue={t("Approve")}
                    onButtonClick={() => FunctionApproveReject("approve")}
                  />
                )}
                {reject && (
                  <Button
                    buttonValue={t("Reject")}
                    buttonColor="bg-red-600"
                    onButtonClick={() => FunctionApproveReject("reject")}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliquencyModelHistory;
