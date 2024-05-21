import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function CreateQuestionsSet() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const getScreensSets = useSelector((state) => state.getScreensSets.data);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    GetScreenSets();
  }, []);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  function GetScreenSets() {
    dispatch({
      type: "GET_SCEENS_SET",
      payload: id,
    });
  }

  return (
    <div className="">
      {getScreensSets && (
        <div className="mt-6 flex flex-wrap md:flex-wrap   rtl:space-x-reverse h-max">
          {Object.entries(getScreensSets).map(([category, items]) => (
            <div className="p-2 md:w-1/3 w-full h-min md:flex-shrink-0">
              <CardMain key={category} heading={category} width=" ">
                <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                    <tr>
                      <th scope="col" className="px-3 py-3 cursor-pointer">
                        {t("heading")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((v, k) => (
                      <tr
                        key={k}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-3 py-4 cursor-pointer text-primary">
                          {v?.data?.question}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardMain>
            </div>
          ))}
        </div>
      )}

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

export default CreateQuestionsSet;
