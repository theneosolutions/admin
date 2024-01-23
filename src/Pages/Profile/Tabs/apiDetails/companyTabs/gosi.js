import React from "react";
import CardMain from "Components/Cards/main";
import { MdOutlineVerified } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { VscLayersActive } from "react-icons/vsc";
import { PiCellSignalLowDuotone } from "react-icons/pi";
import { TbMathEqualLower } from "react-icons/tb";
import { FiDollarSign } from "react-icons/fi";
import { MdCalendarMonth } from "react-icons/md";

function Absher() {
  const gosi = useSelector(
    (state) => state?.getGosiData?.employmentStatusInfo[0]
  );
  return (
    <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
      <div className="w-full px-5">
        <div className="space-y-6 my-5">
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <MdDriveFileRenameOutline />
              <a>Full Name:</a>
            </a>
            <a className="text-gray-700 font-semibold">{gosi?.fullName}</a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <RiUserStarLine />
              <a>Employer Name:</a>
            </a>
            <a className="text-gray-700 font-semibold">{gosi?.employerName}</a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <VscLayersActive />
              <a>Employment Status:</a>
            </a>

            <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
              <a>{gosi?.employmentStatus}</a>
              <MdOutlineVerified className="text-3xl text-green-700" />
            </a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <PiCellSignalLowDuotone />
              <a>Housing Allowance:</a>
            </a>
            <a className="text-gray-700 font-semibold">
              {gosi?.housingAllowance}
            </a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <TbMathEqualLower />
              <a>Other Allowance:</a>
            </a>

            <a className="text-gray-700 font-semibold">
              {gosi?.otherAllowance}
            </a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <FiDollarSign />
              <a>Basic Wage:</a>
            </a>

            <a className="text-gray-700 font-semibold">{gosi?.basicWage}</a>
          </div>

          <div className="flex flex-row">
            <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
              <MdCalendarMonth />
              <a>Working Months:</a>
            </a>
            <a className="text-gray-700 font-semibold">{gosi?.workingMonths}</a>
          </div>

          {/* <div className="flex flex-row">
            <a className="w-1/4	 text-gray-700 ">Status</a>
            <a className="text-gray-700 font-semibold">Verified</a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4	 text-gray-700 ">Client Id</a>
            <a className="text-gray-700 font-semibold">100012312</a>
          </div>
          <div className="flex flex-row">
            <a className="w-1/4	 text-gray-700 ">Customer Id</a>
            <a className="text-gray-700 font-semibold">32</a>
          </div>

          <div className="flex flex-row">
            <a className="w-1/4	 text-gray-700 ">Transaction Id</a>
            <a className="text-gray-700 font-semibold">10-33-112-3331</a>
          </div> */}
        </div>
      </div>

      {/* <div className="w-1/2">
        {" "}
        <CardMain width="w-full	" heading={"Absher Verification Detail"}>
          <div className="space-y-6 my-5">
            <div className="flex flex-row">
              <a className="w-1/4	 text-gray-700 ">User Verification</a>
              <a className="text-gray-700 font-semibold flex flex-row space-x-5 rtl:space-x-reverse">
                <RxCross2 className="text-3xl text-red-700" />
              </a>
            </div>

            <div className="flex flex-row">
              <a className="w-1/4	 text-gray-700 ">Status</a>
              <a className="text-gray-700 font-semibold">Not Verified</a>
            </div>
            <div className="flex flex-row">
              <a className="w-1/4	 text-gray-700 ">Client Id</a>
              <a className="text-gray-700 font-semibold">100012312</a>
            </div>
            <div className="flex flex-row">
              <a className="w-1/4	 text-gray-700 ">Customer Id</a>
              <a className="text-gray-700 font-semibold">3566</a>
            </div>

            <div className="flex flex-row">
              <a className="w-1/4	 text-gray-700 ">Transaction Id</a>
              <a className="text-gray-700 font-semibold">500000</a>
            </div>
          </div>
        </CardMain>
      </div> */}
    </div>
  );
}
export default Absher;
