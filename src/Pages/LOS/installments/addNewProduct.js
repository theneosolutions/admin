import React, { useEffect } from "react";
import CardMain from "../../../Components/Cards/main";
import { useState, useRef } from "react";
import { Button } from "Components";
import { RiImageAddLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import * as action from "Services/redux/reducer";

function CreateUser() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Create a ref for the file input
  const { t } = useTranslation();

  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [months, setMonths] = useState("");

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  function handleSelectImage(e) {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      if (
        selectedImage.type === "image/png" ||
        selectedImage.type === "image/svg+xml"
      ) {
        const imageURL = URL.createObjectURL(selectedImage);
        setImageBlob(imageURL);
        setImage(selectedImage);
      } else {
        alert("Please upload a PNG or SVG file.");
        e.target.value = null;
      }
    }
  }
  function handleClick() {
    fileInputRef.current.click();
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      title != "" &&
      desc != "" &&
      price != "" &&
      months != "" &&
      image != null
    ) {
      dispatch({
        type: "Add_NEW_PRODUCT",
        payload: {
          title: title,
          desc: desc,
          price: price,
          months: months,
          image: image,
        },
      });
    } else {
      alert("All Fields Required!");
    }
  }

  useEffect(() => {
    if (message && error === false) {
      reset();
    }
  }, [error, message]);
  function reset() {
    setTitle("");
    setDesc("");
    setImageBlob(null);
    setMonths("");
    setPrice("");
    setImage(null);
  }
  return (
    <div className="items-center flex flex-col mt-4 md:mt-0">
      <WaveAnimation show={loading} />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 xl:w-2/5 lg:w-1/2 md:w-full	"
      >
        <CardMain width="" heading={"Create Installment Product"}>
          <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse lg:px-6">
            <div className="w-full  space-y-5   ">
              <div className="flex  flex-col ">
                <div
                  onClick={handleClick}
                  className="h-32 w-32 overflow-hidden rounded-full border border-primary text-center justify-center flex  flex-row items-center text-primary hover:bg-gray-100 duration-200 cursor-pointer"
                >
                  {!imageBlob && <RiImageAddLine style={{ fontSize: 70 }} />}
                  {imageBlob && (
                    <img src={imageBlob} className="h-full w-full " />
                  )}
                </div>
                <a>Product Image</a>
              </div>

              <InputField
                heading={t("Title")}
                value={title}
                onChange={(e) => setTitle(e)}
              />
              <InputField
                heading={t("Description")}
                value={desc}
                onChange={(e) => setDesc(e)}
              />
              <InputField
                heading={t("Price")}
                value={price}
                onChange={(e) => setPrice(e)}
              />
              <InputField
                type="number"
                heading={t("Months")}
                value={months}
                onChange={(e) => setMonths(e)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end mt-10">
            <Button
              type="submit"
              buttonValue={t("Submit")}
              buttonStyle="px-20 py-2 w-full md:w-max"
            />
          </div>
        </CardMain>
      </form>
      <div className="w-full">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleSelectImage}
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

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full"
      />
    </div>
  );
}
