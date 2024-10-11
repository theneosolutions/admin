import React, { useEffect, useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import * as action from "Services/redux/reducer";
import { useDispatch, useSelector } from "react-redux";

function WriteOffModel({ setModelOpen, data }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);

  const [policyName, setPolicyName] = useState("");
  const [policyValue, setPolicyValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [period, setPeriod] = useState("");
  const [status, setStatus] = useState("");
  const [count, setCount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (formValid) {
      UpdatePolicy();
    }
  }

  function validatePolicyValue(e) {
    const inputVal = parseInt(e, 10);

    // Handle empty input case
    if (e.trim() === "") {
      setErrorMessage("This field is required.");
      setFormValid(false);
      return;
    }

    // Check if the data type requires numeric input and validate accordingly
    if (data?.policyDataType === "INTEGER" && isNaN(inputVal)) {
      setErrorMessage("Please enter a valid number.");
      setFormValid(false);
      return;
    }

    const referenceVal = parseInt(data?.policyReferenceValue, 10);
    if (
      (data?.policyName === "min_age" && inputVal < referenceVal) ||
      (data?.policyName === "max_age" && inputVal > referenceVal)
    ) {
      setErrorMessage(
        `Value must be ${
          data?.policyName === "min_age" ? "at least" : "no more than"
        } ${referenceVal}.`
      );
      setFormValid(false);
    } else {
      setErrorMessage("");
      setFormValid(true);
    }
  }

  function UpdatePolicy() {
    if (policyValue !== "" && user?.id && data?.id) {
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
      setCount(data?.policyValue);
    }
  }, [data]);

  function handleChange(e) {
    setCount(e);
    // validatePolicyValue(e);
  }

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
              data={periods}
              heading={t("Period")}
              type="select"
              value={t(period)}
              onChange={(e) => setPeriod(e)}
            />

            <Select
              data={StatusData}
              heading={t("Bucket")}
              type="select"
              value={t(status)}
              onChange={(e) => setStatus(e)}
            />
            <InputField
              type={"number"}
              heading={t("Counts")}
              value={count}
              onChange={(e) => handleChange(e.target.value)}
              errorMessage={errorMessage}
            />
          </div>
          <Button
            // type="submit"
            type="button"
            buttonValue={data ? t("Update") : t("Submit")}
            // buttonStyle={`px-20 py-2 w-full mt-14 mb-4 ${
            //   !formValid ? "opacity-50 cursor-not-allowed" : ""
            // }`}
            // disabled={!formValid}
            disabled={true}
            buttonStyle={`px-20 py-2 w-full mt-14 mb-4 opacity-50 cursor-not-allowed
              }`}
          />
        </div>
      </div>
    </form>
  );
}
function Select({ heading, value, onChange, data }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700 dark:text-white">{heading}</a>{" "}
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="dark:text-white border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full dark:bg-gray-800"
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

function InputField({
  heading,
  value,
  onChange,
  type,
  disabled,
  style,
  errorMessage,
}) {
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
      {errorMessage && (
        <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
      )}
    </div>
  );
}

export default WriteOffModel;

const periods = [
  {
    id: 1,
    name: 6,
  },
  {
    id: 2,
    name: 12,
  },
  {
    id: 3,
    name: 24,
  },
  {
    id: 4,
    name: "Latest",
  },
];
const StatusData = [
  {
    id: 1,
    name: "N",
  },
  {
    id: 2,
    name: "Q",
  },
  {
    id: 3,
    name: "0",
  },
  {
    id: 4,
    name: "1",
  },
  {
    id: 5,
    name: "2",
  },
  {
    id: 6,
    name: "3",
  },
  {
    id: 7,
    name: "4",
  },
  {
    id: 8,
    name: "5",
  },
  {
    id: 9,
    name: "6",
  },
  {
    id: 10,
    name: "W",
  },

  {
    id: 11,
    name: "F",
  },
  {
    id: 12,
    name: "C",
  },
  {
    id: 13,
    name: "M",
  },
  {
    id: 14,
    name: "D",
  },
  {
    id: 15,
    name: "V",
  },
  {
    id: 16,
    name: "R",
  },
];
