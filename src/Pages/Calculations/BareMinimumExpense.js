import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../constants/authorization";
import CreateBME from "./createBareMinimum";
import Edit from "../../Assets/Images/edit.svg";
import Delete from "../../Assets/Images/delete.svg";
import { Model } from "../../Components";
import Model2 from "Components/Model2";
import { CODE } from "constants/codes";
function BareMinimumExpense() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const getAllExpense = useSelector((state) => state.getAllExpense);

  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);

  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_ALL_EXPENSE",
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
      type: "DELETE_EXPENSE",
      payload: selectedId,
    });
    setTimeout(() => getAllUsersData(), 500);
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
        heading={t("Bare Minimum Expense")}
        iconStyle="text-3xl text-primary"
        showButton={true}
        buttonValue={t("Add Bare Minimum Expense")}
        onButtonClick={() => (setModelOpen(true), setSelectedData(null))}
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-gray-200 uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Expenses")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Bare Minimum expense Per Person")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Description")}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 cursor-pointer  sticky right-0 bg-gray-200 z-10"
                >
                  {t("Edit/Delete")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getAllExpense?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <a>{v?.expense}</a>
                  </td>

                  <td className="px-3 py-4 ">
                    <a>{v?.expenseBareableAmount}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.description}</a>
                  </td>
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
        heading="Delete DBR"
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
          {t("Are you sure to delete this ?")}
        </a>
      </Model>
      {modelOpen ? (
        <Model2
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading={t("Create Bare Minimum Expense")}
        >
          <CreateBME
            data={selectedData}
            setModelOpen={(e) => (setModelOpen(e), getAllUsersData())}
          />
        </Model2>
      ) : null}
    </div>
  );
}
export default withAuthorization(
  BareMinimumExpense,
  CODE.CALCULATION_BARE_MINIMUM_EXPENSE
);
