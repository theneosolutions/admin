import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

function OptScreen({ otp, LoginFunction, resendOtp }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [secondsLeft, setSecondsLeft] = useState(60);
  const { t } = useTranslation();

  const handleInput = (index, e) => {
    const value = e.target.value;
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    const maxLength = parseInt(e.target.getAttribute("maxlength"), 10);
    const currentLength = value.length;

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      // Handle backspace press
      if (currentLength === 0 && index > 0) {
        // If current input is empty and not the first input, move focus to the previous input
        inputRefs[index - 1].current.focus();
      }
    } else {
      // Handle regular input
      if (currentLength >= maxLength) {
        // If input is filled
        if (index < inputRefs.length - 1) {
          // If not the last input, move focus to the next input
          inputRefs[index + 1].current.focus();
        }
      }
    }
  };
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);
  const handleSubmit = (e) => {
    if (inputs.every((input) => input.trim() !== "")) {
      const all = inputs.join("");
      if (otp === all) {
        LoginFunction();
        // router.push(`/resetpassword/newpin?idnumber=${idnumber}`);
      } else {
        alert("Invalid Otp!");
      }
    }
  };
  useEffect(() => {
    if (!secondsLeft) return;
    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [secondsLeft]);
  function ResendCode() {
    setSecondsLeft(60);
    resendOtp();
  }
  return (
    <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
      <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div class="flex flex-col items-center justify-center text-center space-y-2">
          <div class="font-semibold text-3xl">
            <p>{t("Id Number Verification")}</p>
          </div>
          <div class="flex flex-row text-sm font-medium text-gray-400">
            <p>{t("We have sent a code to your ID Number")}</p>
          </div>
        </div>

        <div>
          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs mt-10">
            {inputRefs.map((inputRef, index) => (
              <div className="w-12 h-12" key={index}>
                <input
                  ref={inputRef}
                  className="bg-gray-100 w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-lg border border-gray-200 text-lg focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                  maxLength={1}
                  value={inputs[index]}
                  onChange={(e) => handleInput(index, e)}
                />
              </div>
            ))}
          </div>
          <div class="flex flex-col space-y-5 mt-10">
            <div>
              <button
                onClick={() => handleSubmit()}
                class="w-full text-white bg-primary hover:bg-opacity-80 duration-300  focus:outline-none font-medium rounded-lg text-sm px-5 py-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {t("Verify Account")}
              </button>
            </div>

            <div class="flex flex-row items-center justify-center text-center text-sm font-medium rtl:space-x-reverse space-x-1 text-gray-500">
              <p>{t("Didn't recieve code?")}</p>

              {secondsLeft > 0 ? (
                <div className="  text-sm  opacity-70">
                  {t("Resend code in")}
                  <a className="text-blue-600">
                    {secondsLeft < 60 ? `00:${secondsLeft}` : secondsLeft}
                  </a>
                </div>
              ) : (
                <a
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => ResendCode()}
                >
                  {t("Resend")}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OptScreen;
