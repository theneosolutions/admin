import { useEffect, useState } from "react";
import { BankCreate, DeleteBank, GetBankList } from "Services/OtherApis";
import { useTranslation } from "react-i18next";
import * as action from "../../Services/redux/reducer";
import { useDispatch } from "react-redux";
import { Model, Avatar } from "Components";
function Disbursement() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ACCOUNT_TYPE = "SEULAH_LOAN";
  const [title, setTitle] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [iban, setIban] = useState("");
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
      } else {
        setDisable(true);
      }

      setTitle(data?.accountTitle);
      setAccountNumber(data?.accountNumber);
      setIban(data?.iban);
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && accountNumber && iban) {
      let temp = {
        iban: iban,
        accountTitle: title,
        accountNumber: accountNumber,
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
              message: "Some Thing Went Wrong",
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
        setAccountNumber("");
        setIban("");
        setTitle("");
        getBankListsData();
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
            message: "Some Thing Went Wrong",
            error: true,
          })
        );
      }
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="justify-center flex items-center mt-20">
        <div className="  shadow-lg items-center justify-center flex flex-col w-8/12 px-14 py-6 rounded-xl max-w-[600px]">
          <div className="flex flex-row justify-center  items-center text-center w-full">
            <a className="text-2xl font-semibold">
              {t("Disbursement Account")}
            </a>
          </div>
          <div className="w-full space-y-4 pt-10 pb-10">
            <InputTitle
              disabled={disable}
              title="Account Title"
              value={title}
              onChange={(e) => setTitle(e)}
              name="title"
            />
            <Input
              disabled={disable}
              title="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e)}
              name="accountnumber"
            />
            <InputIBAN
              disabled={disable}
              title="IBAN"
              value={iban}
              onChange={(e) => setIban(e)}
              name="iban"
            />
          </div>
          <div className="space-x-10 rtl:space-x-reverse flex flex-row">
            <button
              type={!disable ? "submit" : "button"}
              className={`${
                disable
                  ? "bg-gray-400"
                  : "bg-primary cursor-pointer duration-300 hover:bg-opacity-85"
              }  w-44 text-center text-white py-2 rounded-lg mb-4  `}
            >
              {t("Save")}
            </button>
            <div
              onClick={() => (disable ? setModelOpen(true) : null)}
              className={`${
                !disable
                  ? "bg-red-300"
                  : " bg-red-400 duration-300 hover:bg-opacity-85 cursor-pointer"
              }   w-44 text-center text-white py-2 rounded-lg mb-4   `}
            >
              {t("Delete")}
            </div>
          </div>
        </div>
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
        <a className=" text-xl text-gray-800 ">
          {t("Are you sure to delete ?")}
        </a>
      </Model>
    </form>
  );
}
export default Disbursement;

function InputTitle({ title, placeholder, value, onChange, name, disabled }) {
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Regular expression to allow only alphabets (both uppercase and lowercase)
    const regex = /^[A-Za-z.\s]*$/;

    if (regex.test(inputValue)) {
      onChange(inputValue); // Call the onChange function only if input is valid
    }
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col w-full">
        <a>{t(title)}</a>
        <input
          disabled={disabled}
          onChange={handleInputChange}
          placeholder={t(placeholder)}
          value={value}
          className={`py-2 px-3 ${
            disabled ? "bg-gray-300" : "bg-gray-200 border border-gray-300"
          } rounded-lg mt-1`}
          name={name}
          required
        />
      </div>
    </div>
  );
}

function InputIBAN({ title, placeholder, value, onChange, name, disabled }) {
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Regular expression to allow only alphabets (both uppercase and lowercase)
    const regex = /^[A-Za-z0-9]*$/;

    if (regex.test(inputValue)) {
      onChange(inputValue); // Call the onChange function only if input is valid
    }
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col w-full">
        <a>{t(title)}</a>
        <input
          disabled={disabled}
          onChange={handleInputChange}
          placeholder={t(placeholder)}
          value={value}
          className={`py-2 px-3 ${
            disabled ? "bg-gray-300" : "bg-gray-200 border border-gray-300"
          } rounded-lg mt-1`}
          name={name}
          required
        />
      </div>
    </div>
  );
}

function Input({ title, placeholder, value, onChange, name, disabled }) {
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Regular expression to allow only numbers (0-9)
    const regex = /^[0-9]*$/;

    if (regex.test(inputValue)) {
      onChange(inputValue); // Call the onChange function only if input is valid
    }
  };
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col w-full">
        <a>{t(title)}</a>
        <input
          disabled={disabled}
          onChange={handleInputChange}
          placeholder={t(placeholder)}
          value={value}
          className={`py-2 px-3 ${
            disabled ? "bg-gray-300" : "bg-gray-200 border border-gray-300"
          } rounded-lg mt-1`}
          name={name}
          required
          type="numeric"
        />
      </div>
    </div>
  );
}
