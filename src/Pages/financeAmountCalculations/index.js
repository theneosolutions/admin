import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import withAuthorization from "constants/authorization";
import { ROLES } from "constants/roles";
import { useLocation } from "react-router-dom";

function AllUsers() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const term = queryParams.get("term");
  const financeAmount = queryParams.get("financeAmount");

  const getTermRatesCalculations = useSelector(
    (state) => state.getTermRatesCalculations
  );

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  useEffect(() => {
    getAllReasons();
  }, []);

  function getAllReasons() {
    dispatch({
      type: "GET_TERM_RATES_CALCULATION",
      payload: { financeAmmount: financeAmount, term: term, userId: userId },
    });
  }

  return (
    <div className="py-5">
      <CardMain
        headerDisable={true}
        width="w-full  "
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Month")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Monthly Installment")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("First Installment Date")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("interest Amount Table")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("last Installment Date")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("outstanding Principal")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("principal Amount Table")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getTermRatesCalculations?.table?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <a>{v?.month}</a>
                  </td>
                  <td>{v?.details?.monthlyInstallment}</td>
                  <td>{v?.details?.firstInstallmentDate}</td>
                  <td>{v?.details?.interestAmountTable}</td>
                  <td>{v?.details?.lastInstallmentDate}</td>
                  <td>{v?.details?.outstandingPrincipal}</td>
                  <td>{v?.details?.principalAmountTable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>
      <CardMain
        headerDisable={true}
        width="w-full mt-10"
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("adminFee")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("amortizationRate")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("calculatedAdminFee")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("calculatedVat")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("emimonthlyInstallement")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("financeAmount")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("firstInstallmentDate")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("interestAmount")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("lastInstallmentDate")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("netProceed")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("term")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("termRate")}
                </th>{" "}
                <th scope="col" className="px-3 py-3">
                  {t("totalAmount")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("totalFee")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("vat")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  scope="row"
                  className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                >
                  <a>{getTermRatesCalculations?.adminFee}</a>
                </td>
                <td>{getTermRatesCalculations?.amortizationRate}</td>
                <td>{getTermRatesCalculations?.calculatedAdminFee}</td>
                <td>{getTermRatesCalculations?.calculatedVat}</td>
                <td>{getTermRatesCalculations?.emimonthlyInstallement}</td>
                <td>{getTermRatesCalculations?.financeAmount}</td>
                <td>{getTermRatesCalculations?.firstInstallmentDate}</td>
                <td>{getTermRatesCalculations?.interestAmount}</td>{" "}
                <td>{getTermRatesCalculations?.lastInstallmentDate}</td>
                <td>{getTermRatesCalculations?.netProceed}</td>
                <td>{getTermRatesCalculations?.term}</td>
                <td>{getTermRatesCalculations?.termRate}</td>
                <td>{getTermRatesCalculations?.totalAmount}</td>
                <td>{getTermRatesCalculations?.totalFee}</td>{" "}
                <td>{getTermRatesCalculations?.totalFee}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardMain>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default withAuthorization(AllUsers, [
  ROLES.ADMIN,
  ROLES.CUSTOMER_CARE,
  ROLES.COMPLIANCE,
]);
