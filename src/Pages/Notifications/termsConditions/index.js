import React, { useEffect } from "react";
import CardMain from "../../../Components/Cards/main";
import { useState, useRef } from "react";
import { Button } from "Components";
import { RiImageAddLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import * as action from "Services/redux/reducer";
import TextEditor from "./textEditor";
function CreateUser() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const conditions = useSelector((state) => state.getTermsConditions);

  console.log("conditionsconditions", conditions);
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [activeData, setActiveData] = useState("");

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (subject != "" && description != "") {
      dispatch({
        type: "ADD_TERM_CONDITIONS",
        payload: {
          title: subject,
          desc: description,
        },
      });
    } else {
      alert("All Fields Required!");
    }
  }

  useEffect(() => {
    dispatch({
      type: "GET_ALL_TERMS",
    });
  }, []);
  function reset() {
    setModelOpen(false);
    console.log("reset");
  }
  console.log("activeDataactiveData", activeData);
  return (
    <div className=" flex flex-col space-y-5 ">
      <div className="md:mt-0 mt-5 bg-gray-200  w-full">
        <WaveAnimation show={loading} />
        <form onSubmit={handleSubmit}>
          <CardMain width="w-full" heading={"Create Terms And Conditions"}>
            <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
              <div className=" w-full space-y-7">
                <InputField
                  heading={t("Title")}
                  value={subject}
                  onChange={(e) => setSubject(e)}
                />
                <Description
                  heading={t("Content")}
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
        <CardMain width="w-full" heading={"All Agreements"}>
          {" "}
          <div className="overflow-x-auto relative  mt-4">
            <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-gray-100 font-normal">
                <tr>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("Title")}
                  </th>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("Action")}
                  </th>

                  {/* <th
                    scope="col"
                    className="px-3 py-3 cursor-pointer  sticky right-0 bg-white z-10"
                  >
                    {t("Edit/Delete")}
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {conditions?.map((v, k) => (
                  <tr
                    key={k}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-3 py-4">{v?.title}</td>
                    <td
                      className="px-3 py-4 text-sm text-blue-400 hover:underline cursor-pointer"
                      onClick={() => (
                        setModelOpen(true), setActiveData(v?.desc)
                      )}
                    >
                      Read More
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardMain>
        {modelOpen ? (
          <Model setModelOpen={(e) => setModelOpen(e)} reset={() => reset()}>
            {/* <User setModelOpen={(e) => setModelOpen(e)} /> */}
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
export default CreateUser;
function Model({ children, setModelOpen, reset }) {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      className="bg-gray-200 bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
    >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {/* {heading} */} Add User
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

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <div className=" flex flex-row  ">
        <a className="text-sm text-gray-700 ">{heading}</a>
      </div>
      <div className="	w-full">
        <input
          type={type || "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-primary border rounded-md px-3 py-1.5 outline-none mt-2 	w-full	"
        />
      </div>
    </div>
  );
}

function Description({ heading, value, onChange, type, handleChange }) {
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
