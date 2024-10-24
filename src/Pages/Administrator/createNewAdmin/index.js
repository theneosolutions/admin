import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import User from "./CreateUserModel";
import Model2 from "Components/Model2";
import withAuthorization from "../../../constants/authorization";
import { getLanguage } from "functions/getLanguage";

function CreateNewAdmin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.getAllUsersAll || []);

  const [usersData, setUsersData] = useState([]);

  const [modelOpen, setModelOpen] = useState(false);

  useEffect(() => {
    getAllNotifictions();
  }, []);
  function getAllNotifictions() {
    dispatch({
      type: "GET_ALL_USERS_ALL",
    });
  }
  function reset() {
    setModelOpen(false);
  }

  useEffect(() => {
    if (users) {
      const data = users.filter((person) => person?.roles[0]?.name !== "User");
      setUsersData(data);
    }
  }, [users]);
  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("All Admins and Moderators")}
        showButton={true}
        buttonValue={t("Add New User")}
        onButtonClick={() => setModelOpen(true)}
      >
        <div className="overflow-x-auto relative  mt-4">
          <table
            className={`w-full whitespace-nowrap  text-sm  text-gray-500 dark:text-gray-400 ${
              getLanguage() === "ar" ? "text-right" : "text-left"
            }`}
          >
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("First Name")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Email")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Username")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Mobile Number")}
                </th>

                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Role")}
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData?.map((v, k) => (
                <tr key={k} className="bg-white border-b  dark:border-gray-200">
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    {/* {v?.firstName} */}
                    {v?.firstName + " " + v?.lastName}
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {v?.email}
                  </td>
                  <td className="px-3 py-4">{v?.idNumber}</td>
                  <td className="px-3 py-4">{v?.mobileNumber}</td>
                  <td className="px-3 py-4">{v?.roles[0]?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>

      {modelOpen ? (
        <Model2
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading="Add User"
        >
          <User
            setModel={(e) => setModelOpen(e)}
            getAllUsers={() => getAllNotifictions()}
          />
        </Model2>
      ) : null}
    </div>
  );
}

export default withAuthorization(CreateNewAdmin);
