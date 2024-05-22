import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./header";
import InputField from "./input";
function IdValidation() {
  const { t } = useTranslation();

  const [minMonths, setMinMonths] = useState("");

  return (
    <div>
      <Header value="Id Validation Number Of Months" />
      <div className="flex flex-row justify-between items-center ">
        <div className="flex flex-row  space-x-4 my-5 items-center">
          <InputField
            type="number"
            value={minMonths}
            onChange={(e) => setMinMonths(e)}
            style="w-52"
            placeholder="Months"
          />
        </div>
        <button
          onClick={() => console.log("Helo")}
          className={` rounded-lg text-white text-sm px-8 py-2  hover:bg-opacity-90 bg-primary `}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
export default IdValidation;
