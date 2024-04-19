import React from "react";
import { TiContacts } from "react-icons/ti";

function Disclaimer({ w1, w2 }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Disclaimer and Disclosure</a>
      </div>
      <div className={`${w2} px-2 space-y-2 flex flex-col`}>
        <a className="text-gray-700  py-1 text-start  ">
          <span className="font-semibold">Disclaimer</span> :This information
          has been collated from various sources on a confidential basis and
          doesn't represent the opinion of Saudi Credit Bureau (SIMAH). No
          Liability (in contract or otherwise whatsoever) attaches to SIMAH as a
          result of taking any investment and/orany other decision based on
          information provided.
        </a>
        <a className="text-gray-700  py-1 text-start">
          <span className="font-semibold">Disclosure</span> : Saudi Credit
          Bureau, SIMAH, a Closed Joint Stock Company, Capital SR 200,000,000
          Paid in Full- C.R 1010171047- Membership No.115731, Toll Free No.
          8003010046, Fax No. +966112188797 P.O Box 8859 Riyadh 11492- National
          Address: Riyadh, Al Shuhada, Building No. 2596, Unit No. 1, Additional
          No. 7347, Zip Code 13241. Under the Supervision and Regulation of SAMA
          with a License No. 2 / 37. www.simah.com
        </a>
      </div>
    </div>
  );
}

export default Disclaimer;

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
