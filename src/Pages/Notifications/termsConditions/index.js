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
import Model2 from "Components/Model2";
import EnglishTerms from "./termsAndConditions/englishTerms";
import ArabicTerms from "./termsAndConditions/arabicTerms";

function CreateUser() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const conditions = useSelector((state) => state.getTermsConditions);

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
        type: "ADD_TERM_CONDITIONS",
        payload: {
          title: "Terms And Conditions",
          desc: description,
        },
      });

      setTimeout(() => getTerms(), 1000);
    } else {
      alert("All Fields Required!");
    }
  }
  function getTerms() {
    dispatch({
      type: "GET_ALL_TERMS",
    });
  }
  useEffect(() => {
    getTerms();
  }, []);
  function reset() {
    setModelOpen(false);
  }
  const [language, setLanguage] = useState("ar");

  return (
    <div className=" flex flex-col space-y-5 ">
      <div className="">
        <select
          className=" p-2 border rounded  w-32 bg-white"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value="ar">{t("AR")}</option>
          <option value="en">{t("EN")}</option>
        </select>
      </div>
      {language === "ar" ? <ArabicTerms /> : <EnglishTerms />}

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
export default withAuthorization(CreateUser, [
  ROLES.ADMIN,
  ROLES.CUSTOMER_CARE,
]);
