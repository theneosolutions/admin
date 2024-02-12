import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "../../Components/Loading"; // Adjust the path based on your file structure
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CheckQuestionStatusInScreen } from "Services/OtherApis";
function CreateQuestionsSet() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedIds, setSelectedIds] = useState([]); // State to hold selected checkbox IDs
  const [selectedData, setSelectedData] = useState([]); // State to hold selected checkbox IDs
  const [name, setName] = useState("");

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    GetSingleSetData();
    dispatch({
      type: "GET_ALL_QUESTIONS",
    });
  }, []);
  useEffect(() => {
    getAllSets();
  }, []);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  function getAllSets() {
    dispatch({
      type: "GET_ALL_SETS",
    });
  }

  const handleCheckboxChange = (id, object) => {
    CheckQuestionStatusInScreen(id).then((response) => {
      if (response === "No Record found") {
        if (selectedIds.includes(id)) {
        } else {
          setSelectedIds([...selectedIds, id]);
          setSelectedData([...selectedData, object]);
        }
      } else {
        alert("Question Already Exist In ", response.screenHeading[0]);
      }
    });
  };

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
      payload: { selectedIds, name, id },
    });
    setSelectedData([]);
    setSelectedIds([]);
  }

  return (
    <div className="">
      <WaveAnimation show={loading} />
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
                        {v.heading || v.eligibilityQuestions?.heading}
                      </td>
                      <td className="px-6 py-4">
                        {v.question || v.eligibilityQuestions?.question}
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
                          Add
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
            Component={<InputField setName={(e) => setName(e)} name={name} />}
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
                        {v.heading || v.eligibilityQuestions?.heading}
                      </td>
                      <td className="px-6 py-4">
                        {v.question || v.eligibilityQuestions?.question}
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

export default CreateQuestionsSet;

function InputField({ name, setName }) {
  const { t } = useTranslation();

  return (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder={t("Screen name")}
        className="border-gray-300 border rounded-md px-2 py-1   outline-none"
      />
    </div>
  );
}
