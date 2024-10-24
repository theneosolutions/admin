import React, { useEffect, useState } from "react";
import CardMain from "../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { Model } from "../../Components";
import CreateFormula from "../../Pages/Decision/CreateFormula";
import { useNavigate, useLocation } from "react-router-dom";
import Edit from "../../Assets/Images/edit.svg";
import Delete from "../../Assets/Images/delete.svg";
import { useTranslation } from "react-i18next";
import Response from "./response";
import withAuthorization from "../../constants/authorization";
import { getLanguage } from "functions/getLanguage";

const CreateDesicion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [modelOpen, setModelOpen] = useState(false);
  const [setId, setSetId] = useState();
  const [checkedValues, setCheckedValues] = useState([]);
  const [singleQuestionId, setSingleQuestionId] = useState();

  const setData = useSelector((state) => state.getSingleSetData);
  const singleQuestion = useSelector((state) => state.getQuestionOfSet);
  const allSets = useSelector((state) => state.getAllSets);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const setid = queryParams.get("id");

  useEffect(() => {
    if (setid) {
      setSetId(setid);
      setSelectedSetData(setid);
    }
    getAllSets();
  }, []);

  function getAllSets() {
    dispatch({
      type: "GET_ALL_SETS",
    });
  }

  function getSingleQuestion(id) {
    setSingleQuestionId(id);
    dispatch({
      type: "GET_QUESTION_OF_SET", // get all questions
      payload: { id: id, setid: setId },
    });
  }

  async function addAnswersData() {
    const updatedResponse = checkedValues.map((item) => {
      return {
        answerEnglish: item.optionEn,
        answerArabic: item.optionAr,
      };
    });

    var obj = {
      answers: updatedResponse,
      id: setId,
      questionId: singleQuestionId,
    };
    await dispatch({
      type: "ADD_ANSWER_THE_QUESTION", // get all questions
      payload: obj,
    });
    setModelOpen(false);
    await setTimeout(() => setSelectedSetData(setId), 400);
  }

  function setSelectedSetData(id) {
    navigate(`/decisions/create-decision?id=${id}`);
    setSetId(id);
    dispatch({
      type: "GET_SINGLE_SET_DATA", // get all questions
      payload: { id: id, forUser: false },
    });
  }
  return (
    <>
      <CardMain heading={t("Create Decision")} width="h-max md:mt-0 mt-4">
        <select
          value={setId}
          className="mb-4 p-2 px-4 border rounded mt-4 w-full border-primary cursor-pointer"
          onChange={(e) => setSelectedSetData(e.target.value)}
        >
          {setId ? null : <option value="Select">{t("Select Set")}</option>}

          {allSets?.map((v, k) => {
            return (
              <option key={k} value={v.id}>
                {getLanguage() === "ar" ? v.nameAr : v.name}
              </option>
            );
          })}
        </select>

        {setId && (
          <>
            {setData?.Other_Question?.length > 0 && (
              <>
                <div
                  className="bg-primary w-full opacity-20 my-2"
                  style={{ height: 1 }}
                ></div>
                <div className="overflow-x-auto">
                  <table
                    className={`w-full text-sm text-gray-500 dark:text-gray-400 ${
                      getLanguage() === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                      <tr>
                        <th scope="col" className="px-2 py-3 cursor-pointer">
                          {t("Id")}
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer">
                          {t("Question")}
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer">
                          {t("Options")}
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer">
                          {t("Add Answers")}
                        </th>
                        <th scope="col" className="px-6 py-3 cursor-pointer">
                          {t("Action")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {setData?.Other_Question?.map((v, k) => (
                        <tr
                          key={k}
                          className="bg-white border-b dark:border-gray-200"
                        >
                          <td className="px-2 py-4">
                            {v?.eligibilityQuestions.id}
                          </td>
                          <td className="px-6 py-4">
                            {getLanguage() === "ar"
                              ? v?.eligibilityQuestions.questionAr
                              : v?.eligibilityQuestions.question}
                          </td>
                          <td className="px-6 py-4 flex flex-row space-x-4 rtl:space-x-reverse">
                            {v?.eligibilityQuestions?.options.map(
                              (option, index) => {
                                var isActive2;
                                if (getLanguage() === "ar") {
                                  isActive2 = v?.answer?.some(
                                    (answer) =>
                                      answer.answerArabic === option?.optionAr
                                  );
                                } else {
                                  isActive2 = v?.answer?.some(
                                    (answer) =>
                                      answer.answerEnglish === option?.optionEn
                                  );
                                }
                                const isActive = false;
                                return (
                                  <div
                                    key={index}
                                    className="flex flex-row space-x-2 items-center rtl:space-x-reverse"
                                  >
                                    <input
                                      type="radio"
                                      checked={isActive2}
                                      disabled={true}
                                      style={{ accentColor: "red" }}
                                      className={`h-4 w-4 ${
                                        isActive2
                                          ? " text-red-500 bg-red-500 border-green-400"
                                          : ""
                                      }`}
                                    />
                                    {getLanguage() === "ar" ? (
                                      <>{option?.optionAr}</>
                                    ) : (
                                      <>{option?.optionEn}</>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div
                              onClick={() => {
                                getSingleQuestion(v?.eligibilityQuestions?.id);
                                setModelOpen(true);
                                setCheckedValues([]);
                              }}
                              className="bg-gray-200 w-max py-2 px-5 hover:bg-gray-300 duration-300 rounded-md text-xs cursor-pointer text-sky-800"
                            >
                              {t("Add Answers")}
                            </div>
                          </td>
                          <th
                            scope="row"
                            className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                              <img src={Edit} className="h-6" alt="Edit" />
                              <img src={Delete} className="h-6" alt="Delete" />
                            </div>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </CardMain>
      {setId && (
        <>
          {setData?.Numeric_Question?.length > 0 && (
            <CreateFormula setId={setId} formula={setData?.Formula} />
          )}
        </>
      )}

      {setData?.Text_Question?.length > 0 && (
        <CardMain heading={"Text Question"} width="h-max mt-5 ">
          <>
            <div
              className="bg-primary w-full opacity-20 my-2"
              style={{ height: 1 }}
            ></div>
            <div className="overflow-x-auto">
              <table
                className={`w-full text-sm  text-gray-500 dark:text-gray-400 ${
                  getLanguage() === "ar" ? "text-right" : "text-left"
                }`}
              >
                <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                  <tr>
                    <th scope="col" className="px-2 py-3 cursor-pointer">
                      {t("Id")}
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer">
                      {t("Question")}
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer">
                      {t("Action")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {setData?.Text_Question?.map((v, k) => (
                    <tr
                      key={k}
                      className="bg-white border-b dark:border-gray-200"
                    >
                      <td className="px-2 py-4">{v?.id}</td>
                      <td className="px-6 py-4">
                        {getLanguage() === "ar"
                          ? v?.questionArabic
                          : v?.question}
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                          <img src={Edit} className="h-6" alt="Edit" />
                          <img src={Delete} className="h-6" alt="Delete" />
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        </CardMain>
      )}
      <Response setid={setid} />
      <Model
        heading={t("Add Answer to this Question")}
        isOpen={modelOpen}
        setState={() => setModelOpen(!modelOpen)}
        action1Value={t("Cancel")}
        action2Value={t("Add Answers")}
        action2={() => addAnswersData()}
        action1={() => setModelOpen(!modelOpen)}
      >
        <Checboxes
          checkedValues={checkedValues}
          setCheckedValues={(e) => setCheckedValues(e)}
          singleQuestion={singleQuestion}
        />
      </Model>
    </>
  );
};

export default withAuthorization(CreateDesicion);

function Checboxes({ singleQuestion, checkedValues, setCheckedValues }) {
  const { t } = useTranslation();

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add your logic here if needed
  };

  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked) {
      setCheckedValues((prevValues) => [...prevValues, value]);
    } else {
      setCheckedValues((prevValues) => prevValues.filter((v) => v !== value));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col ">
        <div className="flex flex-col ">
          <span>
            <a className="text-xl font-semibold text-sky-800 mt-2 underline">
              {singleQuestion?.question}
            </a>
          </span>

          <a className="text-lg mt-4 underline">{t("Options")}</a>
          {singleQuestion?.Option?.map((option, index) => {
            return (
              <div key={index} className="flex flex-row items-center mx-2">
                <div className="h-1 w-1 rounded-full bg-sky-800 p-1 mt-1"></div>
                <a className="py-1 text-sky-800 font-semibold pl-2 pr-2">
                  {getLanguage() === "ar" ? option.optionAr : option.optionEn}
                </a>
              </div>
            );
          })}
          <a className="text-lg mt-6 underline"> {t("Answers")}</a>
        </div>
        <>
          {singleQuestion?.Option?.map((option, index) => (
            <div
              key={index}
              className="flex flex-row space-x-3 rtl:space-x-reverse items-center py-2"
            >
              <input
                type="checkbox"
                className="h-4 w-4 border rounded mt-0.5"
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              />

              {getLanguage() === "ar" ? option.optionAr : option.optionEn}
            </div>
          ))}
        </>
      </div>
    </form>
  );
}
