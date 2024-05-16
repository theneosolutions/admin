import React, { useState } from "react";
import Gosi from "./companyTabs/gosi";
import Absher from "./companyTabs/absher";
import Alrajhi from "./companyTabs/Alrajhi";

import Nafath from "./companyTabs/nafath";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NafithSanad from "./companyTabs/NafithSanad";
import Aml from "./companyTabs/amlDetails";

function Template() {
  const dispatch = useDispatch();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  const user = queryParams.get("user");

  const [state, setState] = useState("Al RAJHI");

  const getTab = () => {
    const activeItem = data.find((item) => item.label === state);
    return activeItem
      ? activeItem.tab
      : "Select an item to see the description.";
  };
  function setNavigation(stateValue) {
    setState(stateValue);
  }
  useEffect(() => {
    getGosi();
  }, []);
  function getGosi() {
    dispatch({
      type: "GET_GOSI_API",
      payload: { user, id },
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
    label: "Al RAJHI",
    tab: <Alrajhi />,
  },
  {
    label: "Gosi",
    tab: <Gosi />,
  },

  {
    label: "Nafith",
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
  {
    label: "Aml Details",
    tab: <Aml />,
  },
];
