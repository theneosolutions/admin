import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
function Emdah() {
  const dispatch = useDispatch();
  const getEmdahReport = useSelector((state) => state.getEmdahReport);
  console.log("Emdah", getEmdahReport);
  useEffect(() => {
    GetEmdahReport();
  }, []);
  function GetEmdahReport() {
    dispatch({
      type: "GET_EMDAH_REPORT",
      payload: "12348890",
    });
  }

  return (
    <>
      {getEmdahReport?.url ? (
        <div style={{ height: "100vh", width: "100%" }}>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={getEmdahReport?.url} />
          </Worker>
        </div>
      ) : (
        <div className="py-20 px-20 text-center w-full">
          <a>{"Nothing To Show!"}</a>
        </div>
      )}
    </>
  );
}
export default Emdah;
