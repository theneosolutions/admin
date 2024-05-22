import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function Header({ value }) {
  return (
    <div className="bg-gray-300 px-3 py-2 rounded-lg text-gray-600">
      {value}
    </div>
  );
}
export default Header;
