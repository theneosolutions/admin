import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardMain from "Components/Cards/main";
import Delete from "Assets/Images/delete.svg";
import { Model, Avatar } from "Components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";

function LaonApplication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);
  const [allApplications, setAllApplications] = useState([]);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [active, setActive] = useState("All");

  const loanApplications = useSelector((state) => state.getApplications);

  function onDelete() {
    setModelOpen(true);
  }
  useEffect(() => {
    getAllloanApplicationsData();
  }, []);
  function getAllloanApplicationsData() {
    dispatch({
      type: "GET_LOAN_APPLICATIONS",
    });
  }

  useEffect(() => {
    if (loanApplications?.length > 0) {
      const pendingLoans = loanApplications?.filter(
        (loan) =>
          loan.status.toLowerCase() === "pending" ||
          loan.status.toLowerCase() === "pending_cashout"
      );
      const approvedLoans = loanApplications?.filter(
        (loan) =>
          loan.status.toLowerCase() === "approved" ||
          loan.status.toLowerCase() === "approved_cashout"
      );
      const rejectedLoans = loanApplications?.filter(
        (loan) =>
          loan.status.toLowerCase() === "rejected" ||
          loan.status.toLowerCase() === "rejected_cashout"
      );

      setAllApplications(loanApplications);

      setApproved(approvedLoans);
      setPending(pendingLoans);
      setRejected(rejectedLoans);
    }
  }, [loanApplications]);

  return (
    <div className="py-5">
      <div className="flex md:flex-row flex-col  md:space-x-6 rtl:space-x-reverse">
        <Notifications
          active={active === "All"}
          onClick={() => (
            setAllApplications(loanApplications), setActive("All")
          )}
          value={loanApplications?.length}
          heading={t("All Applications")}
          color="text-blue-500 text-xl"
        />
        <Notifications
          active={active === "Approved"}
          onClick={() => (setAllApplications(approved), setActive("Approved"))}
          value={approved?.length || 0}
          heading={t("Approved")}
          color="text-green-500 text-xl"
        />
        <Notifications
          active={active === "Pending"}
          onClick={() => (setAllApplications(pending), setActive("Pending"))}
          value={pending?.length || 0}
          heading={t("Pending")}
          color="text-orange-500 text-xl"
        />
        <Notifications
          active={active === "Rejected"}
          onClick={() => (setAllApplications(rejected), setActive("Rejected"))}
          value={rejected?.length || 0}
          heading={t("Rejected")}
          color="text-red-700 text-xl"
        />
      </div>
      <CardMain
        width="w-full  mt-10"
        heading={t(`${t(active)} ${t("Loan Applications")} `)}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("User Id")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Monthly installment")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Loan Ammount")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Interest Ammount")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Vat Fee")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Status")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Action")}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 cursor-pointer  sticky right-0 bg-white z-10"
                >
                  {t("Delete")}
                </th>
              </tr>
            </thead>
            <tbody>
              {allApplications?.map((v, k) => (
                <tr key={k} className="bg-white border-b dark:border-gray-200">
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <Avatar
                      icon={
                        "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png"
                      }
                    />

                    <a>{v.userId}</a>
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {v.emimonthlyInstallement}
                  </td>
                  <td className="px-3 py-4">{v.totalAmount}</td>
                  <td className="px-3 py-4">{v.interestAmount}</td>
                  <td className="px-3 py-4">{v.vat}</td>
                  <td className="px-3 py-4">{v.status}</td>
                  <td className="px-3 py-4">
                    <div
                      onClick={() =>
                        navigate(
                          `/applications/loan/user-profile?id=${v.userId}`
                        )
                      }
                      className=" border border-primary px-3 py-1 w-max rounded-md cursor-pointer hover:bg-primary hover:text-white duration-300"
                    >
                      {t("View Details")}
                    </div>
                  </td>
                  <th
                    scope="row"
                    className=" px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white sticky right-0 bg-white z-10"
                  >
                    <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                      <img
                        src={Delete}
                        className="h-6 cursor-pointer"
                        onClick={() => onDelete()}
                      />
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
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
          {t("Are you sure to delete this ?")}
          <span className="font-semibold"> </span>
        </a>
      </Model>
    </div>
  );
}

export default withAuthorization(LaonApplication);

function Notifications({ heading, value, color, onClick, active }) {
  return (
    <div
      onClick={() => onClick()}
      className={`flex font-semibold flex-col   px-10 py-8 text-center rounded-md md:w-1/4 w-full md:mt-0 mt-4 hover:bg-opacity-70 cursor-pointer shadow-xl duration-300 ${
        active ? "bg-blue-100" : "bg-gray-200"
      } `}
    >
      <a className={color}>{value}</a>
      <a className="text-xs text-gray-700 mt-2">{heading}</a>
    </div>
  );
}
