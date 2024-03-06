import React from "react";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure

import { useSelector } from "react-redux";

function MainTemplate({ children }) {
  const loading = useSelector((state) => state.Loading);

  return (
    <div>
      <WaveAnimation show={loading} />

      <div>{children}</div>
    </div>
  );
}
export default MainTemplate;
