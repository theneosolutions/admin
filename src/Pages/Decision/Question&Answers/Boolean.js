import React, { useState } from "react";

export default Boolean;

function Boolean({ onAddElement, language }) {
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
    type: "boolean",
  };
  const [booleanBoxState, setBooleanBoxState] = useState(defaultState);

  function handleHeadingChange(e) {
    setBooleanBoxState((prevState) => ({
      ...prevState,
      heading: e.target.value,
    }));
  }
  function handleArabicHeadingChange(e) {
    setBooleanBoxState((prevState) => ({
      ...prevState,
      headingArabic: e.target.value,
    }));
  }
  function handleValue1Change(e) {
    const { value } = e.target;
    setBooleanBoxState((prevState) => ({
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
  function handleValue2Change(e) {
    const { value } = e.target;
    setBooleanBoxState((prevState) => ({
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
  function handleValue1ArabicChange(e) {
    const { value } = e.target;
    setBooleanBoxState((prevState) => ({
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
  function handleValue2ArabicChange(e) {
    const { value } = e.target;
    setBooleanBoxState((prevState) => ({
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

  function handleQuestionChange(e) {
    setBooleanBoxState((prevState) => ({
      ...prevState,
      question: e.target.value,
    }));
  }
  function handleArabicQuestionChange(e) {
    setBooleanBoxState((prevState) => ({
      ...prevState,
      questionArabic: e.target.value,
    }));
  }

  const options = Object.values(booleanBoxState.values).map(
    ({ optionArabic, optionEnglish }) => ({
      optionArabic,
      optionEnglish,
    })
  );
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    const temp = {
      questionArabic: booleanBoxState.questionArabic,
      question: booleanBoxState.question,
      type: booleanBoxState.type,
      options: options,
      heading: booleanBoxState.heading,
      headingArabic: booleanBoxState.headingArabic,
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
            className="mb-2 p-2 border rounded"
            placeholder="Main Heading"
            value={booleanBoxState.heading}
            onChange={handleHeadingChange}
            required // Makes this field required
          />
          <textarea
            className="mb-2 p-2 border rounded"
            placeholder="Write Your Question Here"
            value={booleanBoxState.question}
            onChange={handleQuestionChange}
            required // Makes this field required
          />
          <div className="flex flex-wrap py-4">
            <div className="flex flex-row">
              <input
                type="radio"
                className="mb-2 p-2 mx-2 border rounded "
                name="booleanOption"
              />
              <input
                type="text"
                className="mb-2 p-2 border rounded w-32"
                placeholder="option 1"
                value={booleanBoxState.values.value1.optionEnglish}
                onChange={handleValue1Change}
                required // Makes this field required
              />
            </div>
            <div className="flex flex-row">
              <input
                type="radio"
                className="mb-2 p-2 mx-2 border rounded "
                name="booleanOption"
              />
              <input
                type="text"
                className="mb-2 p-2 border rounded w-32"
                placeholder="option 2"
                value={booleanBoxState.values.value2.optionEnglish}
                onChange={handleValue2Change}
                required // Makes this field required
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <a className="pb-2 font-semibold ">عربي</a>
          <input
            type="text"
            className="mb-2 p-2 border rounded"
            placeholder="Main Heading"
            value={booleanBoxState.headingArabic}
            onChange={handleArabicHeadingChange}
            required // Makes this field required
          />
          <textarea
            className="mb-2 p-2 border rounded"
            placeholder="Write Your Question Here"
            value={booleanBoxState.questionArabic}
            onChange={handleArabicQuestionChange}
            required // Makes this field required
          />
          <div className="flex flex-wrap py-4">
            <div className="flex flex-row">
              <input
                type="radio"
                className="mb-2 p-2 mx-2 border rounded "
                name="booleanOption"
              />
              <input
                type="text"
                className="mb-2 p-2 border rounded w-32"
                placeholder="option 1"
                value={booleanBoxState.values.value1.optionArabic}
                onChange={handleValue1ArabicChange}
                required // Makes this field required
              />
            </div>
            <div className="flex flex-row">
              <input
                type="radio"
                className="mb-2 p-2 mx-2 border rounded "
                name="booleanOption"
              />
              <input
                type="text"
                className="mb-2 p-2 border rounded w-32"
                placeholder="option 2"
                value={booleanBoxState.values.value2.optionArabic}
                onChange={handleValue2ArabicChange}
                required // Makes this field required
              />
            </div>
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
