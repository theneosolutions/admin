import React, { useState, useEffect } from "react";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { BsGraphUpArrow } from "react-icons/bs";
import { BiSignal4 } from "react-icons/bi";
import { PiChartScatterBold } from "react-icons/pi";
import { BsBarChartSteps } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import { LuWallet2 } from "react-icons/lu";
import ColumnChart from "Components/chart/ColumnChart";
import PieChart from "Components/chart/PieChart";
import SplineChart from "Components/chart/SplineChart";

import Edit from "Assets/Images/edit.svg";
import Delete from "Assets/Images/delete.svg";
import { useNavigate } from "react-router-dom";
import { Model, Avatar } from "Components";

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.getApplications);
  const selaBalance = useSelector((state) => state.selaBalance);

  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  useEffect(() => {
    getBalance();
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_LOAN_APPLICATIONS",
    });
  }
  function onDelete() {
    setModelOpen(true);
  }
  function getBalance() {
    dispatch({
      type: "GET_BALANCE",
    });
  }

  const sumOfApprovedAmmount = applications?.reduce(
    (accumulator, currentItem) => {
      if (currentItem?.status === "Approved") {
        accumulator += currentItem?.loanAmount;
      }
      return accumulator;
    },
    0
  );
  return (
    <div className="container mx-auto mt-5 space-y-6">
      <div className="flex flex-wrap ">
        <Notifications
          value="120000"
          heading="Total Deposite Amount"
          color="text-orange-400 text-xl"
          bg=" bg-gradient-to-r from-orange-500 via-orange-500 to-orange-300"
          icon={<BiSignal4 className="text-4xl text-gray-500" />}
        />
        <Notifications
          value={sumOfApprovedAmmount}
          heading="Total Withdrawal Amount"
          color="text-green-500 text-xl"
          bg=" bg-gradient-to-r from-green-500 via-green-500 to-green-300"
          icon={<PiChartScatterBold className="text-4xl text-gray-500" />}
        />
        <Notifications
          value="1500700"
          heading="Balance In Account"
          color="text-red-400 text-xl"
          bg=" bg-gradient-to-r from-red-500 via-red-500 to-red-300"
          icon={<BsBarChartSteps className="text-3xl text-gray-500" />}
        />
        <Notifications
          value={applications?.length}
          heading="Total Applications"
          color="text-teal-400 text-xl"
          bg=" bg-gradient-to-r from-teal-500 via-teal-500 to-teal-300"
          icon={<FaWpforms className="text-3xl text-gray-500" />}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-6 rtl:space-x-reverse">
        <CardMain
          width="w-full lg:w-8/12 lg:mt-0 mt-4 h-min "
          heading={t("My Applications")}
          des={"1,406 " + t("In Process")}
        >
          <ColumnChart />
        </CardMain>

        <div className="w-full lg:w-4/12 lg:mt-0 mt-4">
          <div className={`bg-white rounded shadow-sm  rtl:space-x-reverse  `}>
            <div className="px-5 py-4 border-b flex flex-row  items-center justify-between">
              <div className="text-base font-semibold text-gray-700">
                Action Center
              </div>
              <BiDotsHorizontalRounded className="text-gray-700" />
            </div>
            <ActionCenter
              heading="Pending Buy/Sell Orders
              "
              des=" We have still 40 buy orders and 12 sell orders, thats need to
            review."
              icon={<CiWallet className="text-gray-700 mt-0.5 text-2xl" />}
            />
            <ActionCenter
              heading="Support Messages"
              des=" We have still 40 buy orders and 12 sell orders, thats need to
            review."
              icon={
                <MdOutlineContactSupport className="text-gray-700 mt-0.5 text-2xl" />
              }
            />
            <ActionCenter
              heading="Upcoming Deposit"
              des=" We have still 40 buy orders and 12 sell orders, thats need to
            review."
              icon={<LuWallet2 className="text-gray-700 mt-0.5 text-2xl" />}
            />
            <ActionCenter
              heading="Upcoming Deposit"
              des=" We have still 40 buy orders and 12 sell orders, thats need to
            review."
              icon={<LuWallet2 className="text-gray-700 mt-0.5 text-2xl" />}
            />
          </div>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row lg:space-x-6 rtl:space-x-reverse">
        <CardMain
          width="w-full lg:w-1/2 lg:mt-0 mt-4 "
          heading={t("Applications Status")}
        >
          <div className="">
            <PieChart />
          </div>
        </CardMain>
        <CardMain
          width="w-full lg:w-1/2 lg:mt-0 mt-4 "
          heading={t("User Activity")}
        >
          <div className="">
            <SplineChart />
          </div>
        </CardMain>
      </div>
      <CardMain
        width="w-full  mt-10"
        heading={t("Loan Applications")}
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
              {applications.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    {/* <Avatar
                      icon={
                        "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png"
                      }
                      onClick={() =>
                        navigate(
                          `/profile?id=${v?.idNumber}&name=Profile&user=${v?.id}`
                        )
                      }
                    /> */}

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
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        className="mt-4"
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

function ActionCenter({ icon, heading, des }) {
  return (
    <div className="border-b px-5 py-4 flex flex-row items-center">
      <div className="flex flex-row  w-11/12	">
        <div className="w-1/12			">{icon}</div>
        <div className="flex flex-col w-11/12	px-3	">
          <a className="text-md text-gray-600 font-semibold">{heading}</a>
          <a className="text-xs text-gray-600 mt-2 ">{des}</a>
        </div>
      </div>
      <div className="w-1/12	">
        <MdArrowForwardIos className="text-gray-700 mt-1 text-md" />
      </div>
    </div>
  );
}
function Notifications({ heading, value, color, bg, icon }) {
  return (
    <div className=" w-full md:w-1/2 lg:w-1/4 p-1">
      <div className="rounded-sm md:mt-0 mt-4  overflow-hidden bg-white hover:bg-opacity-70 cursor-pointer shadow-xl  duration-300 justify-between h-max ">
        <div className="flex flex-row justify-between  px-4 py-4">
          <div className="flex font-semibold flex-col     w-full md:mt-0 mt-4  ">
            <a className={color}>{value}</a>
            <a className="text-xs text-gray-700 mt-2 opacity-70">{heading}</a>
          </div>
          {icon}
        </div>

        <div
          className={`text-white h-9 w-full  flex flex-row justify-between items-center  px-4 ${bg}`}
        >
          <div className="text-xs">% Change</div>
          <div>
            <BsGraphUpArrow className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
