import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

function SimahProductList({ data, GetSimahCodes }) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  function UpdateProductStatus(status, id) {
    dispatch({
      type: "UPDATE_PRODUCT_STATUS",
      payload: { status: status, id: id },
    });
    setTimeout(() => GetSimahCodes(), 500);
  }

  return (
    <div className="py-5  w-full">
      <div className="overflow-x-auto relative">
        <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-200 font-normal">
            <tr>
              <th scope="col" className="px-10 py-3 cursor-pointer">
                {t("Id")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Serial Number")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Code")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Description")}
              </th>{" "}
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Arabic")}
              </th>
              <th scope="col" className="px-3 py-3">
                {t("Product Group")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Product Category")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Action")}
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
                  className="px-10 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse"
                >
                  <div className="items-center justify-center flex space-x-2 ">
                    <a className="">{v.id}</a>
                  </div>
                </td>

                <td className="px-3 py-4">{v.serialNumber}</td>
                <td className="px-3 py-4">{v.code}</td>
                <td className="px-3 py-4">{v.description}</td>
                <td className="px-3 py-4">{v.arabic}</td>
                <td className="px-3 py-4">{v.productGroup}</td>
                <td className="px-3 py-4">{v.productCategory}</td>
                <td className="px-3 py-4">
                  {v?.consideration === false ? (
                    <div
                      onClick={() => UpdateProductStatus(true, v?.id)}
                      className="bg-green-500 px-3 py-2 rounded-md text-white text-center cursor-pointer hover:bg-green-600 duration-300"
                    >
                      Activate
                    </div>
                  ) : (
                    <div
                      onClick={() => UpdateProductStatus(false, v?.id)}
                      className="bg-red-500 px-3 py-2 rounded-md text-white text-center cursor-pointer hover:bg-red-600 duration-300"
                    >
                      Deactivate
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default SimahProductList;
