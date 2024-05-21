import React from "react";

function JointAppication({ data }) {
  return (
    <div className="px-2 border-t py-2">
      <a className="text-black">Joint Applicant</a>
      <div className="flex flex-col">
        <Header1 data={data} />
        <Header2 data={data} />
      </div>
    </div>
  );
}

export default JointAppication;

function Header1({ data }) {
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
            {data?.numberOfApplicants}
          </td>
          <td className={class2} style={style}>
            {data?.applicationInstalmentAmount}
          </td>
          <td className={class2} style={style}>
            {data?.lastPaymentDate}
          </td>
          <td className={class2} style={style}>
            {data?.lastAmountPaid}
          </td>
          <td className={class2} style={style}>
            {data?.outstandingBalance}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
function Header2({ data }) {
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
            {data?.percentageAllocation}
          </td>
          <td className={class2} style={style}>
            {data?.applicantLimit}
          </td>
          <td className={class2} style={style}>
            {data?.paymentStatusCode}
          </td>
          <td className={class2} style={style}>
            {data?.pastDueAmount}
          </td>
          <td className={class2} style={style}>
            {data?.nextPaymentDate}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
