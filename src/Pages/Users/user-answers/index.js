import React, { useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import withAuthorization from "constants/authorization";

function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const questionsData = useSelector((state) => state.getAllQuestions);

  useEffect(() => {
    getAllQuestion();
  }, []);
  function getAllQuestion() {
    dispatch({
      type: "GET_ALL_QUESTIONS", // get all questions
    });
  }

  return (
    <div className="bg-red-300">
      <div className="flex flex-row w-full bg-green-300 space-x-5 rtl:space-x-reverse mt-6">
        <CardMain heading={t("Answers of this user")} width="w-full	 h-max">
          <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-2 py-3 cursor-pointer">
                  {t("Question")}
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  {t("Options")}
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  {t("User Answers")}
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  {t("Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {questionsData?.map((v, k) => {
                return (
                  <tr className="bg-white border-b dark:border-gray-200">
                    <td className="px-2 py-4"> {v?.question}</td>
                    <td className="px-6 py-3 flex flex-row space-x-4">
                      {[1, 1, 1, 1].map((l, s) => {
                        return (
                          <div
                            key={k}
                            className="flex flex-row space-x-2 items-center"
                          >
                            <input
                              type="radio"
                              disabled={true}
                              className={`h-4 w-4
                                    
                                      }`}
                            />
                            <span>{t("Yes")}</span>
                          </div>
                        );
                      })}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-row space-x-2 items-center">
                        <input
                          type="radio"
                          disabled={true}
                          className={`h-4 w-4
                                    
                                      }`}
                        />
                        <span>{t("Yes")}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="w-1/12	text-2xl	cursor-pointer text-gray-400 hover:text-red-400 duration-300">
                        {<MdDelete />}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardMain>
      </div>
    </div>
  );
}

export default withAuthorization(App);
