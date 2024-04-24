import React from "react";
import { TiContacts } from "react-icons/ti";

function PersonalNarative({ w1, w2, data }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Contact Numbers</a>
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
    <table className="text-black  w-full">
      <thead className="px-6">
        <tr className=" ">
          <th className={class1}>Phone Type </th>
          <th className={class1}>Country Code </th>
          <th className={class1}>Area Code</th>
          <th className={class1}>Phone Numbers</th>
          <th className={class1}>Extension</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((data, k) => {
          return (
            <tr>
              <td className={class2}>
                {data?.conNumberTypes?.contactNumberTypeDescriptionEn}
              </td>
              <td className={class2}>{data?.conCode}</td>
              <td className={class2}>{data?.conAreaCode}</td>
              <td className={class2}>{data?.conPhoneNumber}</td>
              <td className={class2}>{data?.conExtension || "NAN"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
