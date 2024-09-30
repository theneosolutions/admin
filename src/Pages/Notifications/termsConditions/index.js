import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import withAuthorization from "../../../constants/authorization";
import EnglishTerms from "./termsAndConditions/englishTerms";
import ArabicTerms from "./termsAndConditions/arabicTerms";

function TermsConditions() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [language, setLanguage] = useState("ar");
  function getTerms(lan) {
    dispatch({
      type: "GET_ALL_TERMS",
      payload: lan,
    });
  }
  useEffect(() => {
    getTerms(language);
  }, [language]);

  return (
    <div className=" flex flex-col space-y-5 ">
      <div className="">
        <select
          className=" p-2 border rounded  w-32 bg-white"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value="ar">{t("AR")}</option>
          <option value="en">{t("EN")}</option>
        </select>
      </div>
      {language === "ar" ? (
        <ArabicTerms getTerms={() => getTerms(language)} />
      ) : (
        <EnglishTerms getTerms={() => getTerms(language)} />
      )}
    </div>
  );
}
export default withAuthorization(TermsConditions);
