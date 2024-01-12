import React, { useState } from "react";

import Antifraud from "./companyTabs/antiFraud";
import Absher from "./companyTabs/absher";
import Nafath from "./companyTabs/nafath";
import AmlDetails from "./companyTabs/amlDetails";
import Sima from "./companyTabs/sima";
import TakwaDetails from "./companyTabs/takwadetails";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Template() {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState("Anti fraud Detail");

  const getTab = () => {
    const activeItem = data.find((item) => item.label === state);
    return activeItem
      ? activeItem.tab
      : "Select an item to see the description.";
  };
  function setNavigation(stateValue) {
    setState(stateValue);
    // navigate(location.pathname + `?name=${stateValue}`);
  }
  return (
    <div className=" w-full bg-white  border border-primary w-full rounded-lg ">
      <div className="flex flex-row  ">
        {data?.map((v, k) => {
          return (
            <div
              onClick={() => setNavigation(v.label)}
              className={`px-4 cursor-pointer ${
                state === v.label ? "text-primary " : "text-gray-600 "
              }`}>
              <div
                className={`px-3 py-4  w-max  ${
                  state === v.label ? "border-primary border-b-2" : " "
                }`}>
                <a className="text-sm">{v.label}</a>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className=" w-full bg-gray-200 "
        style={{ height: 1, marginTop: -1 }}></div>
      <div className="flex flex-row space-x-5 ">{getTab()}</div>
    </div>
  );
}
export default Template;

const data = [
  {
    label: "Anti fraud Detail",
    tab: <Antifraud />,
  },
  {
    label: "Absher Detail",
    tab: <Absher />,
  },

  {
    label: "AML Details",
    tab: <AmlDetails />,
  },
  {
    label: "Takwa Details",
    tab: <TakwaDetails />,
  },
];
