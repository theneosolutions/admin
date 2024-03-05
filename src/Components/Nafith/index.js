import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Nafith() {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.getNafith);
  useEffect(() => {
    GetNafithResponse();
  }, []);
  function GetNafithResponse() {
    dispatch({
      type: "GET_NAFITH_REPORT",
      payload: "d30117de-7fe7-4e64-a9f1-49ff9e24f618",
    });
  }
  console.log(
    "data:application/pdf;base64,${report?.Base64}",
    `data:application/pdf;base64,${report?.Base64}`
  );

  const [pdfURL, setPdfURL] = useState("");

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
  console.log("url", pdfURL);
  return (
    <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
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
    </div>
  );
}
export default Nafith;
