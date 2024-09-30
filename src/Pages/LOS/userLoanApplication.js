import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CardMain from "Components/Cards/main";
import { Model } from "Components";
import { useSelector } from "react-redux";
import { FaWpforms } from "react-icons/fa";
import moment from "moment";
import { useEffect } from "react";
import LoanForm from "Components/loanForms";
import { useTranslation } from "react-i18next";
import withAuthorization from "constants/authorization";

function LaonApplication() {
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);
  const [state, setState] = useState({});
  const users = useSelector((state) => state.getApplications);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    if (id) {
      var data = users.filter((data) => data.id == id);
      setState(data[0]);
    }
  }, []);

  return (
    <div className="py-5">
      <LoanForm />

      <CardMain
        width="w-full"
        iconStyle="text-3xl text-primary "
        headerDisable={true}
      >
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-row space-x-2 rtl:space-x-reverse items-center">
            <h1 className="font-semibold text-lg text-black ">
              Loan Application Of User1
            </h1>
            <FaWpforms className="text-primary text-lg" />
          </div>
          <div className="flex lg:flex-row flex-col lg:space-x-4 space-y-3 lg:space-y-0 mt-1 ">
            <div className="  bg-green-400 text-white  px-5 py-1 lg:w-max w-full text-center rounded-md cursor-pointer  hover:bg-opacity-80 hover:text-white duration-300">
              Approve
            </div>
            <div className="  bg-red-400 text-white  px-5 py-1 lg:w-max w-full text-center  rounded-md cursor-pointer hover:bg-opacity-80 hover:text-white duration-300">
              Reject
            </div>
            <div className="  bg-yellow-500 text-white  px-5 py-1 lg:w-max w-full text-center  rounded-md cursor-pointer hover:bg-opacity-80 hover:text-white duration-300">
              Hold
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div>
            <a className="text-lg font-semibold">
              Applicant Id # : <span className="text-primary">{state.id}</span>
            </a>
          </div>
          <div className="flex lg:flex-row flex-col ">
            <div className="flex flex-col lg:w-1/2 w-full">
              <div className="mt-4  lg:px-2">
                <div className=" border border-gray-300 border-dashed rounded-lg p-2 lg:p-4 ">
                  <a className="text-lg font-semibold">Loan Detail </a>
                  <div>
                    <ShowValues
                      keyValue="Loan Reason"
                      value={state.formulaName}
                      bold
                    />
                    <ShowValues
                      keyValue="Loan Amount"
                      value={state.loanAmount}
                    />
                    <ShowValues
                      keyValue="Loan Type Id"
                      value={state.loanTypeId}
                    />

                    <ShowValues keyValue="Loan Duration" value={state.month} />
                    <ShowValues
                      keyValue="Amount After Interest And Tax"
                      value={state.amountAfterInterestAndTex}
                    />
                    <ShowValues
                      keyValue="Amount After Interest Tax"
                      value={moment(
                        new Date(Number(state.maturityDate) * 1000)
                      ).format("MM/DD/YYYY")}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4  lg:px-2">
                <div className=" border border-gray-300 border-dashed rounded-lg p-2 lg:p-4 ">
                  <a className="text-lg font-semibold">Loan Intrest </a>
                  <div>
                    <ShowValues
                      keyValue="Interest Ratio"
                      value={state.interestRatio}
                    />
                  </div>
                  <div>
                    <ShowValues
                      keyValue="Amount After Interest"
                      value={state.amountAfterInterest}
                      bold
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:w-1/2 w-full">
              <div className="mt-4   lg:px-2">
                <div className=" border border-gray-300 border-dashed rounded-lg p-2 lg:p-4 ">
                  <a className="text-lg font-semibold">Loan Fees </a>
                  <div>
                    <ShowValues
                      keyValue="Processing Fee"
                      value={state.processingFee}
                    />
                    <ShowValues keyValue="Vat Fee" value={state.vatOnFee} />
                    <ShowValues
                      keyValue="Total Fee"
                      value={state.totalFee}
                      bold
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4   lg:px-2">
                <div className=" border border-gray-300 border-dashed rounded-lg p-2 lg:p-4 ">
                  <a className="text-lg font-semibold">Loan Installments </a>
                  <div>
                    <ShowValues
                      keyValue="Installment Per Month"
                      value={state.installmentPerMonth}
                    />

                    <ShowValues
                      keyValue="First Installment Date"
                      value={moment(
                        new Date(Number(state.firstInstallmentDate) * 1000)
                      ).format("MM/DD/YYYY")}
                    />
                    <ShowValues
                      keyValue="Last Installment Date"
                      value={moment(
                        new Date(Number(state.lastInstallmentDate) * 1000)
                      ).format("MM/DD/YYYY")}
                    />
                    <ShowValues
                      keyValue="Installment Per Month After Interest"
                      value={state.installmentPerMonthAfterInterest}
                    />
                    <ShowValues
                      keyValue="Installment Per Month After Interest And tax"
                      value={state.installmentPerMonthAfterInterestAndTex}
                      bold
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardMain>

      <Model
        heading={t("Delete User")}
        isOpen={modelOpen}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen(!modelOpen)}
        action1Value={t("Cancel")}
        action2Value={t("Delete")}
        action2={() => setModelOpen(false)}
        action1={() => setModelOpen(!modelOpen)}
      >
        <a className=" text-xl text-gray-800 ">
          {t("Are you sure you want to delete ?")}
          <span className="font-semibold"></span>
        </a>
      </Model>
    </div>
  );
}
export default withAuthorization(LaonApplication);
function ShowValues({ keyValue, value, bold }) {
  return (
    <div className="flex flex-row my-2">
      <a className="w-1/2">{keyValue} :</a>
      <a className={`w-1/2 ${bold && "text-primary font-smeibold underline"}`}>
        {value}
      </a>
    </div>
  );
}
