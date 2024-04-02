import React, { useEffect } from "react";
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
  const getScreenName = useSelector(
    (state) => state.getScreenName?.appFlow?.screenFlow || []
  );
  const user = useSelector((state) => state.getUserById);

  const users = useSelector((state) => state.getAllUsersAll || []);

  console.log("getScreenNamegetScreenName", user?.deviceInfo?.deviceToken);

  const [description, setDescription] = useState(null);
  const [subject, setSubject] = useState(null);
  const [mainUserId, setMainUserId] = useState("");

  const [navigation, setNavigation] = useState("none");

  const [topic, setTopic] = useState("");
  const [role, setRole] = useState();
  const [usersData, setUsersData] = useState([]);

  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  const fileInputRef = useRef(null); // Create a ref for the file input

  function handleClick() {
    fileInputRef.current.click();
  }
  useEffect(() => {
    if (user?.deviceInfo?.deviceToken) {
      setTopic(user?.deviceInfo?.deviceToken);
    }
  }, [user]);
  function handleSubmit(e) {
    if (
      subject != "" &&
      description != "" &&
      image != null &&
      navigation != "" &&
      navigation !== "none" &&
      mainUserId !== "" &&
      mainUserId !== "none"
    ) {
      console.log("slack", {
        subject: subject,
        content: description,
        image: image,
        navigation: navigation,
        topic: topic,
      });
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
  useEffect(() => {
    GetScreens();
  }, []);
  function GetScreens() {
    dispatch({
      type: "GET_SCREENS",
      payload: 222,
    });
  }
  useEffect(() => {
    getAllUsersData();
  }, []);
  function getAllUsersData() {
    dispatch({
      type: "GET_ALL_USERS_ALL",
    });
  }
  useEffect(() => {
    if (users) {
      const data = users.filter(
        (person) => person?.roles[0]?.name === "ROLE_USER"
      );
      setUsersData(data);
    }
  }, [users]);
  return (
    <div className=" flex flex-row space-x-6 ">
      <div className="md:mt-0 mt-5 bg-gray-200 xl:w-2/5 lg:w-1/2 md:w-full">
        <CardMain width="w-full" heading={"Create Notification"}>
          <div className="flex  flex-col ">
            <div
              onClick={handleClick}
              className="h-32 w-32 overflow-hidden rounded-full border border-primary text-center justify-center flex  flex-row items-center text-primary hover:bg-gray-100 duration-200 cursor-pointer"
            >
              {!imageBlob && <RiImageAddLine style={{ fontSize: 70 }} />}
              {imageBlob && <img src={imageBlob} className="h-full w-full " />}
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
              <Select
                data={getScreenName}
                heading={t("Choose Navigation")}
                type="select"
                options={t(navigation)}
                onChange={(e) => setNavigation(e)}
              />
              <Users
                usersData={usersData}
                setMainUserId={(e) => setMainUserId(e)}
              />

              <Description
                heading={t("Content")}
                handleChange={(e) => setDescription(e)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end mt-20">
            <Button
              onButtonClick={() => handleSubmit()}
              type="submit"
              buttonValue={t("Submit")}
              buttonStyle="px-14 py-2 w-full md:w-max"
            />
          </div>
        </CardMain>

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
      <div className="md:mt-0 mt-5 bg-gray-200 xl:w-2/5 lg:w-1/2 md:w-full"></div>
    </div>
  );
}
export default CreateUser;
function Users({ usersData, setMainUserId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("none");

  useEffect(() => {
    if (userId !== "none") {
      dispatch({
        type: "GET_USER_BY_ID",
        payload: userId,
      });
    }
  }, [userId]);
  return (
    <div>
      <Select2
        data={usersData}
        heading={t("Choose User")}
        type="select"
        options={t(userId)}
        onChange={(e) => (setUserId(e), setMainUserId(e))}
      />
    </div>
  );
}
const data = [
  {
    label: "All Users",
  },
  {
    label: "Multiple Users",
  },
  {
    label: "Single User",
  },
];

function Filter() {
  const [state, setState] = useState("All Users");

  function setName(stateValue) {
    setState(stateValue);
  }
  return (
    <div className="flex flex-row  space-x-4">
      {data?.map((v, k) => {
        return (
          <button
            key={k}
            onClick={() => setName(v.label)}
            className={`mt-2 lg:mx-0 mx-1 hover:shadow-lg shadow-md duration-300 rounded px-3 py-2 border-primary  border text-sm ${
              state === v.label
                ? "bg-primary text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
function Select2({ heading, value, onChange, data }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>{" "}
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      >
        <option value={"none"}>none</option>
        {data.map((option, index) => (
          <option key={index} value={option.id}>
            {t(
              option.idNumber +
                " , " +
                option?.firstName +
                " " +
                option?.lastName
            )}
          </option>
        ))}
      </select>
    </div>
  );
}
function Select({ heading, value, onChange, data }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>{" "}
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      >
        <option value={"none"}>none</option>
        {data.map((option, index) => (
          <option key={index} value={option.name}>
            {t(option.name)}
          </option>
        ))}
      </select>
    </div>
  );
}
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
