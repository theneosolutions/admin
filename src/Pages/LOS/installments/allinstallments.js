import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CardMain from "../../../Components/Cards/main";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import { Model, Avatar } from "../../../Components";

function InstallmentsScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllCards = useSelector((state) => state.getAllCards);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  console.log("getAllCards", getAllCards);
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  function getALLCards() {
    dispatch({
      type: "GET_ALL_CARDS",
    });
  }
  useEffect(() => {
    getALLCards();
  }, []);

  return (
    <div className="py-5">
      <WaveAnimation show={loading} />

      {/* <div className="flex md:flex-row flex-col  md:space-x-6">
        <Notifications
          value="1200"
          heading="Total Notifications"
          color="text-blue-500 text-xl"
        />
        <Notifications
          value="1200"
          heading="Clicked"
          color="text-green-500 text-xl"
        />
        <Notifications
          value="1200"
          heading="Delivered"
          color="text-orange-500 text-xl"
        />
        <Notifications
          value="1200"
          heading="Not Click Yet"
          color="text-red-700 text-xl"
        />
      </div> */}
      <CardMain
        width="w-full mt-2"
        heading={t("Installments Products")}
        // icon={<IoNotifications className="text-primary text-xl" />}
        showButton={true}
        buttonValue={"Add New Product"}
        onButtonClick={() => navigate("/add-Product")}
      >
        <div className="overflow-x-auto relative ">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3">
                  {t("Image")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Title")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Price")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Duration")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Description")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getAllCards?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <img
                      // onClick={onClick}
                      src={v?.url}
                      className="avatar h-10 w-10 rounded-full cursor-pointer"
                    />
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {v?.title}
                  </td>
                  <td className="px-3 py-4">{v?.price}</td>
                  <td className="px-3 py-4">{v?.months}</td>
                  <td className="px-3 py-4">{v?.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>

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
export default InstallmentsScreen;
function Notifications({ heading, value, color }) {
  return (
    <div className="flex font-semibold flex-col bg-gray-300  px-10 py-8 text-center rounded-md md:w-1/4 w-full md:mt-0 mt-4 hover:bg-opacity-70 cursor-pointer shadow-xl duration-300">
      <a className={color}>{value}</a>
      <a className="text-xs text-gray-700 mt-2">{heading}</a>
    </div>
  );
}
