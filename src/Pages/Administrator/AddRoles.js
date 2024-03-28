import React, { useState } from "react";
import RoleModel from "../../Components/RoleModel";
function Roles() {
  const [role, setRole] = useState("ROLE_COMPLIANCE");
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <div
      className={`bg-white rounded shadow-sm px-5 py-4 rtl:space-x-reverse space-y-4`}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col w-1/2">
          <a>Select Role</a>
          <select
            className=" py-2 px-3 border rounded   mt-1"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="ROLE_COMPLIANCE">{"ROLE_COMPLIANCE"}</option>
            <option value="ROLE_MODERATOR">{"ROLE_MODERATOR"}</option>
            <option value="ROLE_CUSTOMER_CARE">{"ROLE_CUSTOMER_CARE"}</option>
            <option value="ROLE_ADMIN">{"ROLE_ADMIN"}</option>
            <option value="ROLE_SALES">{"ROLE_SALES"}</option>
            <option value="ROLE_CREDIT">{"ROLE_CREDIT"}</option>
          </select>
        </div>
        <RoleModel
          y
          setModelOpen={(e) => setModelOpen(e)}
          modelOpen={modelOpen}
        />
      </div>

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
              {v?.authorizedModules?.map((e, l) => {
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
    moduleId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9c",
    module: "Users",
    authorizedModules: [
      {
        subModuleId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9c",
        name: "User Dashboard",
        permision: {
          name: "",
          permissionId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9c",
        },
      },
      {
        subModuleId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9c",
        name: "All Users",
        permision: {
          name: "",
          permissionId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9c",
        },
      },
      {
        subModuleId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9c",
        name: "Verified",
        permision: {
          name: "",
          permissionId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9c",
        },
      },
      {
        subModuleId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9c",
        name: "Dump",
        permision: {
          name: "",
          permissionId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9c",
        },
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

const dataa = {
  rollId: "7287fd58-24a4-4f54-9e5d-2e9ed50f8310",
  authorizedModules: [
    {
      moduleId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9c",
      permissions: [
        {
          grantedPermissionId: "3ee6da09-3908-4d99-9a39-4f40d31ed328",
        },
        {
          grantedPermissionId: "a959e5c6-7784-4a43-8e64-5847be770130",
        },
      ],
    },
    {
      moduleId: "9416bc74-d4c3-4971-ae1c-78a5f31e78fc",
      permissions: [
        {
          grantedPermissionId: "3ee6da09-3908-4d99-9a39-4f40d31ed328",
        },
        {
          grantedPermissionId: "a959e5c6-7784-4a43-8e64-5847be770130",
        },
      ],
    },
  ],
};
