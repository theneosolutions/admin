import React, { useEffect } from "react";
import CardMain from "../../../Components/Cards/main";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import * as action from "Services/redux/reducer";
import TextEditor from "./textEditor";
function CreateUser() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);

  const [description, setDescription] = useState(null);
  const [subject, setSubject] = useState(null);
  const [type, setType] = useState("none");
  const [language, setLanguage] = useState("none");

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  function handleSubmit(e) {
    if (
      subject != "" &&
      description != "" &&
      type != "none" &&
      language !== "none"
    ) {
      dispatch({
        type: "CREATE_SMS",
        payload: {
          type: type,
          heading: subject,
          desc: description,
          languageCode: language,
        },
      });
    } else {
      alert("All Fields Required!");
    }
  }

  return (
    <div className="items-center flex flex-col ">
      <div className="md:mt-0 mt-5 bg-gray-200 xl:w-2/5 lg:w-1/2 md:w-full">
        <CardMain width="w-full" heading={t("Create SMS")}>
          <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
            <div className=" w-full space-y-7">
              <Select
                data={data}
                heading={t("Type")}
                type="select"
                options={t(type)}
                onChange={(e) => setType(e)}
              />
              <InputField
                heading={t("Heading")}
                value={subject}
                onChange={(e) => setSubject(e)}
              />
              <InputField
                heading={t("Description")}
                value={description}
                onChange={(e) => setDescription(e)}
              />

              <Select
                data={data1}
                heading={t("Language Code")}
                type="select"
                options={t(language)}
                onChange={(e) => setLanguage(e)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end mt-20">
            <Button
              onButtonClick={() => handleSubmit()}
              type="submit"
              buttonValue={t("Submit")}
              buttonStyle="px-14 py-2 w-full md:w-max"
            />
          </div>
        </CardMain>

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
    </div>
  );
}
export default CreateUser;

function Select({ heading, value, onChange, data }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>{" "}
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      >
        <option value={"none"}>{t("none")}</option>
        {data.map((option, index) => (
          <option key={index} value={option.value}>
            {t(option.name)}
          </option>
        ))}
      </select>
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
const data = [
  {
    value: "otp",
    name: "Otp",
  },
  {
    value: "text",
    name: "Text",
  },
];
const data1 = [
  {
    value: "ar",
    name: "AR",
  },
  {
    value: "en",
    name: "EN",
  },
];
