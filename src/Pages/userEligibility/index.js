import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
function AllUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user");

  const loanReasons = useSelector((state) => state.getAllLoanReasons);
  const getSingleLoanTypeEmi = useSelector(
    (state) => state.getSingleLoanTypeEmi
  );
  const [active, setActive] = useState("All");
  const [setId, setSetId] = useState();

  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    getAllReasons();
  }, []);

  function getAllReasons() {
    dispatch({
      type: "GET_ALL_LOAN_REASONS",
    });
  }
  useEffect(() => {
    if (loanReasons[0]) {
      setActive(loanReasons[0]?.loanTypeDetail?.reason);
      setSetId(loanReasons[0]?.loanTypeDetail?.id);
    }
  }, [loanReasons]);

  useEffect(() => {
    if (setId) {
      dispatch({
        type: "GET_USER_LOAN_EMI",
        payload: { userId: userId, setId: setId },
      });
    }
  }, [setId]);

  return (
    <div className="py-5">
      <div className="flex flex-row space-x-3 overflow-x-scroll		">
        {loanReasons?.map((v, k) => {
          return (
            <div
              onClick={() => (
                setActive(v?.loanTypeDetail?.reason),
                setSetId(v?.loanTypeDetail?.id)
              )}
              className={` w-max  px-3 py-1 cursor-pointer hover:opacity-80 rounded-md ${
                active === v?.loanTypeDetail?.reason
                  ? "bg-blue-500 text-white "
                  : " border-gray-300 border text-gray-600"
              }`}
            >
              <div className="w-max "> {v?.loanTypeDetail?.reason}</div>
            </div>
          );
        })}
      </div>
      {error === false && message === "successEmi" ? (
        <CardMain
          headerDisable={true}
          width="w-full mt-6"
          iconStyle="text-3xl text-primary"
        >
          <div className="overflow-x-auto relative  mt-4">
            <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
                <tr>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("final Eligible EMI")}
                  </th>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("monthly Installment")}
                  </th>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("principal Loan Amount")}
                  </th>

                  <th scope="col" className="px-3 py-3">
                    {t("profit")}
                  </th>

                  <th scope="col" className="px-3 py-3">
                    {t("tenure In Months")}
                  </th>

                  <th scope="col" className="px-3 py-3">
                    {t("term Rate")}
                  </th>

                  <th scope="col" className="px-3 py-3">
                    {t("total Loan Amount")}
                  </th>

                  <th scope="col" className="px-3 py-3">
                    {t("total Loan Repayable")}
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3 cursor-pointer  sticky right-0 bg-white z-10"
                  >
                    {t("Action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {getSingleLoanTypeEmi?.map((v, k) => (
                  <tr
                    key={k}
                    className="bg-white border-b dark:border-gray-200"
                  >
                    <td
                      scope="row"
                      className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                    >
                      <a>{v?.finalEligibleEMI}</a>
                    </td>
                    <td>{v?.monthlyInstallment}</td>
                    <td>{v?.principalLoanAmount}</td>
                    <td>{v?.profit}</td>
                    <td>{v?.tenureInMonths}</td>
                    <td>{v?.termRate}</td>
                    <td>{v?.totalLoanAmount}</td>
                    <td>{v?.totalLoanRepayable}</td>
                    <td>
                      {" "}
                      <div
                        onClick={() =>
                          navigate(
                            `/finance-amount-calculations?financeAmount=${v?.totalLoanAmount}&term=${v?.tenureInMonths}&userId=${userId}`
                          )
                        }
                        className="py-1 px-3 rounded-md bg-blue-500 w-max text-white cursor-pointer hover:opacity-80"
                      >
                        Term Rate Calculations
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardMain>
      ) : (
        <div className="py-20 px-20 text-center w-full border border-gray-300 rounded-sm mt-6">
          <a>{"Nothing To Show!"}</a>
        </div>
      )}
    </div>
  );
}
export default AllUsers;
