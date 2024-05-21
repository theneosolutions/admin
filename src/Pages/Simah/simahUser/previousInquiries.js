import React from "react";
import { TiContacts } from "react-icons/ti";

function PriviousIncuries({ w1, w2, data }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Previous Enquiries</a>
      </div>
      <div className={`${w2} px-2`}>{<Header data={data} />}</div>
    </div>
  );
}

export default PriviousIncuries;

function Header({ data }) {
  const class1 = "text-sky-600 px-2 py-2 text-start";
  const class2 = "text-gray-700 px-2 py-1 text-start";

  return (
    <div className="overflow-x-auto">
      <table className="text-black  w-full ">
        <thead className="px-6">
          <tr className=" ">
            <th className={class1}>Enquiry Date</th>
            <th className={class1}>Enquiry Type </th>
            <th className={class1}>Enquirer Code</th>
            <th className={class1}>Enquiry Reference</th>
            <th className={class1}>Enquirer</th>
            <th className={class1}>Product Type</th>
            <th className={class1}>Amount</th>
            <th className={class1}>Reason </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((v, k) => {
            return (
              <tr>
                <td className={class2}>{v?.prevEnqDate}</td>
                <td className={class2}>
                  {v?.preEnqType?.enqTypeDescriptionEn}
                </td>
                <td className={class2}>{v?.prevEnqEnquirer?.memberCode}</td>
                <td className={class2}>{v?.prevEnqMemberRef}</td>
                <td className={class2}>{v?.prevEnquirerName}</td>
                <td className={class2}>{v?.prevEnqProductTypeDesc?.textEn}</td>

                <td className={class2}>{v?.prevEnqAmount}</td>
                <td className={class2}>
                  {v?.otherReason?.enquiryReasonCodeName || "NAN"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
