import React from "react";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as action from "Services/redux/reducer";

function CreateUser({ setModelOpen }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    if (value != "" && title != "") {
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
          <div className=" w-full  md:w-96  flex-col  mt-5 space-y-6">
            <InputField
              id="firstName"
              heading={t("Bare Minimum Title")}
              value={title}
              onChange={(e) => setTitle(e)}
            />

            <InputField
              heading={t("Bare Minimum Value")}
              value={value}
              onChange={(e) => setValue(e)}
            />
          </div>
          <div className="flex flex-row justify-end mt-10 mb-10 px-14">
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
