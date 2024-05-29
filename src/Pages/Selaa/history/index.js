import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";

function AllUsers() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [newUsersData, setNewUsersData] = useState([]);

  const selaaHistory = useSelector((state) => state.getSeelahTransaction);

  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_SELAA_TRANSACTION_HISTORY",
    });
  }

  return (
    <div className="py-5">
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
                    <a>{v?.firstName + " " + v?.lastName}</a>
                  </td>
                  <td>{v?.guardianName}</td>
                  <td>{v?.idNumber}</td>
                  <td>{v?.mobileNumber}</td>
                  <td>{v?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>
    </div>
  );
}
export default withAuthorization(AllUsers, [
  ROLES.ADMIN,
  ROLES.CUSTOMER_CARE,
  ROLES.COMPLIANCE,
]);
