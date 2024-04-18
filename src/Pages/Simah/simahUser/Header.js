function Header() {
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
        ID Number : 2 3 5 6 4 5 5 6 6 7
      </div>

      <div className="  bg-white  border border-sky-700 w-full mt-4 md:mt-0 space-x-3 flex flex-row">
        <div className=" w-8/12 px-3">
          <Line1 heading="Report Date" value="31/05/2021" />
          <Line1 heading="Enquiry Numbe" value="198884564" />
          <Line1 heading="Number of Applicants" value="1" />
          <Line1 heading="Reference Number" value="210001EQ31052115142352" />
          <Line1 heading="Member Type" value="Full" />
          <Line1
            heading="Processing Department"
            value="Consumer Credit Department"
          />
        </div>
        <div className=" w-4/12 px-3">
          <Line2 heading="Enquiry Type" value="Other" />
          <Line2 heading="Product Type" value="Miscellaneous" />
          <Line1 heading="Account Type" value="Single" />
          <Line1 heading="Amount" value="1000.00" />
          <Line1 heading="Member Status" value="Other" />
          <Line1 heading="Reason Code" value="Customer Request" />
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
