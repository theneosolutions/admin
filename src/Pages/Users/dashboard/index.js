import React, { useState, useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BsGraphUpArrow } from "react-icons/bs";
import { BiSignal4 } from "react-icons/bi";
import { PiChartScatterBold } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import ColumnChartBasic from "Components/chart/ColumnChartsBasic";
import RadialBarChart from "Components/chart/RadialBarChart";
import BarwithMarkersChart from "Components/chart/BarwithMarkersChart";
import { Model } from "Components";
import withAuthorization from "../../../constants/authorization";

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const AllUsers = useSelector((state) => state.getAllUsersAll);

  const [modelOpen, setModelOpen] = useState(false);

  useEffect(() => {
    getAllApplication();
  }, []);
  function getAllApplication() {
    dispatch({
      type: "GET_LOAN_APPLICATIONS",
    });
  }
  function onDelete() {
    setModelOpen(true);
  }

  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_ALL_USERS_ALL",
    });
  }

  const data = AllUsers.filter(
    (person) => person?.roles[0]?.name === "ROLE_USER"
  );

  const Verified = AllUsers.filter(
    (person) =>
      person?.roles[0]?.name === "ROLE_USER" &&
      person.ownerVerification === true
  );

  const UnVerified = AllUsers.filter(
    (person) =>
      person?.roles[0]?.name === "ROLE_USER" &&
      person.ownerVerification === false
  );

  return (
    <div className="  mt-5 space-y-6">
      <div className="flex flex-wrap lg:flex-row   ">
        <Notifications
          value={data.length || 0}
          heading={t("All Customers")}
          color="text-purple-400 text-xl"
          bg=" bg-gradient-to-r from-purple-500 via-purple-500 to-purple-300"
          icon={<FaWpforms className="text-3xl text-gray-500" />}
          style1="lg:w-1/3"
        />
        <Notifications
          value={Verified.length || 0}
          heading={t("Verified")}
          color="text-green-400 text-xl"
          bg=" bg-gradient-to-r from-green-500 via-green-500 to-green-300"
          icon={<BiSignal4 className="text-4xl text-gray-500" />}
          style1="lg:w-1/3"
        />
        <Notifications
          value={UnVerified.length || 0}
          heading={t("Un Verified")}
          color="text-red-500 text-xl"
          bg=" bg-gradient-to-r from-red-500 via-red-500 to-red-300"
          icon={<PiChartScatterBold className="text-4xl text-gray-500" />}
          style1="lg:w-1/3"
        />
      </div>
      {/* <div className="flex flex-col lg:flex-row lg:space-x-6 rtl:space-x-reverse">
        <CardMain
          width="w-full lg:w-2/3 lg:mt-0 mt-4 "
          heading={t("Monthly Activity Of Users")}
        >
          <div className="">
            <ColumnChartBasic />
          </div>
        </CardMain>
        <div className="w-full lg:w-1/3 lg:mt-0 mt-4">
          <div className={`bg-white rounded shadow-sm  rtl:space-x-reverse  `}>
            <div className="px-5 py-4 border-b flex flex-row  items-center justify-between">
              <div className="text-base font-semibold text-gray-700">
                {t("Recent Activities")}
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

      <div className="flex flex-col lg:flex-row lg:space-x-6 rtl:space-x-reverse">
        <CardMain
          width="w-full lg:w-1/2 lg:mt-0 mt-4 "
          heading={t("Performance Score")}
        >
          <div className="">
            <RadialBarChart />
          </div>
        </CardMain>
        <CardMain
          width="w-full lg:w-1/2	 lg:mt-0 mt-4 "
          heading={t("Users Anti Fraud History")}
        >
          <div className="">
            <BarwithMarkersChart />
          </div>
        </CardMain>
      </div> */}

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
          {t("Are you sure you want to delete ?")}
          <span className="font-semibold"> </span>
        </a>
      </Model>
    </div>
  );
}

export default withAuthorization(App);

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
function Notifications({ heading, value, color, bg, icon, style1 }) {
  const { t } = useTranslation();

  return (
    <div className={` w-full md:w-1/2 p-1 ${style1}`}>
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
          <div className="text-xs">% {t("Change")} </div>
          <div>
            <BsGraphUpArrow className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
