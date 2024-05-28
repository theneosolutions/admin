import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CheckQuestionStatusInScreen } from "Services/OtherApis";
import { MdDeleteOutline } from "react-icons/md";
import { getLanguage } from "functions/getLanguage";
import Model2 from "Components/Model2";

function CreateQuestionsSet() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [modelOpen, setModelOpen] = useState(false);
  const [currentObject, setCurrentObject] = useState({});
  const [currentId, setCurrentId] = useState("");
  const [selectedIds, setSelectedIds] = useState([]); // State to hold selected checkbox IDs
  const [selectedData, setSelectedData] = useState([]); // State to hold selected checkbox IDs
  const [married, setMarried] = useState(false);
  const [name, setName] = useState("");
  const [arabicName, setArabicName] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    GetSingleSetData();
  }, []);

  const handleCheckboxChange = (id, object) => {
    dispatch(action.Loading({ Loading: true }));

    let temp = selectedIds.find((item) => item?.questionId === id);

    if (temp) {
      dispatch(action.Loading({ Loading: false }));

      return alert("Question Already Exist In List");
    }

    CheckQuestionStatusInScreen(id).then((response) => {
      if (response?.message === "No Record found") {
        setCurrentObject(object);
        setCurrentId(id);
        setModelOpen(true);
        dispatch(action.Loading({ Loading: false }));
      } else {
        dispatch(action.Loading({ Loading: false }));

        alert("Question Already Exist In Screens");
      }
    });
  };
  function AddQuestionToArray() {
    console.log(currentId, currentObject);
    setModelOpen(false);
    setSelectedIds([
      ...selectedIds,
      { married: married, questionId: currentId },
    ]);
    if (currentObject?.eligibilityQuestions) {
      setSelectedData([...selectedData, currentObject?.eligibilityQuestions]);
    } else {
      setSelectedData([...selectedData, currentObject]);
    }
    setCurrentId("");
    setCurrentObject({});
    setMarried(false);
  }
  function GetSingleSetData() {
    dispatch({
      type: "GET_SINGLE_SET_DATA",
      payload: { id: id, forUser: false },
    });
  }
  const setData = useSelector((state) => state.getSingleSetData);

  var temp = [];
  if (
    setData.Numeric_Question &&
    typeof setData.Numeric_Question[Symbol.iterator] === "function"
  ) {
    temp = [
      ...setData.Numeric_Question,
      ...setData.Other_Question,
      ...setData.Text_Question,
      ...setData.min_max_question,
    ];
  } else {
  }

  function CreateScreen() {
    if (!name) {
      return alert("Please Add Screen Name");
    }
    dispatch({
      type: "CREATE_SCREEN",
      payload: { selectedIds, name, id, arabicName },
    });
    setSelectedData([]);
    setSelectedIds([]);
  }
  function onDelete(id) {
    const temp = selectedData.filter((item) => item?.id != id);
    const temp2 = selectedIds.filter((item) => item != id);

    setSelectedIds(temp2);
    setSelectedData(temp);
  }
  function DeleteSet() {
    dispatch({
      type: "DELETE_SET",
      payload: id,
    });
    setTimeout(() => navigate("/decisions/create-set", 500));
  }
  function reset() {
    setModelOpen(false);
  }

  return (
    <div className="">
      <div className="flex flex-row w-full justify-end space-x-3">
        <div
          onClick={() => DeleteSet()}
          className="bg-red-400 px-7 py-1 rounded-md cursor-pointer hover:bg-red-500 duration-300 w-max text-white"
        >
          {t("Delete Set")}
        </div>
        {/* <div className="bg-red-400 px-7 py-2 rounded-md cursor-pointer hover:bg-red-500 duration-300 w-max text-white">
          Delete Set
        </div> */}
      </div>
      <div className="mt-6 flex flex-col md:flex-row md:space-x-3 rtl:space-x-reverse h-max">
        <CardMain
          heading={t("All List Of Questions in this set")}
          width="md:w-3/5 w-full h-min "
          showButton={true}
          buttonValue={t("View All Screens")}
          onButtonClick={() => navigate(`/view-screen?id=${id}`)} // Attach click handler
        >
          <div className="w-full flex flex-col mt-3 overflow-x-auto">
            <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                <tr>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("heading")}
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
                {temp.map((v, k) => {
                  return (
                    <tr
                      key={k}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-3 py-4 cursor-pointer text-primary">
                        {getLanguage() === "ar" ? (
                          <>
                            {v.headingArabic ||
                              v.headingAr ||
                              v.eligibilityQuestions?.questionArabic ||
                              v.eligibilityQuestions?.questionAr}
                          </>
                        ) : (
                          <> {v.heading || v.eligibilityQuestions?.heading}</>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {getLanguage() === "ar" ? (
                          <>
                            {v.questionArabic ||
                              v.questionAr ||
                              v.eligibilityQuestions?.questionArabic ||
                              v.eligibilityQuestions?.questionAr}
                          </>
                        ) : (
                          <> {v.question || v.eligibilityQuestions?.question}</>
                        )}
                      </td>
                      <td className="px-6 py-2">
                        <button
                          onClick={() =>
                            handleCheckboxChange(
                              v.id || v.eligibilityQuestions?.id,
                              v
                            )
                          }
                          className="w-max px-10 text-sm bg-sky-800 text-white rounded hover:bg-sky-700 h-10"
                        >
                          {t("Add")}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardMain>
        {selectedData.length > 0 && (
          <CardMain
            heading={t("Create Screen")}
            width="md:w-2/5 md:mt-0 mt-5	h-max"
            Component={
              <div>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder={t("English Screen Name")}
                  className="border-gray-300 border rounded-md px-2 py-1   outline-none"
                />
                <div className="mt-2">
                  <input
                    onChange={(e) => setArabicName(e.target.value)}
                    value={arabicName}
                    placeholder={t("Arabic Screen Name")}
                    className="border-gray-300 border rounded-md px-2 py-1   outline-none"
                  />
                </div>
              </div>
            }
          >
            <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                <tr>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("heading")}
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
                {selectedData.map((v, k) => {
                  return (
                    <tr
                      key={k}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-3 py-4">
                        {getLanguage() === "ar" ? (
                          <>
                            {v.headingArabic ||
                              v.eligibilityQuestions?.headingArabic}
                          </>
                        ) : (
                          <> {v.heading || v.eligibilityQuestions?.heading}</>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {getLanguage() === "ar" ? (
                          <>
                            {v.questionArabic ||
                              v.eligibilityQuestions?.questionArabic}
                          </>
                        ) : (
                          <> {v.question || v.eligibilityQuestions?.question}</>
                        )}
                      </td>
                      <td
                        className="px-6 py-4"
                        onClick={() =>
                          onDelete(v.id || v?.eligibilityQuestions?.id)
                        }
                      >
                        <MdDeleteOutline className="text-red-400 text-2xl cursor-pointer hover:text-red-600 duration-200 " />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              onClick={() => CreateScreen()}
              className="w-full px-2 text-sm bg-sky-800 text-white rounded hover:bg-sky-700 h-10 mt-10"
            >
              Add to form
            </button>
          </CardMain>
        )}
      </div>
      {modelOpen ? (
        <Model2
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading="Is This Applicable for married"
        >
          <div className="flex flex-col w-96 px-7">
            <div className="flex flex-row space-x-10   py-6">
              <div className="space-x-1 items-center flex flex-row">
                <input
                  type="radio"
                  className="h-5 w-5"
                  checked={married ? true : false}
                  onChange={() => setMarried(true)}
                />
                <a>Yes</a>
              </div>
              <div className="space-x-1 items-center flex flex-row">
                <input
                  type="radio"
                  className="h-5 w-5"
                  onChange={() => setMarried(false)}
                  checked={!married ? true : false}
                />
                <a>No</a>
              </div>
            </div>
            <div
              onClick={() => AddQuestionToArray()}
              className="cursor-pointer hover:opacity-85 duration-300 bg-blue-500 text-white rounded-md px-4 py-1 w-full mt-10 mb-10 text-center"
            >
              Submit
            </div>
          </div>
        </Model2>
      ) : null}
    </div>
  );
}

export default CreateQuestionsSet;
