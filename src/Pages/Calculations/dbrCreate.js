import React from "react";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as action from "Services/redux/reducer";

function CreateUser({ setModelOpen }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    CreateNewUser();
  }
  const [bracketStart, setBracketStart] = useState("");
  const [bracketEnd, setBracketEnd] = useState("");
  const [level, setLevel] = useState("");
  const [gdbrWithout, setGdbrWithout] = useState("");
  const [dbr, setDbr] = useState("");
  const [gdbrInclude, setGdbrInclude] = useState("");

  function CreateNewUser() {
    if (
      bracketStart != "" &&
      bracketEnd != "" &&
      level != "" &&
      gdbrWithout != "" &&
      dbr != "" &&
      gdbrInclude != ""
    ) {
      dispatch({
        type: "Add_NEW_USER",
      });
    } else {
      dispatch(
        action.Message({
          message: "All Fields Required!",
          open: true,
          error: true,
        })
      );
    }
  }

  return (
    <form
      //   onSubmit={handleSubmit}
      className="items-center justify-center flex flex-col"
    >
      <div className=" bg-white rounded shadow-sm  rtl:space-x-reverse flex flex-col lg:flex-row   w-full lg:w-max lg:space-x-20 lg:px-20 px-4 py-5 ">
        <div className="flex flex-col ">
          <div className="flex flex-col w-full">
            <a className="text-sm text-gray-700">Income Bracket</a>
            <div className=" justify-between flex flex-row items-center border-gray-300 border rounded-md px-1.5 py-1.5 outline-none mt-2 w-full">
              <input
                type="number"
                value={bracketStart}
                onChange={(e) => setBracketStart(e.target.value)}
                className="bg-gray-100 rounded-md px-3 py-1 outline-none w-5/12	"
              />
              <a className="text-sm">TO</a>
              <input
                type="number"
                value={bracketEnd}
                onChange={(e) => setBracketEnd(e.target.value)}
                className="bg-gray-100 rounded-md px-3 py-1 outline-none w-5/12	"
              />
            </div>
          </div>
          <div className=" w-full  flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
            <div className=" md:w-1/2 w-full space-y-5">
              <InputField
                id="firstName"
                heading={t("Product Level")}
                value={level}
                onChange={(e) => setLevel(e)}
              />
              <InputField
                heading={t("Customer DBR")}
                value={dbr}
                onChange={(e) => setDbr(e)}
              />
            </div>
            <div className="md:w-1/2 w-full md:mt-0 mt-3 space-y-5">
              <InputField
                heading={t("GDBR (Without MTG)")}
                value={gdbrWithout}
                onChange={(e) => setGdbrWithout(e)}
              />
              <InputField
                heading={t("GDBR (Include MTG)")}
                value={gdbrInclude}
                onChange={(e) => setGdbrInclude(e)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end mt-10 mb-5 px-14">
            <Button
              type="submit"
              buttonValue={t("Submit")}
              buttonStyle="px-20 py-2 w-full "
            />
          </div>
        </div>
      </div>
    </form>
  );
}
export default CreateUser;

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      />
    </div>
  );
}
