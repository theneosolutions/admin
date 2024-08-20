import React, { useEffect } from "react";
import CardMain from "../../Components/Cards/main";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import withAuthorization from "constants/authorization";

function Awareness() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const messageTypes = useSelector(
    (state) => state.getNotificationHeadings || []
  );

  const [checked, setChecked] = useState(false);

  const [type, setType] = useState("");
  const [language, setLanguage] = useState("none");
  const [role, setRole] = useState("none");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    if (type != "" && language != "none") {
      dispatch({
        type: "SEND_NOTIFICATION_SMS",
        payload: { type, language, role, phone, message },
      });
    } else {
      alert("All fields are required!");
    }
  }

  useEffect(() => {
    dispatch({
      type: "GET_NOTIFICATIONS_HEADINGS",
    });
  }, []);

  return (
    <div className="items-center flex flex-col ">
      <div className="md:mt-0 mt-5 bg-gray-200  md:w-full">
        <CardMain width="w-full" heading={t("Create Notification")}>
          <div className="flex  flex-col  mt-5 rtl:space-x-reverse ">
            <div className="flex flex-row space-x-10">
              <Select
                data={messageTypes}
                heading={t("Messsage Type")}
                type="select"
                value={type}
                onChange={(e) => setType(e)}
              />
              <Select
                data={data1}
                heading={t("Language Code")}
                type="select"
                value={language}
                onChange={(e) => setLanguage(e)}
              />
            </div>
            <div className="flex flex-row space-x-10 w-full mt-7">
              <div className="w-1/2">
                <Select
                  disabled={checked}
                  data={data2}
                  heading={t("Role")}
                  type="select"
                  value={role}
                  onChange={(e) => setRole(e)}
                />
              </div>

              <div className="flex flex-row  w-1/2 space-x-8">
                {checked && (
                  <InputField
                    heading={t("Phone Number")}
                    value={phone}
                    onChange={(e) => setPhone(e)}
                  />
                )}

                <div className="flex flex-col w-32 ">
                  <a className="text-sm text-gray-700 ">Phone</a>
                  <input
                    type="checkbox"
                    className="h-5 w-5 mt-3"
                    value={checked}
                    onChange={() => (
                      setChecked(!checked), setRole("none"), setPhone("")
                    )}
                  />
                </div>
              </div>
            </div>
            <div className=" w-full space-y-7">
              <div className="flex flex-row justify-between items-center">
                <div className="w-1/2"></div>
              </div>

              <Description
                heading={t("Message")}
                handleChange={(e) => setMessage(e)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end mt-20">
            <Button
              onButtonClick={() => handleSubmit()}
              type="submit"
              buttonValue={t("Submit")}
              buttonStyle="px-14 py-2 w-full md:w-max"
            />
          </div>
        </CardMain>
      </div>
    </div>
  );
}
export default withAuthorization(Awareness, "awareness_messages");

function Select({ heading, value, onChange, data, disabled = false }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>{" "}
      <select
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      >
        <option value={"none"}>{t("none")}</option>
        {data.map((option, index) => (
          <option key={index} value={option}>
            {t(option)}
          </option>
        ))}
      </select>
    </div>
  );
}
function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <div className=" flex flex-row  ">
        <a className="text-sm text-gray-700 ">{heading}</a>
      </div>
      <div className="	w-full">
        <input
          type={type || "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 	w-full	"
        />
      </div>
    </div>
  );
}

function Description({ heading, handleChange }) {
  return (
    <div className="flex flex-col w-full">
      <div className=" flex flex-row  ">
        <a className="text-sm text-gray-700 ">{heading}</a>
      </div>
      <div className="	w-full mt-2">
        <textarea
          onChange={(e) => handleChange(e.target.value)}
          className="border-gray-300 border min-h-32 max-h-44 rounded-md px-3 py-1.5 outline-none mt-2 	w-full	"
        />
      </div>
    </div>
  );
}
const data2 = ["ROLE_USER"];

const data1 = ["en", "ar"];
