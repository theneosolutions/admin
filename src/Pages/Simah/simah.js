import React, { useEffect, useState } from "react";
import Existing from "./Tabs/existing";
import ProductList from "./Tabs/product";
import { useDispatch } from "react-redux";
import Members from "./Tabs/members";
import withAuthorization from "../../constants/authorization";
import { ROLES } from "../../constants/roles";

function Simah() {
  const dispatch = useDispatch();

  const [state, setState] = useState("SIMAH Members");
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
  return (
    <div className="  bg-white  border border-primary w-full rounded-lg mt-4 md:mt-0">
      <div className="flex flex-row  overflow-x-auto">
        {data?.map((v, k) => {
          return (
            <div
              onClick={() => setNavigation(v.label)}
              className={`px-4 cursor-pointer ${
                state === v.label ? "text-primary " : "text-gray-600 "
              }`}
            >
              <div
                className={`px-3 py-4  w-max  ${
                  state === v.label ? "border-primary border-b-2" : " "
                }`}
              >
                <a className="text-sm">{v.label}</a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row space-x-5  ">{getTab()}</div>
    </div>
  );
}

export default withAuthorization(Simah, [ROLES.ADMIN, ROLES.UNDER_WRITER]);
const data = [
  {
    label: "SIMAH Members",
    tab: <Members />,
  },
  {
    label: "Existing",
    tab: <Existing />,
  },
  {
    label: "SIMAH Product List",
    tab: <ProductList />,
  },
];
