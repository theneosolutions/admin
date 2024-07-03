import React, { useEffect, useState } from "react";
import { PiCheckFatThin } from "react-icons/pi";
import CardMain from "Components/Cards/main";
import { Model } from "Components";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { CgArrowsExchange } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TransferRajhi } from "Services/OtherApis";
import * as action from "Services/redux/reducer";

function LaonApplication() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const [active, setActive] = useState("Pending_Cashout");
  const [data, setData] = useState("");

  const getUserApplication = useSelector((state) => state.getUserApplication);

  const user = useSelector((state) => state.getUserById);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  useEffect(() => {
    getUserLoanDetail();
  }, []);
  console.log("active", active);

  useEffect(() => {
    if (getUserApplication) {
      setData(getUserApplication?.loanApplication);
      console.log(
        "helooooooooooo",
        getUserApplication?.loanApplication?.status
      );
      setActive(getUserApplication?.loanApplication?.status);
    }
  }, [getUserApplication]);
  function SetStatus() {
    dispatch({
      type: "SET_STATUS_OF_APPLICATION",
      payload: { status: active, id: userId },
    });
    setTimeout(() => getUserLoanDetail(), 500);
  }
  function getUserLoanDetail() {
    dispatch({
      type: "GET_USER_APPLICATION_DATA",
      payload: userId,
    });
    dispatch({
      type: "GET_USER_BY_ID",
      payload: userId,
    });
  }
  function Transfer() {
    dispatch(action.Loading({ Loading: true }));
    TransferRajhi(userId)
      .then((data) => {
        if (data?.error === false) {
          dispatch(
            action.Message({
              open: true,
              message: "Payment transaction successful",
              error: false,
            })
          );
          dispatch(action.Loading({ Loading: false }));
        } else {
          console.log("data", data);

          dispatch(
            action.Message({
              open: true,
              message: data?.message || "Error",
              error: true,
            })
          );
          dispatch(action.Loading({ Loading: false }));
        }
      })
      .catch((error) => dispatch(action.Loading({ Loading: false })));
    console.log("Transfer");
  }
  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        iconStyle="text-3xl text-primary "
        headerDisable={true}
      >
        <div className="">
          <div className="flex flex-col md:flex-row justify-between md:items-center border-b-2	 border-gray-200 pb-3 pt-1 ">
            <div className="flex flex-row">
              {/* <img
                className="h-14 w-14 rounded-full object-cover"
                src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"
              /> */}
              <div className="flex flex-col mx-3 space-y-0.5">
                <a className="text-xs text-gray-400">Name</a>
                <a className="text-sm text-gray-700 font-semibold">
                  {user?.user?.firstName + " " + user?.user?.lastName}
                </a>
                <a
                  className={`text-xs ${
                    user?.user?.active ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user?.user?.active ? "Active" : "Not Active"}
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:mt-0 mt-4  md:space-y-0 space-y-2">
              <Text
                heading="Loan Amount"
                value={data?.financeAmount || 0}
                style="text-green-600"
              />
              <Text
                heading="After Interest"
                value={data?.interestAmount || 0}
              />
              <Text
                heading="With Tax And Interest"
                value={data?.interestAmount || 0}
              />
              <Text heading="Tenure" value={data?.term || 0} />
              <Text heading="Application Number" value={data?.id || 0} />
            </div>
            <div>
              <a
                className={` ${
                  data?.status === "Rejected_CashOut"
                    ? "text-red-400"
                    : "text-green-400"
                } md:px-2 text-md font-semibold `}
              >
                {data?.status}
              </a>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col pt-7 ">
            <div className="flex flex-col md:flex-row w-full lg:w-1/2 ">
              <div className="flex flex-row w-full  md:w-1/2 ">
                <div className="flex flex-col pb-5 space-y-5">
                  <div className="flex flex-col">
                    <a className="text-xs text-gray-400">Iqama Number</a>
                    <a className="text-sm text-gray-700 font-semibold opacity-90">
                      {user?.user?.idNumber}
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <a className="text-xs text-gray-400">User ID</a>
                    <a className="text-sm text-gray-700 font-semibold opacity-90">
                      {userId}
                    </a>
                  </div>
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">Account Locked</a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {user?.user?.accountNonLocked ? "Locked" : "Not Locked"}
                    </a>
                  </div>
                  <div className="flex flex-col ">
                    <a className="text-xs uppercase text-green-400">
                      Absher Verified{" "}
                    </a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {user?.user?.ownerVerification
                        ? "Verified"
                        : "Not Verified"}
                    </a>
                  </div>
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">Name </a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {user?.user?.firstName + " " + user?.user?.lastName}
                    </a>
                  </div>
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">Email</a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {user?.user?.email}
                    </a>
                  </div>
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">Gender</a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {user?.user?.gender}
                    </a>
                  </div>
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">
                      Date Of Birth In Hijri
                    </a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {user?.user?.hijriDateOfBirth}
                    </a>
                  </div>{" "}
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">Mobile Number</a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {user?.user?.mobileNumber}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full  md:w-1/2  md:border-l-2	 lg:border-r-2	 border-gray-200 md:px-4">
                <div className="flex flex-col  pb-5 space-y-4">
                  <div className="flex flex-col">
                    <a className="text-xs text-gray-400 uppercase">
                      Loan Amount
                    </a>
                    <a className="text-xl text-green-500 font-semibold opacity-90">
                      {data?.financeAmount}
                    </a>
                  </div>
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">Admin Fee </a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {data?.adminFee}
                    </a>
                  </div>
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">
                      Calculated Admin Fee{" "}
                    </a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {data?.calculatedAdminFee}
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <a className="text-xs text-gray-400 uppercase">Apr Rate</a>
                    <a className="text-xl text-gray-600 font-semibold opacity-90">
                      {data?.aprRate}
                    </a>
                  </div>
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">Amortization Rate </a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {data?.amortizationRate}
                    </a>
                  </div>
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">Calculated Vat </a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {data?.calculatedVat}
                    </a>
                  </div>{" "}
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">Effective Rate </a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {data?.effectiveRate}
                    </a>
                  </div>{" "}
                  <div className="flex flex-col ">
                    <a className="text-xs text-gray-400 ">Net Proceed Rate </a>
                    <a className="text-sm text-gray-700  opacity-90">
                      {data?.netProceed}
                    </a>
                  </div>{" "}
                  <div className="flex flex-col">
                    <a className="text-xs text-gray-400 uppercase">Tenure</a>
                    <a className="text-xl text-gray-600 font-semibold opacity-90">
                      {data?.term} Month
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <a className="text-xs text-gray-400 uppercase">
                      Intrest Ratio
                    </a>
                    <a className="text-xl text-gray-600 font-semibold opacity-90">
                      {data?.interestAmount}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-1/2  lg:px-4 lg:mt-0 mt-5">
              <div className="w-full lg:w-3/5		space-y-10">
                {/* {data?.status === "Approved_CashOut" ? (
                  <div
                    onClick={() => Transfer()}
                    className={` w-min text-white bg-blue-500 hover:opacity-80 duration-200 cursor-pointer border-blue-400 border px-8 py-2 rounded-md  items-center flex flex-col   `}
                  >
                    <div className="uppercase text-xs font-semibold">
                      Transfer
                    </div>
                  </div>
                ) : null} */}
                <Progress
                  heading="Eligibility Loan Amount"
                  value={data?.totalAmount}
                  progressValue="50%"
                  // min="Min 2K"
                  // max="Max 4 Lakh"
                />

                <Progress
                  heading="Tenure"
                  value={data?.term + " Months"}
                  progressValue="20%"
                  min="Min 6 Months"
                  max="Min 36 Months"
                />
              </div>

              <div className="flex flex-col md:flex-row mt-6 space-y-2 md:space-y-0"></div>
              <div className="flex flex-col md:flex-row mt-6 space-y-2 md:space-y-0">
                <Text2
                  heading="Monthly Installment"
                  value={data?.emimonthlyInstallement}
                />
                <Text2 heading="Total Fee" value={data?.totalFee} />{" "}
                <Text2 heading="Vat on Fee" value={data?.vat} />{" "}
              </div>
              <div className="flex flex-col md:flex-row justify-between mt-10 md:space-x-2">
                {/* {active === "Pending_Cashout" && (
                  <Button
                    setActive={(e) => setActive(e)}
                    active={active}
                    value={"Pending_Cashout"}
                    icon={<PiCheckFatThin className="text-2xl" />}
                  />
                )} */}

                <Button
                  setActive={(e) => setActive(e)}
                  active={active}
                  value="Approved_CashOut"
                  icon={<CgArrowsExchange className="text-2xl" />}
                />
                <Button
                  setActive={(e) => setActive(e)}
                  active={active}
                  value="Rejected_CashOut"
                  icon={<RxCross2 className="text-2xl" />}
                />
              </div>
              <textarea
                placeholder="Reason"
                className=" text-sm max-h-36   border border-gray-300 rounded-md bg-gray-50 outline-none px-3 py-2 mt-4"
              />
              <div className="mt-5 flex flex-row justify-between">
                <div></div>

                <div
                  onClick={() => SetStatus()}
                  className={` w-min text-white bg-blue-500 hover:opacity-80 duration-200 cursor-pointer border-blue-400 border px-8 py-2 rounded-md  items-center flex flex-col   `}
                >
                  <div className="uppercase text-xs font-semibold">Submit</div>
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
          {t("Are You Sure To Delete ?")}
          <span className="font-semibold"> Ali Imtayaz</span>
        </a>
      </Model>
    </div>
  );
}
export default LaonApplication;

function Button({ value, icon, active, setActive }) {
  return (
    <div
      onClick={() => setActive(value)}
      className={`${
        active == value ? "text-white bg-blue-400" : "text-blue-400"
      } hover:opacity-80 duration-200 cursor-pointer border-blue-400 border px-8 py-4 rounded-md  items-center flex flex-col md:mt-0 mt-2  `}
    >
      {icon}
      <div className="uppercase text-xs font-semibold">
        {value === "Approved_CashOut"
          ? "Approved"
          : value === "Rejected_CashOut"
          ? "Reject"
          : "Pending"}
      </div>
    </div>
  );
}
function Progress({ heading, value, progressValue, min, max }) {
  return (
    <div className="flex flex-col ">
      <a className="text-xs text-gray-400 uppercase">{heading}</a>
      <a className="text-xl text-gray-700 font-semibold opacity-90 mt-1">
        {value}
      </a>
      <div className="relative mt-1">
        <div
          className="w-full bg-gray-400  absolute rounded-full"
          style={{ height: 1 }}
        ></div>
        <div className="" style={{ marginTop: -5 }}>
          <div
            className="relative items-center flex justify-end "
            style={{ width: progressValue }}
          >
            <div
              className="w-full bg-blue-500  flex flex-row justify-between absolute rounded-full"
              style={{ height: 1 }}
            ></div>

            <div className="h-3  w-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <a className="text-xs text-gray-600 opacity-90 mt-1">{min}</a>{" "}
        <a className="text-xs text-gray-600 opacity-90 mt-1">{max}</a>{" "}
      </div>{" "}
    </div>
  );
}

function Text({ heading, value, style }) {
  return (
    <div className="flex flex-col md:mx-3 space-y-0.5 px-1">
      <a className="text-xs text-gray-400">{heading}</a>
      <a
        className={`text-sm text-gray-700 font-semibold opacity-90 md:p-1 ${style}`}
      >
        {value}
      </a>
    </div>
  );
}

function Text2({ heading, value }) {
  return (
    <div className="flex flex-col space-y-0.5 w-full md:w-1/3	">
      <a className="text-xs text-gray-400">{heading}</a>
      <a className="text-sm text-gray-700  opacity-90 pt-1">{value}</a>
    </div>
  );
}
