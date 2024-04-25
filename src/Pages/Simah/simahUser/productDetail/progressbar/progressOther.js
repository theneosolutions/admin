import React, { useState, useEffect } from "react";
import { PiArrowCounterClockwiseFill } from "react-icons/pi";

function ProgressOther({ value }) {
  const [newColor, setNewColor] = useState("");

  useEffect(() => {
    if (value > 150) {
      setNewColor("text-red-600");
    } else if (value > 120) {
      setNewColor("text-yellow-600");
    } else if (value > 0) {
      setNewColor("text-orange-300");
    } else if (value === 0) {
      setNewColor("text-green-600");
    }
  }, [value]);

  return (
    <div
      className={`${newColor} rounded-full  h-8 w-8  text-sm text-center justify-center items-center flex font-bold relative `}
    >
      <PiArrowCounterClockwiseFill className="h-8 w-8 absolute" />
      <div className="text-xs" style={{ fontSize: 9 }}>
        {value}
      </div>
    </div>
  );
}

export default ProgressOther;
