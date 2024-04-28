import React, { useEffect, useState } from "react";
import Existing from "./Tabs/existing";
import ProductList from "./Tabs/product";
import { useDispatch } from "react-redux";
import Members from "./Tabs/members";
import withAuthorization from "../../constants/authorization";
import { ROLES } from "../../constants/roles";
import { useTranslation } from "react-i18next";
import { Button } from "Components";
import Model2 from "Components/Model2";
import AddProductModel from "./addProductModel";

function Simah() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);

  const [state, setState] = useState("SIMAH Product List");
  const getTab = () => {
    const activeItem = data.find((item) => item.label === state);
    return activeItem ? activeItem.tab : null;
  };

  function setNavigation(stateValue) {
    setState(stateValue);
  }
  useEffect(() => {
    dispatch({
      type: "GET_SIMAH_CODES",
    });
  }, []);
  function reset() {
    setModelOpen(false);
  }
  return (
    <div className="  bg-white  border border-primary w-full rounded-lg mt-4 md:mt-0">
      <div className="flex flex-row  overflow-x-auto  justify-between items-center">
        <div className="flex flex-row  overflow-x-auto ">
          {data?.map((v, k) => {
            return (
              <div
                onClick={() => setNavigation(v.label)}
                className={`px-4 cursor-pointer  ${
                  state === v.label ? "text-primary " : "text-gray-600 "
                }`}
              >
                <div
                  className={`px-3 py-4  w-max  ${
                    state === v.label ? "border-primary border-b-2" : " "
                  }`}
                >
                  <a className="text-sm">{t(v.label)}</a>
                </div>
              </div>
            );
          })}
        </div>
        {state === "SIMAH Product List" && (
          <div className="mx-3">
            <Button
              onButtonClick={() => setModelOpen(true)}
              buttonValue={t("Add New Product")}
              buttonStyle="px-20 py-2"
            />
          </div>
        )}
      </div>

      <div className="flex flex-row space-x-5  ">{getTab()}</div>
      {modelOpen ? (
        <Model2
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading="Add New Product"
        >
          <AddProductModel
            // data={selectedData}
            setModelOpen={(e) => setModelOpen(e)}
          />
        </Model2>
      ) : null}
    </div>
  );
}

export default withAuthorization(Simah, [ROLES.ADMIN, ROLES.UNDER_WRITER]);
const data = [
  {
    label: "SIMAH Product List",
    tab: <ProductList />,
  },
  {
    label: "SIMAH Members",
    tab: <Members />,
  },
  {
    label: "Existing",
    tab: <Existing />,
  },
];
