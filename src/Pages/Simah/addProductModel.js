import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "Components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";

function CreateUser({ setModelOpen, data }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    CreateSimahProduct();
  }
  const message = useSelector((state) => state.message);
  const error = useSelector((state) => state.error);

  const [serialNumber, setSerialNumber] = useState("");
  const [arabic, setArabic] = useState("");
  const [code, setCode] = useState("");
  const [productGroup, setProductGroup] = useState("");
  const [discription, setDiscription] = useState("");
  const [productCategory, setProductCategory] = useState("");

  function CreateSimahProduct() {
    if (
      serialNumber != "" &&
      arabic != "" &&
      code != "" &&
      productGroup != "" &&
      discription != "" &&
      productCategory != ""
    ) {
      const temp = {
        arabic: arabic,
        code: code,
        consideration: false,
        description: discription,
        productCategory: productCategory,
        productGroup: productGroup,
        serialNumber: serialNumber,
      };
      console.log("Add Simah Product Data ", temp);
      dispatch({
        type: "ADD_PRODUCT_IN_SIMAH",
        payload: temp,
      });
    } else {
      dispatch(
        action.Message({
          message: "All Fields Required!",
          open: true,
          error: true,
        })
      );
    }
  }
  useEffect(() => {
    if (message === "Product successfully added in system" && error === false) {
      setModelOpen(false);
      dispatch({
        type: "GET_SIMAH_CODES",
      });
    } else if (
      message === "Product already exist in system" &&
      error === false
    ) {
      dispatch({
        type: "GET_SIMAH_CODES",
      });
    }
  }, [message, error]);

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center justify-center flex flex-col"
    >
      <div className=" bg-white rounded shadow-sm  rtl:space-x-reverse flex flex-col lg:flex-row   w-full lg:w-max lg:space-x-20 lg:px-20 px-4 py-5 ">
        <div className="flex flex-col ">
          <div className=" w-full  flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
            <div className=" md:w-1/2 w-full space-y-5">
              <InputField
                type="number"
                heading={t("Serial Number")}
                value={serialNumber}
                onChange={(e) => setSerialNumber(e)}
              />
              <InputField
                heading={t("Code")}
                value={code}
                onChange={(e) => setCode(e)}
              />

              <InputField
                heading={t("Discription")}
                value={discription}
                onChange={(e) => setDiscription(e)}
              />
            </div>
            <div className="md:w-1/2 w-full md:mt-0 mt-3 space-y-5">
              <InputField
                heading={t("Arabic")}
                value={arabic}
                onChange={(e) => setArabic(e)}
              />
              <InputField
                heading={t("Product Group")}
                value={productGroup}
                onChange={(e) => setProductGroup(e)}
              />
              <InputField
                heading={t("Product Category")}
                value={productCategory}
                onChange={(e) => setProductCategory(e)}
              />
            </div>
          </div>

          <div className="flex flex-row justify-end mt-10 mb-5 px-14">
            <Button
              type="submit"
              buttonValue={data ? t("Update") : t("Submit")}
              buttonStyle="px-20 py-2 w-full "
            />
          </div>
        </div>
      </div>
    </form>
  );
}
export default CreateUser;

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      />
    </div>
  );
}
