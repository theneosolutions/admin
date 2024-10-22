import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

function SimahProductList({ data, GetSimahCodes }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Initialize toggle states for each product by ID and column
  const [toggleStates, setToggleStates] = useState(
    data?.reduce((acc, product) => {
      acc[`${product.id}-dbr`] = false; // Default state for DBR column
      acc[`${product.id}-performance`] = false; // Default state for Performance column
      acc[`${product.id}-enable`] = false; // Default state for Enable column
      return acc;
    }, {})
  );

  // Function to handle updating product status
  function UpdateProductStatus(status, id) {
    dispatch({
      type: "UPDATE_PRODUCT_STATUS",
      payload: { status: status, id: id },
    });
    setTimeout(() => GetSimahCodes(), 500);
  }

  // Function to handle individual toggle state changes
  const handleToggle = (id, column) => {
    const key = `${id}-${column}`;
    setToggleStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key], // Toggle the specific product's column state
    }));
    console.log(
      `Toggle for product ID ${id}, column ${column} is now:`,
      !toggleStates[key] ? "On" : "Off"
    );
  };

  return (
    <div className="py-5 w-full">
      <div className="overflow-x-auto relative">
        <table className="w-full whitespace-nowrap text-sm text-left text-gray-500 dark:text-gray-400">
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
              </th>
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
                {t("Dbr")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Performance")}
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer">
                {t("Enable")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((v, k) => (
              <tr key={k} className="bg-white border-b dark:border-gray-200">
                <td className="px-10 py-4">{v.id}</td>
                <td className="px-3 py-4">{v.serialNumber}</td>
                <td className="px-3 py-4">{v.code}</td>
                <td className="px-3 py-4">{v.description}</td>
                <td className="px-3 py-4 amiri-regular">{v.arabic}</td>
                <td className="px-3 py-4">{v.productGroup}</td>
                <td className="px-3 py-4">{v.productCategory}</td>
                <td className="px-3 py-4">
                  <div
                    onClick={() => handleToggle(v.id, "dbr")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                      toggleStates[`${v.id}-dbr`]
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                        toggleStates[`${v.id}-dbr`]
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div
                    onClick={() => handleToggle(v.id, "performance")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                      toggleStates[`${v.id}-performance`]
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                        toggleStates[`${v.id}-performance`]
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div
                    onClick={() => handleToggle(v.id, "enable")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                      toggleStates[`${v.id}-enable`]
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${
                        toggleStates[`${v.id}-enable`]
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
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
