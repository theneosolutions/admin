import { useEffect, useState } from "react";
import { BankCreate, GetBankList, DeleteBank } from "Services/OtherApis";
import { useTranslation } from "react-i18next";
import * as action from "../../Services/redux/reducer";
import { useDispatch } from "react-redux";

function Disbursement() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ACCOUNT_TYPE = "SEULAH_COLLECTION";
  const [title, setTitle] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [iban, setIban] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    getBankListsData();
  }, []);
  function getBankListsData() {
    GetBankList().then((res) => {
      let data = res.find((item) => item.accountType === ACCOUNT_TYPE);

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
            action.Message({ open: true, message: "Data Saved!", error: false })
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
            <a className="text-2xl font-semibold">{t("Repayment Account")}</a>
          </div>

          <div className="w-full space-y-4 pt-10 pb-10">
            <Input
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
            <Input
              disabled={disable}
              title="IBAN"
              value={iban}
              onChange={(e) => setIban(e)}
              name="iban"
            />
          </div>
          <div className="space-x-10 flex flex-row rtl:space-x-reverse">
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
              onClick={() => (disable ? deleteAccount() : null)}
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
    </form>
  );
}
export default Disbursement;

function Input({ title, placeholder, value, onChange, name, disabled }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col w-full">
        <a>{t(title)}</a>
        <input
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
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
