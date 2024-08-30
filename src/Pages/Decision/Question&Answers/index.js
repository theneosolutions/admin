import React, { useState, useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import withAuthorization from "constants/authorization";
import ViewQuestions from "./viewQuestions";
import TextBox from "./TextBox";
import Boolean from "./Boolean";
import IncreaseDecrease from "./IncreaseDecrease";
import Checboxes from "./checkBoxes";
import { CODE } from "constants/codes";
function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [newInfo, setNewInfo] = useState("none");
  const [language, setLanguage] = useState("ar");

  useEffect(() => {
    getAllQuestion();
  }, []);
  function getAllQuestion() {
    dispatch({
      type: "GET_ALL_QUESTIONS", // get all questions
    });
  }

  function handleAddElement(newElement) {
    setNewInfo("none");

    AddQuestion(newElement); // CALL ADD API ON EVERY FORM BUTTON
  }

  function AddQuestion(newElement) {
    let values;
    if (newElement.type === "textbox") {
      values = {
        field: newElement.values.value,
        heading: newElement.heading,
        headingArabic: newElement.headingArabic,
        question: newElement.question,
        questionArabic: newElement.questionArabic,
        type: newElement.type,
        languageCode: language,
      };
      dispatch({
        type: "ADD_QUESTION",
        payload: values,
      });
    }
    if (
      newElement.type === "boolean" ||
      newElement.type === "min&max" ||
      newElement.type === "Checkboxes"
    ) {
      dispatch({
        type: "ADD_QUESTION",
        payload: newElement,
      });
    } else {
    }

    setTimeout(() => getAllQuestion(), 500); // AFTER ADDING QUESTION TO DATABASE , GETTING NEW LIAST OF QUESTIONS
  }

  return (
    <div className="">
      <div className="flex flex-col md:flex-col w-full  rtl:space-x-reverse mt-6">
        <div className="space-y-4 w-full ">
          <CardMain heading={t("Add Question")} width="h-max">
            <select
              className="mb-4 p-2 border rounded mt-4 w-full"
              onChange={(e) => setNewInfo(e.target.value)}
              value={newInfo}
            >
              <option value="none">{t("None")}</option>
              <option value="TextBox">{t("TextBox")}</option>
              <option value="Boolean">{t("Boolean Value")}</option>
              <option value="CheckBoxes">{t("CheckBoxes")}</option>
              <option value="IncreaseDecrease">{t("Increase Decrease")}</option>
            </select>
          </CardMain>
          <CardMain heading={t("Add New Question")} width=" h-max">
            <div className="flex flex-row justify-between -mt-12">
              <div></div>
              <div>
                <select
                  className=" p-2 border rounded  w-32 "
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                >
                  <option value="ar">{t("AR")}</option>
                  <option value="en">{t("EN")}</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              {newInfo === "TextBox" ? (
                <TextBox onAddElement={handleAddElement} /> // HANDLE ALL FORM BUTTONS ON ADDELE
              ) : newInfo === "Boolean" ? (
                <Boolean onAddElement={handleAddElement} language={language} />
              ) : newInfo === "IncreaseDecrease" ? (
                <IncreaseDecrease
                  onAddElement={handleAddElement}
                  language={language}
                />
              ) : newInfo === "CheckBoxes" ? (
                <Checboxes
                  onAddElement={handleAddElement}
                  language={language}
                />
              ) : null}
            </div>
          </CardMain>
        </div>
        <ViewQuestions getAllQuestion={() => getAllQuestion()} />
      </div>
    </div>
  );
}
export default withAuthorization(App, CODE.QUESTIONS);
