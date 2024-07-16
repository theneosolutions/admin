import React, { useEffect } from "react";
import "./login.css";
import Logo from "../../../Assets/Images/logo.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import OtpScreen from "./otp";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../constants/roles";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import LanguageCom from "Components/LanguageCom";
function Login() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("login");
  const message = useSelector((state) => state.message);

  const verificationOtp = useSelector((state) => state.verificationOtp);
  const islogin = useSelector((state) => state.islogin);

  const role = useSelector((state) => state.role);
  const token = useSelector((state) => state.token);

  function Login() {
    dispatch({
      type: "LOGIN_USER",
      payload: {
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
        idNumber: idNumber,
        password: password,
        macAddress: "",
      },
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    Validate();
  };

  function Validate() {
    sendOtp();
  }
  useEffect(() => {
    if (islogin && role && token) {
      dispatch(action.Message({ message: "" })); // Closing the message
      dispatch(action.VerificationOtp({ otp: null }));
      if (role === ROLES.ADMIN) {
        navigate("/dashboard/account");
      } else if (role === ROLES.COMPLIANCE) {
        navigate("/customers/dashboard");
      } else if (role === ROLES.CUSTOMER_CARE) {
        navigate("/customers/dashboard");
      } else if (role === ROLES.UNDER_WRITER) {
        navigate("/los/create-type");
      } else if (role === ROLES.MODERATOR) {
        // setActive("login");
        navigate("/decisions/q/a");
      } else if (role === ROLES.SALES) {
        navigate("/dashboard/account");
      } else {
        navigate("/dashboard/account");
      }
      setActive("login");
    }
  }, [islogin, role, token]);
  function backFunction() {
    setActive("login");
  }

  return (
    <section className="bg-fixed-full h-screen w-full">
      <LanguageCom />
      <div className="-mt-14 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <a class="flex flex-col items-center mb-2 mt-8 text-2xl font-semibold text-gray-900 dark:text-white">
            <div className="w-full flex flex-row justify-between px-10 items-center ">
              {active === "otp" ? (
                <IoChevronBackCircleOutline
                  className="text-3xl text-gray-600 hover:text-gray-800 cursor-pointer duration-300"
                  onClick={() => backFunction()}
                />
              ) : (
                <div></div>
              )}

              <img class="w-48" src={Logo} alt="logo" />
              <div></div>
            </div>
          </a>
          {active === "login" && (
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t("Sign in to your account")}
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="idNumber"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("ID number")}
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
                    {t("Password")}
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
                  <div class="flex items-start flex-row space-x-1 rtl:space-x-reverse">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-primary rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class=" text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        {t("Remember me")}
                      </label>
                    </div>
                  </div>
                  <a
                    onClick={() => navigate("/forget-password")}
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                  >
                    {t("Forgot password?")}
                  </a>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-primary hover:bg-opacity-80 duration-300  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {t("Sign in")}
                </button>
                {/* <p class="space-x-1 rtl:space-x-reverse text-sm font-light text-gray-500 dark:text-gray-400">
                  <a>{t("Don’t have an account yet?")}</a>
                  <a class="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    {t("Sign up")}
                  </a>
                </p> */}
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
    </section>
  );
}
export default Login;
