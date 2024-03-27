import React, { useState } from "react";
function Roles() {
  return (
    <div
      className={`bg-white rounded shadow-sm px-5 py-4 rtl:space-x-reverse space-y-4`}
    >
      {data?.map((v, k) => {
        return (
          <>
            <div className="flex flex-row items-center space-x-2">
              <div className="flex flex-row  w-44 bg-gray-200 text-center rounded-sm items-center justify-center py-2">
                <a>{v?.module}</a>
              </div>
              <input type="checkbox" className="h-5 w-5" />
            </div>

            <div className="mx-20 space-y-2 mt-2 items-center ">
              {v?.subModule?.map((e, l) => {
                return <SubModule data={e} />;
              })}
            </div>
          </>
        );
      })}
    </div>
  );
}
export default Roles;

function SubModule({ data }) {
  console.log("data", data);
  return (
    <div className="flex flex-row items-center space-x-3">
      <input type="checkbox" className="h-5 w-5" />
      <div className=" bg-gray-200 flex flex-row   text-center rounded-sm items-center justify-center py-1 w-72">
        <a>{data?.name}</a>
      </div>

      <Select />
    </div>
  );
}
function Select() {
  const [language, setLanguage] = useState("ar");

  return (
    <select
      className=" py-1 px-3 border rounded  w-64 "
      onChange={(e) => setLanguage(e.target.value)}
      value={language}
    >
      <option value="read">{"READ ONLY"}</option>
      <option value="write">{"WRITE"}</option>
      <option value="update">{"UPDATE"}</option>
      <option value="delete">{"DELETE"}</option>
    </select>
  );
}

const data = [
  {
    module: "Users",
    subModule: [
      {
        name: "User Dashboard",
        permision: null,
      },
      {
        name: "All Users",
        permision: null,
      },
      {
        name: "Verified",
        permision: null,
      },
      {
        name: "Dump",
        permision: null,
      },
    ],
  },
  {
    module: "Loan Management",
    subModule: [
      {
        name: "Create Type",
        permision: null,
      },
      {
        name: "Loan Applications",
        permision: null,
      },
      {
        name: "Installments",
        permision: null,
      },
    ],
  },
  {
    module: "Decisions",
    subModule: [
      {
        name: "Questions",
        permision: null,
      },
      {
        name: "Create Set",
        permision: null,
      },
      {
        name: "Create Decision",
        permision: null,
      },
      {
        name: "All Decisions",
        permision: null,
      },
    ],
  },
];
