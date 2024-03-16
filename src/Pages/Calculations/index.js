import React from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import Edit from "../../Assets/Images/edit.svg";
import Delete from "../../Assets/Images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import withAuthorization from "../../constants/authorization";
import { ROLES } from "../../constants/roles";
function Calculations() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const users = useSelector((state) => state.getAllUsersAll);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_ALL_USERS_ALL",
    });
  }

  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("DBR Guidlines")}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-gray-200 uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Income Bracket SAR")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Product Level")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Customer DBR")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("GDBR (Without MTG)")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("GDBR (Including MTG)")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <a>{v?.bracket}</a>
                  </td>

                  <td className="px-3 py-4 ">
                    <a>{v?.Level}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.DBR}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.GDBR_Without_MTG}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.GDBR_Including_MTG}</a>
                  </td>
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
export default withAuthorization(Calculations, [
  ROLES.ADMIN,
  ROLES.UNDER_WRITER,
]);

const data = [
  {
    bracket: "0 to 15,000",
    Level: "33%",
    DBR: "45%",
    GDBR_Without_MTG: "45%",
    GDBR_Including_MTG: "55%",
  },
  {
    bracket: "15,001 to 25,000",
    Level: "33%",
    DBR: "45%",
    GDBR_Without_MTG: "45%",
    GDBR_Including_MTG: "65%",
  },
  {
    bracket: "More than 25,000 ",
    Level: "33%",
    DBR: "65%",
    GDBR_Without_MTG: "65%",
    GDBR_Including_MTG: "65%",
  },
];
