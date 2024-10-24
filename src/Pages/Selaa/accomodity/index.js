import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import * as action from "../../../Services/redux/reducer";

import {
  // TransferMoney,
  RadeemMoney,
  GetAllOwnersShipIds,
} from "Services/OtherApis";
import { getLanguage } from "functions/getLanguage";
function Accomodity() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const users = useSelector((state) => state.getAllUsersAll || []);

  const [data, setData] = useState([]);

  useEffect(() => {
    getOwners();
    getAllUsers();
  }, []);
  function getAllUsers() {
    dispatch({
      type: "GET_ALL_USERS_ALL",
    });
  }
  function getOwners() {
    GetAllOwnersShipIds()
      .then((data) => setData(data?.data))
      .catch((error) => console.error("Error received:", error));
  }
  function Radeem(id) {
    RadeemMoney(id)
      .then((data) =>
        dispatch(action.Message({ open: true, message: "Success" }))
      )
      .catch((error) =>
        dispatch(action.Message({ open: true, message: "Error", error: true }))
      );
  }
  function Transfer(ownerId, userId) {
    if (users?.length > 0) {
      const userData = users?.find((user) => user?.id === userId);

      if (userData) {
        const temp = {
          civilId: userData?.idNumber,
          name: userData?.firstName,
          ownershipId: ownerId,
          phone: userData?.mobileNumber,
        };

        // TransferMoney(temp)
        //   .then((data) =>
        //     dispatch(
        //       action.Message({ open: true, message: "Success", error: false })
        //     )
        //   )
        //   .catch((error) =>
        //     dispatch(
        //       action.Message({ open: true, message: "Error", error: true })
        //     )
        //   );
      }
    }
  }
  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("All Ownership Id")}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-scroll  mt-4 relative h-[70vh] ">
          <table
            className={`w-full whitespace-nowrap  text-sm  text-gray-500 dark:text-gray-400 ${
              getLanguage() === "ar" ? "text-right" : "text-left"
            }`}
          >
            <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Certificates")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Owner Id")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("User Id")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("File")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Transfer")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Radeem")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((v, k) => (
                <tr key={k} className="bg-white border-b  dark:border-gray-200">
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <a>{v?.certificates}</a>
                  </td>
                  <td className="px-3">{v?.ownershipId}</td>
                  <td className="px-3">{v?.userId}</td>
                  <td className="px-3">
                    <div
                      onClick={() =>
                        window.open(v?.ownershipFileUrl, "_blank", "noopener")
                      }
                      className="w-max px-3 py-1 rounded-md text-white bg-blue-500 cursor-pointer hover:opacity-80 duration-200"
                    >
                      {t("Owner Ship File")}
                    </div>
                  </td>
                  <td className="px-3">
                    <div
                      onClick={() => Transfer(v?.ownershipId, v?.userId)}
                      className="w-max px-3 py-1 rounded-md text-white bg-green-500 cursor-pointer hover:opacity-80 duration-200"
                    >
                      {t("Transfer")}
                    </div>
                  </td>
                  <td className="px-3">
                    <div
                      onClick={() => Radeem(v?.ownershipId)}
                      className="w-max px-3 py-1 rounded-md text-white bg-green-500 cursor-pointer hover:opacity-80 duration-200"
                    >
                      {t("Radeem")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>
    </div>
  );
}
export default withAuthorization(Accomodity);
