import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./header";
import InputField from "./input";
function AgeLimit() {
  const { t } = useTranslation();

  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  return (
    <div>
      <Header value="Age Criteria" />
      <div className="flex flex-row justify-between items-center ">
        <div className="flex flex-row  space-x-4 my-5 items-center">
          <InputField
            type="number"
            value={minAge}
            onChange={(e) => setMinAge(e)}
            style="w-52"
            placeholder="Minimum Age"
          />
          <InputField
            type="number"
            value={maxAge}
            onChange={(e) => setMaxAge(e)}
            style="w-52"
            placeholder="Maximum Age"
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
export default AgeLimit;
