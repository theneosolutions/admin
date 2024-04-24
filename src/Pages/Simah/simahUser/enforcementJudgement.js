import React from "react";
import { TiContacts } from "react-icons/ti";

function EnforcementJudgement({ w1, w2, data }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Enforcement Judgement</a>
      </div>
      <div className={`${w2} px-2`}>
        <Header data={data} />
      </div>
    </div>
  );
}

export default EnforcementJudgement;

function Header({ data }) {
  const class1 = "text-sky-600 px-2 py-2 text-start";
  const class2 = "text-gray-700 px-2 py-1 text-start";

  return (
    <div className="overflow-x-auto">
      <table className="text-black  w-full ">
        <thead className="px-6 ">
          <tr className=" ">
            <th className={class1}>Execution Date </th>
            <th className={class1}>Resolution Number</th>
            <th className={class1}>City Name</th>
            <th className={class1}>Court Name</th>
            <th className={class1}>Case Number</th>
            <th className={class1}>Date Loaded</th>
            <th className={class1}>Claimed Amount</th>
            <th className={class1}>Outstanding Balance</th>
            <th className={class1}>Settlement Date</th>
            <th className={class1}>City code</th>
            <th className={class1}>Status</th>
            <th className={class1}>Execution Type</th>
            <th className={class1}>Status Code</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data, k) => {
            return (
              <tr key={k}>
                <td className={class2}>{data?.executionDate}</td>
                <td className={class2}>{data?.resolutionNumber}</td>
                <td className={class2}>{data?.cityNameEn}</td>
                <td className={class2}>{data?.courtNameEn} </td>
                <td className={class2}>{data?.legalCaseNumber}</td>
                <td className={class2}>{data?.loadedDate}</td>
                <td className={class2}>{data?.originalClaimedAmount}</td>
                <td className={class2}>{data?.outstandingBalance}</td>
                <td className={class2}>{data?.settlementDate}</td>
                <td className={class2}>{data?.cityCode}</td>
                <td className={class2}>{data?.statusNameEn}</td>
                <td className={class2}>{data?.executionType}</td>
                <td className={class2}>{data?.statusCode}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
