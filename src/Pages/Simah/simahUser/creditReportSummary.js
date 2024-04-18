import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

function CreditReportSummary({ w1, w2 }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <IoDocumentTextOutline className="text-5xl" />

        <a className="text-sm mt-4">Credit Report Summary</a>
      </div>
      <div className={w2}>
        <Line1 heading="Previous Enquiries :" value="101" />
        <Line1 heading="Enquiries for Previous 30 Days :" value="101" />
        <Line1 heading="Credit Instruments :" value="5605000.00" />
        <Line1 heading="Guaranteed Credit Instruments :" value="Test" />
        <Line1 heading="Defaults :" value="Test" />
        <Line1 heading="Earliest Issue Date :" value="Test" />
        <Line1 heading="Total Limits : :" value="5605000.00" />
        <Line1
          heading="Total Guaranteed Limits :"
          value="Test Test Test Test"
        />
        <Line1 heading="Total Liablilites :" value="09/09/1990" />
        <Line1 heading="Total Guaranteed Liablilites :" value="5605000.00" />
        <Line1 heading="Total Defaults :" value="Married" />
        <Line1 heading="Current Delinquent Balance :" value="5605000.00" />
      </div>
    </div>
  );
}

export default CreditReportSummary;

function Line1({ heading, value }) {
  return (
    <div className="w-full	 flex flex-row  px-4 pt-1 mb-1 items-center ">
      <a className="w-2/6	 text-sm text-sky-600 ">{heading} </a>
      <a className="w-1/2 text-sm text-black">{value} </a>
    </div>
  );
}
