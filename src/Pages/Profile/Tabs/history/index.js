import React, { useState } from "react";
import Family from "./tabs/family";
import Income from "./tabs/income";
import Personal from "./tabs/personal";

function Template() {
  const [state, setState] = useState("Financial History");
  const getTab = () => {
    const activeItem = data.find((item) => item.label === state);

    return activeItem ? activeItem.tab : null;
  };

  function setNavigation(stateValue) {
    setState(stateValue);
  }
  return (
    <div className=" bg-white  border border-primary w-full rounded-lg ">
      <div className="flex flex-row  ">
        {data?.map((v, k) => {
          return (
            <div
              onClick={() => setNavigation(v.label)}
              className={`px-4 cursor-pointer ${
                state === v.label ? "text-primary " : "text-gray-600 "
              }`}
            >
              <div
                className={`px-3 py-4  w-max  ${
                  state === v.label ? "border-primary border-b-2" : " "
                }`}
              >
                <a className="text-sm">{v.label}</a>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className=" w-full bg-gray-200 "
        style={{ height: 1, marginTop: -1 }}
      ></div>
      <div className="flex flex-row space-x-5 mt-5 px-5">{getTab()}</div>
    </div>
  );
}
export default Template;

const data = [
  {
    label: "Financial History",
    tab: <Personal />,
  },
  {
    label: "Details",
    tab: <Income />,
  },
  {
    label: "Loan History",
    tab: <Family />,
  },
];
