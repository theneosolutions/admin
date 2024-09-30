import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getLanguage } from "functions/getLanguage";
import withAuthorization from "constants/authorization";

function CreateQuestionsSet() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getScreensSets = useSelector((state) => state.getScreensSets.data);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    GetScreenSets();
  }, []);

  function GetScreenSets() {
    dispatch({
      type: "GET_SCEENS_SET",
      payload: id,
    });
  }

  return (
    <div className="">
      {getScreensSets && (
        <div className="mt-6 flex flex-wrap md:flex-wrap   rtl:space-x-reverse h-max">
          {Object.entries(getScreensSets).map(([category, items]) => (
            <div className="p-2 md:w-1/3 w-full h-min md:flex-shrink-0">
              <CardMain key={category} heading={category} width=" ">
                <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                    <tr>
                      <th scope="col" className="px-3 py-3 cursor-pointer">
                        {t("heading")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((v, k) => (
                      <tr
                        key={k}
                        className="bg-white border-b dark:border-gray-200"
                      >
                        <td className="px-3 py-4 cursor-pointer text-primary">
                          {getLanguage() === "ar" ? (
                            <>{v?.data?.questionArabic}</>
                          ) : (
                            <>{v?.data?.question}</>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardMain>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuthorization(CreateQuestionsSet);
