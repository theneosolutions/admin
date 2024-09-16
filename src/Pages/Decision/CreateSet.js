import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import withAuthorization from "../../constants/authorization";
import { getLanguage } from "functions/getLanguage";

function CreateQuestionsSet() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filterQuestion, setFilterQuestions] = useState([]);

  const [selectedIds, setSelectedIds] = useState([]); // State to hold selected checkbox IDs
  const [name, setName] = useState("");
  const [nameArabic, setNameArabic] = useState("");

  const questionsData = useSelector((state) => state.getAllQuestions);
  const allSets = useSelector((state) => state.getAllSets);

  const [state, setState] = useState("All");

  useEffect(() => {
    dispatch({
      type: "GET_ALL_QUESTIONS",
    });
  }, []);
  useEffect(() => {
    getAllSets();
  }, []);

  useEffect(() => {
    setFilterQuestions(questionsData);
  }, [questionsData]);

  function getAllSets() {
    dispatch({
      type: "GET_ALL_SETS",
    });
  }

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleAddSelectedToNewList = () => {
    if (!name) {
      return dispatch(
        action.Message({
          message: "PLease Add Set Name",
          open: true,
          error: true,
        })
      );
    }
    dispatch({
      type: "ADD_QUESTIONS_SET",
      payload: { name, selectedIds, nameArabic },
    });
    setSelectedIds([]);
    setTimeout(() => getAllSets(), 500);
  };

  return (
    <div className="">
      <div className="mt-6 flex flex-col lg:flex-row lg:space-x-3 rtl:space-x-reverse h-max">
        <CardMain
          heading={t("All List Of Questions")}
          width="lg:w-3/5 w-full"
          showButton={selectedIds.length > -1 ? true : false}
          buttonValue={t("Add Selected To New List")}
          onButtonClick={handleAddSelectedToNewList} // Attach click handler
          Component={
            selectedIds.length > -1 ? (
              <div>
                <InputField
                  setName={setName}
                  name={name}
                  placeholder={t("Set Name In Englsih")}
                />
                <div className="mt-2">
                  <InputField
                    setName={setNameArabic}
                    name={nameArabic}
                    placeholder={t("Set Name In Arabic")}
                  />
                </div>
              </div>
            ) : null
          }
        >
          <Filter
            setFilterQuestions={(e) => setFilterQuestions(e)}
            questionsData={questionsData}
            setState={(e) => setState(e)}
            state={state}
          />
          <div className="overflow-x-auto">
            <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                <tr>
                  <th scope="col" className="px-2 py-3 cursor-pointer">
                    {t("Action")}
                  </th>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("heading")}
                  </th>

                  <th scope="col" className="px-6 py-3 cursor-pointer">
                    {t("Question")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterQuestion.map((v, k) => {
                  return (
                    <tr
                      key={k}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-2 py-4">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(v.id)} // Attach change handler
                          checked={selectedIds.includes(v.id)} // Check if the ID is in selectedIds
                        />
                      </td>
                      <td className="px-3 py-4">
                        {getLanguage() === "ar" ? (
                          <>{v.headingAr}</>
                        ) : (
                          <> {v.heading}</>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {getLanguage() === "ar" ? (
                          <>{v.questionAr}</>
                        ) : (
                          <> {v.question}</>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardMain>
        <CardMain
          heading={t("All List Of Sets")}
          width="lg:w-2/5 lg:mt-0 mt-5	h-max"
        >
          {allSets?.map((v, k) => {
            return (
              <div
                key={k}
                onClick={() =>
                  navigate(`/decisions/create-set/create-screen?id=${v.id}`)
                }
                className="w-full bg-gray-200 text-center mt-4 py-6 rounded-md hover:bg-gray-300 duration-300 cursor-pointer"
              >
                {getLanguage() === "ar" ? v.nameAr : v.name}
              </div>
            );
          })}
        </CardMain>
      </div>
    </div>
  );
}

export default withAuthorization(CreateQuestionsSet, "create_set");

function InputField({ name, setName, placeholder }) {
  const { t } = useTranslation();

  return (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder={t(placeholder)}
        className="border-gray-300 border rounded-md px-2 py-1   outline-none"
      />
    </div>
  );
}

function Filter({ setFilterQuestions, questionsData, setState, state }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  function setNavigation(stateValue) {
    const filterFunction = {
      Numeric: "numeric",
      Text: "text",
      Boolean: "boolean",
      CheckBox: "Checkboxes",
      "Max&Min": "min&max",
    };

    if (stateValue === "All") {
      setFilterQuestions(questionsData);
    } else {
      setSearchQuery("");
      const filterValue = filterFunction[stateValue];
      if (filterValue) {
        const filteredQuestions = questionsData.filter(
          (question) =>
            question?.field === filterValue || question?.type === filterValue
        );
        setFilterQuestions(filteredQuestions);
      }
    }

    setState(stateValue);
    navigate(location.pathname + `?type=${stateValue}`);
  }
  const handleSearchChange = (e) => {
    setState("All");
    setFilterQuestions(questionsData);
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredQuestions = questionsData.filter(
      (question) =>
        question?.heading?.toLowerCase().includes(query) ||
        question?.question?.toLowerCase().includes(query)
    );

    setFilterQuestions(filteredQuestions);
  };
  return (
    <div>
      <div className="lg:space-x-5 flex flex-wrap rtl:space-x-reverse my-4">
        {data?.map((v, k) => {
          return (
            <button
              key={k}
              onClick={() => setNavigation(v.label)}
              className={`mt-2 lg:mx-0 mx-1 hover:shadow-lg shadow-md duration-300 rounded px-3 py-2 border-primary  border text-sm ${
                state === v.label
                  ? "bg-primary text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>
      <input
        onChange={handleSearchChange}
        value={searchQuery}
        placeholder={"Search"}
        className=" border rounded-md px-2 py-1   outline-none w-full border-primary"
      />
    </div>
  );
}
const data = [
  {
    label: "All",
  },
  {
    label: "Text",
  },
  {
    label: "Numeric",
  },
  {
    label: "Boolean",
  },
  {
    label: "CheckBox",
  },
  {
    label: "Max&Min",
  },
];
