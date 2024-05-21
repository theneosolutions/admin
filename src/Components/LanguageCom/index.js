import React, { useEffect, useRef, useState } from "react";
import Globe from "../../Assets/Images/globe.svg";

const LanguageCom = ({ icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  const [direction, setDirection] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLanguageChange = (language, direction) => {
    localStorage.setItem("preferredLanguage", language);
    localStorage.setItem("direction", direction);
    window.location.reload(true);
  };
  useEffect(() => {
    let dir = localStorage.getItem("direction");
    setDirection(dir);
  }, []);
  return (
    <div className="">
      <div></div>
      <div className="px-5 py-5">
        <div className={`relative inline-block text-left`} ref={dropDownRef}>
          <div
            onClick={toggleDropdown}
            className="h-6 w-6 md:h-8 md:w-8 bg-white rounded-full items-center text-center justify-center flex"
          >
            <img src={Globe} className="h-4 w-4 md:h-6 md:w-6 cursor-pointer" />
          </div>
          {isOpen && (
            <div
              className={`origin-top-right absolute  ${
                direction === "rtl" ? "right-0" : "left-0"
              }  mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <a
                  onClick={() => handleLanguageChange("en", "ltr")}
                  className="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
                  role="menuitem"
                  tabIndex="-1"
                >
                  English
                </a>
                <a
                  onClick={() => handleLanguageChange("ar", "rtl")}
                  className="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Arabic
                </a>
              </div>
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
};
export default LanguageCom;
