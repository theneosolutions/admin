import React from "react";
import CardMain from "../../../Components/Cards/main";
import { useState, useRef } from "react";
import { Button } from "Components";
import { RiImageAddLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import * as action from "Services/redux/reducer";
import TextEditor from "./textEditor";
function CreateUser() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);

  const [description, setDescription] = useState(null);
  const [subject, setSubject] = useState(null);
  const [navigation, setNavigation] = useState(null);
  const [topic, setTopic] = useState(null);

  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  const fileInputRef = useRef(null); // Create a ref for the file input

  function handleClick() {
    fileInputRef.current.click();
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      (subject != "" && description != "" && image != null && navigation != "",
      topic != "")
    ) {
      dispatch({
        type: "CREATE_NOTIFICATION",
        payload: {
          subject: subject,
          content: description,
          image: image,
          navigation: navigation,
          topic: topic,
        },
      });
    } else {
      alert("All Fields Required!");
    }
  }

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

  return (
    <div className="items-center flex flex-col ">
      <div className="md:mt-0 mt-5 bg-gray-200 xl:w-2/5 lg:w-1/2 md:w-full">
        <form onSubmit={handleSubmit}>
          <CardMain width="w-full" heading={"Create Notification"}>
            <div className="flex  flex-col ">
              {" "}
              <div
                onClick={handleClick}
                className="h-32 w-32 overflow-hidden rounded-full border border-primary text-center justify-center flex  flex-row items-center text-primary hover:bg-gray-100 duration-200 cursor-pointer"
              >
                {!imageBlob && <RiImageAddLine style={{ fontSize: 70 }} />}
                {imageBlob && (
                  <img src={imageBlob} className="h-full w-full " />
                )}
              </div>
              <a>Notification Icon</a>
            </div>
            <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
              <div className=" w-full space-y-7">
                <InputField
                  heading={t("Subject")}
                  value={subject}
                  onChange={(e) => setSubject(e)}
                />
                <InputField
                  heading={t("Navigation")}
                  value={navigation}
                  onChange={(e) => setNavigation(e)}
                />
                <InputField
                  heading={t("Topic")}
                  value={topic}
                  onChange={(e) => setTopic(e)}
                />
                <Description
                  heading={t("Content")}
                  handleChange={(e) => setDescription(e)}
                />
              </div>
            </div>
            <div className="flex flex-row justify-end mt-20">
              <Button
                type="submit"
                buttonValue={t("Submit")}
                buttonStyle="px-14 py-2 w-full md:w-max"
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
    </div>
  );
}
export default CreateUser;

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <div className=" flex flex-row  ">
        <a className="text-sm text-gray-700 ">{heading}</a>
      </div>
      <div className="	w-full">
        <input
          type={type || "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-primary border rounded-md px-3 py-1.5 outline-none mt-2 	w-full	"
        />
      </div>
    </div>
  );
}

function Description({ heading, value, onChange, type, handleChange }) {
  return (
    <div className="flex flex-col w-full">
      <div className=" flex flex-row  ">
        <a className="text-sm text-gray-700 ">{heading}</a>
      </div>
      <div className="	w-full mt-2">
        <TextEditor handleChange={(e) => handleChange(e)} />
      </div>
    </div>
  );
}
