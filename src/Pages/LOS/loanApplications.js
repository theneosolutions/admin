import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdVerified } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";

import CardMain from "Components/Cards/main";
import Edit from "Assets/Images/edit.svg";
import Delete from "Assets/Images/delete.svg";
import { Model, Avatar } from "Components";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure

import { useEffect } from "react";
function LaonApplication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);
  const [applications, setApplications] = useState([]);

  const [allApplications, setAllApplications] = useState([]);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const [active, setActive] = useState("All");

  const users = useSelector((state) => state.getApplications);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  function onDelete() {
    setModelOpen(true);
  }
  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_LOAN_APPLICATIONS",
    });
  }
  useEffect(() => {
    if (users?.length > 0) {
      const pendingLoans = users?.filter(
        (loan) => loan.status.toLowerCase() === "pending"
      );
      const approvedLoans = users?.filter(
        (loan) => loan.status.toLowerCase() === "approved"
      );
      const rejectedLoans = users?.filter(
        (loan) => loan.status.toLowerCase() === "rejected"
      );

      setApplications(users);
      setAllApplications(users);

      setApproved(approvedLoans);
      setPending(pendingLoans);
      setRejected(rejectedLoans);
    }
  }, [users]);
  function CheckEligibility(other, numeric) {
    if (other && numeric) {
      return (
        <div className="flex flex-row font-semibold space-x-1 text-green-700 items-center">
          <MdVerified className="text-xl" />
          <a className="text-md ">Eligible</a>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row font-semibold space-x-1 text-red-700 items-center">
          <RxCrossCircled className="text-xl" />
          <a className="text-md ">Not Eligible</a>
        </div>
      );
    }
  }

  // console.log("helooo", pendingLoans);
  return (
    <div className="py-5">
      <WaveAnimation show={loading} />
      <div className="flex md:flex-row flex-col  md:space-x-6">
        <Notifications
          active={active === "All"}
          onClick={() => (setApplications(allApplications), setActive("All"))}
          value={allApplications?.length}
          heading="All Applications"
          color="text-blue-500 text-xl"
        />
        <Notifications
          active={active === "Approved"}
          onClick={() => (setApplications(approved), setActive("Approved"))}
          value={approved?.length || 0}
          heading="Approved"
          color="text-green-500 text-xl"
        />
        <Notifications
          active={active === "Pending"}
          onClick={() => (setApplications(pending), setActive("Pending"))}
          value={pending?.length || 0}
          heading="Pending"
          color="text-orange-500 text-xl"
        />
        <Notifications
          active={active === "Rejected"}
          onClick={() => (setApplications(rejected), setActive("Rejected"))}
          value={rejected?.length || 0}
          heading="Rejected"
          color="text-red-700 text-xl"
        />
      </div>
      <CardMain
        width="w-full  mt-10"
        heading={t(`${active} Loan Applications `)}
        // icon={<MdVerified />}
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
                  {t("Loan Reason")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Loan Ammount")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Maturity Data")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Duration")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Action")}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 cursor-pointer  sticky right-0 bg-white z-10"
                >
                  {t("Edit/Delete")}
                </th>
              </tr>
            </thead>
            <tbody>
              {applications?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <Avatar
                      icon={
                        "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png"
                      }
                      // onClick={() =>
                      //   navigate(
                      //     `/profile?id=${v?.user.idNumber}&name=Profile&user=${v?.user?.id}`
                      //   )
                      // }
                    />

                    <a>{v.userId}</a>
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {v.formulaName}
                  </td>
                  <td className="px-3 py-4">{v.loanAmount}</td>
                  <td className="px-3 py-4">{v.maturityDate}</td>
                  <td className="px-3 py-4">{v.month + " Months"}</td>

                  <td className="px-3 py-4">
                    <div
                      onClick={() => navigate(`/user-profile?id=${v.userId}`)}
                      className=" border border-primary px-3 py-1 w-max rounded-md cursor-pointer hover:bg-primary hover:text-white duration-300"
                    >
                      View Details
                    </div>
                  </td>
                  <th
                    scope="row"
                    className=" px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white sticky right-0 bg-white z-10"
                  >
                    <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                      <img src={Edit} className="h-6 cursor-pointer" />
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
        heading="Delete User"
        isOpen={modelOpen}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen(!modelOpen)}
        action1Value="Cancel"
        action2Value="Delete"
        action2={() => setModelOpen(false)}
        action1={() => setModelOpen(!modelOpen)}
      >
        <a className=" text-xl text-gray-800 ">
          Are You Sure To Delete
          <span className="font-semibold"> Ali Imtayaz</span> ?
        </a>
      </Model>
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
export default LaonApplication;
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
