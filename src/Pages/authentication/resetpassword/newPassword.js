import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function OptScreen({ PasswordScreen }) {
  const [password, setPassword] = useState("");
  const [retypePassword, setReTypePassword] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    if (!validatePassword(password)) {
      return alert("Password does not meet requirements");
    } else if (!validatePassword(retypePassword)) {
      return alert("Re Type Password does not meet requirements");
    } else if (password !== retypePassword) {
      return alert("Both Passwords Not Matched");
    } else {
      PasswordScreen(password);
    }
  };
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="font-semibold text-3xl">
            <p>{t("Change Password")}</p>
          </div>
          <div className="flex flex-row text-sm font-medium text-gray-400">
            <p>{t("You Can Write Your")}</p>
          </div>
        </div>

        <div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t("Password")}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-gray-50 border border-primary text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-200 dark:text-white outline-none"
              required={true}
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t("Re-Type Password")}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setReTypePassword(e.target.value)}
              value={retypePassword}
              className="bg-gray-50 border border-primary text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5  dark:placeholder-gray-200 dark:text-white outline-none"
              required={true}
            />
          </div>
          <div className="flex flex-col space-y-5 mt-10">
            <div>
              <button
                onClick={() => handleSubmit()}
                className="w-full text-white bg-primary hover:bg-opacity-80 duration-300  focus:outline-none font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {t("Change Password")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OptScreen;
