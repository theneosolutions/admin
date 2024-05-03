import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardMain from "Components/Cards/main";

import { useSelector } from "react-redux";

function Absher() {
  const location = useLocation();
  const [state, setState] = useState();

  const userData = useSelector((state) => state.getUserById);
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  const userId = queryParams.get("user");

  const userDataa = userData?.userAccountRajihi;

  useEffect(() => {
    if (userDataa?.userId === parseInt(userId)) {
      setState(userDataa);
    }
  }, [userData]);
  return (
    <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
      {state?.iban ? (
        <div className="w-full">
          <CardMain width="w-full	" heading={"Absher Verification Detail"}>
            <div className="space-y-6 my-5">
              <div className="flex flex-row">
                <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
                  <a>Account Type</a>
                </a>
                <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
                  {state?.accountType}
                </a>
              </div>
              <div className="flex flex-row">
                <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
                  <a>IBAN</a>
                </a>
                <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
                  {state?.iban}
                </a>
              </div>
              <div className="flex flex-row">
                <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
                  <a>BBAN</a>
                </a>
                <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
                  {state?.bban || "null"}
                </a>
              </div>
              <div className="flex flex-row">
                <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
                  <a>Status</a>
                </a>
                <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
                  {state?.status}
                </a>
              </div>

              <div className="flex flex-row">
                <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
                  <a>Account Number</a>
                </a>
                <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
                  {state?.accountNumber || "null"}
                </a>
              </div>

              <div className="flex flex-row">
                <a className="w-1/4 text-gray-700 flex flex-row items-center space-x-2">
                  <a>Bank</a>
                </a>
                <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
                  {state?.bank}
                </a>
              </div>
            </div>
          </CardMain>
        </div>
      ) : (
        <div className="w-full">
          <CardMain width="w-full	">
            <div className="space-y-6 my-5 pb-6  text-center">
              No Data Found!
            </div>
          </CardMain>
        </div>
      )}
    </div>
  );
}
export default Absher;
