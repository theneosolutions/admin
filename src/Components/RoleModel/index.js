import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Model from "../Model2";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
function Component({ setModelOpen, modelOpen, GetAllRoles }) {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [role, setRole] = useState("");
  const getAllRolesData = useSelector((state) => state.getAllRoles);
  console.log("getAllRolesData", getAllRolesData);
  function reset() {
    setModelOpen(false);
  }
  function AddNewRole() {
    let temp = getAllRolesData?.some(
      (item) => item.name.toLowerCase() === role.toLowerCase()
    );
    if (!temp) {
      console.log("hosakta hai");
      if (role) {
        dispatch({
          type: "ADD_NEW_ROLE_NAME",
          payload: {
            name: role,
          },
        });
        setTimeout(() => {
          Func();
        }, 1000);

        setRole("");
      }
    } else {
      dispatch(
        action.Message({
          message: "Role with Same Name Already Exists!",
          open: true,
          error: true,
        })
      );
    }
  }
  function Func() {
    if (error) {
    } else {
      GetAllRoles();
      setModelOpen(false);
    }
  }

  return (
    <>
      <div
        onClick={() => setModelOpen(true)}
        className="rounded-md text-white text-sm px-5 py-2 h-min bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300"
      >
        <a> {t("Add New Role")}</a>
      </div>
      {modelOpen ? (
        <Model
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading="Role"
        >
          <AddRole
            AddNewRole={() => AddNewRole()}
            setModelOpen={(e) => setModelOpen(e)}
            setRole={(e) => setRole(e)}
            role={role}
          />
        </Model>
      ) : null}
    </>
  );
}
export default Component;

function AddRole({ setRole, role, AddNewRole }) {
  const { t } = useTranslation();
  return (
    <div className="px-5 py-5">
      <a className="dark:text-white"> {t("Add New Role")}</a>
      <input
        onChange={(e) => setRole(e.target.value)}
        value={role}
        className="dark:bg-gray-800 mt-2 bg-gray-50 border dark:border-primary border-gray-200 text-gray-900 sm:text-sm rounded-lg  block w-96 p-2.5  dark:placeholder-gray-200 dark:text-white outline-none"
        required={true}
      />
      <div
        onClick={() => AddNewRole()}
        className={`mb-3 text-center mt-10 rounded-md text-white text-sm px-5 py-2 h-min  duration-300 ${
          role ? "bg-primary hover:bg-opacity-80 cursor-pointer" : "bg-gray-300"
        }`}
      >
        <a> {t("Add New Role")}</a>
      </div>
    </div>
  );
}
