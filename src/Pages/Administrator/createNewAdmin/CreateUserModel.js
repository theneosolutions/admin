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
    if (!validatePassword()) {
      console.log("errrororor", role);
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
    console.log("validate", role);
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
    setModel(false);
    setTimeout(() => getAllUsers(), 500);
  }

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
      <div className=" bg-white rounded shadow-sm  rtl:space-x-reverse flex flex-col lg:flex-row   w-full lg:w-max lg:space-x-20 lg:px-20 px-4 py-5 ">
        <div className="flex flex-col ">
          <div className=" w-full  flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
            <div className=" md:w-1/2 w-full space-y-5">
              <InputField
                id="firstName"
                heading={t("First Name")}
                value={firstName}
                onChange={(e) => setFirstName(e)}
              />
              <InputField
                heading={t("Email")}
                value={email}
                onChange={(e) => setEmail(e)}
              />
              {/* <InputField
                heading={t("ID number")}
                value={idNumber}
                onChange={(e) => setIdNumber(e)}
              /> */}
              <InputField
                type="number"
                heading={t("Mobile Number")}
                value={number}
                onChange={(e) => setNumber(e)}
              />
            </div>
            <div className="md:w-1/2 w-full md:mt-0 mt-3 space-y-5">
              <InputField
                heading={t("Last Name")}
                value={lastName}
                onChange={(e) => setLastName(e)}
              />
              <InputField
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
      <a className="text-sm text-gray-700">{heading}</a>{" "}
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
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
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <DatePicker
        selected={value}
        onChange={(date) => onChange(date)}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
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
