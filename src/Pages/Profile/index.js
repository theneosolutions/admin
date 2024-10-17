import React, { useState } from "react";
import Product from "./Tabs/product";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import ProfileSidebar from "Components/Cards/ProfileSidebar";
import UserProfile from "./Tabs/userProfile";
import ApiDetails from "./Tabs/apiDetails";
import { FaUserAlt } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { RiHistoryFill } from "react-icons/ri";
import UserInfo from "./Tabs/userInfo";
import { useTranslation } from "react-i18next";
import { ResetFailedAttemps } from "Services/OtherApis";
import * as action from "Services/redux/reducer";
import withAuthorization from "constants/authorization";

function Template() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.getUserById);
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

  function ResetAttempts() {
    ResetFailedAttemps(id)
      .then((data) => {
        if (data?.status != 200) {
          dispatch(
            action.Message({
              open: true,
              message: data?.data?.message,
              error: true,
            })
          );
        } else {
          dispatch(
            action.Message({
              open: true,
              message: "Success",
              error: false,
            })
          );
          dispatch({
            type: "GET_USER_BY_ID",
            payload: userId,
          });
        }
      })
      .catch(
        (error) => console.log("error")
        // dispatch(action.Message({ open: true, message: "Error", error: true }))
      );
  }

  return (
    <div className="flex flex-col">
      <div className="bg-white px-5 py-3  lg:mt-0 mt-4 justify-between flex flex-row items-center">
        <div className="flex flex-row space-x-7 rtl:space-x-reverse ">
          {data?.map((v, k) => {
            return (
              <div
                onClick={() => setNavigation(v.label)}
                className={`cursor-pointer items-center justify-center flex w-max flex-col font-semibold ${
                  state === v.label ? "text-primary " : "text-gray-600 "
                }`}
              >
                {v.icon}
                <a className="text-xs mt-0.5">{t(v.label)}</a>
              </div>
            );
          })}
        </div>
        {userData?.user && (
          <div>
            {userData?.user?.accountStatus === "1" ? (
              <div className=" border border-red-400 px-3 py-1 w-max rounded-md cursor-pointer  duration-300 text-red-500">
                {t("Blocked")}
              </div>
            ) : userData?.user.accountStatus === "0" ? (
              <div className="flex flex-row space-x-4 rtl:space-x-reverse">
                <div
                  className=" border border-green-400 px-3 py-1 w-max rounded-md cursor-pointer 
                      duration-300 text-green-500"
                >
                  {t("Active")}
                </div>
                <div
                  onClick={() => ResetAttempts()}
                  className=" border border-red-400 px-3 py-1 w-max rounded-md cursor-pointer 
                      duration-300 text-red-500"
                >
                  {t("Reset Counter")}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="flex flex-col   w-full ">
        <div className="flex   lg:flex-row flex-col-reverse lg:space-x-6 mt-6 rtl:space-x-reverse">
          <div className="w-full lg:w-1/4 lg:mt-0 mt-4 ">
            {userData?.user && <ProfileSidebar userData={userData?.user} />}
          </div>
          <div className="w-full lg:w-9/12 ">
            <div className="flex flex-row"></div>
            <div className="flex flex-row space-x-5  ">{getTab()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuthorization(Template);

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
    label: "Audit Log",
    tab: <UserInfo />,
    icon: <RiHistoryFill className="text-sm" />,
  },

  {
    label: "Financial Reports",
    tab: <Product />,
    icon: <FaCodeCompare className="text-xs" />,
  },
];
