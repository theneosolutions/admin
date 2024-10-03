import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { Button } from "Components";
import Model2 from "Components/Model2";
import AddProductModel from "../addProductModel";
import withAuthorization from "constants/authorization";
import AddCountry from "./addCountryModel";
import { AsyncCountries } from "Services/OtherApis";
function BlackListCountries() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);

  const codes = useSelector((state) => state.getSimahCodes);

  function reset() {
    setModelOpen(false);
  }

  function funcAsyncCountries() {
    AsyncCountries().then((res) => {
      console.log("helllo from sync", res);
    });
  }
  return (
    <div className="  bg-white  border border-primary w-full rounded-lg mt-4 md:mt-0 p-4">
      <div className="flex flex-row  overflow-x-auto  justify-between items-center">
        <h1>Black List Countries</h1>
        <div className="space-x-4">
          <Button
            onButtonClick={() => setModelOpen(true)}
            buttonValue={t("Add Country")}
            buttonStyle="px-20 py-2"
          />
          <Button
            onButtonClick={() => funcAsyncCountries()}
            buttonValue={t("Sync Countries")}
            buttonStyle="px-20 py-2"
          />
        </div>
      </div>

      <div className="py-5  w-full">
        <div className="overflow-x-auto relative">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-200 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Country")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Description")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 1]?.map((v, k) => (
                <tr key={k} className="bg-white border-b dark:border-gray-200">
                  <td className="px-3 py-4">Pakistan</td>
                  <td className="px-3 py-4">Description</td>

                  <td className="px-3 py-4">
                    <div className="bg-red-500 rounded-md px-4 py-1 text-white text-center items-center w-min hover:bg-opacity-80 cursor-pointer duration-300">
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modelOpen ? (
        <Model2
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading="Add Country"
        >
          <AddCountry setModelOpen={(e) => setModelOpen(e)} />
        </Model2>
      ) : null}
    </div>
  );
}

export default withAuthorization(BlackListCountries);
