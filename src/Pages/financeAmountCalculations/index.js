import React from "react";
import { useTranslation } from "react-i18next";
import CardMain from "Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "constants/authorization";
import { ROLES } from "constants/roles";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import * as action from "../../Services/redux/reducer";
import moment from "moment";
import generatePDF from "react-to-pdf";
import { useRef } from "react";

import LoanApplicationForm from "../../Components/loanForms";
function AllUsers() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const targetRef = useRef();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const term = queryParams.get("term");
  const financeAmount = queryParams.get("financeAmount");

  const getTermRatesCalculations = useSelector(
    (state) => state.getTermRatesCalculations
  );
  //

  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    getAllReasons();
  }, []);

  function getAllReasons() {
    dispatch({
      type: "GET_TERM_RATES_CALCULATION",
      payload: { financeAmmount: financeAmount, term: term, userId: userId },
    });
  }
  function DateSet(newDate) {
    var timestamp = parseInt(newDate); // Example timestamp value
    var date = new Date(timestamp);
    return moment(date.toString()).subtract(10, "days").calendar();
  }

  async function downloadPDFDocument() {
    dispatch(action.Loading({ Loading: true }));

    const input = document.getElementById("content-to-download");
    const canvas = await html2canvas(input, {
      scale: 1.2, // Adjust scale as needed
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1); // Adjust quality as needed
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("download.pdf");
    dispatch(action.Loading({ Loading: false }));
  }
  const ContractTable = () => {
    return (
      <table className="text-gray-600 text-md table-fixed border-collapse border border-gray-400 w-1/2 bg-white text-start rounded-sm overflow-hidden h-max">
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">{t("Admin Fee")}</td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.adminFee}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">
              {t("Amortization Rate")}
            </td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.amortizationRate}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">
              {t("Calculated Admin Fee")}
            </td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.calculatedAdminFee}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">
              {t("Calculated Vat")}{" "}
            </td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.calculatedVat}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">{t("Apr Rate")}</td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.aprRate}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">
              {t("Emi monthly Installement")}
            </td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.emimonthlyInstallement}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">{t("Annual Rate")}</td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.annualRate}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">
              {t("First Installment Date")}
            </td>
            <td className="border border-gray-300 p-2">
              {DateSet(getTermRatesCalculations?.firstInstallmentDate)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">
              {t("Interest Amount")}
            </td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.interestAmount}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const ContractTable2 = () => {
    return (
      <table className="text-gray-600 text-md table-fixed border-collapse border border-gray-400 w-1/2 bg-white text-start rounded-sm overflow-hidden h-max">
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">
              {t("Finance Amount")}
            </td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.financeAmount}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">
              {t("Last Installment Date")}
            </td>
            <td className="border border-gray-300 p-2">
              {DateSet(getTermRatesCalculations?.lastInstallmentDate)}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">{t("Net Proceed")}</td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.netProceed}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">{t("Term")}</td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.term}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">{t("Term Rate")}</td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.termRate}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">{t("Total Amount")}</td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.totalAmount}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">{t("Total Fee")}</td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.totalFee}
            </td>
          </tr>{" "}
          <tr>
            <td className="border border-gray-300 p-2">{t("Vat")}</td>
            <td className="border border-gray-300 p-2">
              {getTermRatesCalculations?.vat}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  return (
    <div className="py-5">
      {/* <LoanApplicationForm /> */}
      {message === "successEmi" && error === false ? (
        <>
          <button
            onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
            className={` w-max mx-10 px-3 py-1 cursor-pointer hover:opacity-80 rounded-md bg-blue-500 text-white `}
          >
            {t("Download as PDF")}
          </button>

          <div
            ref={targetRef}
            style={{
              width: "100%",
              minHeight: "297mm",
            }}
            className="px-10 mb-6 mt-6 bg-transparent"
          >
            <div className="w-full  items-center justify-center flex flex-row text-xl font-semibold">
              {t("Re-Payment Schedule")}
            </div>
            <div className="flex flex-row justify-between mb-10 mt-10 space-x-14 rtl:space-x-reverse">
              <ContractTable />
              <ContractTable2 />
            </div>

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
                        {t("Interest Amount Table")}
                      </th>

                      <th scope="col" className="px-3 py-3">
                        {t("Last Installment Date")}
                      </th>

                      <th scope="col" className="px-3 py-3">
                        {t("Outstanding Principal")}
                      </th>

                      <th scope="col" className="px-3 py-3">
                        {t("Principal Amount Table")}
                      </th>

                      <th scope="col" className="px-3 py-3">
                        {t("Due Installment Date")}
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
                        <td className="px-3">
                          {v?.details?.monthlyInstallment}
                        </td>
                        <td className="px-3">
                          {DateSet(v?.details?.firstInstallmentDate)}
                        </td>
                        <td className="px-3">
                          {v?.details?.interestAmountTable}
                        </td>
                        <td className="px-3">
                          {" "}
                          {DateSet(v?.details?.lastInstallmentDate)}
                        </td>
                        <td className="px-3">
                          {v?.details?.outstandingPrincipal}
                        </td>
                        <td className="px-3">
                          {v?.details?.principalAmountTable}
                        </td>
                        <td className="px-3">
                          {v?.details?.dueInstallmentDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardMain>
          </div>
        </>
      ) : (
        <div className="py-20 px-20 text-center w-full border border-gray-300 rounded-sm mt-6">
          <a>{"Nothing To Show!"}</a>
        </div>
      )}
    </div>
  );
}
export default withAuthorization(AllUsers, [
  ROLES.ADMIN,
  ROLES.CUSTOMER_CARE,
  ROLES.COMPLIANCE,
  ROLES.UNDER_WRITER,
]);
