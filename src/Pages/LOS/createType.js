import React, { useState, useEffect, useRef } from "react";
import CardMain from "Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import UplaodIcon from "Assets/Images/upload.svg";
import { CiCircleRemove } from "react-icons/ci";
import withAuthorization from "../../constants/authorization";
import TermsAndRates from "Pages/Calculations/termsAndRates";
import { GetPoliciesSpecificValues } from "Services/OtherApis";

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loanReasons = useSelector((state) => state.getAllLoanReasons);
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);

  const [formData, setFormData] = useState([
    { key: null, value: 0, error: "" },
  ]);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [reason, setReason] = useState("");
  const [language, setLanguage] = useState("ar");

  const [policyMinValue, setPolicyMinValue] = useState("");
  const [policyMaxValue, setPolicyMaxValue] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    getAllReasons();
    GetPolicies();
  }, []);

  useEffect(() => {
    validateForm();
  }, [formData, image, reason]);

  function getAllReasons() {
    dispatch({
      type: "GET_ALL_LOAN_REASONS",
    });
  }

  const handleChange = (index, field, newValue) => {
    const parsedValue = parseInt(newValue);
    let errorMessage = "";

    if (
      parsedValue < parseInt(policyMinValue) ||
      parsedValue > parseInt(policyMaxValue)
    ) {
      errorMessage = `Value should be between ${policyMinValue} and ${policyMaxValue}`;
    } else if (
      formData.some((item, idx) => item.key === parsedValue && idx !== index)
    ) {
      errorMessage = "Duplicate values are not allowed.";
    }

    setFormData((prevData) => {
      const newData = [...prevData];
      newData[index][field] = parsedValue;
      newData[index].error = errorMessage;
      return newData;
    });
  };

  const handleAddMore = () => {
    setFormData((prevData) => [
      ...prevData,
      { key: null, value: 0, error: "" },
    ]);
  };

  const transformList = (originalList) => {
    return originalList.map((item) => ({
      [item.key]: isNaN(parseInt(item.value)) ? null : parseInt(item.value),
    }));
  };

  const handleSubmit = () => {
    if (!image || !reason || formData.some((item) => !item.key || item.error)) {
      alert("Please fill in all required fields.");
      return;
    }

    const mergedObject = {};
    const temp = transformList(formData);

    temp.forEach((obj) => {
      for (const key in obj) {
        mergedObject[key] = obj[key];
      }
    });

    const transformedObject = {};
    for (const key in mergedObject) {
      const newKey = key + " Months";
      transformedObject[newKey] = mergedObject[key];
    }

    dispatch({
      type: "CREATE_LOAN_TYPE",
      payload: { reason, image, language, transformedObject },
    });

    setTimeout(() => {
      getAllReasons();
    }, 2000);
  };

  const validateForm = () => {
    const isValid =
      image && reason && formData.every((item) => item.key && !item.error);
    setIsFormValid(isValid);
  };

  const fileInputRef = useRef(null);

  function handleClick() {
    fileInputRef.current.click();
  }

  function handleSelectImage(e) {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      if (
        selectedImage.type === "image/png" ||
        selectedImage.type === "image/x-icon"
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
        };

        reader.readAsDataURL(selectedImage);

        setImage(selectedImage);
        setImage2(URL.createObjectURL(selectedImage));
      } else {
        alert("Please upload a PNG or ICO file.");
        e.target.value = null;
      }
    }
  }

  useEffect(() => {
    if (error === false) {
      reset();
    }
  }, [message]);

  function reset() {
    setFormData([{ key: null, value: 0, error: "" }]);
    setReason("");
    setImage(null);
    setImage2(null);
  }

  function Remove(key) {
    const temp = formData.filter((item, index) => index !== key);
    setFormData(temp);
  }

  function GetPolicies() {
    let temp = "policies=min_loan_tenure&policies=max_loan_tenure";
    GetPoliciesSpecificValues(temp).then((res) => {
      if (res.status === 200) {
        const min = res?.response?.data.find(
          (name) => name.policyName === "min_loan_tenure"
        );
        const max = res?.response?.data.find(
          (name) => name.policyName === "max_loan_tenure"
        );
        setPolicyMinValue(min?.policyValue);
        setPolicyMaxValue(max?.policyValue);
      }
    });
  }

  return (
    <div className="container mx-auto mt-5 space-y-6">
      <div className="flex flex-col   w-full ">
        <CardMain
          width="w-full h-max  md:mt-0 mt-4"
          heading={t("Create Loan Type")}
        >
          <div className=" px-1 md:px-3 rtl:space-x-reverse  flex flex-col md:flex-row md:space-x-4">
            <div className="flex flex-row w-full md:w-1/2">
              <div
                onClick={handleClick}
                className="w-full border  bg-secondry rounded-md border-dashed	 border-slate-200 items-center flex flex-col justify-center px-4 py-8"
              >
                {!image2 && <img src={UplaodIcon} />}

                {image2 && <img src={image2} />}
                <a className="font-semibold mt-3">
                  <span className="underline text-primary font-bold cursor-pointer hover:opacity-80 duration-300">
                    {t("Browse")}
                  </span>
                </a>
                <a className="text-xs text-gray-600 mt-3">
                  {t("Supported formates: Ico, PNG")}
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-3 md:mt-0">
              <div className="flex flex-row justify-between -mt-12">
                <div></div>
                <div>
                  <select
                    className=" p-2 border rounded  w-32 "
                    onChange={(e) => setLanguage(e.target.value)}
                    value={language}
                  >
                    <option value="ar">{t("AR")}</option>
                    <option value="en">{t("EN")}</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <a className="text-sm text-gray-700 font-semibold">
                  {t("Loan Reason")}
                </a>

                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="border-primary rounded-md border  px-3 py-1.5 outline-none mt-2 w-full"
                />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleSelectImage}
                style={{ display: "none" }}
              />
              <div className=" py-3   bg-secondry rounded-md 	 border-slate-200 ">
                <a className="text-sm text-gray-700 font-semibold">
                  {t("Tensures")}{" "}
                </a>

                <div className="mt-4">
                  {formData?.map((data, index) => (
                    <div
                      key={index}
                      className="mb-4 flex  flex-row justify-between items-end "
                    >
                      <div className="flex flex-col w-full">
                        <input
                          type="number"
                          value={data.key || ""}
                          onChange={(e) =>
                            handleChange(index, "key", e.target.value)
                          }
                          className={`border-primary border rounded-md px-3 py-1.5 outline-none mt-2 w-full ${
                            data.error ? "border-red-500" : ""
                          }`}
                          placeholder="Months"
                        />
                        {data.error && (
                          <span className="text-red-500 text-sm mt-1">
                            {data.error}
                          </span>
                        )}
                      </div>
                      <CiCircleRemove
                        className="mb-1 text-3xl text-red-700 cursor-pointer hover:text-red-400 duration-300"
                        onClick={() => Remove(index)}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className=" flex row items-end justify-end">
                    <button
                      onClick={handleAddMore}
                      className={`w-max rounded-lg text-white text-sm px-10 py-2   hover:bg-opacity-90 bg-primary`}
                    >
                      {t("Add More Months")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className={`w-max mt-5 rounded-lg text-white text-sm px-10 py-2 bg-primary ${
                    !isFormValid
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-opacity-90"
                  }`}
                >
                  {t("Submit")}
                </button>
              </div>
            </div>
          </div>
        </CardMain>
        <CardMain width="w-full mt-4 h-max pb-8" heading={t("All Loan Types")}>
          <div className="flex flex-wrap ">
            {loanReasons?.map((v, k) => (
              <div className="px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                <div
                  key={k}
                  // onClick={() =>
                  //   navigate(`/los/create-loan-tax?id=${v?.loanTypeDetail?.id}`)
                  // }
                  className=" flex flex-col justify-center space-x-2 rtl:space-x-reverse items-center border-dashed border border-gray-300  text-center mt-4 py-6 rounded-md hover:bg-gray-300 duration-300 cursor-pointer"
                >
                  <img src={v?.loanTypeDetail?.icon} className="h-7" />
                  <h1>{v?.loanTypeDetail?.reason}</h1>
                </div>
              </div>
            ))}
          </div>
        </CardMain>
        <TermsAndRates />
      </div>
    </div>
  );
}

export default withAuthorization(App);
