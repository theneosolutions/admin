// import SimahUserDownload from "../simahUser";
// import { useDispatch, useSelector } from "react-redux";

// import React from "react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import * as action from "../../../Services/redux/reducer";

// function DownloadPDF() {
//   const dispatch = useDispatch();

//   const downloadPDFDocument = async () => {
//     dispatch(action.Loading({ Loading: true }));

//     const input = document.getElementById("content-to-download");
//     const canvas = await html2canvas(input, {
//       scale: 2, // Increase scale to improve quality
//       useCORS: true, // This helps with images if they are from external sources
//       windowWidth: input.scrollWidth,
//       windowHeight: input.scrollHeight,
//     });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "px",
//       format: [canvas.width, canvas.height],
//     });
//     // Variables for page settings
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();
//     const imgHeight = (canvas.height * pageWidth) / canvas.width;
//     let heightLeft = imgHeight;
//     let position = 0;
//     // Add image to PDF and handle multiple pages if needed
//     pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
//     heightLeft -= pageHeight;
//     while (heightLeft >= 0) {
//       position = heightLeft - imgHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }
//     pdf.save("download.pdf");
//     dispatch(action.Loading({ Loading: false }));
//   };

//   return (
//     <div>
//       <div className="flex flex-row justify-between">
//         <div></div>
//         <button
//           onClick={downloadPDFDocument}
//           className="bg-blue-600 text-white hover:bg-blue-700 duration-300 cursor-pointer px-3 py-1 rounded-lg text-sm"
//         >
//           Download as PDF
//         </button>
//       </div>

//       <div
//         id="content-to-download"
//         style={{
//           width: "100%",
//           minHeight: "297mm",

//           backgroundColor: "white",
//         }}
//         className="px-10 mt-4"
//       >
//         <SimahUserDownload />
//       </div>
//     </div>
//   );
// }
// export default DownloadPDF;

import SimahUserDownload from "../simahUser";
import { useDispatch, useSelector } from "react-redux";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import * as action from "../../../Services/redux/reducer";

function DownloadPDF() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("All");
  async function downloadPDFDocument() {
    dispatch(action.Loading({ Loading: true }));

    const input = document.getElementById("content-to-download");
    const canvas = await html2canvas(input, {
      scale: 2, // Adjust scale as needed
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1); // Adjust quality as needed
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("download.pdf");
    dispatch(action.Loading({ Loading: false }));
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div></div>
        <button
          onClick={downloadPDFDocument}
          className="bg-blue-600 text-white hover:bg-blue-700 duration-300 cursor-pointer px-3 py-1 rounded-lg text-sm"
        >
          Download as PDF
        </button>
      </div>
      <div className="flex flex-row space-x-3 mb-4 ">
        <div
          onClick={() => setActive("All")}
          className={` w-max  px-3 py-1 cursor-pointer hover:opacity-80 rounded-md ${
            active === "All"
              ? "bg-blue-500 text-white "
              : " border-gray-300 border text-gray-600"
          }`}
        >
          All Products
        </div>
        <div
          onClick={() => setActive("Active Products")}
          className={` w-max  px-3 py-1 cursor-pointer hover:opacity-80 rounded-md ${
            active === "Active Products"
              ? "bg-blue-500 text-white "
              : " border-gray-300 border text-gray-600"
          }`}
        >
          Active Products
        </div>
        <div
          onClick={() => setActive("Closed Products")}
          className={` w-max  px-3 py-1 cursor-pointer hover:opacity-80 rounded-md ${
            active === "Closed Products"
              ? "bg-blue-500 text-white "
              : " border-gray-300 border text-gray-600"
          }`}
        >
          Closed Products
        </div>
        <div
          onClick={() => setActive("Default Products")}
          className={` w-max  px-3 py-1 cursor-pointer hover:opacity-80 rounded-md ${
            active === "Default Products"
              ? "bg-blue-500 text-white "
              : " border-gray-300 border text-gray-600"
          }`}
        >
          Default Products
        </div>
      </div>
      <div
        id="content-to-download"
        style={{
          width: "100%",
          minHeight: "297mm",

          backgroundColor: "white",
        }}
        className="px-10 mt-4"
      >
        <SimahUserDownload active={active} />
      </div>
    </div>
  );
}
export default DownloadPDF;
