import React from "react";
import CardMain from "Components/Cards/main";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../textEditor";
import "../editor.css"; // Import the CSS file for styling

function CreateUser({ getTerms }) {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const conditions = useSelector((state) => state.getTermsConditions);

  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (description != "") {
      dispatch({
        type: "ADD_TERM_CONDITIONS",
        payload: {
          title: "الأحكام والشروط",
          desc: description,
          language: "ar",
        },
      });
      setEdit(false);
      setTimeout(() => getTerms(), 700);
    } else {
      alert("All fields are required!");
    }
  }

  return (
    <div className=" flex flex-col space-y-5 ">
      <div className="md:mt-0 mt-5 bg-gray-200  w-full">
        {edit && (
          <form onSubmit={handleSubmit}>
            <CardMain width="w-full" heading={t("إنشاء الشروط والأحكام")}>
              <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
                <div className=" w-full space-y-7">
                  <Description
                    heading={t("شروط")}
                    handleChange={(e) => setDescription(e)}
                    value={description}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-end mt-20">
                <div className="flex flex-row space-x-4 rtl:space-x-reverse">
                  <Button
                    onButtonClick={() => setEdit(false)}
                    type="button"
                    buttonValue={t("Discard Changes")}
                    buttonStyle="px-14 py-2 w-full md:w-max"
                  />
                  <Button
                    type="submit"
                    buttonValue={t("Save Changes")}
                    buttonStyle="px-14 py-2 w-full md:w-max"
                  />
                </div>
              </div>
            </CardMain>
          </form>
        )}
      </div>
      {!edit && (
        <div className=" w-full ">
          <CardMain
            width="w-full"
            heading={conditions?.title}
            showButton
            buttonValue={t("Edit")}
            onButtonClick={() => (
              setDescription(conditions?.desc), setEdit(true)
            )}
          >
            <div
              dir="rtl"
              dangerouslySetInnerHTML={{ __html: conditions?.desc }}
              className="py-2  pb-20 rtl-editor custom-list"
            ></div>
          </CardMain>
        </div>
      )}
    </div>
  );
}
export default CreateUser;

function Description({ heading, handleChange, value }) {
  return (
    <div className="flex flex-col w-full">
      <div className=" flex flex-row  ">
        <a className="text-sm text-gray-700 ">{heading}</a>
      </div>
      <div className="	w-full mt-2">
        <TextEditor
          handleChange={(e) => handleChange(e)}
          lan="arabic"
          value={value}
        />
      </div>
    </div>
  );
}
