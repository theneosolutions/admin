import React from "react";
import { TiContacts } from "react-icons/ti";

function DataProvider({ w1, w2, data, data2 }) {
  return (
    <div className="flex flex-row border border-sky-700 w-full mt-5 text-white">
      <div
        className={`py-10 px-3  bg-sky-700 items-center  flex flex-col ${w1}`}
      >
        <TiContacts className="text-5xl" />

        <a className="text-sm mt-4">Data Provided vs Available</a>
      </div>
      <div className={w2}>
        <Line1 heading="Member Type" value={data2?.memberType?.code} />
        <Line1
          heading="ID Type :"
          value={data?.demIDType?.typeNameEN + " " + data?.demIDNumber}
        />
        <Line1 heading="ID Expiry Date :" value={data?.demIDExpiryDate} />
        <Line1 heading="Family Name :" value={data?.demFamilyName} />
        <Line1 heading="First Name :" value={data?.demFirstName} />
        <Line1 heading="Second Name :" value={data?.demSecondName} />
        <Line1 heading="Third Name :" value={data?.demThirdName} />
        <Line1 heading="Unformatted Name : " value={data?.demCustomerName} />
        <Line1 heading="Date Of Birth :" value={data?.demDateOfBirth} />
        <Line1 heading="Gender : " value={data?.demGender} />
        <Line1
          heading="Marital Status :"
          value={data?.demMaritalStatus?.statusNameEN}
        />
        <Line1
          heading="Nationality :"
          value={data?.demNationality?.couNameEN}
        />
        <Line1 heading="City :" value={data?.demNationality?.demCustomerCity} />
        <Line1
          heading="Monthly Income :"
          value={data?.demNationality?.demTotalMonthlyIncome}
        />
        <Line1
          heading="Application Type :"
          value={data?.demApplicantType?.applicantTypeNameEN}
        />
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
