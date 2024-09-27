import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "Components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";

function CreateUserModel({ getAllUsers, setModel }) {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);
  const open = useSelector((state) => state.open);
  const message = useSelector((state) => state.message);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(new Date());
  const [role, setRole] = useState("none");

  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();

    CreateNewUser();
  }

  const getAllRolesData = useSelector((state) => state.getAllRoles);

  const encodePassword = (e) => {
    const combined = e + "@Zayk!@3AfO0$*^qC";
    const encoded = btoa(combined);
    return encoded;
  };
  function CreateNewUser() {
    if (!firstName || !lastName || !email || !username || !number || !date) {
      return dispatch(
        action.Message({
          message: "All fields are required!",
          open: true,
          error: true,
        })
      );
    }
    console.log(number, number.length);
    if (number.length !== 9) {
      return dispatch(
        action.Message({
          message: "Invalid Mobile Number",
          open: true,
          error: true,
        })
      );
    }
    if (!validatePassword()) {
      return dispatch(
        action.Message({
          message: "Password does not meet requirements ",
          open: true,
          error: true,
        })
      );
    }

    if (role === "none") {
      return dispatch(
        action.Message({
          message: "Please Select Role",
          open: true,
          error: true,
        })
      );
    }

    dispatch({
      type: "Add_NEW_USER",
      payload: {
        lastName: lastName,
        firstName: firstName,
        username: username,
        mobileNumber: number,
        idNumber: username,
        email: email,
        role: [role],
        password: encodePassword(password),
        dateOfBirth: date,
      },
    });
  }
  useEffect(() => {
    if (error && message != "" && open) {
      // setModel(false);
      // setTimeout(() => getAllUsers(), 500);
    } else if (!error && message && open) {
      setModel(false);
      setTimeout(() => getAllUsers(), 500);
    }
  }, [error, message, open]);

  const validatePassword = () => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    ) {
      return true;
    } else {
      return false;
    }
  };
  function getAllRoles() {
    dispatch({
      type: "GET_ALL_ROLES",
    });
  }
  useEffect(() => {
    getAllRoles();
  }, []);
  // useEffect(() => {
  //   if (getAllRolesData?.length > 0) {
  //     setRole(getAllRolesData[0]?.id);
  //   }
  // }, [getAllRolesData]);
  return (
    <form
      onSubmit={handleSubmit}
      className="items-center justify-center flex flex-col"
    >
      <div className="dark:bg-gray-800 bg-white rounded shadow-sm  rtl:space-x-reverse flex flex-col lg:flex-row   w-full lg:w-max lg:space-x-20 lg:px-10 px-4 py-5 ">
        <div className="flex flex-col ">
          <div className="  w-full space-x-5  flex flex-row">
            <InputField
              style="w-1/2"
              id="firstName"
              heading={t("First Name")}
              value={firstName}
              onChange={(e) => setFirstName(e)}
            />

            <InputField
              style="w-1/2"
              heading={t("Last Name")}
              value={lastName}
              onChange={(e) => setLastName(e)}
            />
          </div>
          <div className="  w-full space-x-5 flex flex-row mt-5">
            <InputField
              style="w-1/2"
              type={"email"}
              heading={t("Email")}
              value={email}
              onChange={(e) => setEmail(e)}
            />
            <InputFieldMobile
              style="w-1/2"
              type="number"
              heading={t("Mobile Number")}
              value={number}
              onChange={(e) => setNumber(e)}
            />
          </div>
          <div className="  w-full space-x-5  flex flex-row mt-5">
            <InputField
              style="w-1/2"
              heading={t("User Name")}
              value={username}
              onChange={(e) => setUserName(e)}
            />
            <Calender
              type="calendar"
              heading={t("DOB")}
              value={date}
              onChange={(e) => setDate(e)}
            />
          </div>

          <div className="mt-3">
            <Select
              data={getAllRolesData.filter((item) => item.name != "User")}
              heading={t("Choose Role")}
              type="select"
              value={t(role)}
              onChange={(e) => setRole(e)}
            />
            <div className="mt-3"></div>
            <InputField
              heading={t("Password")}
              value={password}
              onChange={(e) => setPassword(e)}
            />
          </div>

          <div className="flex flex-row justify-end mt-10 px-14">
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
export default CreateUserModel;

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

function Calender({ heading, value, onChange }) {
  return (
    <div className="flex flex-col w-1/2">
      <a className="text-sm text-gray-700 dark:text-white">{heading}</a>

      <DatePicker
        selected={value}
        onChange={(date) => onChange(date)}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full dark:bg-gray-800 dark:text-white"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select" // Can be "scroll" or "select"
        maxDate={new Date()} // Set maximum selectable date to today
        yearDropdownItemNumber={100} // Number of years to display in the dropdown
        scrollableYearDropdown
      />
    </div>
  );
}

function InputField({ heading, value, onChange, type, style }) {
  return (
    <div className={`flex flex-col ${style} `}>
      <a className="text-sm  text-gray-700 dark:text-white">{heading}</a>

      <input
        required={true}
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="dark:bg-gray-800  dark:text-white  dark:placeholder:text-white border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      />
    </div>
  );
}

function InputFieldMobile({ heading, value, style, onChange, type }) {
  const validateMobileNumber = (input) => {
    const sanitizedValue = input.replace(/\D/g, ""); // Remove non-numeric characters
    if (sanitizedValue.length <= 9) {
      onChange(sanitizedValue); // Allow only up to 9 digits
    } else {
      onChange(sanitizedValue.slice(0, 9)); // Restrict to 9 digits
    }
  };

  return (
    <div className={`flex flex-col ${style}`}>
      <label className="text-sm text-gray-700 dark:text-white">{heading}</label>

      <div className="flex flex-row dark:bg-gray-800 dark:text-white dark:placeholder:text-white border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full">
        <span className="text-gray-600">966</span>
        <input
          minLength="9"
          required={true}
          type={type || "text"}
          value={value}
          onChange={(e) => validateMobileNumber(e.target.value)}
          className="px-1 outline-none w-28"
          pattern="\d{9}" // Require exactly 9 digits after the prefix
          title="Please enter exactly 9 digits after 966"
        />
      </div>
    </div>
  );
}
