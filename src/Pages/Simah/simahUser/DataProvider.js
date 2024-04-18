import React from "react";
import { TiContacts } from "react-icons/ti";

function DataProvider({ w1, w2 }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Data Provided vs Available</a>
      </div>
      <div className={w2}>
        <Line1 heading="Member Type" value="Primary" />
        <Line1 heading="ID Type :" value="(Resident ID )2207571" />
        <Line1 heading="ID Expiry Date :" value="Test" />
        <Line1 heading="Family Name :" value="Test" />
        <Line1 heading="First Name :" value="Test" />
        <Line1 heading="Second Name :" value="Test" />
        <Line1 heading="Third Name :" value="Test" />
        <Line1 heading="Unformatted Name : " value="Test Test Test Test" />
        <Line1 heading="Date Of Birth :" value="09/09/1990" />
        <Line1 heading="Gender : " value="Male" />
        <Line1 heading="Marital Status :" value="Married" />
        <Line1 heading="Nationality :" value="UNK" />
      </div>
    </div>
  );
}

export default DataProvider;

function Line1({ heading, value }) {
  return (
    <div className="w-full	 flex flex-row  px-4 pt-1 mb-1 items-center ">
      <a className="w-2/6	 text-sm text-sky-600 ">{heading} </a>
      <a className="w-1/2 text-sm text-black">{value} </a>
    </div>
  );
}
