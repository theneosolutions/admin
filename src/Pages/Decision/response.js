import React, { useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useState, useRef } from "react";
import { Button } from "Components";
import { RiImageAddLine } from "react-icons/ri";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import * as action from "../../Services/redux/reducer";
import { useTranslation } from "react-i18next";
import Lottie from "lottie-react";
import axios from "axios";
function CreateUser({ setid }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [setId, setSetId] = useState();
  const [messageSuccess, setMessageSuccesss] = useState("");
  const [messageError, setMessageError] = useState("");
  const [desSuccess, setDesSuccess] = useState("");
  const [desError, setDesError] = useState("");
  const [imageSuccess, setImageSucesss] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [lottieOptionsSuccess, setLottieOptionsSuccess] = useState(null);
  const [lottieOptionsError, setLottieOptionsError] = useState(null);
  const [imageSuccessPng, setImageSucesssPng] = useState(null);
  const [imageErrorPng, setImageErrorPng] = useState(null);

  const fileInputRefSuccess = useRef(null); // Create a ref for the file input
  const fileInputRefError = useRef(null); // Create a ref for the file input

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);

  const getSetResponse = useSelector((state) => state.getSetResponse?.data);

  useEffect(() => {
    if (getSetResponse) {
      if (parseInt(setid) === getSetResponse?.setId) {
        getLottieError(getSetResponse?.errorImage);
        getLottieSuccess(getSetResponse?.successImage);
        setDesError(getSetResponse?.errorDescription);
        setDesSuccess(getSetResponse?.successDescription);
        setMessageSuccesss(getSetResponse?.successMessage);
        setMessageError(getSetResponse?.errorMessage);
      } else {
        reset();
      }
    } else {
      reset();
    }
  }, [getSetResponse]);

  function handleClickSucccess() {
    fileInputRefSuccess.current.click();
  }
  function handleClickError() {
    fileInputRefError.current.click();
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (imageError instanceof File && imageSuccess instanceof File) {
      var data = {
        successImage: imageSuccess,
        successMessage: messageSuccess,
        successDescription: desSuccess,
        errorImage: imageError,
        errorMessage: messageError,
        errorDescription: desError,
        setId: setId,
      };
      dispatch({
        type: "SET_DECISION_RESPONSE",
        payload: data,
      });
    } else {
      alert("Please Choose New Files For Update");
    }
  }

  useEffect(() => {
    if (setid) {
      setSetId(setid);
      setSelectedSetData(setid);
    }
  }, [setid]);
  function setSelectedSetData(id) {
    navigate(location.pathname + `?id=${id}`);
    setSetId(id);
    dispatch({
      type: "GET_RESPONSE_OF_SET", // get all questions
      payload: { id: id },
    });
  }
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  useEffect(() => {
    if (error === true) {
      reset();
    }
  }, [error]);
  function reset() {
    setImageError(null);
    setImageSucesss(null);
    setDesError("");
    setDesSuccess("");
    setMessageSuccesss("");
    setMessageError("");
    setLottieOptionsError(null);
    setLottieOptionsSuccess(null);
    setImageSucesssPng(null);
    setImageErrorPng(null);
  }

  function handleSelectSuccessImage(e) {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      if (selectedImage.name.endsWith(".json")) {
        const maxSize = 20 * 1024 * 1024; // 20 MB in bytes

        if (selectedImage.size <= maxSize) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const animationData = JSON.parse(event.target.result);
            setLottieOptionsSuccess(animationData);
          };
          reader.readAsText(selectedImage);
          setImageSucesssPng(null);
          setImageSucesss(selectedImage);
        } else {
          alert(
            "File size exceeds the limit. Please upload a file up to 10 MB."
          );
          e.target.value = null;
        }
      } else if (selectedImage.type === "image/png") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
        };

        reader.readAsDataURL(selectedImage);

        setImageSucesss(selectedImage);
        setImageSucesssPng(URL.createObjectURL(selectedImage));
      } else {
        alert("Please upload a JSON file (Lottie File).");
        e.target.value = null;
      }
    }
  }
  function handleSelectErrorImage(e) {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      if (selectedImage.name.endsWith(".json")) {
        const maxSize = 20 * 1024 * 1024; // 20 MB in bytes

        if (selectedImage.size <= maxSize) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const animationData = JSON.parse(event.target.result);
            setLottieOptionsError(animationData);
          };
          reader.readAsText(selectedImage);
          setImageError(selectedImage);
        } else {
          alert(
            "File size exceeds the limit. Please upload a file up to 10 MB."
          );
          e.target.value = null;
        }
      } else if (selectedImage.type === "image/png") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
        };

        reader.readAsDataURL(selectedImage);

        setImageError(selectedImage);
        setImageErrorPng(URL.createObjectURL(selectedImage));
      } else {
        alert("Please upload a JSON file (Lottie File).");
        e.target.value = null;
      }
    }
  }

  function getLottieSuccess(item) {
    if (item.endsWith(".png")) {
      setImageSucesssPng(item);
    } else if (item.endsWith(".json")) {
      axios.get(item).then((json) => setLottieOptionsSuccess(json.data));
    }
  }
  function getLottieError(item) {
    if (item.endsWith(".png")) {
      setImageErrorPng(item);
    } else if (item.endsWith(".json")) {
      axios.get(item).then((json) => setLottieOptionsError(json.data));
    }
  }

  return (
    <div>
      {setId && (
        <form onSubmit={handleSubmit}>
          <CardMain width="w-full mt-5">
            <div className="flex flex-col md:flex-row md:space-x-20 rtl:space-x-reverse mt-5 ">
              <div className="w-full md:w-1/2 space-y-10 items-center bg-green-50 flex flex-col py-12">
                <a className="text-lg text-primary underline">
                  {t("For Success Response")}
                </a>

                <div
                  onClick={handleClickSucccess}
                  className="h-32 w-32 overflow-hidden rounded-full border border-primary text-center justify-center flex  flex-row items-center text-primary hover:bg-gray-100 duration-200 cursor-pointer"
                >
                  {!imageSuccess && <RiImageAddLine style={{ fontSize: 70 }} />}
                  {imageSuccessPng && (
                    <img src={imageSuccessPng} className="h-full w-full " />
                  )}
                  {lottieOptionsSuccess && (
                    <Lottie animationData={lottieOptionsSuccess} loop={true} />
                  )}
                </div>
                <InputField
                  heading={t("Message")}
                  value={messageSuccess}
                  onChange={(e) => setMessageSuccesss(e)}
                  style="w-52"
                />
                <InputField
                  heading={t("Description")}
                  value={desSuccess}
                  onChange={(e) => setDesSuccess(e)}
                  style="w-72"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-10 items-center bg-red-50 flex flex-col py-12 md:mt-0 mt-4">
                <a className="text-lg text-red-600 underline">
                  {t("For Error Response")}
                </a>

                <div
                  onClick={handleClickError}
                  className="h-32 w-32 overflow-hidden rounded-full border border-primary text-center justify-center flex  flex-row items-center text-primary hover:bg-gray-100 duration-200 cursor-pointer"
                >
                  {!imageError && <RiImageAddLine style={{ fontSize: 70 }} />}
                  {imageErrorPng && (
                    <img src={imageErrorPng} className="h-full w-full " />
                  )}
                  <Lottie animationData={lottieOptionsError} loop={true} />
                </div>
                <InputField
                  heading={t("Message")}
                  value={messageError}
                  onChange={(e) => setMessageError(e)}
                  style="w-52"
                />
                <InputField
                  heading={t("Description")}
                  value={desError}
                  onChange={(e) => setDesError(e)}
                  style="w-72"
                />
              </div>
            </div>
            <div className="flex flex-row justify-end mt-10">
              <Button
                type="submit"
                buttonValue={t("Submit")}
                buttonStyle="px-20 py-2"
              />
            </div>
          </CardMain>
        </form>
      )}
      <div className="w-full">
        <input
          ref={fileInputRefSuccess}
          type="file"
          onChange={handleSelectSuccessImage}
          style={{ display: "none" }}
        />
      </div>
      <div className="w-full">
        <input
          ref={fileInputRefError}
          type="file"
          onChange={handleSelectErrorImage}
          style={{ display: "none" }}
        />
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
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
export default CreateUser;

function InputField({ heading, value, onChange, type, style }) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col ${style}`}>
      <input
        required
        type={type || "text"}
        value={value}
        placeholder={t(heading)}
        onChange={(e) => onChange(e.target.value)}
        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full"
      />
    </div>
  );
}
