import React from "react";

import { useSelector } from "react-redux";

function SimahExisting() {
  const codes = useSelector((state) => state.getSimahCodes);

  return (
    <div className="py-5  w-full">
      <div className="overflow-x-auto relative">
        <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-200 font-normal">
            <tr>
              <th scope="col" className="px-10 py-3 cursor-pointer">
                {"Id"}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {"Code"}
              </th>

              <th scope="col" className="px-3 py-3">
                {"Product"}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {"Simah Desc"}
              </th>

              <th scope="col" className="px-3 py-3">
                {"Product Group"}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {"Issuer"}
              </th>
            </tr>
          </thead>
          <tbody>
            {codes?.["Existing"]?.map((v, k) => (
              <tr
                key={k}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-10 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                >
                  <a>{v.id}</a>
                </td>

                <td className="px-3 py-4">{v.code}</td>
                <td className="px-3 py-4">{v.product}</td>
                <td className="px-3 py-4">{v.simahDesc}</td>
                <td className="px-3 py-4">{v.productGroup}</td>
                <td className="px-3 py-4">{v.issuer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default SimahExisting;
