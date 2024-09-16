import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { BankCreate, GetBankList, EditBankDetail } from "Services/OtherApis";
function Disbursement() {
  const ACCOUNT_TYPE = "SEULAH_COLLECTION";
  const [title, setTitle] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [iban, setIban] = useState("");
  const [edit, setEdit] = useState(true);
  const [data, setData] = useState("");

  useEffect(() => {
    GetBankList().then((res) => {
      let data = res.find((item) => item.accountType === ACCOUNT_TYPE);
      if (!data) {
        setEdit(false);
      } else {
        setEdit(true);
      }
      setData(data);
      setTitle(data?.accountTitle);
      setAccountNumber(data?.accountNumber);
      setIban(data?.iban);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && accountNumber && iban) {
      let temp = {
        iban: iban,
        accountTitle: title,
        accountNumber: accountNumber,
        accountType: ACCOUNT_TYPE,
      };
      console.log("data", data);
      if (!data) {
        console.log("Create Working");
        BankCreate(temp).then((res) => {
          console.log("ressssppspsp", res);
          alert(res?.data);
        });
      } else if (data) {
        console.log("Edit Working");
        EditBankDetail(temp).then((res) => {
          console.log("ressssppspsp", res);
          alert(res?.data);
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="justify-center flex items-center mt-20">
        <div className="  shadow-lg items-center justify-center flex flex-col w-8/12 px-14 py-6 rounded-xl max-w-[600px]">
          <div className="flex flex-row justify-between w-full ">
            <a className="text-2xl font-semibold">Repayment Account</a>
            <FaEdit
              className=" text-secondary text-3xl cursor-pointer hover:opacity-70 duration-300"
              onClick={() => setEdit((prev) => !prev)}
            />
          </div>

          <div className="w-full space-y-4 pt-10 pb-10">
            <Input
              disabled={edit}
              title="Acccount Title"
              value={title}
              onChange={(e) => setTitle(e)}
              name="title"
            />
            <Input
              disabled={edit}
              title="Acccount Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e)}
              name="accountnumber"
            />
            <Input
              disabled={edit}
              title="IBAN"
              value={iban}
              onChange={(e) => setIban(e)}
              name="iban"
            />
          </div>
          <button
            type="submit"
            className="bg-secondary px-20 w-full text-center text-white py-2 rounded-lg mb-4 cursor-pointer duration-300 hover:bg-opacity-85 "
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
export default Disbursement;

function Input({ title, placeholder, value, onChange, name, disabled }) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col w-full">
        <a>{title}</a>
        <input
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
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
