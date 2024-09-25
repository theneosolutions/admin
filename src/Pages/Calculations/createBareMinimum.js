import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import * as action from "Services/redux/reducer";
import { useDispatch, useSelector } from "react-redux";

function CreateUser({ setModelOpen, data }) {
  const dispatch = useDispatch();

  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);

  const { t } = useTranslation();
  const [value, setValue] = useState();
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (value != "" && title != "" && discription != "") {
      const temp = {
        description: discription,
        expense: title,
        expenseBareableAmount: parseFloat(value),
      };
      if (data) {
        const updatedTemp = {
          ...temp, // Clone the original object
          id: data?.id, // Add the new attribute
        };
        dispatch({
          type: "UPDATE_EXPENSE",
          payload: updatedTemp,
        });
        setTimeout(() => {
          setModelOpen(false);
        }, 700);
      } else {
        dispatch({
          type: "ADD_NEW_EXPENSE",
          payload: temp,
        });
        setTimeout(() => {
          setModelOpen(false);
        }, 700);
      }
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
      setValue(data?.expenseBareableAmount);
      setTitle(data?.expense);
      setDiscription(data?.description);
    }
  }, [data]);
  return (
    <form
      onSubmit={handleSubmit}
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

            <InputField2
              heading={t("Bare Minimum Value")}
              value={value}
              onChange={(e) => setValue(e)}
            />
            <InputField
              heading={t("Description")}
              value={discription}
              onChange={(e) => setDiscription(e)}
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
function InputField2({ heading, value, onChange, type }) {
  // Function to handle change and convert negative values to positive
  const handleChange = (e) => {
    let newValue = e.target.value;

    // Check if the input is not empty before applying Math.abs
    if (newValue !== "") {
      newValue = Math.abs(newValue); // Convert negative number to positive
    }

    // Call the onChange handler with the updated value
    onChange(newValue);
  };

  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        type={type || "number"}
        value={value}
        onChange={handleChange} // Attach the new handler
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      />
    </div>
  );
}
