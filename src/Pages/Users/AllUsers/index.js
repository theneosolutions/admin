import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import Edit from "../../../Assets/Images/edit.svg";
import Delete from "../../../Assets/Images/delete.svg";
import { Model, Avatar } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";
import { LuSearch } from "react-icons/lu";

function AllUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [newUsersData, setNewUsersData] = useState([]);
  const [search, setSearch] = useState("");

  const [idNumber, setIdNumber] = useState("");
  const [id, setId] = useState("");
  const users = useSelector((state) => state.getAllUsersAll || []);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  function onDelete(user) {
    setSelectedUserId(user?.userId);
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
  function DeleteUser() {
    setModelOpen(false);
    dispatch({
      type: "DELETE_USER_BY_ID",
      payload: selectedUserId,
    });
    setTimeout(() => getAllUsersData(), 500);
  }

  function functionActivateUser() {
    dispatch({
      type: "ACTIVE_DEACTIVE_USER",
      payload: { idNumber, id },
    });
    setTimeout(() => getAllUsersData(), 500);
    setModelOpen2(false);
  }
  useEffect(() => {
    if (users) {
      const data = users.filter(
        (person) => person?.roles[0]?.name === "ROLE_USER"
      );
      setUsersData(data);
      setNewUsersData(data);
    }
  }, [users]);

  useEffect(() => {
    if (search === "") {
      setNewUsersData(usersData);
    } else {
      const filteredData = usersData.filter((user) =>
        user.idNumber.toLowerCase().includes(search.toLowerCase())
      );
      setNewUsersData(filteredData);
    }
  }, [search, usersData]);

  return (
    <div className="py-5">
      <div className="flex flex-row border rtl:space-x-reverse border-gray-400 md:w-1/3 w-full rounded-md  py-2 mb-2   px-2   items-center space-x-2 ">
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
        heading={t("All Users")}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Name")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Guardian Name")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Id Number")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Mobile")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Email")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Status")}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 cursor-pointer  sticky right-0 bg-white z-10"
                >
                  {t("Eligibility")}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 cursor-pointer  sticky right-0 bg-white z-10"
                >
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
                          `/profile?id=${v?.idNumber}&name=Profile&user=${v?.id}`
                        )
                      }
                    />
                    <a>{v?.firstName + " " + v?.lastName}</a>
                  </td>
                  <td>{v?.guardianName}</td>
                  <td>{v?.idNumber}</td>
                  <td>{v?.mobileNumber}</td>
                  <td>{v?.email}</td>
                  <td className="px-3 py-4">
                    {v?.accountStatus === "1" ? (
                      <div className=" border border-red-400 px-3 py-1 w-max rounded-md cursor-pointer  duration-300 text-red-500">
                        {t("Blocked")}
                      </div>
                    ) : v?.accountStatus === "0" ? (
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
                        navigate(`/user-eligibility?user=${v?.id}`)
                      }
                      className="  px-3 py-1 w-max rounded-md cursor-pointer  duration-300 bg-blue-400  text-white"
                    >
                      Check Eligibility
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    {v?.accountStatus === "0" ? (
                      <div
                        onClick={() => (
                          setIdNumber(v?.idNumber),
                          setId(1),
                          setModelOpen2(true)
                        )}
                        className="border border-red-400 px-3 py-1 w-max rounded-md cursor-pointer  duration-300 bg-red-400  text-white"
                      >
                        {" "}
                        {t("De Activate")}
                      </div>
                    ) : v?.accountStatus === "1" ? (
                      <div
                        onClick={() => (
                          setIdNumber(v?.idNumber),
                          setId(0),
                          setModelOpen2(true)
                        )}
                        className=" border border-green-400  bg-green-400  text-white px-3 py-1 w-max rounded-md cursor-pointer 
                        duration-300 "
                      >
                        {t("Activate")}
                      </div>
                    ) : null}
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
                        onClick={() => onDelete(v?.eligibilityResult)}
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
        heading="User Action"
        isOpen={modelOpen2}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen2(!modelOpen2)}
        action1Value="Cancel"
        action2Value={id === 1 ? "Activate" : "DeActivate"}
        action2={() => functionActivateUser()}
        action1={() => setModelOpen2(!modelOpen2)}
      >
        <a className=" text-xl text-gray-800 ">
          Are You Sure ?
          {/* <span className="font-semibold"> Ali Imtayaz</span> ? */}
        </a>
      </Model>
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
          {t("Are You Sure To Delete ?")}
          <span className="font-semibold"> Ali Imtayaz</span>
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
export default withAuthorization(AllUsers, [
  ROLES.ADMIN,
  ROLES.CUSTOMER_CARE,
  ROLES.COMPLIANCE,
]);
