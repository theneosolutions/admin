import React from "react";
import Header from "./Header";
import DataProvider from "./DataProvider";
import CreditReportSummary from "./creditReportSummary";
import PreviousInquiries from "./previousInquiries";
import DefaultProductSummary from "./defaultProductSummary";
import GurantersDefaultSummry from "./gaurantersDefaultSummary";
import BouncingCheckSummry from "./BouncingCheckSummary";
import PublicNotes from "./publicNotes";
import EnforcementJudgement from "./enforcementJudgement";
import ProductDetail from "./productDetail";
import MemberNarative from "./memberNarrative";
import PersonalNarative from "./personalNarrative";
import ContactNumbers from "./contactNumbers";
import Disclaimer from "./disclaimer";

function UserSimah() {
  const w1 = "w-1/5";
  const w2 = "w-4/5";
  return (
    <div className=" px-10 py-10 bg-white  border  w-full mt-4 md:mt-0">
      <Header />
      <DataProvider w1={w1} w2={w2} />
      <CreditReportSummary w1={w1} w2={w2} />
      <PreviousInquiries w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />
      <ProductDetail w1={w1} w2={w2} />

      <DefaultProductSummary w1={w1} w2={w2} />
      <GurantersDefaultSummry w1={w1} w2={w2} />
      <BouncingCheckSummry w1={w1} w2={w2} />
      <PublicNotes w1={w1} w2={w2} />
      <EnforcementJudgement w1={w1} w2={w2} />
      <MemberNarative w1={w1} w2={w2} />
      <ContactNumbers w1={w1} w2={w2} />

      <PersonalNarative w1={w1} w2={w2} />
      <Disclaimer w1={w1} w2={w2} />
    </div>
  );
}
export default UserSimah;
