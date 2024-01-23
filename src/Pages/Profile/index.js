import React, { useState } from "react";

import ProfileTab from "./Tabs/profile";
import Applications from "./Tabs/application";
import Documents from "./Tabs/documents";
import OtheReport from "./Tabs/otherReports";
import Product from "./Tabs/product";
import Reports from "./Tabs/reports";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { RxUpdate } from "react-icons/rx";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import { MdDeleteOutline } from "react-icons/md";
import ProfileSidebar from "Components/Cards/ProfileSidebar";
import UserProfile from "./Tabs/userProfile";
import ApiDetails from "./Tabs/apiDetails";
import History from "./Tabs/history";
import { FaUserAlt } from "react-icons/fa";
import { LiaWpforms } from "react-icons/lia";
import { MdFormatListBulleted } from "react-icons/md";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { FaCodeCompare } from "react-icons/fa6";
import { RiHistoryFill } from "react-icons/ri";

function Template() {
  const navigate = useNavigate();
  const location = useLocation();
  const users = useSelector((state) => state.getAllUsers);
  console.log("users", users);

  const queryParams = new URLSearchParams(location.search);
  const oldState = queryParams.get("name");
  const id = queryParams.get("id");

  const [state, setState] = useState("");
  useEffect(() => {
    if (oldState) {
      setState(oldState);
    } else {
      setState("Profile");
      navigate(location.pathname + `?id=${id}&name=Profile`);
    }
  }, []);
  const userData = users.find((item) => item.user.idNumber === id);
  console.log("userData", userData);
  const getTab = () => {
    const activeItem = data.find((item) => item.label === state);
    return activeItem
      ? activeItem.tab
      : "Select an item to see the description.";
  };
  function setNavigation(stateValue) {
    if (stateValue === "Other Reports") {
      return navigate("/user-detail?name=Anti fraud Detail");
    }
    setState(stateValue);
    navigate(location.pathname + `?id=${id}&name=${stateValue}`);
  }
  return (
    <div className="flex flex-col">
      <div className="bg-white px-5 py-3 flex flex-row space-x-7">
        {data?.map((v, k) => {
          return (
            <div
              onClick={() => setNavigation(v.label)}
              className={`cursor-pointer items-center justify-center flex w-max flex-col font-semibold ${
                state === v.label ? "text-primary " : "text-gray-600 "
              }`}>
              {v.icon}
              <a className="text-xs mt-0.5">{v.label}</a>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col   w-full">
        <div className="flex flex-row space-x-6 mt-6">
          <div className="w-1/4">
            <ProfileSidebar userData={userData?.user} />
          </div>
          <div className="w-9/12">
            <div className="flex flex-row"></div>
            <div className="flex flex-row space-x-5  ">{getTab()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Template;

const data = [
  {
    label: "Profile",
    tab: <UserProfile />,
    icon: <FaUserAlt className="text-xs" />,
  },
  {
    label: "Api Details",
    tab: <ApiDetails />,
    icon: <BiMessageSquareDetail className="text-sm" />,
  },
  {
    label: "Applications",
    tab: <Applications />,
    icon: <MdFormatListBulleted className="text-sm" />,
  },
  {
    label: "History",
    tab: <History />,
    icon: <RiHistoryFill className="text-sm" />,
  },
  {
    label: "Compare",
    tab: <Product />,
    icon: <FaCodeCompare className="text-xs" />,
  },
];
