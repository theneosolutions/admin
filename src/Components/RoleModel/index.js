import React, { useState } from "react";
import { useDispatch } from "react-redux";

function Component({ setModelOpen, modelOpen, GetAllRoles }) {
  const dispatch = useDispatch();

  const [role, setRole] = useState("");
  function reset() {
    setModelOpen(false);
  }
  function AddNewRole() {
    if (role) {
      dispatch({
        type: "ADD_NEW_ROLE_NAME",
        payload: { roleName: role, valid: true },
      });
      setModelOpen(false);
      setTimeout(() => GetAllRoles(), 500);
    }
  }

  return (
    <>
      <div
        onClick={() => setModelOpen(true)}
        className="rounded-md text-white text-sm px-5 py-2 h-min bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300"
      >
        <a>Add New Role</a>
      </div>
      {modelOpen ? (
        <Model setModelOpen={(e) => setModelOpen(e)} reset={() => reset()}>
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
  return (
    <div className="px-5 py-5">
      <a>Add New Role</a>
      <input
        onChange={(e) => setRole(e.target.value)}
        value={role}
        class="mt-2 bg-gray-50 border border-gray-200 text-gray-900 sm:text-sm rounded-lg  block w-96 p-2.5  dark:placeholder-gray-200 dark:text-white outline-none"
        required={true}
      />
      <div
        onClick={() => AddNewRole()}
        className={`mb-3 text-center mt-10 rounded-md text-white text-sm px-5 py-2 h-min  duration-300 ${
          role ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-300"
        }`}
      >
        <a>Add New Role</a>
      </div>
    </div>
  );
}
function Model({ children, reset, heading }) {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      className="bg-gray-200 bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
    >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Role
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => reset()}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
