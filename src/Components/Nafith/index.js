import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function Nafith() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const error = useSelector((state) => state.error);
  const message = useSelector((state) => state.message);

  console.log("erroororo", error);
  const report = useSelector((state) => state.getNafith);
  useEffect(() => {
    GetNafithResponse();
  }, []);
  function GetNafithResponse() {
    dispatch({
      type: "GET_NAFITH_REPORT",
      payload: id,
    });
  }

  const [pdfURL, setPdfURL] = useState("");
  // useEffect(() => {
  //   if (message === "Data Not Found!") {
  //     setPdfURL("");
  //   }
  // }, [message]);
  useEffect(() => {
    if (report?.Base64) {
      // Convert the Base64 string to a Blob
      const byteCharacters = atob(report?.Base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      setPdfURL(url);

      // Clean up URL when component unmounts
      return () => URL.revokeObjectURL(url);
    }
  }, [report?.Base64]);

  console.log("pdffffffff", pdfURL);
  return (
    <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
      {message === "Data Not Found!" ? (
        <></>
      ) : (
        <div className="w-full ">
          {pdfURL && (
            <iframe
              title="PDF Viewer"
              src={pdfURL}
              width="100%"
              height="1200px"
              frameBorder="0"
            ></iframe>
          )}
        </div>
      )}
    </div>
  );
}
export default Nafith;
