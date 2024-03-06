import React from "react";
import { useLocation } from "react-router-dom";
import CardMain from "Components/Cards/main";
import { MdOutlineVerified } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { VscLayersActive } from "react-icons/vsc";
import { MdDomainVerification } from "react-icons/md";

function Absher() {
  const location = useLocation();

  const users = useSelector((state) => state.getAllUsers);
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  const userData = users.find((item) => item?.user?.idNumber === id);
  console.log("userData", users);
  return (
    <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
      <div className="w-full">
        <CardMain width="w-full	" heading={"Absher Verification Detail"}>
          <div className="space-y-6 my-5">
            <div className="flex flex-row">
              <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
                <MdDomainVerification />
                <a>User Verification:</a>
              </a>
              <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
                {userData?.user?.ownerVerification ? (
                  <MdOutlineVerified className="text-3xl text-green-700" />
                ) : (
                  <RxCross2 className="text-3xl text-red-700" />
                )}
              </a>
            </div>

            <div className="flex flex-row">
              <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
                <VscLayersActive />
                <a>Status:</a>
              </a>
              <a className="text-gray-700 font-semibold">
                {userData?.user?.ownerVerification ? (
                  <>Verified</>
                ) : (
                  <>Not Verified</>
                )}
              </a>
            </div>
          </div>
        </CardMain>
      </div>
    </div>
  );
}
export default Absher;
