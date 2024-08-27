import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import * as action from "Services/redux/reducer";
import { useDispatch, useSelector } from "react-redux";

function CreateTermsAndRates({ setModelOpen, data }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    CreateNewUser();
  }
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);

  const [adminFee, setAdminFee] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [vat, setVat] = useState("");
  const [rateMonthly, setRateMonthly] = useState("");
  const [term, setTerm] = useState("");
  const [termRate, setTermRate] = useState("");

  function CreateNewUser() {
    if (
      adminFee != "" &&
      annualRate != "" &&
      vat != "" &&
      rateMonthly != "" &&
      term != "" &&
      termRate != ""
    ) {
      const temp = {
        adminFeeInPercentage: parseFloat(adminFee),
        annualRate: parseFloat(annualRate),
        flatRateMonthly: parseFloat(rateMonthly),
        term: parseFloat(term),
        termRate: parseFloat(termRate),
        vatInPercentage: parseFloat(vat),
      };
      if (data) {
        const updatedTemp = {
          ...temp, // Clone the original object
          id: data?.id, // Add the new attribute
        };
        dispatch({
          type: "UPDATE_TERM_AND_RATES",
          payload: updatedTemp,
        });
      } else {
        dispatch({
          type: "ADD_NEW_TERM_AND_RATES",
          payload: temp,
        });
      }
    } else {
      dispatch(
        action.Message({
          message: "All fields are required!",
          open: true,
          error: true,
        })
      );
    }
  }
  useEffect(() => {
    if (message === "Success" && error === false) {
      setModelOpen(false);
    }
  }, [message, error]);

  useEffect(() => {
    if (data) {
      setAdminFee(data?.adminFeeInPercentage);
      setAnnualRate(data?.annualRate);
      setVat(data?.vatInPercentage);
      setRateMonthly(data?.flatRateMonthly);
      setTerm(data?.term);
      setTermRate(data?.termRate);
    }
  }, [data]);
  return (
    <form
      onSubmit={handleSubmit}
      className="items-center justify-center flex flex-col"
    >
      <div className=" bg-white rounded shadow-sm  rtl:space-x-reverse flex flex-col lg:flex-row   w-full lg:w-max lg:space-x-20 lg:px-20 px-4 py-5 ">
        <div className="flex flex-col ">
          <div className=" w-full  flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
            <div className=" md:w-1/2 w-full space-y-5">
              <InputField
                heading={t("Admin Fee In Percentage")}
                value={adminFee}
                onChange={(e) => setAdminFee(e)}
              />
              <InputField
                heading={t("Annual Rate")}
                value={annualRate}
                onChange={(e) => setAnnualRate(e)}
              />

              <InputField
                heading={t("Vat In Percentage")}
                value={vat}
                onChange={(e) => setVat(e)}
              />
            </div>
            <div className="md:w-1/2 w-full md:mt-0 mt-3 space-y-5">
              <InputField
                heading={t("Flat Rate Monthly")}
                value={rateMonthly}
                onChange={(e) => setRateMonthly(e)}
              />
              <InputField
                heading={t("Term")}
                value={term}
                onChange={(e) => setTerm(e)}
              />
              <InputField
                heading={t("Term Rate")}
                value={termRate}
                onChange={(e) => setTermRate(e)}
              />
            </div>
          </div>

          <div className="flex flex-row justify-end mt-10 mb-5 px-14">
            <Button
              type="submit"
              buttonValue={data ? t("Update") : t("Submit")}
              buttonStyle="px-20 py-2 w-full "
            />
          </div>
        </div>
      </div>
    </form>
  );
}
export default CreateTermsAndRates;

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        type={type || "number"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      />
    </div>
  );
}
