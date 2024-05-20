import React, { useState, useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function ViewQuestions({ getAllQuestion }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const questionsData = useSelector((state) => state.getAllQuestions);

  const DeleteQuestion = (id) => {
    dispatch({
      type: "DELETE_QUESTION",
      id,
    });
    setTimeout(() => getAllQuestion(), 500); // AFTER ADDING QUESTION TO DATABASE , GETTING NEW LIAST OF QUESTIONS
  };

  return (
    <div className="">
      <CardMain
        heading={t("Questions List")}
        width="w-full  h-max mt-4 md:mt-5"
      >
        <div className="w-full flex flex-col mt-3 overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-2 py-3">
                  {t("Heading English")}
                </th>
                <th scope="col" className="px-2 py-3">
                  {t("Heading Arabic")}
                </th>
                <th scope="col" className="px-2 py-3">
                  {t("Question English")}
                </th>
                <th scope="col" className="px-2 py-3">
                  {t("Question Arabic")}
                </th>
                <th scope="col" className="px-2 py-3">
                  {t("Type")}
                </th>
                <th scope="col" className="px-2 py-3">
                  {t("Field / Options")}
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
                  <td className="px-2 py-4">{v?.headingAr}</td>
                  <td className="px-2 py-4 overflow-wrap text-sky-700">
                    {v?.question}
                  </td>
                  <td className="px-2 py-4 overflow-wrap text-sky-700">
                    {v?.questionAr}
                  </td>
                  <td className="px-2 py-4">{v?.type}</td>
                  <td className="px-2 py-4">{
                    console.log("heloooooooooooo",v?.options[0]?.optionEn)
                  }
                  {
                     v?.options[0]?.optionEn ? <>{v?.options?.map((s)=>{
                      return(
                        <div>
                          
                          <div> {s?.optionEn  + " , " +  s?.optionAr}</div>
                        </div>
                      )
                    })}</> : <a> {v?.options?.length > 0 ? v?.options?.join(", ") : v?.field}</a>
                  }
                   
                  </td>
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
  );
}
export default ViewQuestions;
