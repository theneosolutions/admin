import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import * as action from "Services/redux/reducer";
import { useDispatch, useSelector } from "react-redux";

function CreateUser({ setModelOpen, data }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  function handleSubmit(e) {
    e.preventDefault();
    UpdatePolicy();
  }
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  console.log("userrrrr", user);
  const [policyName, setPolicyName] = useState("");
  const [policyValue, setPolicyValue] = useState("");

  function UpdatePolicy() {
    if (policyValue != "" && user?.id && data?.id) {
      var temp = {
        newValue: policyValue,
        policyId: data?.id,
        userId: user?.id,
      };
      dispatch({
        type: "UPDATE_POLICY",
        payload: temp,
      });
    } else {
      dispatch(
        action.Message({
          message: "All fields are required!",
          open: true,
          error: true,
        })
      );
    }
  }
  useEffect(() => {
    if (message === "Success" && error === false) {
      setModelOpen(false);
    }
  }, [message, error]);

  useEffect(() => {
    if (data) {
      setPolicyName(data?.policyName);
      setPolicyValue(data?.policyValue);
    }
  }, [data]);
  return (
    <form
      onSubmit={handleSubmit}
      className="items-center justify-center flex flex-col"
    >
      <div className=" bg-white rounded shadow-sm  rtl:space-x-reverse flex flex-col lg:flex-row   w-full lg:w-max  lg:px-6 px-4 py-5 ">
        <div className=" md:w-80 flex flex-col  ">
          <div className=" w-full space-y-5">
            <InputField
              disabled={true}
              heading={t("Policy Name")}
              value={policyName}
              onChange={(e) => setPolicyName(e)}
              style="text-gray-500"
            />
            <InputField
              heading={t("Policy Value")}
              value={policyValue}
              onChange={(e) => setPolicyValue(e)}
            />
          </div>
          <Button
            type="submit"
            buttonValue={data ? t("Update") : t("Submit")}
            buttonStyle="px-20 py-2 w-full mt-14 mb-4"
          />
        </div>
      </div>
    </form>
  );
}
export default CreateUser;

function InputField({ heading, value, onChange, type, disabled, style }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        disabled={disabled}
        // type={type || "number"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full ${style}`}
      />
    </div>
  );
}
