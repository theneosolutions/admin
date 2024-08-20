import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import Edit from "../../../Assets/Images/edit.svg";
import Delete from "../../../Assets/Images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import CreateTermsAndRates from "../termsAndRates/createTermsAndRates";
import { Model } from "../../../Components";
import Model2 from "Components/Model2";

function Calculations() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const getAllTermsRatesData = useSelector((state) => state.getAllTermsRates);

  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);

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
        buttonValue={t("Add Terms And Rates")}
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

      <Model
        heading="Delete Terms And Rates"
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
          heading="Add Terms And Rates"
        >
          <CreateTermsAndRates
            data={selectedData}
            setModelOpen={(e) => (setModelOpen(e), getAllTermsRates())}
          />
        </Model2>
      ) : null}
    </div>
  );
}
export default withAuthorization(Calculations, "calculations_terms_and_rates");
