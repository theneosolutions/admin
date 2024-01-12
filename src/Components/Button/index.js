import React from "react";
function Button({
  buttonColor,
  buttonStyle,
  buttonDisable,
  onButtonClick,
  buttonValue,
  type,
}) {
  return (
    <button
      type={type}
      disabled={buttonDisable}
      onClick={onButtonClick}
      className={` rounded-lg text-white text-sm px-5 py-2  ${buttonStyle} hover:bg-opacity-90  ${
        buttonColor ? buttonColor : "bg-primary "
      }`}>
      {buttonValue}
    </button>
  );
}
export default Button;
