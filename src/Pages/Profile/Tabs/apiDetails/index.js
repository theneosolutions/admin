import React, { useState } from "react";
import Antifraud from "./companyTabs/antiFraud";
import Gosi from "./companyTabs/gosi";
import Absher from "./companyTabs/absher";
import Nafath from "./companyTabs/nafath";
import Nafith from "./companyTabs/nafith";

import AmlDetails from "./companyTabs/amlDetails";
import TakwaDetails from "./companyTabs/takwadetails";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NafithSanad from "./companyTabs/NafithSanad";

function Template() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [state, setState] = useState("Gosi");
  const id = queryParams.get("id");

  const getTab = () => {
    const activeItem = data.find((item) => item.label === state);
    return activeItem
      ? activeItem.tab
      : "Select an item to see the description.";
  };
  function setNavigation(stateValue) {
    // getGosi();
    setState(stateValue);
  }
  useEffect(() => {
    // getGosi();
  }, []);
  function getGosi() {
    console.log("Gosi");
    dispatch({
      type: "GET_GOSI_API",
      payload: id,
    });
  }
  return (
    <div className="  bg-white  border border-primary w-full rounded-lg ">
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
      <div className="flex flex-row space-x-5 ">{getTab()}</div>
    </div>
  );
}
export default Template;

const data = [
  {
    label: "Gosi",
    tab: <Gosi />,
  },
  {
    label: "Nafith",
    tab: <Nafith />,
  },
  {
    label: "Nafith Sanad",
    tab: <NafithSanad />,
  },
  {
    label: "Nafath Detail",
    tab: <Nafath />,
  },

  {
    label: "Absher Detail",
    tab: <Absher />,
  },

  // {
  //   label: "Anti fraud Detail",
  //   tab: <Antifraud />,
  // },
  // {
  //   label: "AML Details",
  //   tab: <AmlDetails />,
  // },
  // {
  //   label: "Takwa Details",
  //   tab: <TakwaDetails />,
  // },
];
