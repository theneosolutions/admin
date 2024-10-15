import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import Model2 from "Components/Model2";
import UpdatePolicy from "./updatePolicyModel";
import { Button } from "Components";
import { CODE } from "constants/codes";
import UpdateWriteOff from "./updateModel_WriteOff";
import UpdateModelDelinquency from "./updateModel_Delinquency";
import PublicNotice from "./updateModel_PublicNotice";

function AllPolicies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modelWriteOff, setModelWriteOff] = useState(false);
  const [modelDelinquency, setModelDelinquency] = useState(false);
  const [modelPublicNotice, setModelPublicNotice] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const getAllPolicies = useSelector((state) => state.getAllPolicies);
  const role = useSelector((state) => state.role);
  const [updateButton, setUpdateButton] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  useEffect(() => {
    getAllPoliciesFunction();
  }, []);
  function getAllPoliciesFunction() {
    dispatch({
      type: "GET_ALL_POLICIES",
    });
  }

  function reset() {
    setModelOpen(false);
    setModelWriteOff(false);
    setModelDelinquency(false);
    setModelPublicNotice(false);
    setSelectedData({});
  }

  useEffect(() => {
    if (role) {
      CheckPermission();
    }
  }, [role]);
  function CheckPermission() {
    let policies = role?.permissions.find(
      (item) => item.code === CODE.POLICIES
    );

    if (policies) {
      let button = policies?.subMenus?.find(
        (item) => item.code === CODE.UPDATE_POLICY
      );

      if (button) {
        setUpdateButton(true);
      }
    } else {
      setUpdateButton(false);
    }
  }
  function CheckPolicy(v) {
    if (v?.policyName === "write_off") {
      setModelWriteOff(true);
      setModelDelinquency(false);
      setModelPublicNotice(false);
      setModelOpen(false);
      setSelectedData(v);
    } else if (v?.policyName === "delinquency") {
      setModelWriteOff(false);
      setModelDelinquency(true);
      setModelPublicNotice(false);
      setModelOpen(false);
      setSelectedData(v);
    } else if (v?.policyName === "public_notices") {
      setModelWriteOff(false);
      setModelDelinquency(false);
      setModelPublicNotice(true);
      setModelOpen(false);
      setSelectedData(v);
    } else {
      setModelWriteOff(false);
      setModelDelinquency(false);
      setModelPublicNotice(false);
      setModelOpen(true);
      setSelectedData(v);
    }
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
                {updateButton && (
                  <th scope="col" className="px-3 py-3">
                    {t("Update")}
                  </th>
                )}

                <th scope="col" className="px-3 py-3">
                  {t("History")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getAllPolicies?.map((v, k) => (
                <tr key={k} className="bg-white border-b dark:border-gray-200">
                  <td className="px-3">{t(v?.id)}</td>
                  <td className="px-3">{t(v?.policyName)}</td>
                  <td className="px-3">
                    {v?.policyName === "public_notices" ||
                    v?.policyName === "write_off" ||
                    v?.policyName === "delinquency" ? (
                      <button
                        onClick={() => (CheckPolicy(v), setViewMode(true))}
                        className="text-blue-600 cursor-pointer underline hover:text-blue-400 duration-200"
                      >
                        View
                      </button>
                    ) : (
                      t(v?.policyValue)
                    )}
                  </td>
                  {updateButton && (
                    <th
                      scope="row"
                      className=" px-3 py-2 text-gray-900 whitespace-nowrap text-sm"
                    >
                      <Button
                        buttonStyle="font-medium py-1"
                        buttonValue={t("Update")}
                        onButtonClick={() => (
                          CheckPolicy(v), setViewMode(false)
                        )}
                      />
                    </th>
                  )}

                  <td className="px-3 py-2">
                    <div
                      onClick={() => {
                        if (
                          v?.policyName === "public_notices" ||
                          v?.policyName === "write_off" ||
                          v?.policyName === "delinquency"
                        ) {
                          navigate(
                            `/policies/view-policies/view-history?id=${v?.id}&name=${v?.policyLabel}`
                          );
                        } else {
                          navigate(
                            `/policies/view-policies/view-policy-history?id=${v?.id}`
                          );
                        }
                      }}
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
      {modelOpen ? (
        <Model2
          setModelOpen={(e) => setModelOpen(e)}
          reset={() => reset()}
          heading={t("Update Policy")}
        >
          <UpdatePolicy
            data={selectedData}
            setModelOpen={(e) => (setModelOpen(e), getAllPoliciesFunction())}
          />
        </Model2>
      ) : null}

      {modelWriteOff ? (
        <Model2
          setModelOpen={(e) => setModelWriteOff(e)}
          reset={() => reset()}
          heading={viewMode ? t("View Policy") : t("Update Policy")}
        >
          <UpdateWriteOff
            viewMode={viewMode}
            data={selectedData}
            setModelOpen={(e) => (
              setModelWriteOff(e), getAllPoliciesFunction()
            )}
          />
        </Model2>
      ) : null}
      {modelDelinquency ? (
        <Model2
          setModelOpen={(e) => setModelDelinquency(e)}
          reset={() => reset()}
          heading={viewMode ? t("View Policy") : t("Update Policy")}
        >
          <UpdateModelDelinquency
            viewMode={viewMode}
            data={selectedData}
            setModelOpen={(e) => (
              setModelDelinquency(e), getAllPoliciesFunction()
            )}
          />
        </Model2>
      ) : null}
      {modelPublicNotice ? (
        <Model2
          setModelOpen={(e) => setModelPublicNotice(e)}
          reset={() => reset()}
          heading={viewMode ? t("View Policy") : t("Update Policy")}
        >
          <PublicNotice
            viewMode={viewMode}
            data={selectedData}
            setModelOpen={(e) => (
              setModelPublicNotice(e), getAllPoliciesFunction()
            )}
          />
        </Model2>
      ) : null}
    </div>
  );
}
export default withAuthorization(AllPolicies);
