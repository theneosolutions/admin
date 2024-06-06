import { t } from "i18next";
import React from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiUserStarLine } from "react-icons/ri";
import { VscLayersActive } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function DeviceInfo() {
  const { t } = useTranslation();

  const user = useSelector((state) => state.getUserById?.deviceInfo);
  return (
    <div className="w-full">
      <div className="  mb-5   w-full flex flex-row">
        <div className="flex flex-col justify-between   w-1/5 ">
          <a className=" h-10 text-gray-700 flex flex-row items-center space-x-2	">
            <MdDriveFileRenameOutline />

            <a>{t("Device Token:")}</a>
          </a>
          <a className="h-10  text-gray-700 flex flex-row items-center space-x-2">
            <RiUserStarLine />

            <a> {t("Ip Address:")}</a>
          </a>
          <a className="h-10  text-gray-700 flex flex-row items-center space-x-2">
            <VscLayersActive />
            <a>{t("Mac Address:")}</a>
          </a>
        </div>

        <div className="flex flex-col justify-between  w-4/5 ">
          <a className="h-10  text-gray-700 flex flex-row items-center 	">
            <a className="overflow-scroll"> {user?.deviceToken}</a>
          </a>
          <a className="h-10  text-gray-700 flex flex-row items-center space-x-2">
            <a> {user?.ipAddress}</a>
          </a>
          <a className="h-10 text-gray-700 flex flex-row items-center space-x-2">
            <a>{user?.macAddress}</a>
          </a>
        </div>
      </div>
    </div>
  );
}
export default DeviceInfo;
