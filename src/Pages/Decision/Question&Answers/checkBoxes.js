import React, { useState, useEffect } from "react";

export default Checboxes;

function Checboxes({ onAddElement, language }) {
  const defaultOptions = [{ value: { optionArabic: "", optionEnglish: "" } }];
  const [options, setOptions] = useState(defaultOptions);
  const [heading, setHeading] = useState("");
  const [headingArabic, setHeadingArabic] = useState("");
  const [question, setQuestion] = useState("");
  const [questionArabic, setQuestionArabic] = useState("");

  const addOption = () => {
    setOptions([
      ...options,
      { value: { optionArabic: "", optionEnglish: "" } },
    ]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionValueChange = (index, e) => {
    const { value } = e.target;
    setOptions(
      options.map((option, i) =>
        i === index
          ? { ...option, value: { ...option.value, optionEnglish: value } }
          : option
      )
    );
  };
  const handleOptionArabicChange = (index, e) => {
    const { value } = e.target;
    setOptions(
      options.map((option, i) =>
        i === index
          ? { ...option, value: { ...option.value, optionArabic: value } }
          : option
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AddQuestionToDatabase();
  };

  const AddQuestionToDatabase = () => {
    onAddElement({
      heading,
      headingArabic,
      question,
      questionArabic,
      options: options.map(({ value }) => ({
        optionArabic: value.optionArabic,
        optionEnglish: value.optionEnglish,
      })),
      type: "Checkboxes",
      languageCode: language,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col py-4">
        <div className="flex flex-row space-x-10">
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              className="mb-2 p-2 border rounded"
              placeholder="Main Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
            />
            <input
              className="mb-2 p-2 border rounded"
              placeholder="Write Your Question Here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            {options.map((option, index) => (
              <div key={index} className="flex flex-row items-center">
                <input
                  type="text"
                  className="mb-2 p-2 border rounded w-32"
                  placeholder={`Option ${index + 1}`}
                  value={option.value.optionEnglish}
                  onChange={(e) => handleOptionValueChange(index, e)}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="mx-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              className="mb-2 p-2 border rounded"
              placeholder="Main Heading"
              value={headingArabic}
              onChange={(e) => setHeadingArabic(e.target.value)}
              required
            />
            <input
              className="mb-2 p-2 border rounded"
              placeholder="Write Your Question Here"
              value={questionArabic}
              onChange={(e) => setQuestionArabic(e.target.value)}
              required
            />
            {options.map((option, index) => (
              <div key={index} className="flex flex-row items-center">
                <input
                  type="text"
                  className="mb-2 p-2 border rounded w-32"
                  placeholder={`Option ${index + 1}`}
                  value={option.value.optionArabic}
                  onChange={(e) => handleOptionArabicChange(index, e)}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="mx-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between mt-2">
          <button
            type="button"
            onClick={addOption}
            className="px-4 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 h-10 "
          >
            Add More Option
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <div></div>
          <button
            type="submit"
            className="px-5 w-max text-sm bg-sky-800 text-white rounded hover:bg-sky-700 h-10 mt-4"
          >
            Add to form
          </button>
        </div>
      </div>
    </form>
  );
}
