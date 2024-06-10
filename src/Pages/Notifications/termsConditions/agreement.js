import React, { useEffect } from "react";
import CardMain from "../../../Components/Cards/main";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "./textEditor";
import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";
import Model2 from "Components/Model2";

function Aggrement() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const conditions = useSelector((state) => state.getAgreement);

  const [description, setDescription] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [activeData, setActiveData] = useState("");

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
  return (
    <div className=" flex flex-col space-y-5 ">
      <div className="md:mt-0 mt-5 bg-gray-200  w-full">
        <form onSubmit={handleSubmit}>
          <CardMain width="w-full" heading={t("Create Agreement")}>
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
          <Model2 setModelOpen={(e) => setModelOpen(e)} reset={() => reset()}>
            <div
              dangerouslySetInnerHTML={{ __html: activeData }}
              className="py-5 px-5 pb-20"
            ></div>
          </Model2>
        ) : null}
      </div>
    </div>
  );
}

export default withAuthorization(Aggrement, [
  ROLES.ADMIN,
  ROLES.CUSTOMER_CARE,
  ROLES.UNDER_WRITER,
]);

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
