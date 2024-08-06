import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

function CreateAddSMS({ setModelOpen, selectedData }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [description, setDescription] = useState(null);
  const [subject, setSubject] = useState(null);
  const [type, setType] = useState("none");
  const [language, setLanguage] = useState("none");

  function handleSubmit(e) {
    if (
      subject != "" &&
      description != "" &&
      type != "none" &&
      language !== "none"
    ) {
      if (selectedData) {
        dispatch({
          type: "CREATE_SMS",
          payload: {
            type: type,
            heading: subject,
            desc: description,
            languageCode: language,
            smsId: selectedData?.smsId,
          },
        });
      } else {
        dispatch({
          type: "CREATE_SMS",
          payload: {
            type: type,
            heading: subject,
            desc: description,
            languageCode: language,
          },
        });
      }

      setTimeout(() => setModelOpen(false), 500);
    } else {
      alert("All Fields Required!");
    }
  }

  useEffect(() => {
    if (selectedData) {
      setLanguage(selectedData?.languageCode);
      setType(selectedData?.type);
      setSubject(selectedData?.heading);
      setDescription(selectedData?.description);
    }
  }, [selectedData]);
  return (
    <div className=" bg-white rounded shadow-sm  rtl:space-x-reverse flex flex-col lg:flex-col   w-full   px-4 py-5 lg:px-6 ">
      <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
        <div className=" w-full space-y-7">
          <Select
            data={data}
            heading={t("Type")}
            type="select"
            options={t(type)}
            value={type}
            onChange={(e) => setType(e)}
          />
          <InputField
            heading={t("Heading")}
            value={subject}
            onChange={(e) => setSubject(e)}
          />
          <InputField
            heading={t("Description")}
            value={description}
            onChange={(e) => setDescription(e)}
          />

          <Select
            data={data1}
            heading={t("Language Code")}
            type="select"
            options={t(language)}
            value={language}
            onChange={(e) => setLanguage(e)}
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
    </div>
  );
}
export default CreateAddSMS;

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
          <option key={index} value={option.value}>
            {t(option.name)}
          </option>
        ))}
      </select>
    </div>
  );
}
function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full lg:w-96">
      <div className=" flex flex-row  ">
        <a className="text-sm text-gray-700 ">{heading}</a>
      </div>
      <div className="	w-full">
        <input
          type={type || "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-primary border rounded-md px-3 py-1.5 outline-none mt-2 	w-full	"
        />
      </div>
    </div>
  );
}
const data = [
  {
    value: "OTP",
    name: "Otp",
  },
  {
    value: "SMS",
    name: "Text",
  },
];
const data1 = [
  {
    value: "ar",
    name: "AR",
  },
  {
    value: "en",
    name: "EN",
  },
];
