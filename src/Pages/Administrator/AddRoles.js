import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import RoleModel from "../../Components/RoleModel";
import { useDispatch, useSelector } from "react-redux";

function Roles() {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState({});
  const [expandedModule, setExpandedModule] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const getAllRolesData = useSelector((state) => state.getAllRoles);
  const getPermissions = useSelector((state) => state.permissions);
  const [role, setRole] = useState("");
  // Toggle module expansion
  console.log("getPermissions", getPermissions);
  const toggleModuleExpansion = (moduleId) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null); // Close the expanded module
    } else {
      setExpandedModule(moduleId); // Open the clicked module
    }
  };

  // Helper function to check if all submodules are selected
  const areAllSubmodulesSelected = (module) => {
    if (!module.subMenu || module.subMenu.length === 0) return false;
    return module.subMenu.every((sub) => selectedItems[sub.id]);
  };

  // Handle parent checkbox change
  const handleParentChange = (module) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = { ...prevSelectedItems };

      if (areAllSubmodulesSelected(module)) {
        // If all submodules are selected, unselect all
        module.subMenu.forEach((sub) => {
          delete newSelectedItems[sub.id];
        });
        delete newSelectedItems[module.moduleId];
      } else {
        // If not all submodules are selected, select all
        newSelectedItems[module.moduleId] = true;
        module.subMenu?.forEach((sub) => {
          newSelectedItems[sub.id] = true;
        });
      }
      return newSelectedItems;
    });
  };

  // Handle child checkbox change
  const handleChildChange = (module, subModule) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = { ...prevSelectedItems };

      if (newSelectedItems[subModule.id]) {
        // Uncheck the child
        delete newSelectedItems[subModule.id];
      } else {
        // Check the child
        newSelectedItems[subModule.id] = true;
      }

      // Check if all submodules are selected to decide parent state
      if (areAllSubmodulesSelected(module)) {
        newSelectedItems[module.moduleId] = true;
      } else {
        delete newSelectedItems[module.moduleId];
      }

      return newSelectedItems;
    });
  };
  function getAllRoles() {
    dispatch({
      type: "GET_ALL_ROLES",
    });
    dispatch({
      type: "GET_ALL_PERMISSIONS",
    });
  }
  useEffect(() => {
    getAllRoles();
  }, []);

  useEffect(() => {
    if (getAllRolesData?.length > 0) {
      setRole(getAllRolesData[0]?.id);
    }
  }, [getAllRolesData]);

  return (
    <div className="bg-white rounded shadow-sm px-5 py-4 space-y-4">
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
                  {v?.name}
                </option>
              );
            })}
          </select>
        </div>
        <RoleModel
          // GetAllRoles={() => getAllRoles()}
          setModelOpen={(e) => setModelOpen(e)}
          modelOpen={modelOpen}
        />
      </div>
      {data.map((module) => (
        <div key={module.moduleId}>
          <div className="flex flex-row items-center space-x-2">
            <div
              className="flex flex-row w-44 bg-gray-200 text-center rounded-sm items-center justify-center py-2 cursor-pointer"
              onClick={() => toggleModuleExpansion(module.moduleId)}
            >
              <a>{module.module}</a>
              {expandedModule === module.moduleId ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </div>
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={Boolean(selectedItems[module.moduleId])}
              onChange={() => handleParentChange(module)}
            />
          </div>
          {expandedModule === module.moduleId && (
            <div className="ml-8 mt-4 space-y-2">
              {module.subMenu?.map((subModule) => (
                <div
                  key={subModule.id}
                  className="ml-8 mt-2 flex flex-row space-x-3 items-center"
                >
                  <div className="flex flex-row w-44 bg-gray-200 text-center rounded-sm items-center justify-center py-2">
                    <a>{subModule.module}</a>
                  </div>
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={Boolean(selectedItems[subModule.id])}
                    onChange={() => handleChildChange(module, subModule)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div
        className="rounded-md text-center text-white text-sm px-5 py-2 h-min bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300 w-max"
        onClick={() => console.log("Submit Clicked")}
      >
        <a>Submit</a>
      </div>
    </div>
  );
}

export default Roles;

const data = [
  {
    moduleId: "b5b0470e-6e83-4575-99c8-9f50bc7f86e5",
    module: "Overview",
    subMenu: [
      {
        id: 1,
        module: "Account",
      },
    ],
  },
  {
    moduleId: "620b9ea5-dc34-4909-9a03-df20bba5edff",
    module: "Applications",
    subMenu: [
      {
        id: 2,
        module: "Loan Applications",
      },
    ],
  },
  {
    moduleId: "518f1b7d-5582-4fa4-9761-bfe41b2e0952",
    module: "Customers",
    subMenu: [
      {
        id: 3,
        module: "Customers Dashboard",
      },
      {
        id: 4,
        module: "All Customers",
      },
      {
        id: 5,
        module: "Verified Customers",
      },
    ],
  },
  {
    moduleId: "239a2df4-6fbb-4e33-90c6-3c721ca3e5a3",
    module: "Administator",
    subMenu: [
      {
        id: 6,
        module: "Create Admin",
      },
      {
        id: 7,
        module: "Create Rights To User",
      },
    ],
  },
];
