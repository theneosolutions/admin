import React from "react";
import { TiContacts } from "react-icons/ti";

function PriviousIncuries({ w1, w2 }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Previous Enquiries</a>
      </div>
      <div className={`${w2} px-2`}>
        <Header />
      </div>
    </div>
  );
}

export default PriviousIncuries;

function Header() {
  const class1 = "text-sky-600 px-2 py-2 text-start";
  const class2 = "text-gray-700 px-2 py-1 text-start";

  return (
    <table className="text-black  w-full">
      <thead className="px-6">
        <tr className=" ">
          <th className={class1}>Enquiry Date</th>
          <th className={class1}>Enquirer</th>
          <th className={class1}>Enquiry Type </th>
          <th className={class1}>Enquiry Reference</th>
          <th className={class1}>Product Type</th>
          <th className={class1}>Amount</th>
          <th className={class1}>Name</th>
        </tr>
      </thead>
      <tbody>
        {[
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ]?.map(() => {
          return (
            <tr>
              <td className={class2}>31/05/2021</td>
              <td className={class2}>SABB</td>
              <td className={class2}>Other Reason</td>
              <td className={class2}>210111EQ31052115042130</td>
              <td className={class2}>Miscellaneous</td>
              <td className={class2}>0.00</td>
              <td className={class2}>Test,Test,Test,Test</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
function Line1({ heading, value }) {
  return (
    <div className="w-full	 flex flex-row  px-4 pt-1 mb-1 items-center ">
      <a className="w-2/6	 text-sm text-sky-600 ">{heading} </a>
      <a className="w-1/2 text-sm text-black">{value} </a>
    </div>
  );
}
