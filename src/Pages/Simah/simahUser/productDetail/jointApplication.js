import React from "react";

function JointAppication() {
  return (
    <div className="px-2 border-t py-2">
      <a className="text-black">Joint Applicant</a>
      <div className="flex flex-col">
        <Header1 />
        <Header2 />
      </div>
    </div>
  );
}

export default JointAppication;

function Header1() {
  const class1 = "text-xs text-sky-600 px-2 py-2 text-start font-medium";
  const class2 = "text-xs text-gray-500 px-2 py-2 text-start font-medium";
  const style = { width: "20%" };
  return (
    <table className="text-black  w-full">
      <thead className="px-6  ">
        <tr className=" ">
          <th className={class1} style={style}>
            Number of Applicants
          </th>
          <th className={class1} style={style}>
            Installment Amount
          </th>
          <th className={class1} style={style}>
            Last Payment Date
          </th>
          <th className={class1} style={style}>
            Last Amount Paid
          </th>
          <th className={class1} style={style}>
            Outstanding Balance
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={class2} style={style}>
            2
          </td>
          <td className={class2} style={style}>
            2500.12
          </td>
          <td className={class2} style={style}>
            01/02/2020
          </td>
          <td className={class2} style={style}>
            1000.00
          </td>
          <td className={class2} style={style}>
            3000.00
          </td>
        </tr>
      </tbody>
    </table>
  );
}
function Header2() {
  const class1 = "text-xs text-sky-600 px-2 py-2 text-start font-medium";
  const class2 = "text-xs text-gray-500 px-2 py-2 text-start font-medium";
  const style = { width: "20%" };
  return (
    <table className="text-black  w-full">
      <thead className="px-6  ">
        <tr className=" ">
          <th className={class1} style={style}>
            Percentage Allocation
          </th>
          <th className={class1} style={style}>
            Applicant Limit
          </th>
          <th className={class1} style={style}>
            Payment Status
          </th>
          <th className={class1} style={style}>
            Past Due Amount
          </th>
          <th className={class1} style={style}>
            Next Payment Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={class2} style={style}>
            30.00
          </td>
          <td className={class2} style={style}>
            2500.00
          </td>
          <td className={class2} style={style}>
            2500.00
          </td>
          <td className={class2} style={style}>
            0.00
          </td>
          <td className={class2} style={style}>
            01/03/2020
          </td>
        </tr>
      </tbody>
    </table>
  );
}
