import React from "react";
import { useTranslation } from "react-i18next";
import AgeLimit from "./ageLimit";
import IncomeValidation from "./IncomeValidation";
import IdValidation from "./idValidation";
import FinanceValidation from "./financeValidation";
import LoanTennure from "./loanTennure";
function Policies() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8 mt-3">
      <AgeLimit />
      <IncomeValidation />
      <IdValidation />
      <FinanceValidation />
      <LoanTennure />
    </div>
  );
}
export default Policies;
