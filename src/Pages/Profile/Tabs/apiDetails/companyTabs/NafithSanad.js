import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { VscLayersActive } from "react-icons/vsc";
import { PiCellSignalLowDuotone } from "react-icons/pi";
import { TbMathEqualLower } from "react-icons/tb";
import { FiDollarSign } from "react-icons/fi";
import Nafith from "../../../../../Components/Nafith";
function NafithSanad() {
  const dispatch = useDispatch();
  const getNafithSanad = useSelector((state) => state.getNafithSanad);
  const [active, setActive] = useState(false);
  console.log("getNafithSanad", getNafithSanad?.body?.body);
  useEffect(() => {
    GetNafithSanad();
  }, []);
  function GetNafithSanad() {
    dispatch({
      type: "GET_NAFITH_SANAD",
      payload: {
        groupUid: "d30117de-7fe7-4e64-a9f1-49ff9e24f618",
        sanadUid: "799cfe2f-dfe4-45bb-ae27-556e8bc9c068",
      },
    });
  }
  var state = getNafithSanad?.body?.body;

  return (
    <div className="w-full">
      <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
        <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
          <div className="w-full px-5 py-5 flex flex-col  lg:flex-row  lg:space-x-10 xl:space-x-14 2xl:space-x-28">
            <div className="space-y-6  w-full lg:w-1/2">
              <div className="flex flex-row justify-between">
                <a className=" text-gray-700 flex flex-row items-center space-x-2">
                  <MdDriveFileRenameOutline />
                  <a>code:</a>
                </a>
                <a className="text-gray-700 font-semibold">{state?.code}</a>
              </div>
              <div className="flex flex-row justify-between">
                <a className=" text-gray-700 flex flex-row items-center space-x-2">
                  <RiUserStarLine />
                  <a>Due Type:</a>
                </a>
                <a className="text-gray-700 font-semibold">{state?.due_type}</a>
              </div>
              <div className="flex flex-row justify-between">
                <a className=" text-gray-700 flex flex-row items-center space-x-2">
                  <VscLayersActive />
                  <a>Number:</a>
                </a>

                <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
                  <a>{state?.number}</a>
                </a>
              </div>
            </div>
            <div className="space-y-6 lg:mt-0 mt-5 w-full lg:w-1/2">
              <div className="flex flex-row justify-between">
                <a className=" text-gray-700 flex flex-row items-center space-x-2">
                  <PiCellSignalLowDuotone />
                  <a>Reference_Id:</a>
                </a>
                <a className="text-gray-700 font-semibold">
                  {state?.reference_id}
                </a>
              </div>
              <div className="flex flex-row justify-between">
                <a className=" text-gray-700 flex flex-row items-center space-x-2">
                  <TbMathEqualLower />
                  <a>Status:</a>
                </a>

                <a className="text-sm font-semibold uppercase bg-yellow-500 px-3 py-1 rounded-md text-white">
                  {state?.status}
                </a>
              </div>
              <div className="flex flex-row justify-between">
                <a className=" text-gray-700 flex flex-row items-center space-x-2">
                  <FiDollarSign />
                  <a>Total Value:</a>
                </a>

                <a className="text-gray-700 font-semibold">
                  {state?.total_value}
                </a>
              </div>
              <div className="justify-end flex flex-row">
                <a
                  onClick={() => setActive(!active)}
                  className="cursor-pointer hover:opacity-80  duration-200 text-sm font-semibold uppercase bg-green-500 px-3 py-1 rounded-md text-white"
                >
                  {active ? "Hide" : "View Sanad"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {active && <Nafith />}
    </div>
  );
}
export default NafithSanad;
