import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CardMain from "../../../Components/Cards/main";
import { Model } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";
import { useLocation } from "react-router-dom";
import { Button } from "Components";

function ViewPolicyHistory() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(false);

  const getPolicyHistory = useSelector((state) => state.getPolicyHistory);
  const role = useSelector((state) => state.role);
  const user = useSelector((state) => state.user);
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    getAllPoliciesFunction();
  }, []);
  function getAllPoliciesFunction() {
    dispatch({
      type: "GET_ALL_POLICIES_HISTORY",
      payload: id,
    });
  }

  function FunctionApproveReject(v) {
    dispatch({
      type: "STATUS_UPDATE_POLICY",
      payload: { id: selectedId, userId: user?.user?.id, status: v },
    });

    setTimeout(() => (setModelOpen(false), getAllPoliciesFunction()), 600);
  }
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("Policy History")}
        iconStyle="text-3xl text-primary"
      >
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 bg-white uppercase  font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("ID")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Policy Name")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Privious Value")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("New Value")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Created Date")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Modified Data")}
                </th>
                {/* <th scope="col" className="px-3 py-3">
                  {t("Status")}
                </th> */}
                <th scope="col" className="px-3 py-3">
                  {t("Action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getPolicyHistory?.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-3 py-5">{v?.id}</td>
                  <td className="px-3">{t(v?.policyName)}</td>
                  <td className="px-3">{v?.previousValue}</td>
                  <td className="px-3">{v?.newValue}</td>
                  <td className="px-3">{v?.createdDate}</td>
                  <td className="px-3">{v?.lastModified}</td>
                  {/* <td className="px-3">{v?.status}</td> */}
                  <td className="px-3">
                    <div>
                      {v?.status === "REJECTED" ? (
                        <>{"REJECTED"}</>
                      ) : v?.status === "APPROVED" ? (
                        <>{"APPROVED"}</>
                      ) : (
                        <div className="">
                          {v?.policyRole === role ? (
                            <div className="space-x-3">
                              <Button
                                buttonValue={"Approve"}
                                onButtonClick={() => (
                                  setSelectedId(v?.id), setModelOpen(true)
                                )}
                              />
                              <Button
                                buttonValue={"Reject"}
                                buttonColor="bg-red-600"
                                onButtonClick={() => (
                                  setSelectedId(v?.id), setModelOpen(true)
                                )}
                              />
                            </div>
                          ) : (
                            "Pending"
                          )}
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
        heading={t("Approve Policy")}
        isOpen={modelOpen}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen(!modelOpen)}
        action1Value={t("Reject")}
        action2Value={t("Approve")}
        action2={() => FunctionApproveReject("approve")}
        action1={() => FunctionApproveReject("reject")}
      >
        <a className=" text-xl text-gray-800 ">
          {t("Are You Sure You Want to Approve ?")}
          {/* <span className="font-semibold"> Ali Imtayaz</span> */}
        </a>
      </Model>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default withAuthorization(ViewPolicyHistory, [
  ROLES.ADMIN,
  ROLES.CUSTOMER_CARE,
  ROLES.COMPLIANCE,
]);
