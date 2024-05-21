import React from "react";
import { TiContacts } from "react-icons/ti";

function PersonalNarative({ w1, w2, data }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Addresses</a>
      </div>
      <div className={`${w2} px-2`}>
        <Header data={data} />
      </div>
    </div>
  );
}

export default PersonalNarative;

function Header({ data }) {
  const class1 = "text-sky-600 px-2 py-2 text-start";
  const class2 = "text-gray-700 px-2 py-1 text-start max-w-64";

  return (
    <div className="overflow-x-auto">
      <table className="text-black  w-full ">
        <thead className="px-6">
          <tr className=" ">
            <th className={class1}>Date Loaded</th>
            <th className={class1}>Address Type </th>
            <th className={class1}>POBox</th>
            <th className={class1}>Postal Code</th>
            <th className={class1}>City</th>
            <th className={class1}>Building Number</th>
            <th className={class1}>Street</th>
            <th className={class1}>District</th>
            <th className={class1}>Addtional Number</th>
            <th className={class1}>Unit Number</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data, k) => {
            return (
              <tr>
                <td className={class2}>{data?.adrsDateLoaded}</td>
                <td className={class2}>
                  {data?.adrsAddressTypes?.addressTypeCode}
                </td>
                <td className={class2}>{data?.adrsPOBox}</td>
                <td className={class2}>{data?.adrsPostalCode}</td>
                <td className={class2}>{data?.adrsCityDescEn}</td>
                <td className={class2}>
                  {data?.nationalAddress?.buildingNumber}
                </td>
                <td className={class2}>
                  {data?.nationalAddress?.streetEn || "NAN"}
                </td>{" "}
                <td className={class2}>{data?.nationalAddress?.districtEn}</td>
                <td className={class2}>
                  {data?.nationalAddress?.additionalNumber}
                </td>
                <td className={class2}>{data?.nationalAddress?.unitNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
