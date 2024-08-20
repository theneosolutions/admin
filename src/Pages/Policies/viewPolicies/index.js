import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { Model } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import Model2 from "Components/Model2";
import UpdatePolicy from "./updatePolicy";
import { Button } from "Components";

function AllPolicies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const getAllPolicies = useSelector((state) => state.getAllPolicies);
  const role = useSelector((state) => state.role);

  useEffect(() => {
    getAllPoliciesFunction();
  }, []);
  function getAllPoliciesFunction() {
    dispatch({
      type: "GET_ALL_POLICIES",
    });
  }
  function DeleteUser() {}
  function reset() {
    setModelOpen2(false);
    setSelectedData({});
  }
  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("All Policies")}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Id")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Policy Name")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Policy Value")}
                </th>
                {getAllPolicies[0]?.customisableByAdmin === role && (
                  <th
                    scope="col"
                    className="px-3 py-3 cursor-pointer  sticky right-0 bg-white z-10"
                  >
                    {t("Edit/Delete")}
                  </th>
                )}

                <th scope="col" className="px-3 py-3">
                  {t("History")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getAllPolicies?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-3">{t(v?.id)}</td>
                  <td className="px-3">{t(v?.policyName)}</td>
                  <td className="px-3">{t(v?.policyValue)}</td>

                  <th
                    scope="row"
                    className=" px-3 py-2 text-gray-900 whitespace-nowrap text-sm"
                  >
                    <Button
                      buttonStyle="font-medium py-1"
                      buttonValue={t("Update")}
                      onButtonClick={() => (
                        setModelOpen2(true), setSelectedData(v)
                      )}
                    />
                  </th>

                  <td className="px-3 py-2">
                    <div
                      onClick={() =>
                        navigate(`/view-policy-history?id=${v?.id}`)
                      }
                      className="  px-3 py-2 w-max rounded-md cursor-pointer  duration-300 bg-blue-400  text-white"
                    >
                      {t("Check Policy History")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>
      {modelOpen2 ? (
        <Model2
          setModelOpen2={(e) => setModelOpen2(e)}
          reset={() => reset()}
          heading={t("Update Policy")}
        >
          <UpdatePolicy
            data={selectedData}
            setModelOpen={(e) => (setModelOpen2(e), getAllPoliciesFunction())}
          />
        </Model2>
      ) : null}
      <Model
        heading={t("Delete User")}
        isOpen={modelOpen}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen(!modelOpen)}
        action1Value={t("Cancel")}
        action2Value={t("Delete")}
        action2={() => DeleteUser()}
        action1={() => setModelOpen(!modelOpen)}
      >
        <a className=" text-xl text-gray-800 ">
          {t("Are you sure to delete ?")}
          <span className="font-semibold"> Ali Imtayaz</span>
        </a>
      </Model>
    </div>
  );
}
export default withAuthorization(AllPolicies, "view_policies");
