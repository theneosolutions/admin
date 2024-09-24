import React, { useEffect } from "react";
import "./login.css";
import Logo from "../../../Assets/Images/logo.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import OtpScreen from "./otp";
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import LanguageCom from "Components/LanguageCom";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { CODE } from "../../../constants/codes";
function Login() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("login");
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);

  const [eye, setEye] = useState(false);
  const verificationOtp = useSelector((state) => state.verificationOtp);
  const islogin = useSelector((state) => state.islogin);

  const role = useSelector((state) => state.role);
  const token = useSelector((state) => state.token);

  const encodePassword = () => {
    const combined = password + "@Zayk!@3AfO0$*^qC";
    const encoded = btoa(combined);
    return encoded;
  };

  function Login(otp) {
    dispatch({
      type: "LOGIN_USER",
      payload: {
        idNumber: idNumber,
        password: encodePassword(),
        otp: otp,
      },
    });
  }
  useEffect(() => {
    if (message === "Otp Recieved Login" && error === false) {
      setActive("otp");
      dispatch(action.Message({ message: "" })); // Closing the message
    }
  }, [verificationOtp, message]);

  function sendOtp() {
    dispatch({
      type: "LOGIN_OTP_VERIFICATION",
      payload: {
        idNumber: idNumber,
        password: encodePassword(),
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
      const value = appRoutes.find((item) =>
        item?.child?.find(
          (sub) => sub.code === role?.permissions[0]?.subMenus[0]?.code
        )
      );

      if (value?.child[0]?.path) {
        navigate(value?.child[0]?.path);
      } else {
        navigate("/dashboard/account");
      }

      dispatch(action.Message({ message: "" })); // Closing the message

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
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <a className="flex flex-col items-center mb-2 mt-8 text-2xl font-semibold text-gray-900 dark:text-white">
            <div className="w-full flex flex-row justify-between px-10 items-center ">
              {active === "otp" ? (
                <IoChevronBackCircleOutline
                  className="text-3xl text-gray-600 hover:text-gray-800  dark:hover:text-gray-300 cursor-pointer duration-300 dark:text-white"
                  onClick={() => backFunction()}
                />
              ) : (
                <div></div>
              )}

              <img className="w-48" src={Logo} alt="logo" />
              <div></div>
            </div>
          </a>
          {active === "login" && (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t("Sign in to your account")}
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="idNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("ID number")}
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    id="idNumber"
                    onChange={(e) => setIdNumber(e.target.value)}
                    value={idNumber}
                    className="dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 bg-gray-50 border border-primary text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:text-white outline-none"
                    required={true}
                    placeholder={t("Enter Your Id Number")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Password")}
                  </label>
                  <div className="bg-gray-50 border border-primary text-gray-900 sm:text-sm rounded-lg   items-center  w-full    overflow-hidden flex flex-row justify-between dark:bg-gray-800">
                    <input
                      type={eye ? "text" : "password"}
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="py-3 px-2.5 w-10/12 bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 outline-none"
                      placeholder={t("Enter your password")}
                      required={true}
                    />

                    {eye === true ? (
                      <IoEyeOutline
                        className="text-xl cursor-pointer  text-gray-600 mx-2 dark:text-white"
                        onClick={() => setEye(!eye)}
                      />
                    ) : (
                      <IoEyeOffOutline
                        className="text-xl cursor-pointer text-gray-600 mx-2 dark:text-white"
                        onClick={() => setEye(!eye)}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start flex-row space-x-1 rtl:space-x-reverse">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-primary rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className=" text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        {t("Remember me")}
                      </label>
                    </div>
                  </div>
                  <a
                    onClick={() => navigate("/forget-password")}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer dark:text-white"
                  >
                    {t("Forgot password?")}
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-opacity-80 duration-300  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {t("Sign in")}
                </button>
                {/* <p className="space-x-1 rtl:space-x-reverse text-sm font-light text-gray-500 dark:text-gray-400">
                  <a>{t("Don’t have an account yet?")}</a>
                  <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    {t("Sign up")}
                  </a>
                </p> */}
              </form>
            </div>
          )}
          {active === "otp" && (
            <OtpScreen
              otp={verificationOtp}
              LoginFunction={(e) => Login(e)}
              resendOtp={() => sendOtp()}
            />
          )}
        </div>
      </div>
    </section>
  );
}
export default Login;
const appRoutes = [
  {
    code: CODE.OVERVIEW,
    path: "/dashboard",

    child: [
      {
        code: CODE.OVERVIEW_ACCOUNT,
        path: "/dashboard/account",
      },
    ],
  },

  {
    code: CODE.APPLICATIONS,
    path: "/applications",

    child: [
      {
        code: CODE.LOAN_APPLICATIONS,
        path: "/applications/loan",
      },
    ],
  },

  {
    code: CODE.CUSTOMERS,
    path: "/customers",

    child: [
      {
        code: CODE.CUSTOMER_DASHBOARD,
        path: "/customers/dashboard",
      },
      {
        code: CODE.ALL_CUSTOMERS,
        path: "/customers/allcustomers",
      },
      {
        code: CODE.VERIFIED_CUSTOMERS,
        path: "/customers/verified",
      },
    ],
  },
  {
    code: CODE.ADMINISTRATOR,
    path: "/admin",

    child: [
      {
        code: CODE.CREATE_ADMIN,
        path: "/admin/create-admin",
      },
      {
        code: CODE.ASSIGN_PERMISSIONS_TO_ROLE,
        path: "/admin/add-roles",
      },
    ],
  },
  {
    code: CODE.SEELA,
    path: "/selaa",

    child: [
      {
        code: CODE.SEELA_HISTORY,
        path: "/selaa/history",
      },
      {
        code: CODE.SEELA_TRANSACTION,
        path: "/selaa/transaction",
      },
      {
        code: CODE.SEELA_COMMODITY,
        path: "/selaa/commodity",
      },
      {
        code: CODE.SEELA_WALLET,
        path: "/selaa/wallet",
      },
    ],
  },
  {
    code: CODE.POLICIES,
    path: "/policies",

    child: [
      {
        code: CODE.VIEW_POLICIES,
        path: "/policies/view-policies",
      },
    ],
  },
  {
    code: CODE.LOAN_MANAGEMENT,
    path: "/los",
    child: [
      {
        code: CODE.CREATE_TYPE,
        path: "/los/create-type",
      },
      {
        code: CODE.CUSTOMER_EMI,
        path: "/los/emi",
      },
    ],
  },
  {
    code: CODE.DECISIONS,
    path: "/decisions",

    child: [
      {
        code: CODE.QUESTIONS,
        path: "/decisions/q/a",
      },
      {
        code: CODE.CREATE_SET,
        path: "/decisions/create-set",
      },

      {
        code: CODE.CREATE_DECISION,
        path: "/decisions/create-decision",
      },
    ],
  },
  {
    code: CODE.NOTIFICATIONS,
    path: "/response",
    child: [
      {
        code: CODE.NOTIFICATIONS_DASHBOARD,
        path: "/response/notifications",
      },
      {
        code: CODE.TERMS_AND_CONDITIONS,
        path: "/response/term-conditions",
      },
      {
        code: CODE.AWARNESS_MESSAGE,
        path: "/response/awareness-messages",
      },
      {
        code: CODE.ADD_SMS,
        path: "/response/sms",
      },
    ],
  },
  {
    code: CODE.SIMAH,
    path: "/simah",
    child: [
      {
        code: CODE.SIMAH_DASHBOARD,
        path: "/simah/codes",
      },
    ],
  },
  {
    code: CODE.CALCULATIONS,
    path: "/calculations",
    child: [
      {
        code: CODE.CALCULATIONS_DBR,
        path: "/calculations/dbr",
      },
      {
        code: CODE.CALCULATION_BARE_MINIMUM_EXPENSE,
        path: "/calculations/bare-minimum-expense",
      },
      {
        code: CODE.CALCULATIONS_TERMS_AND_RATES,
        path: "/calculations/terms-rates",
      },
    ],
  },
];
