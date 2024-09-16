import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function TextBox({ onAddElement }) {
  const { t } = useTranslation();

  const defaultState = {
    heading: "",
    headingArabic: "",
    question: "",
    questionArabic: "",
    values: { value: "text" },
    type: "textbox",
  };
  const [textBoxState, setTextBoxState] = useState(defaultState);

  function handleHeadingChange(e) {
    setTextBoxState((prevState) => ({
      ...prevState,
      heading: e.target.value,
    }));
  }
  function handleArabicHeadingChange(e) {
    setTextBoxState((prevState) => ({
      ...prevState,
      headingArabic: e.target.value,
    }));
  }
  function handleQuestionChange(e) {
    setTextBoxState((prevState) => ({
      ...prevState,
      question: e.target.value,
    }));
  }
  function handleArabicQuestionChange(e) {
    setTextBoxState((prevState) => ({
      ...prevState,
      questionArabic: e.target.value,
    }));
  }

  function handleValueChange(e) {
    setTextBoxState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, value: e.target.value },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    onAddElement(textBoxState);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-row space-x-10">
        <div className="flex flex-col w-1/2">
          <a className="pb-2 font-semibold ">English</a>
          <input
            type="text"
            className="mb-2 p-2 border rounded"
            placeholder="Main Heading"
            value={textBoxState.heading}
            onChange={handleHeadingChange}
            required // Makes this field required
          />
          <textarea
            className="mb-2 p-2 border rounded"
            placeholder="Write Your Question Here"
            value={textBoxState.question}
            onChange={handleQuestionChange}
            required // Makes this field required
          />

          <select
            className="mb-4 p-2 border rounded"
            onChange={handleValueChange}
            value={textBoxState.values.value}
            required // Makes this field required
          >
            <option value="text">text</option>
            <option value="numeric">numeric</option>
          </select>
        </div>
        <div className="flex flex-col w-1/2">
          <a className="pb-2 font-semibold ">عربي</a>

          <input
            type="text"
            className="mb-2 p-2 border rounded"
            placeholder="العنوان الرئيسي"
            value={textBoxState.headingArabic}
            onChange={handleArabicHeadingChange}
            required // Makes this field required
          />
          <textarea
            className="mb-2 p-2 border rounded"
            placeholder="اكتب سؤالك هنا"
            value={textBoxState.questionArabic}
            onChange={handleArabicQuestionChange}
            required // Makes this field required
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div></div>
        <button
          type="submit"
          className="px-5 w-max text-sm bg-sky-800 text-white rounded hover:bg-sky-700 h-10 mt-4"
        >
          {t("Add to form")}
        </button>
      </div>
    </form>
  );
}
export default TextBox;
