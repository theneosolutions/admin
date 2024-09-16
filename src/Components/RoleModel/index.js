import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Model from "../Model2";
import { useTranslation } from "react-i18next";
function Component({ setModelOpen, modelOpen, GetAllRoles }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [role, setRole] = useState("");
  function reset() {
    setModelOpen(false);
  }
  function AddNewRole() {
    if (role) {
      dispatch({
        type: "ADD_NEW_ROLE_NAME",
        payload: {
          name: role,
        },
      });
      setModelOpen(false);
      setTimeout(() => GetAllRoles(), 500);
      setRole("");
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
      <a> {t("Add New Role")}</a>
      <input
        onChange={(e) => setRole(e.target.value)}
        value={role}
        className="mt-2 bg-gray-50 border border-gray-200 text-gray-900 sm:text-sm rounded-lg  block w-96 p-2.5  dark:placeholder-gray-200 dark:text-white outline-none"
        required={true}
      />
      <div
        onClick={() => AddNewRole()}
        className={`mb-3 text-center mt-10 rounded-md text-white text-sm px-5 py-2 h-min  duration-300 ${
          role ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-300"
        }`}
      >
        <a> {t("Add New Role")}</a>
      </div>
    </div>
  );
}
