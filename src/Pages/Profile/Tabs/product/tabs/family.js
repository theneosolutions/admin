import React from "react";

function ProfileTab() {
  return (
    <div className="w-full">
      <div>
        <PersonalDetailCard />
      </div>
    </div>
  );
}
export default ProfileTab;
function PersonalDetailCard() {
  return (
    <div className="">
      <div>
        <a className="text-lg font-semibold">Family Info:</a>
        <div className="mt-5 flex flex-row space-x-8 rtl:space-x-reverse ">
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>

          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <a className="text-lg font-semibold">Residential info</a>
        <div className="mt-5 flex flex-row space-x-8 rtl:space-x-reverse ">
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
