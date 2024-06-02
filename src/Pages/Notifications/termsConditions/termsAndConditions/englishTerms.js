import React, { useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../textEditor";

function CreateUser() {
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
          title: "Terms And Conditions",
          desc: description,
          language: "en",
        },
      });

      // setTimeout(() => getTerms(), 1000);
    } else {
      alert("All Fields Required!");
    }
  }
  // function getTerms() {
  //   dispatch({
  //     type: "GET_ALL_TERMS",
  //   });
  // }
  // useEffect(() => {
  //   getTerms();
  // }, []);

  return (
    <div className=" flex flex-col space-y-5 ">
      <div className="md:mt-0 mt-5 bg-gray-200  w-full">
        <form onSubmit={handleSubmit}>
          <CardMain width="w-full" heading={t("Create Terms And Conditions")}>
            <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
              <div className=" w-full space-y-7">
                <Description
                  heading={t("Conditions")}
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
      </div>
    </div>
  );
}
export default CreateUser;

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
