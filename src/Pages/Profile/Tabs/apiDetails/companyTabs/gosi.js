import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { VscLayersActive } from "react-icons/vsc";
import { PiCellSignalLowDuotone } from "react-icons/pi";
import { TbMathEqualLower } from "react-icons/tb";
import { FiDollarSign } from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";
import { useTranslation } from "react-i18next";

function Absher() {
  const { t } = useTranslation();

  const [state, setState] = useState({});

  const gosi = useSelector((state) => state?.getGosiData || {});

  const employmentStatusInfo = gosi?.employmentStatusInfo || [];
  useEffect(() => {
    if (employmentStatusInfo.length > 0) {
      setState(employmentStatusInfo[0]);
    }
  }, [employmentStatusInfo]);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  return (
    <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
      {!isEmpty(state) ? (
        <div className="w-full flex flex-col xl:flex-row justify-between xl:space-x-20 px-5">
          <div className="space-y-6 my-5   w-full xl:w-1/2">
            <div className="flex flex-row justify-between">
              <a className="  text-gray-700 flex flex-row items-center space-x-2">
                <MdDriveFileRenameOutline />
                <a>Full Name:</a>
              </a>
              <a className="text-gray-700 font-semibold">{state?.fullName}</a>
            </div>
            <div className="flex flex-row justify-between">
              <a className=" text-gray-700 flex flex-row items-center space-x-2">
                <RiUserStarLine />
                <a>Employer Name:</a>
              </a>
              <a className="text-gray-700 font-semibold">
                {state?.employerName}
              </a>
            </div>
            <div className="flex flex-row justify-between">
              <a className=" text-gray-700 flex flex-row items-center space-x-2">
                <VscLayersActive />
                <a>Employment Status:</a>
              </a>

              <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
                <a>{state?.employmentStatus}</a>
              </a>
            </div>
            <div className="flex flex-row justify-between">
              <a className=" text-gray-700 flex flex-row items-center space-x-2">
                <PiCellSignalLowDuotone />
                <a>Housing Allowance:</a>
              </a>
              <a className="text-gray-700 font-semibold">
                {state?.housingAllowance}
              </a>
            </div>
            <div className="flex flex-row justify-between">
              <a className=" text-gray-700 flex flex-row items-center space-x-2">
                <TbMathEqualLower />
                <a>Other Allowance:</a>
              </a>

              <a className="text-gray-700 font-semibold">
                {state?.otherAllowance}
              </a>
            </div>
            <div className="flex flex-row justify-between">
              <a className=" text-gray-700 flex flex-row items-center space-x-2">
                <FiDollarSign />
                <a>Basic Wage:</a>
              </a>

              <a className="text-gray-700 font-semibold">{state?.basicWage}</a>
            </div>

            <div className="flex flex-row justify-between">
              <a className=" text-gray-700 flex flex-row items-center space-x-2">
                <MdCalendarMonth />
                <a>Working Months:</a>
              </a>
              <a className="text-gray-700 font-semibold">
                {state?.workingMonths}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 px-20 text-center w-full">
          <a>{t("Nothing To Show!")}</a>
        </div>
      )}
    </div>
  );
}
export default Absher;
