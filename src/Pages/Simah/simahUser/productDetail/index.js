import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiCarProfileFill } from "react-icons/pi";
import Progress from "./progress";
import InstallmentDetails from "./installmentDetails";
import JointAppication from "./jointApplication";
function ProductDetail({ w1, w2, data }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-4 px-3 border-r border-l border-gray300 text-sky-700 items-center  flex flex-col ${w1}`}
      >
        <a className="text-sm mt-2">Internal Administration</a>

        {/* <PiCarProfileFill className="text-5xl mt-6" /> */}

        <a className="text-sm mt-4">{data?.ciProductTypeDesc?.textEn}</a>
        <a className="text-sm mt-4 text-gray-700">
          {data?.ciStatus?.creditInstrumentStatusDescEn}
        </a>
      </div>

      <div className={`${w2} px-2`}>
        <Header1 data={data} />
        <Header2 data={data} />
        <Header3 data={data} />
        {data?.ciSummary && <Progress data={data?.ciSummary} />}

        {data?.multiInstalmentDetails &&
          data?.multiInstalmentDetails.length > 0 && (
            <InstallmentDetails data={data.multiInstalmentDetails} />
          )}
        {data?.jointApplicantDetail && (
          <JointAppication data={data?.jointApplicantDetail} />
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
function Header1({ data }) {
  const class1 = "text-xs text-sky-600 px-2 py-2 text-start font-medium";
  const class2 = "text-xs text-gray-500 px-2 py-2 text-start font-medium";
  const style = { width: "12%" };
  return (
    <table className="text-black  w-full">
      <thead className="px-6  ">
        <tr className=" ">
          <th className={class1} style={style}>
            Account Number
          </th>
          <th className={class1} style={style}>
            Date of Issuance
          </th>
          <th className={class1} style={style}>
            Credit Limit
          </th>
          <th className={class1} style={style}>
            Installment Number
          </th>
          <th className={class1} style={style}>
            Installment Amount
          </th>
          <th className={class1} style={style}>
            Payment Frequency
          </th>
          <th className={class1} style={style}>
            Type of Guarantee
          </th>
          <th className={class1} style={style}>
            Expiry Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={class2} style={style}>
            {data?.ciAccountNumber}
          </td>
          <td className={class2} style={style}>
            {data?.ciIssuedDate}
          </td>
          <td className={class2} style={style}>
            {data?.ciLimit}
          </td>
          <td className={class2} style={style}>
            {/* 07/10/2019 */}
          </td>
          <td className={class2} style={style}>
            {data?.ciInstallmentAmount}
          </td>
          <td className={class2} style={style}>
            {data?.ciPaymentFrequency?.paymentFrequencyCodeName}
          </td>
          <td className={class2} style={style}>
            {data?.ciConsumerSecurityType?.consumerSecurityTypeCode}
          </td>
          <td className={class2} style={style}>
            {data?.ciExpirationDate}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
function Header2({ data }) {
  const class1 = "text-xs text-sky-600 px-2 py-2 text-start font-medium";
  const class2 = "text-xs text-gray-500 px-2 py-2 text-start font-medium";
  const style = { width: "12%" };

  return (
    <table className="text-black  w-full">
      <thead className="px-6  ">
        <tr className=" ">
          <th className={class1} style={style}>
            Outstanding Balance
          </th>
          <th className={class1} style={style}>
            Past Due Balance
          </th>
          <th className={class1} style={style}>
            Last Amount Paid
          </th>
          <th className={class1} style={style}>
            Last payment Date
          </th>
          <th className={class1} style={style}>
            Next Payment Date
          </th>
          <th className={class1} style={style}>
            As Of Date
          </th>
          <th className={class1} style={style}>
            Salary Assignment
          </th>
          <th className={class1} style={style}>
            Closed Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={class2} style={style}>
            {data?.ciOutstandingBalance}
          </td>
          <td className={class2} style={style}>
            {data?.ciPastDue}
          </td>
          <td className={class2} style={style}>
            {data?.ciLastAmountPaid}
          </td>
          <td className={class2} style={style}>
            {data?.ciLastPaymentDate}
          </td>
          <td className={class2} style={style}>
            {data?.ciNextDueDate}
          </td>
          <td className={class2} style={style}>
            {data?.ciAsOfDate}
          </td>
          <td className={class2} style={style}>
            {data?.ciSalaryAssignmentFlag?.salaryAssignmentFlagCode}
          </td>
          <td className={class2} style={style}>
            {data?.ciClosingDate}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
function Header3({ data }) {
  const class1 = "text-xs text-sky-600 px-2 py-2 text-start font-medium";
  const class2 = "text-xs text-gray-500 px-2 py-2 text-start font-medium";
  const style = { width: "20%" };

  return (
    <table className="text-black  w-full">
      <thead className="px-6  ">
        <tr className=" ">
          <th className={class1} style={style}>
            Balloon Payment
          </th>
          <th className={class1} style={style}>
            Down Payment
          </th>
          <th className={class1} style={style}>
            Dispensed Amount
          </th>
          <th className={class1} style={style}>
            Max Instalment Amount
          </th>
          <th className={class1} style={style}>
            Sub Product
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={class2} style={style}>
            {data?.ciBalloonPayment}
          </td>
          <td className={class2} style={style}>
            {data?.ciDownPayment}
          </td>
          <td className={class2} style={style}>
            {data?.ciDispensedAmount}
          </td>
          <td className={class2} style={style}>
            {data?.ciMaxInstalmentAmount}
          </td>
          <td className={class2} style={style}>
            {data?.ciSubProduct?.code}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
