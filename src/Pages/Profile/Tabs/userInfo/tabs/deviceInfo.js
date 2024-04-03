import React from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { VscLayersActive } from "react-icons/vsc";
import { useSelector } from "react-redux";
function DeviceInfo() {
  var state = null;

  const user = useSelector((state) => state.getUserById?.deviceInfo);
  return (
    <div className="">
      <div className="space-y-6 my-5   w-full ">
        <div className="flex flex-row justify-between  ">
          <a className="  text-gray-700 flex flex-row items-center space-x-2 w-4/12	">
            <MdDriveFileRenameOutline />
            <a>Device Token:</a>
          </a>
          <a className="text-gray-700 font-semibold w-96 truncate">
            {user?.deviceToken}
          </a>
        </div>
        <div className="flex flex-row justify-between">
          <a className=" text-gray-700 flex flex-row items-center space-x-2">
            <RiUserStarLine />
            <a>Ip Address:</a>
          </a>
          <a className="text-gray-700 font-semibold">{user?.ipAddress}</a>
        </div>
        <div className="flex flex-row justify-between">
          <a className=" text-gray-700 flex flex-row items-center space-x-2">
            <VscLayersActive />
            <a>Mac Address:</a>
          </a>

          <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
            <a>{user?.macAddress}</a>
          </a>
        </div>
      </div>
    </div>
  );
}
export default DeviceInfo;
