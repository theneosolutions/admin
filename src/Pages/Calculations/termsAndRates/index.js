import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import Edit from "../../../Assets/Images/edit.svg";
import Delete from "../../../Assets/Images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";
import CreateTermsAndRates from "../termsAndRates/createTermsAndRates";
import { Model } from "../../../Components";

function Calculations() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const getAllTermsRatesData = useSelector((state) => state.getAllTermsRates);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  useEffect(() => {
    getAllTermsRates();
  }, []);
  function getAllTermsRates() {
    dispatch({
      type: "GET_ALL_TERMS_RATES",
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
      type: "DELETE_TERMS_AND_RATES",
      payload: selectedId,
    });
    setTimeout(() => getAllTermsRates(), 500);
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
        heading={t("Terms And Rates")}
        iconStyle="text-3xl text-primary"
        showButton={true}
        buttonValue={"Add Terms And Rates"}
        onButtonClick={() => (setModelOpen(true), setSelectedData(null))}
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-gray-200 uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Admin Fee In Percentage")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Annual Rate")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Flat Rate Monthly")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Term")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Term Rate")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Vat In Percentage")}
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
              {getAllTermsRatesData?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                  >
                    <a>{v?.adminFeeInPercentage + "%"}</a>
                  </td>

                  <td className="px-3 py-4 ">
                    <a>{v?.annualRate}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.flatRateMonthly}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.term}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.termRate}</a>
                  </td>
                  <td className="px-3 py-4 ">
                    <a>{v?.vatInPercentage + "%"}</a>
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

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Model
        heading="Delete Terms And Rates"
        isOpen={modelOpen2}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen2(!modelOpen2)}
        action1Value="Cancel"
        action2Value={"Delete"}
        action2={() => DeleteUser()}
        action1={() => setModelOpen2(!modelOpen2)}
      >
        <a className=" text-xl text-gray-800 ">Are You Sure To Delete This ?</a>
      </Model>
      {modelOpen ? (
        <Model2 setModelOpen={(e) => setModelOpen(e)} reset={() => reset()}>
          <CreateTermsAndRates
            data={selectedData}
            setModelOpen={(e) => (setModelOpen(e), getAllTermsRates())}
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
function Model2({ children, reset }) {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      className="bg-gray-200 bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
    >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add Terms And Rates
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => reset()}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
