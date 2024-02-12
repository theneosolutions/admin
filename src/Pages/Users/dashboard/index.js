import React, { useState, useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { BsGraphUpArrow } from "react-icons/bs";
import { BiSignal4 } from "react-icons/bi";
import { PiChartScatterBold } from "react-icons/pi";
import { BsBarChartSteps } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ColumnChartBasic from "Components/chart/ColumnChartsBasic";
import RadialBarChart from "Components/chart/RadialBarChart";
import BarwithMarkersChart from "Components/chart/BarwithMarkersChart";
import Edit from "Assets/Images/edit.svg";
import Delete from "Assets/Images/delete.svg";
import { useNavigate } from "react-router-dom";
import { Model, Avatar } from "Components";

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.getApplications);
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  useEffect(() => {
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
  return (
    <div className="  mt-5 space-y-6">
      <div className="flex flex-wrap lg:flex-row   ">
        <Notifications
          value="400"
          heading="Verified"
          color="text-green-400 text-xl"
          bg=" bg-gradient-to-r from-green-500 via-green-500 to-green-300"
          icon={<BiSignal4 className="text-4xl text-gray-500" />}
        />
        <Notifications
          value="200"
          heading="Un Verified"
          color="text-red-500 text-xl"
          bg=" bg-gradient-to-r from-red-500 via-red-500 to-red-300"
          icon={<PiChartScatterBold className="text-4xl text-gray-500" />}
        />
        <Notifications
          value="6"
          heading="Former User"
          color="text-yellow-400 text-xl"
          bg=" bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-300"
          icon={<BsBarChartSteps className="text-3xl text-gray-500" />}
        />
        <Notifications
          value="15"
          heading="On Hold"
          color="text-purple-400 text-xl"
          bg=" bg-gradient-to-r from-purple-500 via-purple-500 to-purple-300"
          icon={<FaWpforms className="text-3xl text-gray-500" />}
        />
        <Notifications
          value="200"
          heading="Rejected"
          color="text-blue-400 text-xl"
          bg=" bg-gradient-to-r from-blue-500 via-blue-500 to-blue-300"
          icon={<FaWpforms className="text-3xl text-gray-500" />}
        />
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6 rtl:space-x-reverse">
        <CardMain
          width="w-full md:w-2/3 md:mt-0 mt-4 "
          heading={t("Monthly Activity Of Users")}
        >
          <div className="">
            <ColumnChartBasic />
          </div>
        </CardMain>
        <div className="w-full md:w-1/3 md:mt-0 mt-4">
          <div className={`bg-white rounded shadow-sm  rtl:space-x-reverse  `}>
            <div className="px-5 py-4 border-b flex flex-row  items-center justify-between">
              <div className="text-base font-semibold text-gray-700">
                Recent Activities
              </div>
              <BiDotsHorizontalRounded className="text-gray-700" />
            </div>
            <ActionCenter
              image="https://dashlite.net/demo5/images/avatar/c-sm.jpg"
              heading="Keith Jensen requested to Widthdrawl."
              des="2 hours ago"
            />
            <ActionCenter
              image="https://dashlite.net/demo5/images/avatar/d-sm.jpg"
              heading="Harry Simpson placed a Order."
              des="2 hours ago"
            />
            <ActionCenter
              image="https://dashlite.net/demo5/images/avatar/a-sm.jpg"
              heading="Stephanie Marshall got a huge bonus."
              des="2 hours ago"
            />
            <ActionCenter
              image="https://dashlite.net/demo5/images/avatar/b-sm.jpg"
              heading="Keith Jensen requested to Widthdrawl."
              des="2 hours ago"
            />
            <ActionCenter
              image="https://dashlite.net/demo5/images/avatar/c-sm.jpg"
              heading="Nicholas Carr deposited funds."
              des="2 hours ago"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-6 rtl:space-x-reverse">
        <CardMain
          width="w-full md:w-1/2 md:mt-0 mt-4 "
          heading={t("Performance Score")}
        >
          <div className="">
            <RadialBarChart />
          </div>
        </CardMain>
        <CardMain
          width="w-full md:w-1/2	 md:mt-0 mt-4 "
          heading={t("Users Anti Fraud History")}
        >
          <div className="">
            <BarwithMarkersChart />
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
                  {t("Phone/Email")}
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
              {users.map((v, k) => (
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
                      onClick={() => navigate("/profile")}
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
                      onClick={() => navigate(`/user-profile?id=${v.id}`)}
                      className=" border border-primary px-3 py-1 w-max rounded-md cursor-pointer hover:bg-primary hover:text-white duration-300"
                    >
                      View Details
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                      <img src={Edit} className="h-6 cursor-pointer" />
                      <img
                        src={Delete}
                        className="h-6 cursor-pointer"
                        onClick={() => onDelete()}
                      />
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

function ActionCenter({ icon, heading, des, image }) {
  return (
    <div className="border-b px-5 py-4 flex flex-row items-center">
      <div className="flex flex-row  	">
        <div className="w-12 h-12	">
          <img src={image} className="rounded-full object-cover" />
        </div>
        <div className="flex flex-col w-11/12	px-3	">
          <a className="text-xs text-gray-500 font-medium	">{heading}</a>
          <a className="text-xs text-gray-500 mt-0.5 	">{des}</a>
        </div>
      </div>
    </div>
  );
}
function Notifications({ heading, value, color, bg, icon }) {
  return (
    <div className="lg:w-1/5 w-full">
      <div className="rounded-sm md:mt-0 mt-4  m-2	h-min  overflow-hidden bg-white hover:bg-opacity-70 cursor-pointer shadow-xl  duration-300">
        <div className="flex flex-row justify-between  px-4 py-4">
          <div className="flex font-semibold flex-col     w-full md:mt-0 mt-4  ">
            <a className={color}>{value}</a>
            <a className="text-xs text-gray-700 mt-2 opacity-70">{heading}</a>
          </div>
        </div>

        <div
          className={`text-white h-9 w-full  flex flex-row items-center justify-center px-4 ${bg}`}
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
