import React, { useEffect } from "react";
import "./login.css";

import Logo from "../../../Assets/Images/logo.svg";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import OtpScreen from "./otp";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../constants/roles";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("login");
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const verificationOtp = useSelector((state) => state.verificationOtp);
  const islogin = useSelector((state) => state.islogin);

  const role = useSelector((state) => state.role);
  const token = useSelector((state) => state.token);

  function Login() {
    dispatch({
      type: "LOGIN_USER",
      payload: {
        // idNumber: 1077899779,
        // password: "arhamIlyas123@",
        idNumber: idNumber,
        password: password,
        otp: verificationOtp,
      },
    });
  }
  useEffect(() => {
    if (verificationOtp && message) {
      setActive("otp");
      dispatch(action.Message({ message: "" })); // Closing the message
    }
  }, [verificationOtp, message]);
  function sendOtp() {
    dispatch({
      type: "LOGIN_OTP_VERIFICATION",
      payload: {
        // idNumber: 1077899779,
        // password: "arhamIlyas123@",
        idNumber: idNumber,
        password: password,
      },
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    Validate();
  };
  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  function Validate() {
    sendOtp();
  }
  useEffect(() => {
    if (islogin && role && token) {
      console.log("role", role, ROLES.MODERATOR);
      console.log("type=========", typeof role, typeof ROLES.MODERATOR);

      if (role === ROLES.ADMIN) {
        navigate("/dashboard/account");
      } else if (role === ROLES.COMPLIANCE) {
        navigate("/users/dashboard");
      } else if (role === ROLES.CUSTOMER_CARE) {
        navigate("/users/dashboard");
      } else if (role === ROLES.UNDER_WRITER) {
        navigate("/los/applications");
      } else if (role === ROLES.MODERATOR) {
        navigate("/decisions/q/a");
      } else if (role === ROLES.SALES) {
        navigate("/dashboard/account");
      } else {
        navigate("/dashboard/account");
      }
      setActive("login");
    }
  }, [islogin, role, token]);
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
                Sign in to your account
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
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    class="bg-gray-50 border border-primary text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-200 dark:text-white outline-none"
                    required={true}
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-primary rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    onClick={() => navigate("/forget-password")}
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-primary hover:bg-opacity-80 duration-300  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          )}
          {active === "otp" && (
            <OtpScreen
              otp={verificationOtp}
              LoginFunction={() => Login()}
              resendOtp={() => sendOtp()}
            />
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
