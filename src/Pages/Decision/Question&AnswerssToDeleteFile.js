import React, { useState, useEffect } from "react";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import withAuthorization from "../../constants/authorization";
import { ROLES } from "../../constants/roles";
function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [newInfo, setNewInfo] = useState("none");
  const [language, setLanguage] = useState("ar");

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const questionsData = useSelector((state) => state.getAllQuestions);

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  useEffect(() => {
    getAllQuestion();
  }, []);
  function getAllQuestion() {
    dispatch({
      type: "GET_ALL_QUESTIONS", // get all questions
    });
  }

  function handleAddElement(newElement) {
    // setNewInfo("none");
    AddQuestion(newElement); // CALL ADD API ON EVERY FORM BUTTON
  }

  function AddQuestion(newElement) {
    let values;
    if (newElement.type === "textbox") {
      values = {
        field: newElement.values.value,
        heading: newElement.heading,
        headingArabic: newElement.headingArabic,
        question: newElement.question,
        questionArabic: newElement.questionArabic,
        type: newElement.type,
        languageCode: language,
      };
    } else {
      values = {
        question: newElement.question,
        type: newElement.type,
        options: Object.values(newElement.values),
        heading: newElement.heading,
        languageCode: language,
      };
    }

    console.log("hloeee", values);
    dispatch({
      type: "ADD_QUESTION",
      payload: values,
    });
    setTimeout(() => getAllQuestion(), 500); // AFTER ADDING QUESTION TO DATABASE , GETTING NEW LIAST OF QUESTIONS
  }

  const DeleteQuestion = (id) => {
    dispatch({
      type: "DELETE_QUESTION",
      id,
    });
    setTimeout(() => getAllQuestion(), 500); // AFTER ADDING QUESTION TO DATABASE , GETTING NEW LIAST OF QUESTIONS
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-col w-full  rtl:space-x-reverse mt-6">
        <div className="space-y-4 w-full ">
          <CardMain heading={t("Add Question")} width="h-max">
            <select
              className="mb-4 p-2 border rounded mt-4 w-full"
              onChange={(e) => setNewInfo(e.target.value)}
              value={newInfo}
            >
              <option value="none">{t("None")}</option>
              <option value="TextBox">{t("TextBox")}</option>
              <option value="Boolean">{t("Boolean Value")}</option>
              <option value="CheckBoxes">{t("CheckBoxes")}</option>
              <option value="IncreaseDecrease">{t("Increase Decrease")}</option>
            </select>
          </CardMain>
          <CardMain heading={t("Add New Question")} width=" h-max">
            <div className="flex flex-row justify-between -mt-12">
              <div></div>
              <div>
                <select
                  className=" p-2 border rounded  w-32 "
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                >
                  <option value="ar">{t("AR")}</option>
                  <option value="en">{t("EN")}</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              {newInfo === "TextBox" ? (
                <TextBox onAddElement={handleAddElement} /> // HANDLE ALL FORM BUTTONS ON ADDELE
              ) : newInfo === "Boolean" ? (
                <Boolean onAddElement={handleAddElement} />
              ) : newInfo === "IncreaseDecrease" ? (
                <IncreaseDecrease onAddElement={handleAddElement} />
              ) : newInfo === "CheckBoxes" ? (
                <Checboxes onAddElement={handleAddElement} />
              ) : null}
            </div>
          </CardMain>
        </div>
        <CardMain
          heading={t("Questions List")}
          width="w-full  h-max mt-4 md:mt-5"
        >
          <div className="w-full flex flex-col mt-3 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    {t("Heading")}
                  </th>
                  <th scope="col" className="px-2 py-3">
                    {t("Question")}
                  </th>
                  <th scope="col" className="px-2 py-3">
                    {t("Type")}
                  </th>
                  <th scope="col" className="px-2 py-3">
                    {t("Values")}
                  </th>
                  <th scope="col" className="px-2 py-3">
                    {t("Action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {questionsData?.map((v, k) => (
                  <tr
                    key={k}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-2 py-4">{v?.heading}</td>
                    <td className="px-2 py-4 overflow-wrap text-sky-700">
                      {v?.question}
                    </td>
                    <td className="px-2 py-4">{v?.type}</td>
                    <td className="px-2 py-4">{v?.options?.join(", ")}</td>
                    <td
                      className="px-2 py-4 text-2xl cursor-pointer text-gray-400 hover:text-red-400 duration-300"
                      onClick={() => DeleteQuestion(v?.id)}
                    >
                      <MdDelete />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardMain>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default withAuthorization(App, [
  ROLES.ADMIN,
  ROLES.UNDER_WRITER,
  ROLES.MODERATOR,
]);

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

    // console.log("data", textBoxState);
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
          Add to form
        </button>
      </div>
    </form>
  );
}

function Boolean({ onAddElement }) {
  const defaultState = {
    heading: "",
    question: "",
    values: { value1: "", value2: "" },
    type: "boolean",
  };
  const [booleanBoxState, setBooleanBoxState] = useState(defaultState);

  function handleHeadingChange(e) {
    setBooleanBoxState((prevState) => ({
      ...prevState,
      heading: e.target.value,
    }));
  }

  function handleValue1Change(e) {
    setBooleanBoxState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, value1: e.target.value },
    }));
  }

  function handleValue2Change(e) {
    setBooleanBoxState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, value2: e.target.value },
    }));
  }

  function handleQuestionChange(e) {
    setBooleanBoxState((prevState) => ({
      ...prevState,
      question: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    onAddElement(booleanBoxState);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
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
            value={booleanBoxState.values.value1}
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
            value={booleanBoxState.values.value2}
            onChange={handleValue2Change}
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
          Add to form
        </button>
      </div>
    </form>
  );
}

function Checboxes({ onAddElement }) {
  const defaultOptions = [{ value: "" }, { value: "" }];
  const [options, setOptions] = useState(defaultOptions);
  const [heading, setHeading] = useState("");
  const [question, setQuestion] = useState("");

  const addOption = () => {
    setOptions([...options, { value: "" }]);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionValueChange = (index, e) => {
    const value = e.target.value;
    setOptions(
      options.map((option, i) => {
        if (i === index) {
          return { ...option, value };
        }
        return option;
      })
    );
  };

  const resetState = () => {
    setHeading("");
    setQuestion("");
    setOptions(defaultOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AddQuestionToDatabase();
  };
  const AddQuestionToDatabase = () => {
    onAddElement({
      heading,
      question,
      values: options.map((obj) => obj.value),
      type: "Checkboxes",
    });
    resetState();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col py-4">
        <input
          type="text"
          className="mb-2 p-2 border rounded"
          placeholder="Main Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required // Makes this field required
        />
        <input
          className="mb-2 p-2 border rounded"
          placeholder="Write Your Question Here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required // Makes this field required
        />{" "}
        <>
          {options.map((option, index) => (
            <div key={index} className="flex flex-row items-center">
              <input
                type="text"
                className="mb-2 p-2 border rounded w-32"
                placeholder={`Option ${index + 1}`}
                value={option.value}
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
        </>
        <div className="flex flex-row justify-between mt-2">
          <button
            type="button"
            onClick={addOption}
            className="px-4 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 h-10   bg-sky-800 hover:bg-sky-700"
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

function IncreaseDecrease({ onAddElement }) {
  const defaultState = {
    heading: "",
    question: "",
    values: { value1: "", value2: "" },
    type: "min&max",
  };
  const [increaserBoxState, setIncreaserBoxState] = useState(defaultState);

  function handleHeadingChange(e) {
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      heading: e.target.value,
    }));
  }

  function handleQuestionChange(e) {
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      question: e.target.value,
    }));
  }

  function handleMinChange(e) {
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, value1: e.target.value },
    }));
  }

  function handleMaxChange(e) {
    setIncreaserBoxState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, value2: e.target.value },
    }));
  }
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    onAddElement(increaserBoxState);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
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
          value={increaserBoxState.values.value1}
          onChange={handleMinChange}
          required
        />
        <div className="w-52 h-1 rounded-full  bg-blue-300"></div>
        <input
          type="number"
          className="mb-2 p-2 border rounded w-32"
          placeholder="Max Value"
          value={increaserBoxState.values.value2}
          onChange={handleMaxChange}
          required
        />
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
    </form>
  );
}
