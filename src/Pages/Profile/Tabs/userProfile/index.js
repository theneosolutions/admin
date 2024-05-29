import React, { useEffect, useState } from "react";
import Family from "./tabs/family";
import Financail from "./tabs/financial";
import Income from "./tabs/income";
import Personal from "./tabs/personal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function Template() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("user");
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.getEligibilityQuestions);
  const [state, setState] = useState("Personal Details");
  const [currentScreen, setCurrentScreen] = useState([]);

  function setNavigation(stateValue) {
    setState(stateValue);
  }
  useEffect(() => {
    getAllQuestions();
  }, []);
  function getAllQuestions() {
    dispatch({
      type: "GET_ELIGIBILITY_QUESTIONS",
      payload: id,
    });
  }
  useEffect(() => {
    if (questions[0]?.data[0]?.screenName) {
      setNavigation(questions[0]?.data[0]?.screenName);
      setCurrentScreen(questions[0]?.data[0]?.questions);
    }
  }, [questions[0]]);
  return (
    <div className=" bg-white  border border-primary w-full rounded-lg ">
      <div className="flex flex-row  ">
        {questions[0]?.data?.map((v, k) => {
          return (
            <div
              onClick={() => (
                setNavigation(v.screenName), setCurrentScreen(v?.questions)
              )}
              className={`px-4 cursor-pointer ${
                state === v.screenName ? "text-primary " : "text-gray-600 "
              }`}
            >
              <div
                className={`px-3 py-4  w-max  ${
                  state === v.screenName ? "border-primary border-b-2" : " "
                }`}
              >
                <a className="text-sm">{v.screenName}</a>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className=" w-full bg-gray-200 "
        style={{ height: 1, marginTop: -1 }}
      ></div>
      <div className=" rtl:space-x-reverse  w-full px-4 flex flex-col justify-center rounded-lg  ">
        <div className="flex flex-row space-x-5 mt-5 ">
          <Personal data={currentScreen} />
        </div>
      </div>
    </div>
  );
}
export default Template;

const data = [
  {
    label: "Personal Details",
    tab: <Personal />,
  },
  {
    label: "Family Details",
    tab: <Family />,
  },

  {
    label: "Income Details",
    tab: <Income />,
  },
  {
    label: "Financail Details",
    tab: <Financail />,
  },
];
