import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CODE } from "constants/codes";
import withAuthorization from "constants/authorization";
import Model2 from "Components/Model2";
import ModelHistoryPolicy from "./modelHistoryPolicy";
import DeliquencyModelHistory from "./deliquencyModelHistory";

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
  const [selectedData, setSelectedData] = useState();
  const getPolicyHistory = useSelector((state) => state.getPolicyHistory);

  const role = useSelector((state) => state.role);
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const policyName = queryParams.get("name");

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
        heading={t("Policy History") + " " + policyName}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3">
                  {t("Id")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Policy Name")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Created Date")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Modified Date")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Status")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getPolicyHistory?.map((v, k) => (
                <tr key={k} className="bg-white border-b dark:border-gray-200">
                  <td className="px-3">{t(v?.id)}</td>
                  <td className="px-3">{t(v?.policyName)}</td>
                  <td className="px-3">{t(v?.createdDate)}</td>
                  <td className="px-3">{t(v?.lastModified)}</td>
                  <td className="px-3">{t(v?.status)}</td>

                  <td className="px-3 py-3">
                    <div
                      className={`${
                        v?.status === "PENDING"
                          ? "bg-blue-500"
                          : v?.status === "REJECTED"
                          ? "bg-red-500"
                          : v?.status === "APPROVED"
                          ? "bg-primary"
                          : ""
                      } w-min text-white  cursor-pointer px-4 hover:opacity-80 duration-300 py-1 rounded-md`}
                      onClick={() => (
                        setModelOpen(true),
                        setSelectedData(v),
                        setSelectedId(v?.id)
                      )}
                    >
                      {(approve && v?.status === "PENDING") ||
                      (reject && v?.status === "PENDING")
                        ? "Review"
                        : "View"}
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
          reset={() => setModelOpen(false)}
          heading={t("Update Policy")}
        >
          {policyName === "Delinquency" ? (
            <DeliquencyModelHistory
              approve={approve}
              reject={reject}
              FunctionApproveReject={(e) => FunctionApproveReject(e)}
              data={selectedData}
              newValue={JSON.parse(selectedData?.newValue)}
              priviousValue={JSON.parse(selectedData?.previousValue)}
              setModelOpen={(e) => setModelOpen(e)}
            />
          ) : (
            <ModelHistoryPolicy
              approve={approve}
              reject={reject}
              FunctionApproveReject={(e) => FunctionApproveReject(e)}
              data={selectedData}
              newValue={JSON.parse(selectedData?.newValue)}
              priviousValue={JSON.parse(selectedData?.previousValue)}
              setModelOpen={(e) => setModelOpen(e)}
            />
          )}
        </Model2>
      ) : null}
    </div>
  );
}
export default withAuthorization(ViewPolicyHistory);
