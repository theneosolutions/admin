import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./header";
import InputField from "./input";
function IncomeValidation() {
  const { t } = useTranslation();

  const [minIncome, setMinIncome] = useState("");
  const [maxIncome, setMaxIncome] = useState("");

  return (
    <div>
      <Header value="Income Validation" />
      <div className="flex md:flex-row flex-col justify-between items-center  ">
        <div className="flex md:flex-row flex-col  md:space-x-4 my-5 items-center md:space-y-0 space-y-4 w-full">
          <InputField
            type="number"
            value={minIncome}
            onChange={(e) => setMinIncome(e)}
            style="w-52"
            placeholder="Minimum Income"
          />
          <InputField
            type="number"
            value={maxIncome}
            onChange={(e) => setMaxIncome(e)}
            style="w-52"
            placeholder="Maximum Income"
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
export default IncomeValidation;
