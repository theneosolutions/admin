import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";

function OptScreen({ otp, LoginFunction }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInput = (index, e) => {
    const value = e.target.value;
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    const maxLength = parseInt(e.target.getAttribute("maxlength"), 10);
    const currentLength = value.length;

    if (currentLength >= maxLength && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = (e) => {
    if (inputs.every((input) => input.trim() !== "")) {
      const all = inputs.join("");
      console.log("Input values:", all);
      if (otp === all) {
        console.log("goood ");
        LoginFunction();
        // router.push(`/resetpassword/newpin?idnumber=${idnumber}`);
      } else {
        console.log("not good");
        alert("Invalid Otp!");
      }
    }
  };

  return (
    <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
      <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div class="flex flex-col items-center justify-center text-center space-y-2">
          <div class="font-semibold text-3xl">
            <p>Email Verification</p>
          </div>
          <div class="flex flex-row text-sm font-medium text-gray-400">
            <p>We have sent a code to your email ba**@dipainhouse.com</p>
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
                Verify Account
              </button>
            </div>

            <div class="flex flex-row items-center justify-center text-center text-sm font-medium rtl:space-x-reverse space-x-1 text-gray-500">
              <p>Didn't recieve code?</p>{" "}
              <a
                class="flex flex-row items-center text-blue-600"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resend
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OptScreen;
