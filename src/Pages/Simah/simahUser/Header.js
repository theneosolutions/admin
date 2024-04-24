function Header({ data, data2 }) {
  console.log("detailsss", data);
  return (
    <div>
      <div className="  bg-white  border-t border-sky-700 w-full rounded-lg mt-4 md:mt-0">
        <div className="  bg-white  border-t border-sky-700 w-full rounded-lg mt-4 md:mt-0">
          <div className="  bg-white  border border-sky-200 w-full rounded-t-lg mt-4 md:mt-0 text-center py-10 text-sky-700 font-bold text-2xl">
            Miscellaneous Credit Report
          </div>
        </div>
      </div>
      <div className="  bg-white   w-full mt-4 md:mt-0 text-center py-5 text-sky-700  text-md font-semibold">
        ID Number : {data2?.demIDNumber}
      </div>

      <div className="  bg-white  border border-sky-700 w-full mt-4 md:mt-0 space-x-3 flex flex-row">
        <div className=" w-8/12 px-3">
          <Line1 heading="Report Date" value={data?.reportDate} />
          <Line1 heading="Enquiry Number" value={data?.enquiryNumber} />
          <Line1
            heading="Number of Applicants"
            value={data?.numberOfApplicants}
          />
          <Line1 heading="Reference Number" value={data?.referenceNumber} />
          <Line1 heading="Member Type" value={data?.memberType?.code} />
          <Line1 heading="Processing Department" value="null" />
        </div>
        <div className=" w-4/12 px-3">
          <Line2 heading="Enquiry Type" value={data?.enquiryType} />
          <Line2 heading="Product Type" value={data?.productType} />
          <Line1 heading="Account Type" value={data?.accountType} />
          <Line1 heading="Amount" value={data?.amount} />
          <Line1 heading="Member Status" value={data?.status?.code} />
          <Line1 heading="Reason Code" value="null" />
        </div>
      </div>
    </div>
  );
}

function Line1({ heading, value }) {
  return (
    <div className="w-full	 flex flex-row border-b-2 border-black px-2 pt-1 mb-1 items-center">
      <a className="w-1/2 text-sm text-sky-700 font-bold">{heading} </a>
      <a className="w-1/2 text-sm">{value} </a>
    </div>
  );
}

function Line2({ heading, value }) {
  return (
    <div className="w-full	 flex flex-row border-b-2 border-black px-2 pt-1 mb-1 items-center">
      <a className="w-1/2 text-sm text-sky-700 font-bold">{heading} </a>
      <a className="w-1/2 text-sm">{value} </a>
    </div>
  );
}
export default Header;
