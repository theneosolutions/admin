import React, { useState } from "react";
import EmiDetail from "./tabs/EmiDetail";
import LoanHistory from "./tabs/LoanHistory";
import TransactionHistory from "./tabs/transactionHistory";
import { useTranslation } from "react-i18next";

function Template() {
  const [state, setState] = useState("Emi Detail");
  const { t } = useTranslation();

  const getTab = () => {
    const activeItem = data.find((item) => item.label === state);

    return activeItem ? activeItem.tab : null;
  };

  function setNavigation(stateValue) {
    setState(stateValue);
  }
  // helloooooo
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
                <a className="text-sm">{t(v.label)}</a>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className=" w-full bg-gray-200 "
        style={{ height: 1, marginTop: -1 }}
      ></div>
      <div className=" rtl:space-x-reverse  w-full px-4 flex flex-col justify-center rounded-lg  ">
        <div className="flex flex-row space-x-5 mt-5 ">{getTab()}</div>
      </div>
    </div>
  );
}
export default Template;

const data = [
  {
    label: "Emi Detail",
    tab: <EmiDetail />,
  },
  {
    label: "Loan History",
    tab: <LoanHistory />,
  },
  {
    label: "Transaction History",
    tab: <TransactionHistory />,
  },
];
