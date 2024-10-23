import React, { useState } from "react";
import EmiDetail from "./tabs/EmiDetail";
import LoanHistory from "./tabs/LoanHistory";
import TransactionHistory from "./tabs/transactionHistory";
import SeelaInvestment from "./tabs/seelaInvestment";
import SelaSellRadeem from "./tabs/SellRadeemSelaa";
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

  return (
    <div className="bg-white   border border-primary w-full rounded-lg overflow-x-scroll ">
      <div className="flex flex-row   w-max border-b border-gray-300">
        {data?.map((v, k) => {
          return (
            <div
              onClick={() => setNavigation(v.label)}
              className={`px-2 cursor-pointer ${
                state === v.label ? "text-primary " : "text-gray-600 "
              }`}
            >
              <div
                className={`px-2 py-4  w-max  ${
                  state === v.label ? "border-primary border-b-2" : " "
                }`}
              >
                <a className="text-sm">{t(v.label)}</a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="  rtl:space-x-reverse  w-full px-4 flex flex-col justify-center rounded-lg  ">
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
  {
    label: "Selaa Investment Transaction",
    tab: <SeelaInvestment />,
  },
  {
    label: "Selaa Sell and Redeem Transactions",
    tab: <SelaSellRadeem />,
  },
];
