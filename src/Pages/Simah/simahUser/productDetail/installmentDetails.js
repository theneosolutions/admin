import React from "react";

function DataProvider({ data }) {
  return (
    <div className="px-2 border-t py-2">
      <a className="text-black ">
        Installments details (Ins Case Installment Change)
      </a>
      <div className="mt-3">
        {data?.map((v, k) => {
          return (
            <div className="flex flex-row">
              <div className="flex flex-col  w-1/2 text-white ">
                <Line1 heading="Installment Start Date " value={v?.startDate} />
              </div>
              <div className="flex flex-col  w-1/2   text-white px-2">
                <Line1
                  heading="Installment Amount "
                  value={v?.instalmentAmount}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataProvider;

function Line1({ heading, value }) {
  return (
    <div className="w-full	 flex flex-row  pt-1 mb-1 items-center ">
      <a className="w-2/6	 text-sm text-sky-600 ">{heading} </a>
      <a className="w-1/2 text-sm text-black">{value} </a>
    </div>
  );
}
