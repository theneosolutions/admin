import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import RoleModel from "Components/RoleModel";
import { UpdatePermissions } from "Services/OtherApis";
import * as action from "Services/redux/reducer";
import withAuthorization from "constants/authorization";

function AddPermissionsToRoles() {
  const dispatch = useDispatch();

  const getPermissions = useSelector((state) => state.permissions);
  const getAllRolesData = useSelector((state) => state.getAllRoles);
  const state = useSelector((state) => state);
  console.log("statttte", state);
  const getUserPermission = useSelector((state) => state.userPermissions);

  const [selectedIds, setSelectedIds] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [role, setRole] = useState("");
  console.log("selectedItems", selectedItems);
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
    console.log(
      "handle $$$$$4",
      "module",
      module,
      "submodule ",
      subModule,
      "selectedItems",
      selectedItems
    );
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
          // console.log("tum tum ");
          // If the parent is not selected, add the parent with the submodule
          updatedItems.push({ ...module, subMenus: [subModule] });
        }
        return updatedItems;
      }
    });
  };

  const isActionSelected = (module) => {
    return selectedIds.some((item) => item === module?.id);
  };

  const pushIdInArray = (module) => {
    console.log("isActionSelected", module);

    const select = selectedIds.some((item) => item === module?.id);
    console.log("already have", select);
    if (select) {
      let temp = selectedIds.filter((item) => item != module.id);

      console.log("temp", temp);
      setSelectedIds(temp);
    }
    if (!select) {
      setSelectedIds([...selectedIds, module.id]);
    }

    console.log("isActionSelected", selectedIds);
  };

  // console.log("isActionSelected", isActionSelected());

  const isModuleSelected = (module) => {
    // console.log("selected items 2222", selectedItems);

    return selectedItems.some((item) => item.id === module.id);
  };

  const isSubModuleSelected = (module, subModule) => {
    // console.log("module", module, "submodule", subModule);
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
    if (data2) {
      data2?.some((item) => {
        item?.subMenus.some((sub) => {
          if (sub?.actions) {
            sub?.actions.forEach((action) => {
              setSelectedIds([...selectedIds, action.id]);
            });
          }
        });
      });
    }
  }, [data2]);

  const handleSubmit = () => {
    console.log("selectedids", selectedIds, getSelectedIds());

    // const selectedIds = getSelectedIds().toString();

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

  useEffect(() => {
    if (role) {
      dispatch({
        type: "GET_PERMISSIONS_OF_ROLE",
        payload: role,
      });
    }
  }, [role]);
  useEffect(() => {
    if (data2) {
      setSelectedItems([]);
      setExpandedModule(null);
      setSelectedItems(data2);
    }
  }, [data2]);
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
      {data2.map((module) => (
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
                          checked={isActionSelected(action)}
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
  "assign_permissions_to_roles"
);

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

const data2 = [
  {
    id: 1,
    name: "Overview",
    code: "overview",
    subMenus: [
      {
        id: 2,
        name: "Account",
        code: "overview_account",
      },
    ],
  },
  {
    id: 3,
    name: "Applications",
    code: "applications",
    subMenus: [
      {
        id: 4,
        name: "Loan Applications",
        code: "loan_applications",
      },
    ],
  },
  {
    id: 5,
    name: "Customers",
    code: "customers",
    subMenus: [
      {
        id: 6,
        name: "Customers Dashboard",
        code: "customers_dashboard",
      },
      {
        id: 7,
        name: "All Customers",
        code: "all_customers",
      },
      {
        id: 8,
        name: "Verified Customers",
        code: "verified_customers",
      },
    ],
  },
  {
    id: 9,
    name: "Administrator",
    code: "administrator",
    subMenus: [
      {
        id: 10,
        name: "Create Admin",
        code: "create_admin",
      },
      {
        id: 11,
        name: "Assign Permissions to Roles",
        code: "assign_permissions_to_roles",
      },
    ],
  },
  {
    id: 12,
    name: "Seela",
    code: "seela",
    subMenus: [
      {
        id: 13,
        name: "History",
        code: "seela_history",
      },
      {
        id: 14,
        name: "Transaction",
        code: "seela_transaction",
      },
      {
        id: 15,
        name: "Commodity",
        code: "seela_commodity",
      },
      {
        id: 16,
        name: "Wallet",
        code: "seela_wallet",
      },
    ],
  },
  {
    id: 17,
    name: "Policies",
    code: "policies",
    subMenus: [
      {
        id: 18,
        name: "View Policies",
        code: "view_policies",
        actions: [
          {
            id: 19,
            name: "Approve Policy",
            code: "approve_policy",
          },
          {
            id: 20,
            name: "Reject Policy",
            code: "reject_policy",
          },
        ],
      },
    ],
  },
  {
    id: 21,
    name: "Loan Management",
    code: "loan_management",
    subMenus: [
      {
        id: 22,
        name: "Create Type",
        code: "create_type",
      },
      {
        id: 23,
        name: "Customer EMI",
        code: "customer_emi",
      },
    ],
  },
  {
    id: 24,
    name: "Decisions",
    code: "decisions",
    subMenus: [
      {
        id: 25,
        name: "Questions",
        code: "questions",
      },
      {
        id: 26,
        name: "Create Set",
        code: "create_set",
      },
      {
        id: 27,
        name: "Create Decisions",
        code: "create_decisions",
      },
    ],
  },
  {
    id: 28,
    name: "Notifications",
    code: "notifications",
    subMenus: [
      {
        id: 29,
        name: "Notifications",
        code: "notifications_dashboard",
      },
      {
        id: 30,
        name: "Terms and Conditions",
        code: "terms_and_conditions",
      },
      {
        id: 31,
        name: "Awareness Messages",
        code: "awareness_messages",
      },
      {
        id: 32,
        name: "Add SMS",
        code: "add_sms",
      },
    ],
  },
  {
    id: 33,
    name: "Simah",
    code: "simah",
    subMenus: [
      {
        id: 34,
        name: "Simah",
        code: "simah_dashboard",
      },
    ],
  },
  {
    id: 35,
    name: "Calculations",
    code: "calculations",
    subMenus: [
      {
        id: 36,
        name: "DBR",
        code: "calculations_dbr",
      },
      {
        id: 37,
        name: "Bare Minimum Expenses",
        code: "calculations_bare_minimum_expenses",
      },
      {
        id: 38,
        name: "Terms and Rates",
        code: "calculations_terms_and_rates",
      },
    ],
  },
];
