import React from "react";
import { useTranslation } from "react-i18next";

function InputField({ value, onChange, type, style, placeholder }) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col ${style}`}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        type={type || "text"}
        placeholder={t(placeholder)}
        className="border-primary border rounded-md px-3 py-2 outline-none w-full"
      />
    </div>
  );
}

export default InputField;
