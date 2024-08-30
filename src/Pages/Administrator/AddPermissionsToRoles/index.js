import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import RoleModel from "Components/RoleModel";
import { UpdatePermissions } from "Services/OtherApis";
import * as action from "Services/redux/reducer";
import withAuthorization from "constants/authorization";
import { CODE } from "constants/codes";
function AddPermissionsToRoles() {
  const dispatch = useDispatch();

  const getPermissions = useSelector((state) => state.permissions);
  const getAllRolesData = useSelector((state) => state.getAllRoles);
  const state = useSelector((state) => state.role);

  const getUserPermission = useSelector((state) => state.userPermissions);

  const [selectedIds, setSelectedIds] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [role, setRole] = useState("");

  // useEffect(() => {
  //   dispatch({ type: "GET_ALL_PERMISSIONS" });
  // }, [dispatch]);

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

    const temp = selectedItems?.some((item) => item.code === module.code);

    if (temp) {
      module.subMenus?.forEach((subModule) => {
        subModule.actions?.forEach((action) => {
          if (selectedIds.includes(action.id)) {
            setSelectedIds((prevSelectedIds) =>
              prevSelectedIds.filter((id) => id !== action.id)
            );
          }
        });
      });
    }
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

      let updatedItems = prevSelectedItems.map((item) => ({
        ...item,
        subMenus: [...item.subMenus],
      }));
      if (isSelected) {
        // updatedItems = [...prevSelectedItems];
        // If the submodule is already selected, remove it
        const updatedSubMenus = prevSelectedItems[parentIndex].subMenus.filter(
          (sub) => sub.id !== subModule.id
        );

        // Update the parent module with the new subMenus

        if (updatedSubMenus.length > 0) {
          updatedItems[parentIndex] = { ...module, subMenus: updatedSubMenus };
        } else {
          // If no subMenus left, remove the parent module as well
          updatedItems.splice(parentIndex, 1);
        }
        return updatedItems;
      } else {
        // If the submodule is not selected, add it under the correct parent

        if (parentIndex !== -1) {
          // If the parent is already selected, update its subMenus
          updatedItems[parentIndex].subMenus.push(subModule);
        } else {
          updatedItems.push({ ...module, subMenus: [subModule] });
        }
        return updatedItems;
      }
    });

    let temp = selectedItems?.some((item) =>
      item.subMenus?.some((sub) => sub.code === subModule?.code)
    );

    if (temp) {
      subModule?.actions.some((item) => {
        if (selectedIds.includes(item.id)) {
          // Remove the item.id from selectedIds
          setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.filter((id) => id !== item.id)
          );
        }
      });
    }
  };

  const isActionSelected = (module, submodules) => {
    let temp = selectedItems?.some((menu) =>
      menu.subMenus?.some((item) => item.code === submodules.code)
    );

    if (!temp) {
      // Handle clearing `selectedIds` outside this function, such as in a `useEffect`
      return false;
    }

    return selectedIds.some((item) => item === module?.id);
  };
  const pushIdInArray = (module) => {
    const select = selectedIds.some((item) => item === module?.id);

    if (select) {
      let temp = selectedIds.filter((item) => item != module.id);

      setSelectedIds(temp);
    }
    if (!select) {
      setSelectedIds([...selectedIds, module.id]);
    }
  };

  const isModuleSelected = (module) => {
    return selectedItems.some((item) => item.id === module.id);
  };

  const isSubModuleSelected = (module, subModule) => {
    const parent = selectedItems.find((item) => item.id === module.id);

    return parent
      ? parent.subMenus.some((sub) => sub.id === subModule.id)
      : false;
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

  useEffect(() => {
    if (getUserPermission) {
      const newIds = [];

      getUserPermission.forEach((item) => {
        item?.subMenus.forEach((sub) => {
          if (sub?.actions) {
            sub.actions.forEach((action) => {
              newIds.push(action.id);
            });
          }
        });
      });

      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, ...newIds]);
    }
  }, [getUserPermission]);
  const handleSubmit = () => {
    const temp = [...selectedIds, ...getSelectedIds()];

    console.log("selectedids temp", temp.sort());
    // const selectedIds = temp.toString();

    // // You can now use this array of selected IDs as needed

    // if (selectedIds) {
    //   UpdatePermissions(role, selectedIds).then((res) =>
    //     dispatch(
    //       action.Message({
    //         message: res.message || "Error",
    //         open: true,
    //         error: false,
    //       })
    //     )
    //   );
    // } else {
    //   return dispatch(
    //     action.Message({
    //       message: "Please Select Atleast 1 Permissions",
    //       open: true,
    //       error: true,
    //     })
    //   );
    // }
  };
  function getAllRoles() {
    dispatch({
      type: "GET_ALL_ROLES",
    });
  }

  // useEffect(() => {
  //   if (role) {
  //     dispatch({
  //       type: "GET_PERMISSIONS_OF_ROLE",
  //       payload: role,
  //     });
  //   }
  // }, [role]);
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
              {getAllRolesData
                .filter((item) => item.name != "User")
                ?.map((v, k) => {
                  return (
                    <option key={k} value={v?.id}>
                      {v?.name}
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
      </div>
      {getPermissions?.map((module) => (
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
                <div>
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
                  <div className="ml-8 mt-4 space-y-2">
                    {subModule.actions?.map((action) => (
                      <div
                        key={action.id}
                        className="ml-8 mt-2 flex flex-row space-x-3 items-center"
                      >
                        <div className="flex flex-row w-44 bg-gray-200 text-center rounded-sm items-center justify-center py-2">
                          <a>{action.name}</a>
                        </div>
                        <input
                          type="checkbox"
                          className="h-5 w-5"
                          checked={isActionSelected(action, subModule)}
                          onChange={() => pushIdInArray(action)}
                        />
                      </div>
                    ))}
                  </div>
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

export default withAuthorization(
  AddPermissionsToRoles,
  CODE.ASSIGN_PERMISSIONS_TO_ROLE
);
