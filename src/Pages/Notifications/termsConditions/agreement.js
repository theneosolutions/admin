import React, { useEffect } from "react";
import CardMain from "../../../Components/Cards/main";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import * as action from "Services/redux/reducer";
import TextEditor from "./textEditor";
import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";
function Aggrement() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const conditions = useSelector((state) => state.getAgreement);

  const [description, setDescription] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [activeData, setActiveData] = useState("");

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (description != "") {
      dispatch({
        type: "ADD_AGREEMENT",
        payload: {
          title: "Agreement",
          desc: description,
        },
      });

      setTimeout(() => getAgreement(), 1000);
    } else {
      alert("All Fields Required!");
    }
  }
  function getAgreement() {
    dispatch({
      type: "GET_AGREEMENT",
    });
  }
  useEffect(() => {
    getAgreement();
  }, []);
  function reset() {
    setModelOpen(false);
  }
  console.log("conditionsconditions", conditions);
  return (
    <div className=" flex flex-col space-y-5 ">
      <div className="md:mt-0 mt-5 bg-gray-200  w-full">
        <form onSubmit={handleSubmit}>
          <CardMain width="w-full" heading={"Create Agreement"}>
            <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
              <div className=" w-full space-y-7">
                <Description
                  heading={t("Agreement")}
                  handleChange={(e) => setDescription(e)}
                />
              </div>
            </div>
            <div className="flex flex-row justify-end mt-20">
              <Button
                type="submit"
                buttonValue={t("Submit")}
                buttonStyle="px-14 py-2 w-full md:w-max"
              />
            </div>
          </CardMain>
        </form>
      </div>

      <div className=" w-full ">
        <CardMain width="w-full" heading={conditions?.title}>
          <div
            dangerouslySetInnerHTML={{ __html: conditions?.desc }}
            className="py-2  pb-20"
          ></div>
        </CardMain>
        {modelOpen ? (
          <Model setModelOpen={(e) => setModelOpen(e)} reset={() => reset()}>
            <div
              dangerouslySetInnerHTML={{ __html: activeData }}
              className="py-5 px-5 pb-20"
            ></div>
          </Model>
        ) : null}
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default withAuthorization(Aggrement, [ROLES.ADMIN, ROLES.CUSTOMER_CARE]);
function Model({ children, reset }) {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      className="bg-gray-200 bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
    >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
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

function Description({ heading, handleChange }) {
  return (
    <div className="flex flex-col w-full">
      <div className=" flex flex-row  ">
        <a className="text-sm text-gray-700 ">{heading}</a>
      </div>
      <div className="	w-full mt-2">
        <TextEditor handleChange={(e) => handleChange(e)} />
      </div>
    </div>
  );
}
