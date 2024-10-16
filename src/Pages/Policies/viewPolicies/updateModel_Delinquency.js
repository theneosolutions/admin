import React, { useEffect, useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { AiOutlineDelete } from "react-icons/ai";
import { UpdatePolicyOther } from "Services/OtherApis";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";

function DelinquencyModel({ setModelOpen, data, viewMode }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [policyName, setPolicyName] = useState("");
  const [rows, setRows] = useState([{ period: "", bucket: "", count: "" }]);
  const [formValid, setFormValid] = useState(false); // Track overall form validity
  const [errorMessages, setErrorMessages] = useState([]); // Track row-level error messages

  useEffect(() => {
    if (data?.policyValue) {
      const temp = JSON.parse(data?.policyValue);
      setPolicyName(data?.policyName);
      console.log("tempppp", temp);
      setRows(temp);
    }
  }, [data]);

  useEffect(() => {
    validateForm();
  }, [rows]);

  const handleAddRow = () => {
    if (rows.length < 6) {
      setRows([...rows, { period: "", bucket: "", count: "" }]);
    }
  };

  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, idx) => idx !== index);
    setRows(newRows);
  };

  const handleSelectChange = (index, field, value) => {
    const newRows = rows.map((row, idx) => {
      if (idx === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  function validateForm() {
    const errors = rows.map((row) => {
      let rowErrors = {};
      if (!row.period) rowErrors.period = "Period is required.";
      if (!row.bucket) rowErrors.bucket = "Bucket is required.";
      if (!row.count || isNaN(row.count) || row.count <= 0)
        rowErrors.count = "Valid count is required.";
      return rowErrors;
    });

    setErrorMessages(errors);
    const allFieldsValid = errors.every(
      (error) => Object.keys(error).length === 0
    );
    setFormValid(allFieldsValid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formValid) {
      UpdatePolicy();
    } else {
      dispatch(
        action.Message({
          message: "Please fill all fields correctly before submitting.",
          open: true,
          error: true,
        })
      );
    }
  }

  function UpdatePolicy() {
    if (user?.id && data?.id) {
      const temp = {
        policyId: data?.id,
        userId: user?.id,
        data: rows,
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

  const getAvailableBuckets = (currentIndex) => {
    const selectedBuckets = new Set(rows.map((row) => row.bucket));
    return StatusData.filter(
      (bucket) =>
        !selectedBuckets.has(bucket.name) ||
        bucket.name === rows[currentIndex].bucket
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col items-center justify-center  pb-6 ${
        viewMode ? "w-[700px]" : "w-[800px]"
      }`}
    >
      <div className="flex flex-col lg:flex-row w-full px-4 py-5 lg:px-6 space-y-5 rtl:space-x-reverse">
        <div className="w-full">
          <div className="flex flex-row justify-between">
            <InputField
              disabled={true}
              heading={t("Policy Name")}
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              style="text-gray-500 w-64"
            />
            {!viewMode && rows.length < 6 && (
              <div className="flex justify-between mt-7">
                <Button
                  type="button"
                  buttonValue={"Add New Bucket"}
                  onButtonClick={handleAddRow}
                  buttonStyle="py-1 px-0 w-40 h-min"
                  disabled={rows.length >= 6}
                />
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between space-x-4 mt-3">
            <div
              className={`${
                viewMode ? "w-full" : "w-11/12"
              } flex flex-row justify-between  space-x-6`}
            >
              <div className={`items-start  ${viewMode ? "w-1/3" : "w-1/3"}`}>
                <a>Period</a>
              </div>
              <div className={`items-start  ${viewMode ? "w-1/3" : "w-1/3"}`}>
                <a>Bucket</a>
              </div>
              <div className={`items-start  ${viewMode ? "w-1/3" : "w-1/3"}`}>
                <a>Count</a>
              </div>
            </div>
            {viewMode ? (
              ""
            ) : (
              <div className="items-start w-1/12 ">
                <a>Action</a>
              </div>
            )}
          </div>
          {rows.map((row, index) => (
            <div key={index} className="flex flex-row space-x-4 items-end">
              {console.log("rowwwwwwwww", row)}
              <div
                className={`  ${
                  viewMode ? "w-full" : "w-11/12"
                } flex flex-row justify-between  space-x-6`}
              >
                <Select
                  style={viewMode ? "w-1/3" : "w-1/3"}
                  disabled={viewMode}
                  data={periods}
                  value={row.period}
                  onChange={(value) =>
                    handleSelectChange(index, "period", value)
                  }
                  errorMessage={errorMessages[index]?.period}
                />

                <Select
                  style={viewMode ? "w-1/3" : "w-1/3"}
                  disabled={viewMode}
                  data={getAvailableBuckets(index)}
                  value={row.bucket}
                  onChange={(value) =>
                    handleSelectChange(index, "bucket", value)
                  }
                  errorMessage={errorMessages[index]?.bucket}
                />

                <InputField
                  style={viewMode ? "w-1/3" : "w-1/3"}
                  disabled={viewMode}
                  type="number"
                  value={row.count}
                  onChange={(e) =>
                    handleSelectChange(index, "count", e.target.value)
                  }
                  errorMessage={errorMessages[index]?.count}
                />
              </div>

              {viewMode ? (
                ""
              ) : (
                <>
                  {rows.length > 0 && (
                    <div className="w-1/12 items-center justify-center  pb-5">
                      <AiOutlineDelete
                        onClick={() =>
                          rows.length === 1 || viewMode
                            ? ""
                            : handleRemoveRow(index)
                        }
                        className={`text-2xl mb-1.5 ${
                          !viewMode && rows.length !== 1
                            ? "text-red-400 hover:text-red-600 hover:text-3xl cursor-pointer duration-300"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {!viewMode && (
            <div className="flex w-full items-center justify-center">
              {" "}
              <Button
                type="submit"
                buttonValue={data ? t("Update") : t("Submit")}
                buttonStyle={`mt-6 mb-4 w-80 px-20 py-2 ${
                  !formValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!formValid} // Disable button if form is not valid
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default DelinquencyModel;

function Select({
  heading,
  value,
  onChange,
  data,
  errorMessage,
  disabled,
  style,
}) {
  const { t } = useTranslation();
  console.log("period", value);
  return (
    <div className={`flex flex-col ${style}`}>
      <label className="text-sm text-gray-700 dark:text-white">
        {t(heading)}
      </label>
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
      <div className="h-5">
        {errorMessage && (
          <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
        )}
      </div>
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
    <div className={`flex flex-col ${style}`}>
      <a className="text-sm text-gray-700">{heading}</a>
      <input
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      />
      <div className="h-5">
        {errorMessage && (
          <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}

const periods = [
  {
    id: "3",
    name: "3 Months",
  },
  {
    id: "6",
    name: "6 Months",
  },
  {
    id: "12",
    name: "12 Months",
  },
  {
    id: "24",
    name: "24 Months",
  },
  {
    id: "0",
    name: "Latest",
  },
];

const StatusData = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
];
