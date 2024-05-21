import React from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";

function Model({
  isOpen,
  setState,
  heading,
  children,
  action1Value,
  action2Value,
  action1,
  action2,
  style,
  innerStyle,
}) {
  const { t } = useTranslation();

  return (
    <div>
      {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          className="bg-gray-200 bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
        >
          <div
            className={`relative p-4 max-w-2xl max-h-full ${
              style ? style : "w-full"
            }`}
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {heading}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setState()}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">{t("Close modal")}</span>
                </button>
              </div>
              <div className={`p-4  space-y-4 ${innerStyle}`}>{children}</div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 justify-between">
                {action1Value && (
                  <>
                    <Button
                      buttonValue={action1Value}
                      buttonColor="bg-red-400"
                      onButtonClick={() => action1()}
                    />
                  </>
                )}
                {action2Value && (
                  <>
                    <Button
                      buttonValue={action2Value}
                      onButtonClick={() => action2()}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Model;
