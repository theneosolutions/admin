import React, { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiCarProfileFill } from "react-icons/pi";
import { ImArrowRight } from "react-icons/im";
import ProgressOther from "./progressbar/progressOther";
import ProgressM from "./progressbar/progressM";
function Progress({ w1, w2, data }) {
  const [state, setState] = useState([]);
  useEffect(() => {
    setState(data?.split(""));
  }, []);
  return (
    <div className={`py-4  border-gray300 text-sky-700  flex flex-col ${w1}`}>
      <div className="flex flex-row items-start">
        <div className="flex flex-row items-center">
          <a className="text-xs text-sky-600 px-2 py-2 text-start font-medium">
            Payment Status for Last 24 Months
          </a>
          <ImArrowRight className="text-xl" />
        </div>

        <div>
          <div className="px-2 flex flex-row space-x-0.5 items-center">
            {state?.map((v, k) => {
              return (
                <>
                  {v === "M" ? (
                    <ProgressM />
                  ) : (
                    <ProgressOther value={parseInt(v)} />
                  )}
                </>
              );
            })}
          </div>
          <a className="text-xs text-sky-600 px-2 py-2 text-start font-medium">
            (Recent)
          </a>
        </div>
      </div>
    </div>
  );
}

export default Progress;
