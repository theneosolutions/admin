import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import RoleModel from "../../Components/RoleModel";

function Roles() {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const getPermissions = useSelector((state) => state.permissions);

  const [modelOpen, setModelOpen] = useState(false);
  const getAllRolesData = useSelector((state) => state.getAllRoles);
  const getUserPermission = useSelector((state) => state.userPermissions);
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_ALL_PERMISSIONS" });
  }, [dispatch]);

  const toggleModuleExpansion = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleParentChange = (module) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (item) => item.id === module.id
      );

      if (isSelected) {
        // If the module is already selected, remove it
        return prevSelectedItems.filter((item) => item.id !== module.id);
      } else {
        // Add the module along with its submenus if not already selected
        return [
          ...prevSelectedItems,
          { ...module, subMenus: module.subMenus || [] },
        ];
      }
    });
  };

  const handleChildChange = (module, subModule) => {
    setSelectedItems((prevSelectedItems) => {
      const parentIndex = prevSelectedItems.findIndex(
        (item) => item.id === module.id
      );
      const isSelected =
        parentIndex !== -1 &&
        prevSelectedItems[parentIndex].subMenus.some(
          (sub) => sub.id === subModule.id
        );

      if (isSelected) {
        // If the submodule is already selected, remove it
        const updatedSubMenus = prevSelectedItems[parentIndex].subMenus.filter(
          (sub) => sub.id !== subModule.id
        );

        // Update the parent module with the new subMenus
        const updatedItems = [...prevSelectedItems];
        if (updatedSubMenus.length > 0) {
          updatedItems[parentIndex] = { ...module, subMenus: updatedSubMenus };
        } else {
          // If no subMenus left, remove the parent module as well
          updatedItems.splice(parentIndex, 1);
        }

        return updatedItems;
      } else {
        // If the submodule is not selected, add it under the correct parent
        const updatedItems = [...prevSelectedItems];
        if (parentIndex !== -1) {
          // If the parent is already selected, update its subMenus
          updatedItems[parentIndex].subMenus.push(subModule);
        } else {
          // If the parent is not selected, add the parent with the submodule
          updatedItems.push({ ...module, subMenus: [subModule] });
        }

        return updatedItems;
      }
    });
  };

  const isModuleSelected = (module) => {
    return selectedItems.some((item) => item.id === module.id);
  };

  const isSubModuleSelected = (module, subModule) => {
    const parent = selectedItems.find((item) => item.id === module.id);
    return parent && parent.subMenus.some((sub) => sub.id === subModule.id);
  };

  const getSelectedIds = () => {
    const ids = [];

    selectedItems.forEach((item) => {
      // Add the parent module ID
      ids.push(item.id);

      // Add the submodule IDs
      item.subMenus.forEach((sub) => {
        ids.push(sub.id);
      });
    });

    return ids;
  };

  const handleSubmit = () => {
    const selectedIds = getSelectedIds();
    console.log("Selected IDs:", selectedIds);
    console.log("Selected Items", selectedItems);
    // You can now use this array of selected IDs as needed
  };
  function getAllRoles() {
    dispatch({
      type: "GET_ALL_ROLES",
    });
  }

  useEffect(() => {
    if (role) {
      dispatch({
        type: "GET_PERMISSIONS_OF_ROLE",
        payload: role,
      });
    }
  }, [role]);
  useEffect(() => {
    if (getUserPermission) {
      setSelectedItems([]);
      setExpandedModule(null);
      setSelectedItems(getUserPermission);
    }
  }, [getUserPermission]);
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
            setModelOpen={(e) => setModelOpen(e)}
            modelOpen={modelOpen}
          />
        </div>
      </div>
      {getPermissions.map((module) => (
        <div key={module.id}>
          <div className="flex flex-row items-center space-x-2">
            <div
              className="flex flex-row w-44 bg-gray-200 text-center rounded-sm items-center justify-center py-2 cursor-pointer"
              onClick={() => toggleModuleExpansion(module.id)}
            >
              <a>{module.name}</a>
              {expandedModule === module.id ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </div>
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={isModuleSelected(module)}
              onChange={() => handleParentChange(module)}
            />
          </div>
          {expandedModule === module.id && (
            <div className="ml-8 mt-4 space-y-2">
              {module.subMenus?.map((subModule) => (
                <div
                  key={subModule.id}
                  className="ml-8 mt-2 flex flex-row space-x-3 items-center"
                >
                  <div className="flex flex-row w-44 bg-gray-200 text-center rounded-sm items-center justify-center py-2">
                    <a>{subModule.name}</a>
                  </div>
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={isSubModuleSelected(module, subModule)}
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
        onClick={handleSubmit}
      >
        <a>Submit</a>
      </div>
    </div>
  );
}

export default Roles;

const data = [
  {
    id: 1,
    key: "overview",
    name: "Overview",
    subMenus: [
      {
        id: 2,
        key: "overview_account",
        name: "Account",
      },
    ],
  },
  {
    id: 3,
    key: "applications",
    name: "Applications",
    subMenus: [
      {
        id: 4,
        key: "loan_applications",
        name: "Loan Applications",
      },
    ],
  },
  {
    id: 5,
    key: "customers",
    name: "Customers",
    subMenus: [
      {
        id: 6,
        key: "customers_dashboard",
        name: "Customers Dashboard",
      },
      {
        id: 7,
        key: "all_customers",
        name: "All Customers",
      },
      {
        id: 8,
        key: "verified_customers",
        name: "Verified Customers",
      },
    ],
  },
];
