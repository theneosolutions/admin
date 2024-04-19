import React from "react";
import { TiContacts } from "react-icons/ti";

function MemberNarative({ w1, w2 }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Member Narrative</a>
      </div>
      <div className={`${w2} px-2`}>
        <Header />
      </div>
    </div>
  );
}

export default MemberNarative;

function Header() {
  const class1 = "text-sky-600 px-2 py-2 text-start";
  const class2 = "text-gray-700 px-2 py-1 text-start max-w-64";

  return (
    <table className="text-black  w-full">
      <thead className="px-6">
        <tr className=" ">
          <th className={class1}>Date Loaded </th>
          <th className={class1}>Narrative Type </th>
          <th className={class1}>Reported By </th>
          <th className={class1}>Narrative Text </th>
        </tr>
      </thead>
      <tbody>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map(() => {
          return (
            <tr>
              <td className={class2}>01/03/2016</td>
              <td className={class2}>Dispute - Bank</td>
              <td className={class2}>Al Rajhi Bank</td>
              <td className={class2}>
                The consumer has a case in Committees For Banking And Financial
                Disputes And Violations that still pending relating to product
                Restructured Car Instalment Agreement with account number
                1-2/3-4 and it has not been settled yet
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
