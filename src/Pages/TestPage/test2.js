import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Button, Tooltip } from "Components";
import { useDispatch, useSelector } from "react-redux";

function TestPage() {
  const dispatch = useDispatch();
  const getAppFlowData = useSelector((state) => state.getAppFlow);
  console.log("getAppFlowgetAppFlow", getAppFlowData);

  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [active, setActive] = useState();
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  console.log("active", active);
  const [role, setRole] = useState("option1");
  useEffect(() => {
    getAppFlow();
  }, []);
  function getAppFlow() {
    console.log("helo");
    dispatch({
      type: "GET_APP_FLOW",
      payload: "helo",
    });
  }
  return (
    <div className="flex p-4  bg-gray-100 flex flex-row space-x-4">
      <div className="flex flex-wrap ">
        {getAppFlowData?.appFlow?.screenFlow?.map((v, k) => {
          return (
            <div className="w-52 px-2">
              <div className="relative mt-4 w-full  h-96 bg-white border-4 border-black rounded-3xl overflow-hidden">
                <div className="w-full h-6 bg-gray-800 rounded-t-3xl justify-center flex text-white text-xs items-center pb-1">
                  {v?.name}
                </div>
                <div className="w-full h-80 bg-gray-100 px-3 py-3 space-y-3 flex flex-col">
                  {v?.button.map((o, l) => {
                    return (
                      <Tooltip
                        text={
                          o?.navigationLink
                            ? o?.navigationLink
                            : "Navigation Not Set"
                        }
                      >
                        <button
                          onClick={() => (handleSidebarToggle(), setActive(v))}
                          className={`border border-gray-200 rounded-lg text-sm w-full py-1 ${
                            o?.navigationLink && "bg-green-200"
                          }`}
                        >
                          <a className="text-sm">{o.name}</a>
                          {/* <a>{"Key: " + o.id}</a> */}
                        </button>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle}>
          <div className="w-full  ">
            <a className="w-full text-center  justify-center flex text-gray-800 text-semibold text-primary underline text-xl">
              {active?.name}
            </a>
            <div className="flex flex-col space-y-2">
              {active?.button?.map((v, k) => {
                return (
                  // <Select
                  //   heading={v.name}
                  //   type="select"
                  //   // value={role}
                  //   options={role}
                  //   onChange={(e) => setRole(e)}
                  // />

                  <InputField
                    heading={v.name}
                    onChange={(e) => console.log(e)}
                  />
                );
              })}
            </div>
            <div className="flex flex-row justify-between">
              <div></div>
              <Button
                onButtonClick={() => console.log("helo")}
                buttonValue={"Create"}
                buttonStyle="px-20 py-2 w-full md:w-max mt-4"
              />
            </div>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}

export default TestPage;

function Select({ heading, value, onChange, type }) {
  var options = [
    { value: "option1", label: "Moderater" },
    { value: "option1", label: "Admin" },
    { value: "option2", label: "User" },
  ];
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>{" "}
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
const data = [
  {
    name: "Splash1",
    button: [
      { id: "button1Splash1", navigationLink: "Splash2", name: "Next" },
      { id: "button2Splash1", navigationLink: "Splash3", name: "Back " },
    ],
    component: {
      toggleButton: "en",
      lottieFile: "",
      text: "Choose your product from Seulah",
    },
  },
  {
    name: "Splash2",
    button: [
      { id: "button1Splash2", navigationLink: "LogIn", name: "Next" },
      { id: "button2Splash2", navigationLink: "", name: "Back" },
    ],
    component: {
      toggleButton: "en",
      lottieFile: "",
      text: "Choose your product from Seulah",
    },
  },
  {
    name: "Splash3",
    button: [
      { id: "button1Splash3", navigationLink: "Home", name: "Next" },
      { id: "button2Splash3", navigationLink: "Splash2", name: "Back" },
    ],
    component: {
      toggleButton: "en",
      lottieFile: "",
      text: "Choose your product from Seulah",
    },
  },
];

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        // required
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-primary border rounded-md px-3 py-1 outline-none mt-2 w-full"
      />
    </div>
  );
}
