import React from "react";
import { TiContacts } from "react-icons/ti";

function Disclaimer({ w1, w2, data }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Disclaimer and Disclosure</a>
      </div>
      <div className={`${w2} px-2 space-y-2 flex flex-col`}>
        <a className="text-gray-700  py-1 text-start  ">
          <span className="font-semibold">Disclaimer</span>{" "}
          {data?.discTextDescEn}
        </a>
      </div>
    </div>
  );
}

export default Disclaimer;
