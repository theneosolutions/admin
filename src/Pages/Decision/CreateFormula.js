import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import { useState } from "react";
import { CheckOperaterStyle } from "Components";
import { MdDeleteOutline } from "react-icons/md";
import { getLanguage } from "functions/getLanguage";

function App({ setId, formula }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [question, setQuestions] = useState("none");
  const [state, setState] = useState("Done");
  const [operation, setOperation] = useState("none");
  const [finalValue, setFinalValue] = useState("");
  const [selectedIds, setSelectedIds] = useState([]); // State to hold selected checkbox IDs
  const [name, setName] = useState("");
  const [nameArabic, setNameArabic] = useState("");

  const [lastSelectSource, setLastSelectSource] = useState("second"); // Track the source of the last selection ('first' or 'second')

  const setData = useSelector((state) => state.getSingleSetData);

  useEffect(() => {
    if (formula) {
      setSelectedIds(formula.formula);
    }
  }, [formula]);

  const handleQuestionInputChange = (id, selectSource) => {
    var temp2;
    if (selectSource === "first") {
      var temp;
      if (getLanguage() === "ar") {
        temp = setData?.Numeric_Question?.find(
          (item) => item?.headingArabic === id
        );
      } else {
        temp = setData?.Numeric_Question?.find((item) => item?.heading === id);
      }

      temp2 = {
        formulaArabic: temp?.headingArabic,
        formulaEnglish: temp?.heading,
      };
    } else if (selectSource === "second") {
      temp2 = {
        formulaArabic: id,
        formulaEnglish: id,
      };
    }
    setQuestions(temp2);
    setSelectedIds([...selectedIds, temp2]);
    setLastSelectSource(selectSource); // Update the source of the last selection
  };
  function HandleButtonValueChange(value) {
    if (state === "Done") {
      setState("Review Formula");
    }
    if (state === "Review Formula") {
      setState("Submit Formula");
    }
    if (state === "Submit Formula") {
      setState("Add New Formula");
      const obj = {
        formulaNameEnglish: name,
        formulaNameArabic: nameArabic,
        formula: selectedIds,
        operation: operation,
        value: finalValue,
        setId: setId,
      };
      console.log("Final ", obj);
      dispatch({
        type: "ADD_NEW_FORMULA",
        payload: obj,
      });
    }
  }

  function DisableButton(value) {
    if (lastSelectSource === value) {
      return true;
    }
  }
  function DisableReviewButton() {
    if (name && operation !== "none" && finalValue) {
      return false;
    } else {
      return true;
    }
  }

  function deleteLast(keyy, v) {
    if (v === "-" || v === "+" || v === "/" || v === "%" || v === "*") {
      setLastSelectSource("first");
    } else {
      setLastSelectSource("second");
    }
    const lastIndex = selectedIds.length - 1;
    const temp = selectedIds.slice(0, lastIndex);
    setSelectedIds(temp);
  }
  return (
    <div className="">
      <div className="mt-6 flex flex-col ">
        <>
          {formula ? (
            <>
              {selectedIds.length > 0 && (
                <CardMain
                  heading={
                    t(`Formula Name`) +
                    " : " +
                    `${
                      getLanguage() === "ar"
                        ? formula.formulaNameArabic
                        : formula.formulaNameEnglish
                    }`
                  }
                  width="h-max "
                >
                  <div className="flex flex-wrap  m-1">
                    {selectedIds?.map((v, k) => {
                      return (
                        <div key={k} className="m-1">
                          {CheckOperaterStyle(
                            getLanguage() === "ar"
                              ? v?.formulaArabic
                              : v?.formulaEnglish
                          )}
                        </div>
                      );
                    })}

                    <div className="flex flex-row  items-center text-3xl space-x-5 rtl:space-x-reverse mx-5 font-bold text-gray-700">
                      <a className="">
                        {formula?.operation ? formula?.operation : operation}
                      </a>
                      <a>{formula?.value ? formula?.value : finalValue}</a>
                    </div>
                  </div>
                </CardMain>
              )}
            </>
          ) : (
            <>
              {state === "Done" ? (
                <CardMain heading={t("Create Calculations")} width="h-max">
                  <div className=" space-x-3 rtl:space-x-reverse flex flex-row">
                    <select
                      disabled={lastSelectSource === "first"} // Disable if last selection was from the second select
                      className={`mb-4 p-2 border rounded border-primary mt-4 w-1/2 ${
                        lastSelectSource === "first" ? "bg-gray-200" : null
                      }`}
                      onChange={(e) =>
                        handleQuestionInputChange(e.target.value, "first")
                      }
                      value={question}
                    >
                      <option value={"none"}>{"none"}</option>;
                      {setData?.Numeric_Question?.length > 0 && (
                        <>
                          {setData?.Numeric_Question?.map((v, k) => {
                            return (
                              <option
                                key={k}
                                value={
                                  getLanguage() === "ar"
                                    ? v.headingArabic
                                    : v.heading
                                }
                              >
                                {getLanguage() === "ar"
                                  ? v?.questionArabic
                                  : v.question}
                              </option>
                            );
                          })}
                        </>
                      )}
                    </select>
                    <select
                      disabled={lastSelectSource === "second"} // Disable if last selection was from the first select
                      className={`mb-4 p-2 border rounded border-primary mt-4 w-1/2 ${
                        lastSelectSource === "second" ? "bg-gray-200" : null
                      }`}
                      onChange={(e) =>
                        handleQuestionInputChange(e.target.value, "second")
                      }
                      value={question?.formulaEnglish}
                    >
                      <option value="none">None</option>
                      <option value="-">-</option>
                      <option value="+">+</option>
                      <option value="*">*</option>
                      <option value="/">/</option>
                      <option value="%">%</option>
                    </select>
                  </div>
                </CardMain>
              ) : null}
              {console.log("selected ids", selectedIds)}
              {state === "Done" && selectedIds.length > 0 ? (
                <CardMain
                  heading={t("Formula")}
                  width="h-max "
                  showButton={selectedIds.length > 1 ? true : false}
                  buttonValue={state}
                  buttonDisable={DisableButton("second")}
                  onButtonClick={HandleButtonValueChange}
                  buttonStyle={`${
                    DisableButton("second") ? "bg-gray-300" : "bg-primary "
                  }`}
                >
                  <div className="flex flex-wrap  mt-6 m-1 items-center">
                    {selectedIds.map((v, k) => {
                      const ids = selectedIds.length - 1;
                      return (
                        <div key={k} className="m-1 flex flex-col items-end">
                          {ids === k ? (
                            <CheckStyle
                              operation={
                                getLanguage() === "ar"
                                  ? v?.formulaArabic
                                  : v?.formulaEnglish
                              }
                              // onClick={() => deleteLast(k, v)}
                            />
                          ) : (
                            CheckOperaterStyle(
                              getLanguage() === "ar"
                                ? v?.formulaArabic
                                : v?.formulaEnglish
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardMain>
              ) : null}
              {state === "Review Formula" ? (
                <CardMain
                  heading={t("Creating Decision Formula")}
                  width="h-max "
                  showButton={selectedIds.length > -1 ? true : false}
                  buttonValue={state}
                  buttonDisable={DisableReviewButton()}
                  onButtonClick={HandleButtonValueChange}
                  buttonStyle={`${
                    DisableReviewButton() ? "bg-gray-300" : "bg-primary"
                  }`}
                  Component={
                    selectedIds.length > 0 ? (
                      <div>
                        <InputField
                          setName={setName}
                          name={name}
                          placeholder="English Formula Name"
                        />
                        <div className="mt-3">
                          <InputField
                            setName={setNameArabic}
                            name={nameArabic}
                            placeholder="Arabic Formula Name"
                          />
                        </div>
                      </div>
                    ) : null
                  }
                >
                  <div className="flex flex-wrap  mt-6 m-1">
                    {selectedIds.map((v, k) => {
                      return (
                        <div key={k} className="m-1">
                          {CheckOperaterStyle(
                            getLanguage() === "ar"
                              ? v?.formulaArabic
                              : v?.formulaEnglish
                          )}
                        </div>
                      );
                    })}
                    {state === "Review Formula" ? (
                      <>
                        <select
                          className={`h-10   border rounded-md w-20 m-1 border-primary px-3  mt-4 mx-6 bg-green-300`}
                          onChange={(e) => setOperation(e.target.value)}
                          value={operation}
                        >
                          <option value="none">None</option>
                          <option value="≤">≤</option>
                          <option value="≥">≥</option>
                          <option value="=">=</option>
                        </select>
                        <input
                          type="number"
                          onChange={(e) => setFinalValue(e.target.value)}
                          value={finalValue}
                          placeholder="Final Value"
                          className=" bg-sky-100 border-primary mt-4 border rounded-md px-2 h-10  outline-none m-1"
                        />
                      </>
                    ) : null}
                  </div>
                </CardMain>
              ) : null}
              {state === "Submit Formula" ? (
                <CardMain
                  heading={t(`Formula Name`) + " : " + `${name}`}
                  width="h-max "
                  showButton={selectedIds.length > -1 ? true : false}
                  buttonValue={state}
                  onButtonClick={HandleButtonValueChange}
                >
                  <div className="flex flex-wrap  mt-6 m-1">
                    {selectedIds?.map((v, k) => {
                      return (
                        <div key={k} className="m-1">
                          {CheckOperaterStyle(
                            getLanguage() === "ar"
                              ? v?.formulaArabic
                              : v?.formulaEnglish
                          )}
                        </div>
                      );
                    })}

                    <div className="flex flex-row  items-center text-3xl space-x-5 rtl:space-x-reverse mx-5 font-bold text-gray-700">
                      <a className="">{operation}</a>
                      <a>{finalValue}</a>
                    </div>
                  </div>
                </CardMain>
              ) : null}
              {state === "Add New Formula" ? (
                <>
                  {selectedIds.length > 0 && (
                    <CardMain
                      heading={t(`Formula Name`) + " : " + `${name}`}
                      width="h-max "
                    >
                      <div className="flex flex-wrap  m-1">
                        {selectedIds?.map((v, k) => {
                          return (
                            <div key={k} className="m-1">
                              {CheckOperaterStyle(
                                getLanguage() === "ar"
                                  ? v?.formulaArabic
                                  : v?.formulaEnglish
                              )}
                            </div>
                          );
                        })}

                        <div className="flex flex-row  items-center text-3xl space-x-5 rtl:space-x-reverse mx-5 font-bold text-gray-700">
                          <a className="">
                            {formula?.operation
                              ? formula?.operation
                              : operation}
                          </a>
                          <a>{formula?.value ? formula?.value : finalValue}</a>
                        </div>
                      </div>
                    </CardMain>
                  )}
                </>
              ) : null}
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default App;

function CheckStyle({ operation, onClick }) {
  let style;
  if (
    operation === "-" ||
    operation === "+" ||
    operation === "/" ||
    operation === "%" ||
    operation === "*"
  ) {
    style =
      "bg-opacity-40 px-4 w-max rounded-lg text-3xl mt-3   flex flex-row items-center space-x-2 justify-center ";
  } else {
    style =
      " px-4 py-2 w-max rounded-lg border-primary border mt-3  flex flex-row items-center space-x-4";
  }
  return (
    <div className={style} onClick={onClick}>
      <a>{operation}</a>
      <MdDeleteOutline className="text-red-500 text-xl" />
    </div>
  );
}

function InputField({ name, setName, placeholder }) {
  return (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder={placeholder}
        className="border-primary border rounded-md px-2 py-1   outline-none"
      />
    </div>
  );
}
