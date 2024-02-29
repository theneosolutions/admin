import React, { useEffect, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { VscLayersActive } from "react-icons/vsc";
import { PiCellSignalLowDuotone } from "react-icons/pi";
import { TbMathEqualLower } from "react-icons/tb";
import { FiDollarSign } from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";

function Absher() {
  const [state, setState] = useState({});
  const gosi = useSelector((state) => state?.getGosiData || {});

  const employmentStatusInfo = gosi?.employmentStatusInfo || [];

  useEffect(() => {
    if (employmentStatusInfo.length > 0) {
      // Update state only if the array has elements
      setState(employmentStatusInfo[0]);
    }
  }, [employmentStatusInfo]);
  return (
    <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
      <div className="w-full px-5">
        <div className="space-y-6 my-5">
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <MdDriveFileRenameOutline />
              <a>Full Name:</a>
            </a>
            <a className="text-gray-700 font-semibold">{state?.fullName}</a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <RiUserStarLine />
              <a>Employer Name:</a>
            </a>
            <a className="text-gray-700 font-semibold">{state?.employerName}</a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <VscLayersActive />
              <a>Employment Status:</a>
            </a>

            <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
              <a>{state?.employmentStatus}</a>
              <MdOutlineVerified className="text-3xl text-green-700" />
            </a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <PiCellSignalLowDuotone />
              <a>Housing Allowance:</a>
            </a>
            <a className="text-gray-700 font-semibold">
              {state?.housingAllowance}
            </a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <TbMathEqualLower />
              <a>Other Allowance:</a>
            </a>

            <a className="text-gray-700 font-semibold">
              {state?.otherAllowance}
            </a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <FiDollarSign />
              <a>Basic Wage:</a>
            </a>

            <a className="text-gray-700 font-semibold">{state?.basicWage}</a>
          </div>

          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <MdCalendarMonth />
              <a>Working Months:</a>
            </a>
            <a className="text-gray-700 font-semibold">
              {state?.workingMonths}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Absher;
