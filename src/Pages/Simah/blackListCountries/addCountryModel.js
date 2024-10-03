import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";

function CreateUser({ setModelOpen, data }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    addCountry();
  }

  const [country, setCountry] = useState("none");

  const [discription, setDiscription] = useState("");

  function addCountry() {
    if (discription === "" || country === "none") {
      dispatch(
        action.Message({
          message: "All fields are required!",
          open: true,
          error: true,
        })
      );
    } else {
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center justify-center flex flex-col"
    >
      <div className=" bg-white rounded shadow-sm  rtl:space-x-reverse flex flex-col lg:flex-row   w-full lg:w-max lg:space-x-20 lg:px-8 px-4 py-5 ">
        <div className="flex flex-col ">
          <div className="flex flex-row w-full space-x-8">
            <Select
              data={[{ id: 1, name: "helo" }]}
              heading={t("Choose Country")}
              type="select"
              value={t(country)}
              onChange={(e) => setCountry(e)}
            />
          </div>
          <div className="flex flex-row w-full space-x-8 mt-5">
            <InputField
              heading={t("Description")}
              value={discription}
              onChange={(e) => setDiscription(e)}
            />
          </div>

          <div className="flex flex-row justify-end mt-10 mb-5 px-14 w-full">
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
      <a className="text-sm text-gray-700 dark:text-gray-700">{heading}</a>

      <textarea
        required={true}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-20 max-h-44 border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-72 dark"
      />
    </div>
  );
}
function Select({ heading, value, onChange, data }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>{" "}
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className=" border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      >
        <option value={"none"}>{t("none")}</option>
        {data.map((option, index) => (
          <option key={index} value={option.id}>
            {t(option.name)}
          </option>
        ))}
      </select>
    </div>
  );
}
