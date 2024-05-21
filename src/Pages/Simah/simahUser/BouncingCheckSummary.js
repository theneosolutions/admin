import React from "react";
import { TiContacts } from "react-icons/ti";

function BouncingCheckSummry({ w1, w2 }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Bouncing Cheques Summary</a>
      </div>
      <div className={`${w2} px-2`}>
        <Header />
      </div>
    </div>
  );
}

export default BouncingCheckSummry;

function Header() {
  const class1 = "text-sky-600 px-2 py-2 text-start";
  const class2 = "text-gray-700 px-2 py-1 text-start";

  return (
    <table className="text-black  w-full">
      <thead className="px-6">
        <tr className=" ">
          <th className={class1}>Product </th>
          <th className={class1}>Bank</th>
          <th className={class1}>Cheque Number </th>
          <th className={class1}>Date Reported</th>
          <th className={class1}>Cheque Amount</th>
          <th className={class1}>Outstanding Balance</th>
          <th className={class1}>Cheque Status </th>
          <th className={class1}>Settlement Date</th>
        </tr>
      </thead>
      <tbody>
        {[1]?.map(() => {
          return (
            <tr>
              <td className={class2}>Bounced Cheques</td>
              <td className={class2}>Internal Administration</td>
              <td className={class2}>303608010028771 -789</td>
              <td className={class2}>07/10/2019 </td>
              <td className={class2}>5900010.00</td>
              <td className={class2}>0.00</td>
              <td className={class2}>Registered</td>
              <td className={class2}>07/10/2019</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
