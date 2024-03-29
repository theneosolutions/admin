import React, { useEffect, useState } from "react";
import RoleModel from "../../Components/RoleModel";
import { useDispatch, useSelector } from "react-redux";

function Roles() {
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [array, setArray] = useState([]);

  const getAllRolesData = useSelector((state) => state.getAllRoles);

  function getAllRoles() {
    dispatch({
      type: "GET_ALL_ROLES",
    });
  }
  useEffect(() => {
    getAllRoles();
  }, []);
  console.log("getAllRolesData", getAllRolesData);

  function AddToArray(value) {
    if (array.includes(value)) {
      setArray(array.filter((item) => item !== value));
    } else {
      setArray([...array, value]);
    }
  }
  function AddModules() {
    const data = {
      roleId: role,
      modules: array,
    };
    dispatch({
      type: "ADD_MODULES_TO_ROLES",
      payload: data,
    });
  }
  useEffect(() => {
    if (getAllRolesData?.length > 0) {
      setRole(getAllRolesData[0]?.id);
    }
  }, [getAllRolesData]);
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

      {data?.map((v, k) => (
        <div key={k}>
          <div className="flex flex-row items-center space-x-2">
            <div className="flex flex-row w-44 bg-gray-200 text-center rounded-sm items-center justify-center py-2">
              <a>{v?.module}</a>
            </div>
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={array.includes(v?.moduleId)}
              onChange={() => AddToArray(v?.moduleId)}
            />
          </div>
        </div>
      ))}
      <div
        onClick={() => AddModules()}
        className="rounded-md text-center text-white text-sm px-5 py-2 h-min bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300 w-max"
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
    module: "OVERVIEW",
  },
  {
    moduleId: "0d4b6412-96eb-4725-945e-5d210598bbcc",
    module: "SIMAH",
  },
  {
    moduleId: "0fbed43b-3a67-4698-b2af-8cf9423b749a",
    module: "DECISIONS",
  },
  {
    moduleId: "239a2df4-6fbb-4e33-90c6-3c721ca3e5a3",
    module: "ADMINISTRATOR",
  },
  {
    moduleId: "3db7e201-389d-48e8-b27d-dafad085c3dd",
    module: "CALCULATIONS",
  },
  {
    moduleId: "518f1b7d-5582-4fa4-9761-bfe41b2e0952",
    module: "CUSTOMERS",
  },
  {
    moduleId: "620b9ea5-dc34-4909-9a03-df20bba5edff",
    module: "APPLICATIONS",
  },
  {
    moduleId: "905e7550-e845-4d3f-bd2a-bddfcdd5944a",
    module: "LOAN_MANAGEMENT",
  },
  {
    moduleId: "a7007584-fb4f-4a6f-8aad-0db2a7b8672b",
    module: "NOTIFICATIONS",
  },
];
