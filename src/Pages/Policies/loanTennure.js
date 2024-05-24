import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./header";
import InputField from "./input";
function LoanTennure() {
  const { t } = useTranslation();

  const [minTenure, setMinTenure] = useState("");
  const [maxTenure, setMaxTenure] = useState("");

  return (
    <div>
      <Header value="Loan Tenure" />
      <div className="flex md:flex-row flex-col justify-between items-center  ">
        <div className="flex md:flex-row flex-col  md:space-x-4 my-5 items-center md:space-y-0 space-y-4 w-full">
          <InputField
            type="number"
            value={minTenure}
            onChange={(e) => setMinTenure(e)}
            style="w-52"
            placeholder="Minimum Tenure"
          />
          <InputField
            type="number"
            value={maxTenure}
            onChange={(e) => setMaxTenure(e)}
            style="w-52"
            placeholder="Maximum Tenure"
          />
        </div>
        <button
          onClick={() => console.log("Helo")}
          className={` rounded-lg text-white text-sm px-8 py-2  hover:bg-opacity-90 bg-primary md:w-max w-full`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
export default LoanTennure;
