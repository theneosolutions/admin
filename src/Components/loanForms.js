import { useRef } from "react";
import generatePDF from "react-to-pdf";
import React from "react";
import Logo from "Assets/Images/logo.svg";

const LoanApplicationForm = () => {
  const targetRef = useRef();
  return (
    <div>
      <button onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}>
        Download PDF
      </button>
      <div ref={targetRef}>
        <PersonalLoanAgreement />
      </div>
    </div>
  );
};
export default LoanApplicationForm;

const PersonalLoanAgreement = () => {
  return (
    <div className="container mx-auto my-10 p-4 bg-white shadow-lg max-w-4xl">
      <div className=" items-center justify-center flex">
        <img src={Logo} className="mb-5" />
      </div>

      <h1 className="text-2xl font-bold mb-4">PERSONAL LOAN AGREEMENT</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">1. THE PARTIES</h2>
        <p className="mb-2">
          This Personal Loan Agreement (“Agreement”) made this [DATE] is
          between:
        </p>

        <p className="mb-2">
          Borrower: [BORROWER’S NAME] with a mailing address of [ADDRESS]
          (“Borrower”) and agrees to borrow money from:
        </p>

        <p>
          Lender: [LENDER’S NAME] with a mailing address of [ADDRESS] and agrees
          to lend money to the Borrower under the following terms:
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">2. LOAN AMOUNT</h2>
        <p className="mb-4">
          The total amount of money being borrowed from the Lender to the
          Borrower is $[AMOUNT] (“Borrowed Money”).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">3. INTEREST RATE</h2>
        <div className="mb-4">
          <input type="checkbox" className="mr-2" id="interestCheckbox" />
          <label htmlFor="interestCheckbox">
            Bear Interest. The Borrowed Money shall bear interest at a rate of
            [#]% compounded:
          </label>
          <div className="ml-6">
            <input type="checkbox" className="mr-2" id="annuallyCheckbox" />
            <label htmlFor="annuallyCheckbox">Annually</label>
            <br />
            <input type="checkbox" className="mr-2" id="monthlyCheckbox" />
            <label htmlFor="monthlyCheckbox">Monthly</label>
            <br />
            <input type="checkbox" className="mr-2" id="otherCheckbox" />
            <label htmlFor="otherCheckbox">Other: [OTHER]</label>
          </div>
        </div>

        <div>
          <input type="checkbox" className="mr-2" id="noInterestCheckbox" />
          <label htmlFor="noInterestCheckbox">
            NOT Bear Interest. There shall be no interest associated with the
            Borrowed Money. The Borrower’s only obligation to the Lender is to
            repay the principal balance.
          </label>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">4. TERM</h2>
        <p className="mb-4">
          The total amount of the Borrowed Money, including principal and
          interest, shall be due and payable on [DATE] (“Due Date”).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">5. PAYMENTS</h2>
        <div className="mb-4">
          <input type="checkbox" className="mr-2" id="weeklyPaymentsCheckbox" />
          <label htmlFor="weeklyPaymentsCheckbox">
            Weekly Payments. The Borrower agrees to repay the Lender on the
            [DAY] of each week until the Due Date.
          </label>
          <br />
          <input
            type="checkbox"
            className="mr-2"
            id="monthlyPaymentsCheckbox"
          />
          <label htmlFor="monthlyPaymentsCheckbox">
            Monthly Payments. The Borrower agrees to repay the Lender on the
            [DAY] of each month until the Due Date.
          </label>
          <br />
          <input type="checkbox" className="mr-2" id="lumpSumCheckbox" />
          <label htmlFor="lumpSumCheckbox">
            Lump Sum. The Borrower agrees to repay the Lender, in full, on the
            Due Date.
          </label>
          <br />
          <input type="checkbox" className="mr-2" id="otherPaymentsCheckbox" />
          <label htmlFor="otherPaymentsCheckbox">Other. [OTHER]</label>
        </div>
        <p className="mb-2">
          Hereinafter known as the “Payment Schedule.” All payments made by the
          Borrower shall be first applied to any accrued interest and second to
          the principal balance.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">6. LATE PAYMENT</h2>
        <div className="mb-4">
          <input type="checkbox" className="mr-2" id="latePaymentCheckbox" />
          <label htmlFor="latePaymentCheckbox">
            If the Borrower is late by more than [#] days for any payment due,
            it shall be considered late.
          </label>
          <br />
          <input type="checkbox" className="mr-2" id="lateFeeCheckbox" />
          <label htmlFor="lateFeeCheckbox">
            Charged a Late Fee. The Borrower shall be charged a late fee equal
            to: [LATE FEE AMOUNT]
          </label>
          <br />
          <input type="checkbox" className="mr-2" id="noLateFeeCheckbox" />
          <label htmlFor="noLateFeeCheckbox">
            Not Charged a Late Fee. The Borrower shall not be charged a late
            fee.
          </label>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">7. SECURITY</h2>
        <div className="mb-4">
          <input type="checkbox" className="mr-2" id="pledgeSecurityCheckbox" />
          <label htmlFor="pledgeSecurityCheckbox">
            Pledge Security. The Borrower agrees to secure this Agreement by
            pledging the following collateral: [DESCRIBE] (“Security”).
          </label>
          <div className="ml-6">
            <input type="checkbox" className="mr-2" id="entiretyCheckbox" />
            <label htmlFor="entiretyCheckbox">
              In its entirety and without discount to the amount owed.
            </label>
            <br />
            <input type="checkbox" className="mr-2" id="saleRequiredCheckbox" />
            <label htmlFor="saleRequiredCheckbox">
              Equal to the amount owed of which a sale may be required.
            </label>
          </div>
          <br />
          <input type="checkbox" className="mr-2" id="noPledgeCheckbox" />
          <label htmlFor="noPledgeCheckbox">
            Not Pledge Security. This Agreement shall not be secured by any
            property or asset of the Borrower.
          </label>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">8. ACCELERATION</h2>
        <p className="mb-4">
          The Lender shall have the right to declare the Borrowed Money to be
          immediately due and payable, including interest owed, if any of the
          events are to occur:
        </p>
        <ol className="list-decimal ml-6 mb-4">
          <li>
            Late Payment. If any payment is late that is due under the Payment
            Schedule of more than 15 days;
          </li>
          <li>
            Default. If the Borrower should default on any of the conditions of
            this Agreement;
          </li>
          <li>
            Security. If assets or property that are pledged as Security as part
            of this Agreement are transferred or sold.
          </li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">9. SEVERABILITY</h2>
        <p>
          If any provision of this Agreement or the application thereof shall,
          for any reason and to any extent, be invalid or unenforceable, neither
          the remainder of this Agreement nor the application of the provision
          to other persons, entities, or circumstances shall be affected,
          thereby, but instead shall be enforced to the maximum extent permitted
          by law.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">10. GOVERNING LAW</h2>
        <p>
          This Agreement shall be construed and governed by the laws located in
          the state of [GOVERNING LAW] (“Governing Law”).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">IN WITNESS WHEREOF</h2>
        <p>
          Borrower and Lender have executed this Agreement as of the day and
          year first above written.
        </p>

        <div className="mb-4">
          <p className="mb-2">
            Borrower’s Signature: _____________________ Date: _____________
          </p>
          <p>Print Name: _____________________</p>
        </div>

        <div>
          <p className="mb-2">
            Lender’s Signature: _____________________ Date: _____________
          </p>
          <p>Print Name: _____________________</p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">GUARANTOR ADDENDUM</h2>
        <p>
          The Guarantor, known as [GUARANTOR’S NAME], agrees to be liable and
          pay the Borrowed Amount, including principal and interest, in the
          event of the Debtor’s default. The Guarantor agrees to be personally
          liable under the terms and obligations of the Debtor in this
          Agreement.
        </p>

        <div className="mb-4">
          <p className="mb-2">
            Guarantor’s Signature: _____________________ Date: _____________
          </p>
          <p>Print Name: _____________________</p>
        </div>
      </section>
    </div>
  );
};
