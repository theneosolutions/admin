import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import Edit from "../../Assets/Images/edit.svg";
import Delete from "../../Assets/Images/delete.svg";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import withAuthorization from "../../constants/authorization";
import { ROLES } from "../../constants/roles";
import CreateDBR from "./dbrCreate";
import { Model } from "../../Components";
import Model2 from "Components/Model2";

function Calculations() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const getAllDBR = useSelector((state) => state.getAllDBR);

  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);

  useEffect(() => {
    getallDbrCaluculations();
  }, []);
  function getallDbrCaluculations() {
    dispatch({
      type: "GET_ALL_DBR",
    });
  }
  function reset() {
    setModelOpen(false);
  }
  function onDelete(id) {
    setSelectedId(id);
    setModelOpen2(true);
  }
  function DeleteUser() {
    dispatch({
      type: "DELETE_DBR",
      payload: selectedId,
    });
    setTimeout(() => getallDbrCaluculations(), 500);
    setModelOpen2(false);
  }
  function onEdit(data) {
    setSelectedData(data);
    setModelOpen(true);
  }
  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={" DBR " + t("Guidlines")}
        iconStyle="text-3xl text-primary"
        showButton={true}
        buttonValue={t("Add DBR")}
        onButtonClick={() => (setModelOpen(true), setSelectedData(null))}
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
                {/* <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Net Income")}
                </th> */}
                <th
                  scope="col"
                  className="px-3 py-3 cursor-pointer  sticky right-0 bg-gray-200 z-10"
                >
                  {t("Edit/Delete")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getAllDBR?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <a>{v?.incomeBracket}</a>
                  </td>

                  <td className="px-3 py-4 ">
                    <a>{v?.productLevel + "%"}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.consumerDbr + "%"}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.gdbrWithoutMtg + "%"}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.gdbrIncludingMtg + "%"}</a>
                  </td>
                  {/* <td className="px-3 py-4 ">
                    <a>{v?.netIncome}</a>
                  </td> */}
                  <th
                    scope="row"
                    className=" px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white sticky right-0 bg-white z-10"
                  >
                    <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                      <img
                        onClick={() => onEdit(v)}
                        src={Edit}
                        className="h-6 cursor-pointer"
                      />
                      <img
                        src={Delete}
                        className="h-6 cursor-pointer"
                        onClick={() => onDelete(v?.id)}
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
        heading={t("Delete DBR")}
        isOpen={modelOpen2}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen2(!modelOpen2)}
        action1Value={t("Cancel")}
        action2Value={t("Delete")}
        action2={() => DeleteUser()}
        action1={() => setModelOpen2(!modelOpen2)}
      >
        <a className=" text-xl text-gray-800 ">
          {t("Are You Sure To Delete This ?")}
        </a>
      </Model>
      {modelOpen ? (
        <Model2
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading="Add DBR"
        >
          <CreateDBR
            data={selectedData}
            setModelOpen={(e) => (setModelOpen(e), getallDbrCaluculations())}
          />
        </Model2>
      ) : null}
    </div>
  );
}
export default withAuthorization(Calculations, [
  ROLES.ADMIN,
  ROLES.UNDER_WRITER,
]);
