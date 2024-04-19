import React from "react";
import { TiContacts } from "react-icons/ti";

function PersonalNarative({ w1, w2 }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Personal Narratives</a>
      </div>
      <div className={`${w2} px-2`}>
        <Header />
      </div>
    </div>
  );
}

export default PersonalNarative;

function Header() {
  const class1 = "text-sky-600 px-2 py-2 text-start";
  const class2 = "text-gray-700 px-2 py-1 text-start max-w-64";

  return (
    <table className="text-black  w-full">
      <thead className="px-6">
        <tr className=" ">
          <th className={class1}>Date Loaded </th>
          <th className={class1}>Narrative Type </th>
          <th className={class1}>Narrative Text</th>
        </tr>
      </thead>
      <tbody>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map(() => {
          return (
            <tr>
              <td className={class2}>01/03/2016</td>
              <td className={class2}>Dispute - Consumer</td>
              <td className={class2}>
                Please note that enquiry No. 11002539110 by the member SABB in
                31/01/2021 is disputed by the customer.
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
