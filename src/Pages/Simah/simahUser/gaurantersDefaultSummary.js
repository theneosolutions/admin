import React from "react";
import { TiContacts } from "react-icons/ti";

function GurantersDefaultSummry({ w1, w2, data }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Guarantors Default Summary</a>
      </div>
      <div className={`${w2} px-2`}>
        <Header data={data} />
      </div>
    </div>
  );
}

export default GurantersDefaultSummry;

function Header({ data }) {
  const class1 = "text-sky-600 px-2 py-2 text-start";
  const class2 = "text-gray-700 px-2 py-1 text-start";

  return (
    <div className="overflow-x-auto">
      <table className="text-black  w-full ">
        <thead className="px-6">
          <tr className=" ">
            <th className={class1}>Product Type </th>
            <th className={class1}>Account Number</th>

            <th className={class1}>Creditor</th>
            <th className={class1}>Date Reported</th>
            <th className={class1}>Default Amount</th>
            <th className={class1}>Outstanding Default</th>
            <th className={class1}>Default Status</th>
            <th className={class1}>Settlement Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data) => {
            return (
              <tr>
                <td className={class2}>{data?.gDefProductTypeDesc?.code}</td>
                <td className={class2}>{data?.gDefAccountNo}</td>
                <td className={class2}>{data?.gDefCreditor?.memberCode}</td>
                <td className={class2}>{data?.gDefDateLoaded}</td>
                <td className={class2}>{data?.gDefOriginalAmount}</td>
                <td className={class2}>{data?.gDefOutstandingBalance}</td>
                <td className={class2}>
                  {data?.gDefaultStatuses?.defaultStatusCode}
                </td>
                <td className={class2}>{data?.gDefSetteledDate || "null"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
