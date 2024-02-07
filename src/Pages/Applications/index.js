import React from "react";
import MyApplication2 from "../../Components/Cards/MyApplications2";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { useLocation } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const value = queryParams.get("value");

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  return (
    <div className="">
      <div className="mt-5 space-y-6 ">
        <div className="flex flex-row space-x-6 rtl:space-x-reverse">
          <CardMain width="w-full" heading={t(type)} des={value}>
            <MyApplication2 />
          </CardMain>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
