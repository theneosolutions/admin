import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { Model } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "Components";
import { CODE } from "constants/codes";
import withAuthorization from "constants/authorization";
import { getLanguage } from "functions/getLanguage";
function ViewPolicyHistory() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [modelOpen, setModelOpen] = useState(false);
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [approveId, setApproveId] = useState();
  const [rejectId, setRejectId] = useState();
  const [selectedId, setSelectedId] = useState(false);

  const getPolicyHistory = useSelector((state) => state.getPolicyHistory);
  const role = useSelector((state) => state.role);
  const user = useSelector((state) => state.user);
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    getAllPoliciesFunction();
  }, []);
  useEffect(() => {
    if (role) {
      CheckPermission();
    }
  }, [role]);
  function getAllPoliciesFunction() {
    dispatch({
      type: "GET_ALL_POLICIES_HISTORY",
      payload: id,
    });
  }

  function FunctionApproveReject(v) {
    let routeId;

    if (v === "approve") {
      routeId = approveId;
    } else if (v === "reject") {
      routeId = rejectId;
    }

    if (routeId) {
      dispatch({
        type: "STATUS_UPDATE_POLICY",
        payload: { id: selectedId, userId: id, status: v, modId: routeId },
      });

      setTimeout(
        () => (
          setModelOpen(false), getAllPoliciesFunction(), CheckPermission()
        ),
        1000
      );
    }
  }

  function CheckPermission() {
    let policies = role?.permissions.find(
      (item) => item.code === CODE.POLICIES
    );

    if (policies) {
      let approve = policies?.subMenus?.find(
        (item) => item.code === CODE.APPROVE_POLICY
      );
      let reject = policies?.subMenus?.find(
        (item) => item.code === CODE.REJECT_POLICY
      );

      if (approve) {
        setApproveId(approve?.id);
        setApprove(true);
      }
      if (reject) {
        setRejectId(reject?.id);

        setReject(true);
      }
    } else {
      setApprove(false);
      setReject(false);
    }
  }

  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("Policy History")}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table
            className={`w-full whitespace-nowrap  text-sm  text-gray-500 dark:text-gray-400 ${
              getLanguage() === "ar" ? "text-right" : "text-left"
            }`}
          >
            <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Id")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Policy Name")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Previous Value")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("New Value")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Created Date")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Modified Date")}
                </th>

                <th scope="col" className="px-3 py-3">
                  {t("Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getPolicyHistory?.map((v, k) => (
                <tr key={k} className="bg-white border-b dark:border-gray-200">
                  <td className="px-3 py-5">{v?.id}</td>
                  <td className="px-3">{t(v?.policyName)}</td>
                  <td className="px-3">{t(v?.previousValue)}</td>
                  <td className="px-3">{t(v?.newValue)}</td>
                  <td className="px-3">{t(v?.createdDate)}</td>
                  <td className="px-3">{t(v?.lastModified)}</td>
                  <td className="px-3">
                    <div>
                      {v?.status === "REJECTED" ? (
                        <>{t("REJECTED")}</>
                      ) : v?.status === "APPROVED" ? (
                        <>{t("APPROVED")}</>
                      ) : (
                        <div className="">
                          <div className="space-x-3  rtl:space-x-reverse">
                            {approve && (
                              <Button
                                buttonValue={t("Approve")}
                                onButtonClick={() => (
                                  setSelectedId(v?.id), setModelOpen(true)
                                )}
                              />
                            )}
                            {reject && (
                              <Button
                                buttonValue={t("Reject")}
                                buttonColor="bg-red-600"
                                onButtonClick={() => (
                                  setSelectedId(v?.id), setModelOpen(true)
                                )}
                              />
                            )}
                            {!reject && !approve && "Pending"}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>

      <Model
        heading={t("Approve/Reject Policy")}
        isOpen={modelOpen}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen(!modelOpen)}
        action1Value={t("Reject")}
        action2Value={t("Approve")}
        action2={() => FunctionApproveReject("approve")}
        action1={() => FunctionApproveReject("reject")}
      >
        <a className=" text-xl text-gray-800 ">{t("Are You Sure  ?")}</a>
      </Model>
    </div>
  );
}
export default withAuthorization(ViewPolicyHistory);
