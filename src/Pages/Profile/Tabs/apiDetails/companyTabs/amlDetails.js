import React, { useEffect, useState } from "react";
import CardMain from "Components/Cards/main";
import facebook from "Assets/Images/facebook.svg";
import youtube from "Assets/Images/youtube.svg";
import Insta from "Assets/Images/insta.svg";
import Twitter from "Assets/Images/twitter.svg";
import { useDispatch, useSelector } from "react-redux";

import { useLocation } from "react-router-dom";
function AntiFraud() {
  const dispatch = useDispatch();
  const location = useLocation();
  const amlData = useSelector((state) => state.getAmlRecord);

  const queryParams = new URLSearchParams(location.search);

  const ID = queryParams.get("id");

  function GetNafathDetail() {
    dispatch({
      type: "GET_AML_DETAILS",
      payload: ID,
    });
  }

  useEffect(() => {
    GetNafathDetail();
  }, []);
  console.log("getAmlRecord", amlData);
  return (
    <div className=" w-full flex flex-col space-x-5 rtl:space-x-reverse">
      {amlData?.idNumber ? (
        <div className="w-1/2">
          <CardMain width="w-full	" heading={"Aml Details"}>
            <div className="space-y-3">
              <div className="flex flex-row">
                <a className="w-2/5 text-gray-700 ">Id Number</a>
                <a className="text-gray-700 font-semibold flex flex-row space-x-5 rtl:space-x-reverse">
                  {amlData?.idNumber}
                </a>
              </div>
              <div className="flex flex-row">
                <a className="w-2/5 text-gray-700 ">Party Name</a>
                <a className="text-gray-700 font-semibold">
                  {amlData?.partyName}
                </a>
              </div>

              <div className="flex flex-row">
                <a className="w-2/5 text-gray-700 ">Part Key</a>
                <a className="text-gray-700 font-semibold">
                  {amlData?.partyKey}
                </a>
              </div>
              <div className="flex flex-row">
                <a className="w-2/5 text-gray-700 ">Entity Role</a>
                <a className="text-gray-700 font-semibold">
                  {amlData?.entityRole || "null"}
                </a>
              </div>
              <div className="flex flex-row">
                <a className="w-2/5 text-gray-700 ">Entry Alert Level</a>
                <a className="text-gray-700 font-semibold">
                  {/* <img
                  src="https://cdn-icons-png.freepik.com/256/12510/12510932.png?semt=ais_hybrid"
                  className="h-10 rounded-md"
                /> */}
                  {amlData?.entityAlertLevel}
                </a>
              </div>
              <div className="flex flex-row">
                <a className="w-2/5 text-gray-700 ">Entity Alert Score</a>
                <a className="text-gray-700 font-semibold">
                  {amlData?.entityAlertScore}
                </a>
              </div>
              <div className="flex flex-row">
                <a className="w-2/5 text-gray-700 ">whitelisted</a>
                <a className="text-gray-700 font-semibold">
                  {amlData?.whitelisted ? "true" : "false"}
                </a>
              </div>
            </div>
          </CardMain>
        </div>
      ) : (
        <div className="py-20 px-20 text-center w-full">
          <a>{"Nothing To Show!"}</a>
        </div>
      )}
    </div>
  );
}
export default AntiFraud;
