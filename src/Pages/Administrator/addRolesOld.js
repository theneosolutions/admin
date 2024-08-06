import React, { useEffect, useState } from "react";
import RoleModel from "../../Components/RoleModel";
import { useDispatch, useSelector } from "react-redux";

function Roles() {
  const dispatch = useDispatch();
  const [role, setRole] = useState("ROLE_COMPLIANCE");
  const [modelOpen, setModelOpen] = useState(false);
  const [rolesData, setRolesData] = useState(data);
  const getAllRolesData = useSelector((state) => state.getAllRoles);

  function getAllRoles() {
    dispatch({
      type: "GET_ALL_ROLES",
    });
  }
  useEffect(() => {
    getAllRoles();
  }, []);
  const updateChecked = (moduleId, checked, pageId = null) => {
    const updatedData = rolesData.map((item) => {
      if (item.moduleId === moduleId) {
        const updatedPages = item.modulesPages.map((page) => {
          // Update the specific submodule
          if (pageId && page.pageId === pageId) {
            return { ...page, checked };
          }
          return page;
        });
        const areAnySubmodulesChecked = updatedPages.some(
          (page) => page.checked
        );
        return {
          ...item,
          checked: areAnySubmodulesChecked ? true : checked, // Update main module checked status
          modulesPages: updatedPages,
        };
      }
      return item;
    });
    setRolesData(updatedData);
  };

  const updatePermissionName = (pageId, value) => {
    const updatedData = rolesData.map((item) => {
      const updatedPages = item.modulesPages.map((page) => {
        if (page.pageId === pageId) {
          return {
            ...page,
            permissionDtos: {
              ...page.permissionDtos,
              name: value?.name?.toUpperCase(),
              permissionId: value?.id,
            },
          };
        }
        return page;
      });
      return {
        ...item,
        modulesPages: updatedPages,
      };
    });
    setRolesData(updatedData);
  };

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
            {getAllRolesData?.map((v, k) => {
              return (
                <option key={k} value={v?.id}>
                  {v?.roleName}
                </option>
              );
            })}
          </select>
        </div>
        <RoleModel
          GetAllRoles={() => getAllRoles()}
          setModelOpen={(e) => setModelOpen(e)}
          modelOpen={modelOpen}
        />
      </div>

      {rolesData?.map((v, k) => (
        <div key={k}>
          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row w-44 bg-gray-200 text-center rounded-sm items-center justify-center py-2">
              <a>{v?.module}</a>
            </div>
            <input type="checkbox" className="h-5 w-5" checked={v?.checked} />
          </div>

          <div className="mx-20 space-y-2 mt-2 items-center ">
            {v?.modulesPages?.map((e, l) => (
              <SubModule
                key={l}
                data={e}
                moduleId={v?.moduleId}
                onSubModule={(checked) =>
                  updateChecked(v?.moduleId, checked, e?.pageId)
                }
                onPermissionChange={updatePermissionName} // Pass the function to SubModule
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default Roles;

function SubModule({ data, moduleId, onSubModule, onPermissionChange }) {
  const handleChange = (object) => {
    onPermissionChange(data.pageId, object); // Call the callback function with the selected value
  };

  const onChange = (e) => {
    onSubModule(e.target.checked);
  };

  return (
    <div className="flex flex-row items-center space-x-3">
      <input
        type="checkbox"
        className="h-5 w-5"
        checked={data?.checked}
        onChange={onChange}
      />
      <div className="bg-gray-200 flex flex-row text-center rounded-sm items-center justify-center py-1 w-72">
        <a>{data?.name}</a>
      </div>
      <Select onChange={(object) => handleChange(object)} />
    </div>
  );
}

const data = [
  {
    moduleId: "518f1b7d-5582-4fa4-9761-bfe41b2e0952",
    module: "Customers",
    checked: false,
    modulesPages: [
      {
        pageId: "cc9d8328-feaf-4a5f-a3f6",
        name: "User Dashboard",
        checked: false,
        permissionDtos: {
          name: "READ",
          permissionId: "3ee6da09-3908-4d99-9a39-4f40d31ed328",
        },
      },
      {
        pageId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d9",
        name: "All Users",
        checked: false,
        permissionDtos: {
          name: "READ",
          permissionId: "3ee6da09-3908-4d99-9a39-4f40d31ed328",
        },
      },
      {
        pageId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4d",
        name: "Verified",
        checked: false,
        permissionDtos: {
          name: "READ",
          permissionId: "3ee6da09-3908-4d99-9a39-4f40d31ed328",
        },
      },
      {
        pageId: "cc9d8328-feaf-4a5f-a3f6-7fafa8bf4",
        name: "Dump",
        checked: false,
        permissionDtos: {
          name: "READ",
          permissionId: "3ee6da09-3908-4d99-9a39-4f40d31ed328",
        },
      },
    ],
  },
];
function Select({ onChange }) {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const [id, name] = selectedValue.split(","); // Split the value into ID and name

    onChange({ id, name }); // Call the callback function with both ID and name
  };

  return (
    <select className="py-1 px-3 border rounded w-64" onChange={handleChange}>
      {permissions.map((permission) => (
        <option
          key={permission.id}
          value={`${permission.id},${permission.name}`}
        >
          {permission.name}
        </option>
      ))}
    </select>
  );
}
const permissions = [
  { id: "3ee6da09-3908-4d99-9a39-4f40d31ed328", name: "READ" },
  { id: "63dc8b5e-35ba-4a44-b7fa-4abee79241d5", name: "DELETE" },
  { id: "8454c563-6d19-408b-8c33-48bb5ffa13e4", name: "PRINT" },
  { id: "2b143046-5356-4f24-8f1f-6dabee9a5d5a", name: "SAVE" },
  { id: "a959e5c6-7784-4a43-8e64-5847be770130", name: "UPDATE" },
];
