import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";

function InstallmentsScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllCards = useSelector((state) => state.getAllCards);

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
      <CardMain
        width="w-full mt-2"
        heading={t("Installments Products")}
        showButton={true}
        buttonValue={t("Add New Product")}
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
    </div>
  );
}
export default InstallmentsScreen;
