import React, { useState } from "react";
import { useTranslation } from "react-i18next";
export default IncreaseDecrease;

function IncreaseDecrease({ onAddElement, language }) {
  const { t } = useTranslation();
  const defaultState = {
    heading: "",
    headingArabic: "",
    question: "",
    questionArabic: "",
    values: {
      value1: { optionArabic: "", optionEnglish: "" },
      value2: {
        optionArabic: "",
        optionEnglish: "",
      },
    },
    type: "min&max",
  };
  const [increaserBoxState, setIncreaserBoxState] = useState(defaultState);

  function handleHeadingChange(e) {
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      heading: e.target.value,
    }));
  }

  function handleHeadingArabicChange(e) {
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      headingArabic: e.target.value,
    }));
  }

  function handleQuestionArabicChange(e) {
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      questionArabic: e.target.value,
    }));
  }

  function handleQuestionChange(e) {
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      question: e.target.value,
    }));
  }
  function handleChangeValue1(e) {
    const { value } = e.target;
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        value1: {
          ...prevState.values.value1,
          optionEnglish: value,
        },
      },
    }));
  }
  function handleChangeValue2(e) {
    const { value } = e.target;
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        value2: {
          ...prevState.values.value2,
          optionEnglish: value,
        },
      },
    }));
  }

  function handleChangeValue1Arabic(e) {
    const { value } = e.target;
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        value1: {
          ...prevState.values.value1,
          optionArabic: value,
        },
      },
    }));
  }
  function handleChangeValue2Arabic(e) {
    const { value } = e.target;
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        value2: {
          ...prevState.values.value2,
          optionArabic: value,
        },
      },
    }));
  }

  const options = Object.values(increaserBoxState.values).map(
    ({ optionArabic, optionEnglish }) => ({
      optionArabic,
      optionEnglish,
    })
  );
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    const temp = {
      questionArabic: increaserBoxState.questionArabic,
      question: increaserBoxState.question,
      type: increaserBoxState.type,
      options: options,
      heading: increaserBoxState.heading,
      headingArabic: increaserBoxState.headingArabic,
      languageCode: language,
    };

    onAddElement(temp);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-row space-x-10">
        <div className="flex flex-col w-1/2">
          <a className="pb-2 font-semibold ">English</a>
          <input
            type="text"
            className="mb-2 p-2 border rounded "
            placeholder="Main Heading"
            value={increaserBoxState.heading}
            required
            onChange={handleHeadingChange}
          />
          <textarea
            className="mb-2 p-2 border rounded"
            placeholder="Ask Your Question Here"
            required
            value={increaserBoxState.question}
            onChange={handleQuestionChange}
          />
          <div className="flex flex-row justify-between items-center">
            <input
              type="number"
              className="mb-2 p-2 border rounded w-32"
              placeholder="Min Value "
              value={increaserBoxState.values.value1.optionEnglish}
              onChange={handleChangeValue1}
              required
            />
            <div className="w-52 h-1 rounded-full  bg-blue-300"></div>
            <input
              type="number"
              className="mb-2 p-2 border rounded w-32"
              placeholder="Max Value"
              value={increaserBoxState.values.value2.optionEnglish}
              onChange={handleChangeValue2}
              required
            />
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <a className="pb-2 font-semibold ">عربي</a>
          <input
            type="text"
            className="mb-2 p-2 border rounded "
            placeholder="Main Heading"
            value={increaserBoxState.headingArabic}
            required
            onChange={handleHeadingArabicChange}
          />
          <textarea
            className="mb-2 p-2 border rounded"
            placeholder="Ask Your Question Here"
            required
            value={increaserBoxState.questionArabic}
            onChange={handleQuestionArabicChange}
          />
          <div className="flex flex-row justify-between items-center">
            <input
              type="number"
              className="mb-2 p-2 border rounded w-32"
              placeholder="Min Value "
              value={increaserBoxState.values.value1.optionArabic}
              onChange={handleChangeValue1Arabic}
              required
            />
            <div className="w-52 h-1 rounded-full  bg-blue-300"></div>
            <input
              type="number"
              className="mb-2 p-2 border rounded w-32"
              placeholder="Max Value"
              value={increaserBoxState.values.value2.optionArabic}
              onChange={handleChangeValue2Arabic}
              required
            />
          </div>
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
