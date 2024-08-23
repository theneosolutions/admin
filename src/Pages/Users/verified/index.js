import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdVerified } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import CardMain from "../../../Components/Cards/main";
import Edit from "../../../Assets/Images/edit.svg";
import Delete from "../../../Assets/Images/delete.svg";
import { Model, Avatar } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import { LuSearch } from "react-icons/lu";

function VerifiedUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(false);
  const [username, setUsername] = useState(false);

  const users = useSelector((state) => state.getAllUsers);

  const [search, setSearch] = useState("");
  const [newUsersData, setNewUsersData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  function onDelete(user, username) {
    setSelectedUserId(user?.userId);
    setModelOpen(true);
    setUsername(username);
  }
  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_ALL_USERS",
      payload: "VERIFIED",
    });
  }
  function DeleteUser() {
    setModelOpen(false);
    dispatch({
      type: "DELETE_USER_BY_ID",
      payload: selectedUserId,
    });
    setTimeout(() => getAllUsersData(), 500);
  }
  useEffect(() => {
    if (users) {
      const data = users.filter(
        (person) => person?.user?.user?.roles[0]?.code === "user"
      );
      console.log("users verified ##", data);
      setUsersData(data);
      setNewUsersData(data);
    }
  }, [users]);
  function CheckEligibility(other, numeric) {
    if (other === true && numeric === true) {
      return (
        <div className="flex flex-row font-semibold space-x-1  rtl:space-x-reverse text-green-700 items-center">
          <MdVerified className="text-xl" />
          <a className="text-md ">{t("Eligible")}</a>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row font-semibold space-x-1  rtl:space-x-reverse text-red-700 items-center">
          <RxCrossCircled className="text-xl" />
          <a className="text-md ">{t("Not Eligible")}</a>
        </div>
      );
    }
  }

  useEffect(() => {
    if (search === "") {
      setNewUsersData(usersData);
    } else {
      const filteredData = usersData.filter((user) =>
        user?.user?.user?.idNumber.toLowerCase().includes(search.toLowerCase())
      );
      setNewUsersData(filteredData);
    }
  }, [search, usersData]);
  return (
    <div className="py-5">
      <div className="flex flex-row border border-gray-400 md:w-1/3 w-full rounded-md  py-2 mb-2   px-2   items-center space-x-2">
        <LuSearch className="text-gray-400" />

        <input
          type="number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" outline-none bg-transparent w-full text-gray-500 no-spinners text-md"
          placeholder={t("Search With Id Number")}
        />
      </div>
      <CardMain
        width="w-full"
        heading={t("Verified Users")}
        icon={<MdVerified />}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-white font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("User Id")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("ID Number")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Questions")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Calculations")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Eligibilty")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Status")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Simah Report")}
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
              {newUsersData?.map((v, k) => (
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
                      onClick={() =>
                        navigate(
                          `/customers/verified/profile?id=${v?.user?.user?.idNumber}&name=Profile&user=${v?.user?.user?.id}`
                        )
                      }
                    />
                    {v?.user?.user && (
                      <a>
                        {v?.user?.user?.firstName +
                          " " +
                          v?.user?.user?.lastName}
                      </a>
                    )}
                  </td>

                  <td scope="row" className="px-3 py-4">
                    {v?.user?.user?.idNumber}
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {v?.eligibilityResult?.otherQuestionEligibility
                      ? t("Pass")
                      : t("Fail")}
                  </td>
                  <td className="px-3 py-4">
                    {v?.eligibilityResult?.numericQuestionEligibility
                      ? t("Pass")
                      : t("Fail")}
                  </td>
                  <td className="px-3 py-4">
                    {CheckEligibility(
                      v?.eligibilityResult.otherQuestionEligibility,
                      v?.eligibilityResult.numericQuestionEligibility
                    )}
                  </td>

                  <td className="px-3 py-4">
                    {v?.user?.user?.accountStatus === "1" ? (
                      <div className=" border border-red-400 px-3 py-1 w-max rounded-md cursor-pointer  duration-300 text-red-500">
                        {t("Blocked")}
                      </div>
                    ) : v?.user?.user?.accountStatus === "0" ? (
                      <div
                        className=" border border-green-400 px-3 py-1 w-max rounded-md cursor-pointer 
                        duration-300 text-green-500"
                      >
                        {t("Active")}
                      </div>
                    ) : null}
                  </td>

                  <td className="px-3 py-4">
                    <div
                      onClick={() =>
                        navigate(
                          `/customers/verified/simah/usercodes?id=${v?.user?.user?.id}`
                        )
                      }
                      className=" border border-blue-600 px-3 py-1 w-max rounded-md cursor-pointer 
                        duration-300 text-blue-600"
                    >
                      {t("View Simah Report")}
                    </div>
                  </td>
                  <th
                    scope="row"
                    className=" px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white sticky right-0 bg-white z-10"
                  >
                    <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                      {/* <img src={Edit} className="h-6 cursor-pointer" /> */}
                      <img
                        src={Delete}
                        className="h-6 cursor-pointer"
                        onClick={() =>
                          onDelete(
                            v?.eligibilityResult,
                            v?.user?.user?.firstName +
                              " " +
                              v?.user?.user?.lastName
                          )
                        }
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
        action2={() => DeleteUser()}
        action1={() => setModelOpen(!modelOpen)}
      >
        <a className=" text-xl text-gray-800 ">
          {t("Are you sure to delete ?")}
          <span className="font-semibold"> {username}</span>
        </a>
      </Model>
    </div>
  );
}

export default withAuthorization(VerifiedUsers, "verified_customers");
