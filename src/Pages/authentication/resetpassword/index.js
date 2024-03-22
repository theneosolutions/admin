import React, { useEffect } from "react";
import "./login.css";

import Logo from "../../../Assets/Images/logo.svg";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import ResetPassord from "./resetPassord";
import NewPassword from "./newPassword";

import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../constants/roles";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [idNumber, setIdNumber] = useState("");
  const [active, setActive] = useState("login");
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const verificationOtp = useSelector((state) => state.forgetVerificationOtp);

  function PasswordScreen(e) {
    console.log("heloooooooooooooooooo", e);
    dispatch({
      type: "CHANGE_PASSWORD",
      payload: {
        idNumber: idNumber,
        newPassword: e,
        otp: verificationOtp,
      },
    });
  }
  useEffect(() => {
    if (verificationOtp && message === "reset Otp Success") {
      setActive("otp");
      dispatch(action.Message({ message: "" }));
    }
  }, [verificationOtp, message]);
  function sendOtp() {
    dispatch({
      type: "RESET_OTP_VERIFICATION",
      payload: {
        idNumber: idNumber,
      },
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    sendOtp();
  };
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  useEffect(() => {
    if (message === "Password reset successful.") {
      navigate("/login");
    }
  }, [message]);

  return (
    <section className="bg-fixed-full h-screen w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <a
            href="#"
            class="flex flex-col items-center mb-2 mt-8 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img class="w-48" src={Logo} alt="logo" />
          </a>
          {active === "login" && (
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter Your Id Number
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="idNumber"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ID Number
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    id="idNumber"
                    onChange={(e) => setIdNumber(e.target.value)}
                    value={idNumber}
                    class="bg-gray-50 border border-primary text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white outline-none"
                    required={true}
                  />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-start"></div>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-primary hover:bg-opacity-80 duration-300  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Continue
                </button>
              </form>
            </div>
          )}
          {active === "otp" && (
            <ResetPassord
              otp={verificationOtp}
              PasswordScreen={() => setActive("newPassword")}
              resendOtp={() => sendOtp()}
            />
          )}
          {active === "newPassword" && (
            <NewPassword PasswordScreen={(e) => PasswordScreen(e)} />
          )}
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </section>
  );
}
export default Login;
