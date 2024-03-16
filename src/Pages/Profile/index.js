import React, { useState } from "react";
import Applications from "./Tabs/application";
import Product from "./Tabs/product";
import { Alert, Snackbar } from "@mui/material";
import * as action from "Services/redux/reducer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import ProfileSidebar from "Components/Cards/ProfileSidebar";
import UserProfile from "./Tabs/userProfile";
import ApiDetails from "./Tabs/apiDetails";
import History from "./Tabs/history";
import { FaUserAlt } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { FaCodeCompare } from "react-icons/fa6";
import { RiHistoryFill } from "react-icons/ri";

function Template() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.getUserById);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const [userData, setUserData] = useState({});
  const [state, setState] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const oldState = queryParams.get("name");
  const id = queryParams.get("id");
  const userId = queryParams.get("user");
  useEffect(() => {
    if (oldState) {
      setState(oldState);
    } else {
    }
  }, []);
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
    navigate(location.pathname + `?id=${id}&name=${stateValue}&user=${userId}`);
  }

  useEffect(() => {
    dispatch({
      type: "GET_USER_BY_ID",
      payload: userId,
    });
  }, []);
  useEffect(() => {
    setUserData(user);
  }, [user]);
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  return (
    <div className="flex flex-col">
      <div className="bg-white px-5 py-3  lg:mt-0 mt-4 justify-between flex flex-row items-center">
        <div className="flex flex-row space-x-7">
          {data?.map((v, k) => {
            return (
              <div
                onClick={() => setNavigation(v.label)}
                className={`cursor-pointer items-center justify-center flex w-max flex-col font-semibold ${
                  state === v.label ? "text-primary " : "text-gray-600 "
                }`}
              >
                {v.icon}
                <a className="text-xs mt-0.5">{v.label}</a>
              </div>
            );
          })}
        </div>
        {userData && (
          <div>
            {userData.accountStatus === "1" ? (
              <div className=" border border-red-400 px-3 py-1 w-max rounded-md cursor-pointer  duration-300 text-red-500">
                Blocked
              </div>
            ) : userData.accountStatus === "0" ? (
              <div
                className=" border border-green-400 px-3 py-1 w-max rounded-md cursor-pointer 
                        duration-300 text-green-500"
              >
                Active
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="flex flex-col   w-full">
        <div className="flex   lg:flex-row flex-col-reverse lg:space-x-6 mt-6">
          <div className="w-full lg:w-1/4 lg:mt-0 mt-4 ">
            {userData && <ProfileSidebar userData={userData} />}
          </div>
          <div className="w-full lg:w-9/12 ">
            <div className="flex flex-row"></div>
            <div className="flex flex-row space-x-5  ">{getTab()}</div>
          </div>
        </div>
      </div>
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
    label: "Agreement",
    tab: <History />,
    icon: <RiHistoryFill className="text-sm" />,
  },
  {
    label: "Financial Reports",
    tab: <Product />,
    icon: <FaCodeCompare className="text-xs" />,
  },
];
