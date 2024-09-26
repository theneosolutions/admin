import { useEffect, useState, useRef } from "react";
import { BankCreate, DeleteBank, GetBankList } from "Services/OtherApis";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as action from "../../Services/redux/reducer";
import { useDispatch } from "react-redux";
import { Model, Avatar } from "Components";

function Disbursement() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ACCOUNT_TYPE = "SEULAH_LOAN";
  const formRef = useRef(null); // Ref for the form

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange", // Validate on change
  });

  const [disable, setDisable] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  useEffect(() => {
    getBankListsData();
  }, []);

  function getBankListsData() {
    GetBankList().then((res) => {
      let data = res?.find((item) => item?.accountType === ACCOUNT_TYPE);

      if (!data) {
        setDisable(false);
        reset({
          title: "",
          accountNumber: "",
          iban: "",
        });
      } else {
        setDisable(true);
        reset({
          title: data?.accountTitle,
          accountNumber: data?.accountNumber,
          iban: data?.iban,
        });
      }
    });
  }

  const onSubmit = (data) => {
    if (data.title && data.accountNumber && data.iban) {
      let temp = {
        iban: data.iban,
        accountTitle: data.title,
        accountNumber: data.accountNumber,
        accountType: ACCOUNT_TYPE,
      };
      BankCreate(temp).then((res) => {
        if (res.status === 200) {
          setDisable(true);
          dispatch(
            action.Message({
              open: true,
              message: "Account details are saved successfully",
              error: false,
            })
          );
        } else {
          dispatch(
            action.Message({
              open: true,
              message: "Something Went Wrong",
              error: true,
            })
          );
        }
      });
    }
  };

  function deleteAccount() {
    DeleteBank(ACCOUNT_TYPE).then((res) => {
      if (res === "Deleted") {
        setModelOpen(false);
        reset({
          title: "",
          accountNumber: "",
          iban: "",
        });
        setDisable(false);
        dispatch(
          action.Message({
            open: true,
            message: "Successfully Deleted!",
            error: false,
          })
        );
      } else {
        dispatch(
          action.Message({
            open: true,
            message: "Something Went Wrong",
            error: true,
          })
        );
      }
    });
  }

  const triggerSubmit = () => {
    if (isValid) {
      handleSubmit(onSubmit)(); // Programmatically trigger form submit
    }
  };

  return (
    <div className="w-full items-center justify-center flex  mt-14">
      <div className="shadow-lg items-center justify-center flex flex-col w-8/12 px-14 py-6 rounded-xl max-w-[600px]  bg-white">
        <form ref={formRef} className="w-full max-w-[600px]">
          <div className="">
            <div className="flex flex-row justify-center items-center text-center w-full">
              <a className="text-2xl font-semibold">
                {t("Disbursement Account")}
              </a>
            </div>
            <div className="w-full space-y-4 pt-10 pb-10">
              <InputTitle
                disabled={disable}
                title="Account Title"
                name="title"
                register={register}
                errors={errors}
                required
              />
              <Input
                disabled={disable}
                title="Account Number"
                name="accountNumber"
                register={register}
                errors={errors}
                required
              />
              <InputIBAN
                disabled={disable}
                title="IBAN"
                name="iban"
                register={register}
                errors={errors}
                required
              />
            </div>
          </div>
        </form>

        {/* Buttons are now outside the form */}
        <div className="flex flex-row rtl:space-x-reverse mt-4 space-x-10">
          <button
            type="button" // Prevent form submission on save button
            disabled={!isValid || disable}
            onClick={triggerSubmit} // Trigger submit programmatically
            className={`${
              disable || !isValid
                ? "bg-gray-400"
                : "bg-primary cursor-pointer duration-300 hover:bg-opacity-85"
            } w-44 text-center text-white py-2 rounded-lg mb-4`}
          >
            {t("Save")}
          </button>
          <button
            type="button" // Prevent form submission on delete button
            onClick={() => (disable ? setModelOpen(true) : null)}
            className={`${
              !disable
                ? "bg-red-300"
                : " bg-red-400 duration-300 hover:bg-opacity-85 cursor-pointer"
            } w-44 text-center text-white py-2 rounded-lg mb-4`}
          >
            {t("Delete")}
          </button>
        </div>

        <Model
          heading={t("Delete Bank")}
          isOpen={modelOpen}
          style="w-1/3"
          innerStyle="py-10"
          setState={() => setModelOpen(!modelOpen)}
          action1Value={t("Cancel")}
          action2Value={t("Delete")}
          action2={() => deleteAccount()}
          action1={() => setModelOpen(!modelOpen)}
        >
          <a className=" text-xl text-gray-800 dark:text-white ">
            {t("Are you sure to delete ?")}
          </a>
        </Model>
      </div>
    </div>
  );
}

export default Disbursement;

function InputTitle({ title, name, register, errors, disabled }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col w-full">
        <a>{t(title)}</a>
        <input
          disabled={disabled}
          {...register(name, {
            required: "Account Title is required",
            pattern: {
              value: /^[A-Za-z.\s]*$/,
              message: "Only alphabets are allowed",
            },
          })}
          className={`py-2 px-3 ${
            disabled ? "bg-gray-300" : "bg-gray-200 border border-gray-300"
          } rounded-lg mt-1`}
        />
        {errors[name] && (
          <span className="text-red-500">{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
}

function Input({ title, name, register, errors, disabled }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col w-full">
        <a>{t(title)}</a>
        <input
          disabled={disabled}
          {...register(name, {
            required: "Account Number is required",
            pattern: {
              value: /^[0-9]*$/,
              message: "Only numbers are allowed",
            },
          })}
          className={`py-2 px-3 ${
            disabled ? "bg-gray-300" : "bg-gray-200 border border-gray-300"
          } rounded-lg mt-1`}
        />
        {errors[name] && (
          <span className="text-red-500">{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
}

function InputIBAN({ title, name, register, errors, disabled }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col w-full">
        <a>{t(title)}</a>
        <input
          disabled={disabled}
          {...register(name, {
            required: "IBAN is required",
            pattern: {
              value: /^[A-Za-z0-9]*$/,
              message: "Only alphanumeric characters are allowed",
            },
          })}
          className={`py-2 px-3 ${
            disabled ? "bg-gray-300" : "bg-gray-200 border border-gray-300"
          } rounded-lg mt-1`}
        />
        {errors[name] && (
          <span className="text-red-500">{errors[name]?.message}</span>
        )}
      </div>
    </div>
  );
}
