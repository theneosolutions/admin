import React, { useEffect } from "react";
import "./login.css";
import Logo from "../../../Assets/Images/logo.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import ResetPassord from "./resetPassord";
import NewPassword from "./newPassword";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageCom from "Components/LanguageCom";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [idNumber, setIdNumber] = useState("");
  const [active, setActive] = useState("login");
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);

  const [otp, setOtp] = useState("");
  const encodePassword = (e) => {
    const combined = e + "@Zayk!@3AfO0$*^qC";
    const encoded = btoa(combined);
    return encoded;
  };
  function PasswordScreen(e) {
    dispatch({
      type: "CHANGE_PASSWORD",
      payload: {
        idNumber: idNumber,
        newPassword: encodePassword(e),
        otp: otp,
      },
    });
  }
  useEffect(() => {
    if (message === "Forget Password Api Success" && error === false) {
      setActive("otp");
      dispatch(action.Message({ message: "" }));
    }
  }, [error, message]);
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

  useEffect(() => {
    if (message === "Password reset successful.") {
      navigate("/login");
    }
  }, [message]);

  return (
    <section className="bg-fixed-full h-screen w-full">
      <LanguageCom />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-800 ">
          <a
            href="#"
            className="flex flex-col items-center mb-2 mt-8 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-48" src={Logo} alt="logo" />
          </a>
          {active === "login" && (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t("Enter Your Username")}
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="idNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Username")}
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    id="idNumber"
                    onChange={(e) => setIdNumber(e.target.value)}
                    value={idNumber}
                    className="bg-gray-50 border border-primary text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:placeholder-gray-400 dark:bg-gray-800 dark:text-white outline-none"
                    required={true}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-opacity-80 duration-300  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {t("Continue")}
                </button>
              </form>
            </div>
          )}
          {active === "otp" && (
            <ResetPassord
              PasswordScreen={(e) => (setOtp(e), setActive("newPassword"))}
              resendOtp={() => sendOtp()}
            />
          )}
          {active === "newPassword" && (
            <NewPassword PasswordScreen={(e) => PasswordScreen(e)} />
          )}
        </div>
      </div>
    </section>
  );
}
export default Login;
