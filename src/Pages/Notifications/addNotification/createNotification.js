import React, { useEffect } from "react";
import CardMain from "../../../Components/Cards/main";
import { useState, useRef } from "react";
import { Button } from "Components";
import { RiImageAddLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "./textEditor";
function CreateUser() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getScreenName = useSelector(
    (state) => state.getScreenName?.appFlow?.screenFlow || []
  );
  const user = useSelector((state) => state.getUserById);
  const tokens = useSelector((state) => state.getDevicesTokens);
  const [checked, setChecked] = useState(false);

  const [description, setDescription] = useState(null);
  const [subject, setSubject] = useState(null);
  const [mainUserId, setMainUserId] = useState("");

  const [navigation, setNavigation] = useState("none");

  const [topic, setTopic] = useState("");
  const [allTokens, setAllTokens] = useState("");

  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

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
      navigation != "" &&
      navigation !== "none"
    ) {
      if (checked === false && mainUserId === "") {
        alert("All fields are required!");
      } else {
        const tempp = {
          subject: subject,
          content: description,
          navigation: navigation,
          tokens: checked ? allTokens : [mainUserId],
        };
        dispatch({
          type: "CREATE_NOTIFICATION",
          payload: tempp,
        });
      }
    } else {
      alert("All fields are required!");
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
    // dispatch({
    //   type: "GET_ALL_USERS_ALL",
    // });
    dispatch({
      type: "GET_ALL_DEVICES_TOKENS",
    });
  }

  function getAllTokens() {
    const tokensValue = tokens?.map((item) => item?.deviceToken);
    setAllTokens(tokensValue);
  }
  return (
    <div className="items-center flex flex-col ">
      <div className="md:mt-0 mt-5 bg-gray-200 xl:w-2/5 lg:w-1/2 md:w-full">
        <CardMain width="w-full" heading={t("Create Notificationnnnnnnn")}>
          {/* <div className="flex  flex-col ">
            <div
              onClick={handleClick}
              className="h-32 w-32 overflow-hidden rounded-full border border-primary text-center justify-center flex  flex-row items-center text-primary hover:bg-gray-100 duration-200 cursor-pointer"
            >
              {!imageBlob && <RiImageAddLine style={{ fontSize: 70 }} />}
              {imageBlob && <img src={imageBlob} className="h-full w-full " />}
            </div>
            <a>{t("Notification Icon")}</a>
          </div> */}
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
              <div className="flex flex-row justify-between items-center">
                <div className="w-1/2">
                  <Users
                    value={mainUserId}
                    checked={checked}
                    usersData={tokens}
                    setMainUserId={(e) => setMainUserId(e)}
                    mainUserId={mainUserId}
                  />
                </div>
                <div className="flex flex-col">
                  <a className="text-sm text-gray-700 ">{t("All Users")}</a>
                  <input
                    type="checkbox"
                    className="h-5 w-5 mt-3"
                    value={checked}
                    onChange={() => (
                      setMainUserId(""), setChecked(!checked), getAllTokens()
                    )}
                  />
                </div>
              </div>

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
      </div>
      <div className="md:mt-0 mt-5 bg-gray-200 xl:w-2/5 lg:w-1/2 md:w-full"></div>
    </div>
  );
}
export default CreateUser;
function Users({ usersData, setMainUserId, mainUserId, checked, value }) {
  const { t } = useTranslation();

  return (
    <div>
      <Select2
        value={value}
        checked={checked}
        data={usersData}
        heading={t("Choose User")}
        type="select"
        options={t(mainUserId)}
        onChange={(e) => setMainUserId(e)}
      />
    </div>
  );
}
function Select2({ heading, value, onChange, data, checked }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>{" "}
      <select
        disabled={checked}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      >
        <option value={"none"}>{t("none")}</option>
        {data?.map((option, index) => (
          <option key={index} value={option.deviceToken}>
            {t("user Id : " + option.userId)}
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
        <option value={"none"}>{t("none")}</option>
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

function Description({ heading, handleChange }) {
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
