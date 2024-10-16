import React, { useEffect, useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import * as action from "Services/redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePolicyOther } from "Services/OtherApis";

function PublicNotice({ setModelOpen, data, viewMode }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [policyName, setPolicyName] = useState("");
  const [formValid, setFormValid] = useState(false); // Default to false initially
  const [period, setPeriod] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    validateForm();
  }, [period, status, amount]);

  function validateForm() {
    if (period && status && amount && !isNaN(amount) && amount > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formValid) {
      UpdatePolicy();
    }
  }

  function UpdatePolicy() {
    if (
      period !== "" &&
      status !== "" &&
      amount !== "" &&
      user?.id &&
      data?.id
    ) {
      const temp = {
        policyId: data?.id,
        userId: user?.id,
        data: {
          period,
          amount,
          status,
        },
      };
      UpdatePolicyOther(temp).then((res) =>
        res?.status === 200
          ? (setModelOpen(false),
            dispatch(
              action.Message({
                message: res?.data?.message,
                open: true,
                error: false,
              })
            ))
          : dispatch(
              action.Message({
                message: "Error",
                open: true,
                error: true,
              })
            )
      );
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
    if (data?.policyValue) {
      const temp = JSON.parse(data?.policyValue);
      console.log("temp", temp);
      setPolicyName(data?.policyName);
      setPeriod(temp?.period);
      setAmount(temp?.amount);
      setStatus(temp?.status);
    }
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center justify-center flex flex-col"
    >
      <div className="bg-white rounded shadow-sm rtl:space-x-reverse flex flex-col lg:flex-row w-full lg:w-max lg:px-6 px-4 py-5">
        <div className="md:w-80 flex flex-col">
          <div className="w-full space-y-5">
            <InputField
              disabled={true}
              heading={t("Policy Name")}
              value={t(policyName)}
              onChange={(e) => setPolicyName(e)}
              style="text-gray-500"
            />
            <Select
              disabled={viewMode}
              data={periods}
              heading={t("Period")}
              type="select"
              value={period}
              onChange={(e) => setPeriod(e)}
            />
            <InputField
              disabled={viewMode}
              type={"number"}
              heading={t("Amount")}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Select
              disabled={viewMode}
              data={StatusData}
              heading={t("Status")}
              type="select"
              value={status}
              onChange={(e) => setStatus(e)}
            />
          </div>
          {!viewMode && (
            <Button
              type="submit"
              buttonValue={data ? t("Update") : t("Submit")}
              buttonStyle={`px-20 py-2 w-full mt-14 mb-4 ${
                !formValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!formValid} // Disable button if form is not valid
            />
          )}
        </div>
      </div>
    </form>
  );
}

function Select({ heading, value, onChange, data, disabled }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700 dark:text-white">{heading}</a>{" "}
      <select
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="dark:text-white border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full dark:bg-gray-800"
      >
        {value === "" && <option value="">{t("Select")}</option>}
        {data.map((option, index) => (
          <option key={index} value={option.id}>
            {t(option.name)}
          </option>
        ))}
      </select>
    </div>
  );
}

function InputField({ heading, value, onChange, type, disabled, style }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>
      <input
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        className={`border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full ${style}`}
      />
    </div>
  );
}

export default PublicNotice;

const StatusData = [
  { id: "EXECUTED", name: "Executed" },
  { id: "NOT_EXECUTED", name: "Not Executed" },
  { id: "NOT_APPLICABLE", name: "Not Applicable" },
];
const periods = [
  {
    id: 3,
    name: "3 Months",
  },
  {
    id: 6,
    name: "6 Months",
  },
  {
    id: 12,
    name: "12 Months",
  },
  {
    id: 24,
    name: "24 Months",
  },
];
