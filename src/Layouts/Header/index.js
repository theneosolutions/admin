import React, { useState, useRef, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi"; // You can use other icons from react-icons
import * as action from "../../Services/redux/reducer";
import Chevron from "../../Assets/Images/chevron.svg";
import Globe from "../../Assets/Images/globe.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

function Header({ isOpen, toggleSidebar, className }) {
  const user = useSelector((state) => state?.user);

  return (
    <div
      className={`px-3 md:px-10 py-4 flex flex-row justify-between  rtl:space-x-reverse ${className} `}
      style={{ background: "#30C1D7" }}
    >
      <div className="flex flex-row space-x-4 rtl:space-x-reverse items-center">
        {isOpen ? null : (
          <div className="h-6 w-6">
            <GiHamburgerMenu
              className="mr-5 cursor-pointer h-full w-full"
              onClick={() => toggleSidebar()}
            />
          </div>
        )}
        <div className=" flex-row items-center space-x-2 rtl:space-x-reverse md:flex hidden"></div>
      </div>
      <div className="flex flex-row md:space-x-3 space-x-1 rtl:space-x-reverse items-center">
        <div className="flex flex-row md:space-x-3 space-x-1 rtl:space-x-reverse md:px-5 px-1">
          <Icons2 icon={Globe} />
        </div>
        <div className="flex flex-row text-sm text-white items-center space-x-3 rtl:space-x-reverse">
          <div className="flex flex-col items-end">
            <a className="text-xs">{user?.roles[0]?.name}</a>
            <a className="font-semibold md:text-base text-xs">
              {user?.firstName}
            </a>
          </div>

          <Dropdown />
        </div>
      </div>
    </div>
  );
}
export default Header;

const Icons2 = ({ icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

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

  return (
    <div className={`relative inline-block text-left`} ref={dropDownRef}>
      <div
        onClick={toggleDropdown}
        className="h-6 w-6 md:h-8 md:w-8 bg-white rounded-full items-center text-center justify-center flex"
      >
        <img src={icon} className="h-4 w-4 md:h-6 md:w-6 cursor-pointer" />
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
              className=" cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
              role="menuitem"
              tabIndex="-1"
            >
              Arabic
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const Dropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const user = useSelector((state) => state?.user);
  const [direction, setDirection] = useState("");
  const { t } = useTranslation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // Event listener to handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    let dir = localStorage.getItem("direction");
    setDirection(dir);
  }, []);
  // useEffect to set up the event listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function handleChangeMyAccount() {
    navigate("/my-account");
    setIsOpen(!isOpen);
  }
  function Logout() {
    dispatch(action.Loading({ Loading: true }));

    dispatch({
      type: "LOGOUT_USER",
      payload: user?.id,
    });
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button onClick={toggleDropdown} type="button" className="shadow-sm ">
          <img src={Chevron} />
        </button>
      </div>
      {isOpen && (
        <div
          className={`origin-top-right absolute  ${
            direction === "rtl" ? "left-0" : "right-0"
          }  cursor-pointer mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <a
              onClick={() => handleChangeMyAccount()}
              className="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
              role="menuitem"
              tabIndex="-1"
            >
              {t("My Account")}
            </a>
            <a
              onClick={() => Logout()}
              className="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
              role="menuitem"
              tabIndex="-1"
            >
              {t("Logout")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const Icons = ({ icon, notification }) => {
  return (
    <div className="flex flex-row">
      <div className="h-6 w-6 md:h-8 md:w-8 bg-white rounded-full items-center text-center justify-center flex">
        <img src={icon} className="h-4 w-4 md:h-5 md:w-5" />
      </div>
      {notification && (
        <div className="bg-red-600 h-2 w-2 rounded-full -ml-2 border-white border-2"></div>
      )}
    </div>
  );
};
