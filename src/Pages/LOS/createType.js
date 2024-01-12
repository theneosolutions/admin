import React, { useState, useEffect, useRef } from "react";
import CardMain from "Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import UplaodIcon from "Assets/Images/upload.svg";
import { useNavigate } from "react-router-dom";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure

function App() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loanReasons = useSelector((state) => state.getAllLoanReasons);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);

  const [formData, setFormData] = useState([{ key: null, value: null }]);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [reason, setReason] = useState("");

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  useEffect(() => {
    getAllReasons();
  }, []);
  function getAllReasons() {
    dispatch({
      type: "GET_ALL_LOAN_REASONS",
    });
  }

  const handleChange = (index, field, newValue) => {
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[index][field] = newValue;
      return newData;
    });
  };

  const handleAddMore = () => {
    setFormData((prevData) => [...prevData, { key: null, value: null }]);
  };

  const transformList = (originalList) => {
    return originalList.map((item) => ({
      [item.key]: isNaN(parseInt(item.value)) ? null : parseInt(item.value),
    }));
  };

  const handleSubmit = () => {
    if (
      !image ||
      !reason ||
      formData.some((item) => !item.key || !item.value)
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const mergedObject = {};
    const temp = transformList(formData);

    temp.forEach((obj) => {
      for (const key in obj) {
        mergedObject[key] = obj[key];
      }
    });

    const transformedObject = {};

    for (const key in mergedObject) {
      const newKey = key + " Months";
      transformedObject[newKey] = mergedObject[key];
    }

    dispatch({
      type: "CREATE_LOAN_TYPE",
      payload: { transformedObject, reason, image },
    });
    setTimeout(() => {
      getAllReasons();
    }, 1000);
  };

  const fileInputRef = useRef(null);

  function handleClick() {
    fileInputRef.current.click();
  }
  function handleSelectImage(e) {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
      };

      reader.readAsDataURL(selectedImage);

      setImage(selectedImage);
      setImage2(URL.createObjectURL(selectedImage));
    }
  }
  useEffect(() => {
    if (error === false) {
      reset();
    }
  }, [message]);
  function reset() {
    setFormData([{ key: null, value: null }]);
    setReason("");
    setImage(null);
    setImage2(null);
  }
  return (
    <div className="container mx-auto mt-5 space-y-6">
      <WaveAnimation show={loading} />

      <div className="flex flex-col md:flex-row md:space-x-6 rtl:space-x-reverse w-full ">
        <CardMain
          width="w-full h-max md:w-1/2 md:mt-0 mt-4"
          heading={t("Create Reason")}>
          <div className=" px-3  space-y-3">
            <div className="flex flex-row">
              <div
                onClick={handleClick}
                className="w-48 border  bg-secondry rounded-md border-dashed	 border-slate-200 items-center flex flex-col justify-center px-4 py-8">
                {!image2 && <img src={UplaodIcon} />}

                {image2 && <img src={image2} />}
                <a className="font-semibold mt-3">
                  <span className="underline text-primary font-bold cursor-pointer hover:opacity-80 duration-300">
                    Browse
                  </span>
                </a>
                <a className="text-xs text-gray-600 mt-3">
                  Supported formates: Ico, PNG
                </a>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <a className="text-sm text-gray-700 font-semibold">Reason</a>

              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="border-primary rounded-md border  px-3 py-2 outline-none mt-2 w-full"
              />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleSelectImage}
              style={{ display: "none" }}
            />

            <div className="px-4 py-3 border  bg-secondry rounded-md border-dashed	 border-slate-200 ">
              <a className="text-sm text-gray-700 font-semibold">Tensures </a>

              <div className="mt-4">
                {formData?.map((data, index) => (
                  <div key={index} className="mb-4 flex space-x-2">
                    <div className="flex flex-col w-1/2 ">
                      <a className="text-sm text-gray-700">Months</a>

                      <input
                        type="number"
                        value={data.key || ""}
                        onChange={(e) =>
                          handleChange(index, "key", e.target.value)
                        }
                        className="border-primary border rounded-md  px-3 py-2 outline-none mt-2 w-full"
                        placeholder="Key"
                      />
                    </div>

                    <div className="flex flex-col w-1/2 ">
                      <a className="text-sm text-gray-700">Ratio</a>

                      <input
                        type="number"
                        value={data.value || ""}
                        onChange={(e) =>
                          handleChange(index, "value", e.target.value)
                        }
                        className="border-primary border rounded-md  px-3 py-2 outline-none mt-2 w-full"
                        placeholder="Value"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <div className="flex flex row items-end justify-end">
                  <button
                    onClick={handleAddMore}
                    className={`w-max rounded-lg text-white text-sm px-10 py-2.5   hover:bg-opacity-90 bg-primary`}>
                    Add More Tenures
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <button
                onClick={handleSubmit}
                className={`mt-5 rounded-lg text-white text-sm px-10 py-2.5   hover:bg-opacity-90 bg-primary`}>
                Submit
              </button>
            </div>
          </div>
        </CardMain>
        <CardMain
          width="w-full md:w-1/2 md:mt-0 mt-4 h-max"
          heading={t("All Reasons")}>
          {loanReasons?.map((v, k) => {
            return (
              <div
                key={k}
                onClick={() =>
                  navigate(`/los/create-loan-tax?id=${v?.loanTypeDetail?.id}`)
                }
                className="w-full bg-gray-200 text-center mt-4 py-6 rounded-md hover:bg-gray-300 duration-300 cursor-pointer">
                {v?.loanTypeDetail?.reason}
              </div>
            );
          })}
        </CardMain>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        className="mt-4">
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
