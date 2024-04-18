import React from "react";
import { TiContacts } from "react-icons/ti";

function EnforcementJudgement({ w1, w2 }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Enforcement Judgement</a>
      </div>
      <div className={`${w2} px-2`}>
        <Header />
      </div>
    </div>
  );
}

export default EnforcementJudgement;

function Header() {
  const class1 = "text-sky-600 px-2 py-2 text-start";
  const class2 = "text-gray-700 px-2 py-1 text-start";

  return (
    <table className="text-black  w-full">
      <thead className="px-6">
        <tr className=" ">
          <th className={class1}>Execution Date </th>
          <th className={class1}>Resolution Number</th>
          <th className={class1}>City</th>
          <th className={class1}>Court Name</th>
          <th className={class1}>Case Number</th>
          <th className={class1}>Date Loaded</th>
          <th className={class1}>Claimed Amount</th>
          <th className={class1}>Outstanding Balance</th>
          <th className={class1}>Status</th>
          <th className={class1}>Settlement Date</th>
        </tr>
      </thead>
      <tbody>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]?.map(() => {
          return (
            <tr>
              <td className={class2}>Car Lease Agreement</td>
              <td className={class2}>Internal Administration</td>
              <td className={class2}>51350</td>
              <td className={class2}>07/10/2019 </td>
              <td className={class2}>5900010.00</td>
              <td className={class2}>0.00</td>
              <td className={class2}>Fully Paid</td>
              <td className={class2}>07/10/2019</td>
              <td className={class2}>07/10/2019</td>
              <td className={class2}>07/10/2019</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
