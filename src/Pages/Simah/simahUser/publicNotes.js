import React from "react";
import { TiContacts } from "react-icons/ti";

function PublicNotes({ w1, w2 }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Public Notices</a>
      </div>
      <div className={`${w2} px-2`}>
        <Header />
      </div>
    </div>
  );
}

export default PublicNotes;

function Header() {
  const class1 = "text-sky-600 px-2 py-2 text-start";
  const class2 = "text-gray-700 px-2 py-1 text-start max-w-64";

  return (
    <table className="text-black  w-full">
      <thead className="px-6">
        <tr className=" ">
          <th className={class1}>Date Loaded </th>
          <th className={class1}>Notice Type </th>
          <th className={class1}>Publication </th>
          <th className={class1}>Text </th>
        </tr>
      </thead>
      <tbody>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map(() => {
          return (
            <tr>
              <td className={class2}>01/03/2016</td>
              <td className={class2}>Adverse</td>
              <td className={class2}>Gneral Public Notice</td>
              <td className={class2}>
                Who should Attend? The Primary Contact or management as we have
                limited as maximum 2 to be represented form each memberand we
                wish you to send us the nominations list as reply to this email.
                If you have any questions, do not hesitate to contact us at
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
