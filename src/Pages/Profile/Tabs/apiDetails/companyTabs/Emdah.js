import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Emdah() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const getEmdahReport = useSelector((state) => state.getEmdahReport);

  const [pdfURL, setPdfURL] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    GetEmdahReport();
  }, []);

  function GetEmdahReport() {
    dispatch({
      type: "GET_EMDAH_REPORT",
      payload: id,
    });
  }

  useEffect(() => {
    if (getEmdahReport?.url) {
      setLoading(true); // Show loader while fetching PDF
      fetch(getEmdahReport.url)
        .then((response) => response.blob())
        .then((blob) => {
          const pdfBlob = new Blob([blob], { type: "application/pdf" });
          const url = URL.createObjectURL(pdfBlob);
          setPdfURL(url);
          setLoading(false); // Hide loader when PDF is ready

          // Clean up URL when the component unmounts
          return () => URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Error loading PDF:", error);
          setLoading(false); // Hide loader if there's an error
        });
    }
  }, [getEmdahReport?.url]);

  return (
    <>
      {loading ? (
        <div className="py-20 px-20 text-center w-full">
          <span>Loading PDF...</span> {/* Simple text loader */}
        </div>
      ) : pdfURL ? (
        <div style={{ height: "100vh", width: "100%" }}>
          <iframe
            title="PDF Viewer"
            src={pdfURL}
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </div>
      ) : (
        <div className="py-20 px-20 text-center w-full ">
          <span>{"Nothing To Show!"}</span>
        </div>
      )}
    </>
  );
}

export default Emdah;
