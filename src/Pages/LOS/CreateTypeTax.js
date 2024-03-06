import React, { useState, useEffect } from "react";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const loanReasons = useSelector((state) => state.getAllLoanReasons);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const [processingFee, setProcessingFee] = useState({});
  const [vatFee, setVatFee] = useState({});

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    getTypes();
    if (loanReasons.length > 0) {
      const temp = loanReasons.filter(
        (reason) => reason.loanTypeDetail.id == id
      );

      const parsedTenureTex = JSON.parse(
        temp[0]?.loanTypeDetail?.tenureTex || "{}"
      );
      const arrayOfObjects = Object.entries(parsedTenureTex).map(
        ([key, value]) => ({ [key]: null })
      );

      setProcessingFee(arrayOfObjects);
      setVatFee(arrayOfObjects);
    }
  }, [loanReasons]);
  const handleChange = (index, field, updatedValue) => {
    const updatedProcessingFee = [...processingFee];
    const [key, value] = Object.entries(updatedProcessingFee[index])[0];

    // Update the key or value based on the 'field' parameter
    if (field === "name") {
      updatedProcessingFee[index] = { [updatedValue]: value };
    } else if (field === "months") {
      updatedProcessingFee[index] = { [key]: updatedValue };
    }

    setProcessingFee(updatedProcessingFee);
  };
  const handleChangeVat = (index, field, updatedValue) => {
    const updatedVatFee = [...vatFee];
    const [key, value] = Object.entries(updatedVatFee[index])[0];

    // Update the key or value based on the 'field' parameter
    if (field === "name") {
      updatedVatFee[index] = { [updatedValue]: value };
    } else if (field === "months") {
      updatedVatFee[index] = { [key]: updatedValue };
    }

    setVatFee(updatedVatFee);
  };
  const handleSubmit = () => {
    // Validate processingFee
    for (const entry of processingFee) {
      const key = Object.keys(entry)[0];
      const value = entry[key];
      // Check if any input is null or undefined or an empty string
      if (
        key == null ||
        value == null ||
        key === undefined ||
        value === undefined ||
        value === ""
      ) {
        // Display a user-friendly message or perform other required actions
        alert("Please fill in all Processing Fee inputs");
        return; // Stop further processing
      }
    }

    // Validate vatFee
    for (const entry of vatFee) {
      const key = Object.keys(entry)[0];
      const value = entry[key];

      // Check if any input is null or undefined or an empty string
      if (
        key == null ||
        value == null ||
        key === undefined ||
        value === undefined ||
        value === ""
      ) {
        // Display a user-friendly message or perform other required actions
        alert("Please fill in all Vat Fee inputs");
        return; // Stop further processing
      }
    }

    // If all inputs are valid, continue processing
    const mergedResult = {};
    processingFee.forEach((entry) => {
      const key = Object.keys(entry)[0];
      const value = entry[key];
      mergedResult[key] = isNaN(parseInt(value)) ? null : parseInt(value);
    });

    const mergedResult2 = {};
    vatFee.forEach((entry) => {
      const key = Object.keys(entry)[0];
      const value = entry[key];
      mergedResult2[key] = isNaN(parseInt(value)) ? null : parseInt(value);
    });

    // Add the code to submit the valid data to your backend or perform any other necessary action
    const data = {
      loanTypeId: id,
      processingFee: mergedResult,
      vatOnFee: mergedResult2,
    };

    dispatch({
      type: "CREATE_LOAN_TAX",
      payload: data,
    });
    setTimeout(() => {
      navigate("/los/create-type");
    }, 1000);
  };
  function getTypes() {
    dispatch({
      type: "GET_LOAN_TYPE_TAX",
      payload: id,
    });
  }

  return (
    <div className="container mx-auto mt-5 space-y-6">
      <WaveAnimation show={loading} />
      <div className="flex flex-col md:flex-row md:space-x-6 rtl:space-x-reverse w-full ">
        <CardMain
          width="w-full md:mt-0 mt-4"
          heading={t("Amount And Taxes As Per Month")}
        >
          <div className=" px-3  space-y-3 ">
            <div className="flex flex-row"></div>
            {/* <div className="flex flex-col w-full">
              <a className="text-sm text-gray-700 font-semibold">Reason</a>
            </div> */}
            <Fees
              processingFee={processingFee}
              vatFee={vatFee}
              handleChange={(a, b, c) => handleChange(a, b, c)}
              handleChangeVat={(a, b, c) => handleChangeVat(a, b, c)}
              setProcessingFee={(e) => setProcessingFee(e)}
              setVatFee={(e) => setVatFee(e)}
            />
            <div className="flex flex-col">
              <button
                onClick={handleSubmit}
                className={`mt-5 rounded-lg text-white text-sm px-10 py-2.5   hover:bg-opacity-90 bg-primary`}
              >
                Submit
              </button>
            </div>
          </div>
        </CardMain>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        className="mt-4"
      >
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
function Fees({
  processingFee,
  vatFee,
  handleChange,
  handleChangeVat,
  setProcessingFee,
  setVatFee,
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const getLoanTax = useSelector((state) => state.getLoanTax);
  useEffect(() => {
    if (getLoanTax.loanTypeId === parseInt(id)) {
      const arrayOfObjects = Object.entries(getLoanTax?.processingFee).map(
        ([key, value]) => ({ [key]: value })
      );
      const arrayOfObjects2 = Object.entries(getLoanTax?.vatOnFee).map(
        ([key, value]) => ({ [key]: value })
      );
      setProcessingFee(arrayOfObjects);
      setVatFee(arrayOfObjects2);
    }
  }, [getLoanTax.loanTypeId, getLoanTax?.processingFee]);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4">
      <div className="lg:w-1/2 px-4 py-3 border  bg-secondry rounded-md border-dashed	 border-slate-200 ">
        <a className="text-sm text-gray-700 font-semibold">Processing Fee </a>

        <div className="mt-4">
          {processingFee?.length > 0 && (
            <>
              {processingFee?.map((obj, index) => {
                const [key, value] = Object.entries(obj)[0]; // Extracting key-value pair

                return (
                  <div key={index} className="mb-4 flex space-x-2">
                    <div className="flex flex-col w-1/2">
                      <a className="text-sm text-gray-700">Months</a>
                      <input
                        disabled={true}
                        type="text"
                        value={key || ""}
                        onChange={(e) =>
                          handleChange(index, "name", e.target.value)
                        }
                        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full"
                        placeholder="Key"
                      />
                    </div>

                    <div className="flex flex-col w-1/2">
                      <a className="text-sm text-gray-700">Fee</a>
                      <input
                        type="number"
                        value={value || ""}
                        onChange={(e) =>
                          handleChange(index, "months", e.target.value)
                        }
                        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full"
                        placeholder="Value"
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="mt-4 lg:mt-0 lg:w-1/2 px-4 py-3 border  bg-secondry rounded-md border-dashed	 border-slate-200 ">
        <a className="text-sm text-gray-700 font-semibold">Vat on Fee </a>
        <div className="mt-4">
          {vatFee?.length > 0 && (
            <>
              {vatFee?.map((obj, index) => {
                const [key, value] = Object.entries(obj)[0]; // Extracting key-value pair

                return (
                  <div key={index} className="mb-4 flex space-x-2">
                    <div className="flex flex-col w-1/2">
                      <a className="text-sm text-gray-700">Months</a>
                      <input
                        disabled={true}
                        type="text"
                        value={key || ""}
                        onChange={(e) =>
                          handleChangeVat(index, "name", e.target.value)
                        }
                        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full"
                        placeholder="Key"
                      />
                    </div>

                    <div className="flex flex-col w-1/2">
                      <a className="text-sm text-gray-700">Fee</a>
                      <input
                        type="number"
                        value={value || ""}
                        onChange={(e) =>
                          handleChangeVat(index, "months", e.target.value)
                        }
                        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full"
                        placeholder="Value"
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
