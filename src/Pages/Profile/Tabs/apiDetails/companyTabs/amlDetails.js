import React, { useEffect, useState } from "react";
import CardMain from "Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import Model2 from "Components/Model2";

import { useLocation } from "react-router-dom";
function AntiFraud() {
  const dispatch = useDispatch();
  const location = useLocation();
  const amlData = useSelector((state) => state.getAmlRecord);
  const [modelOpen, setModelOpen] = useState(false);

  const [score, setScore] = useState("");
  const [level, setLevel] = useState("");
  const queryParams = new URLSearchParams(location.search);

  const ID = queryParams.get("id");

  function GetAmlDetail() {
    dispatch({
      type: "GET_AML_DETAILS",
      payload: ID,
    });
  }

  useEffect(() => {
    GetAmlDetail();
  }, []);
  function reset() {
    setModelOpen(false);
  }
  function UpdateFunction() {
    dispatch({
      type: "UPDATE_AML_RECORD",
      payload: { score, level, idNumber: ID },
    });
    setModelOpen(false);
    GetAmlDetail();
  }
  useEffect(() => {
    if (amlData?.entityAlertLevel && amlData?.entityAlertScore) {
      setLevel(amlData?.entityAlertLevel);
      setScore(amlData?.entityAlertScore);
    }
  }, [amlData]);
  return (
    <div className=" w-full flex flex-col space-x-5 rtl:space-x-reverse">
      {amlData?.idNumber ? (
        <div className="flex flex-row  justify-between">
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
          <div
            onClick={() => setModelOpen(true)}
            className="bg-blue-500 text-white px-6 m-7 py-1 rounded-md cursor-pointer hover:opacity-85 h-min "
          >
            Update
          </div>
        </div>
      ) : (
        <div className="py-20 px-20 text-center w-full">
          <a>{"Nothing To Show!"}</a>
        </div>
      )}
      {modelOpen ? (
        <Model2
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading="Update Aml Details"
        >
          <div className="px-5 py-5">
            <InputField
              type="text"
              heading={"Entity Alert Level"}
              value={level}
              onChange={(e) => setLevel(e)}
            />
            <InputField
              heading={"Entity Alert Score"}
              value={score}
              onChange={(e) => setScore(e)}
            />
            <div
              onClick={() => UpdateFunction(true)}
              className="bg-blue-500 text-white px-6 mt-10 text-center mb-4 py-1 rounded-md cursor-pointer hover:opacity-85 h-min "
            >
              Update
            </div>
          </div>
        </Model2>
      ) : null}
    </div>
  );
}
export default AntiFraud;

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full mt-5">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        type={type || "number"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-96"
      />
    </div>
  );
}
