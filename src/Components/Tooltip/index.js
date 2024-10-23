import React from "react";

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="relative">
      <span
        className="cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </span>
      {showTooltip && (
        <div className="z-50 bg-gray-300 text-gray-600 text-[10px] rounded px-2 py-1 absolute bottom-full left-1/2 transform -translate-x-1/2 opacity-100 transition-opacity duration-300 normal-case">
          {text}
        </div>
      )}
    </div>
  );
};
export default Tooltip;
