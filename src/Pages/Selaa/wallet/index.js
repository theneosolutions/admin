import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import withAuthorization from "../../../constants/authorization";
import { ROLES } from "../../../constants/roles";
import { Button } from "Components";
import * as action from "../../../Services/redux/reducer";

import { TopUpWalletFunction } from "Services/OtherApis";
function Wallet() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selaBalance = useSelector((state) => state.selaBalance);
  const [ammount, setAmmount] = useState("");
  const [walletName, setWalletName] = useState("");
  const [balance, setBalance] = useState({});

  useEffect(() => {
    getWalletData();
  }, []);
  function getWalletData() {
    dispatch({
      type: "GET_BALANCE",
    });
  }
  function reset() {
    dispatch(action.Message({ open: true, message: "Success", error: false }));

    getWalletData();
  }
  function TopUpWallet() {
    if (ammount && walletName) {
      TopUpWalletFunction({
        amount: ammount,
        walletName: walletName,
      })
        .then((data) => reset())
        .catch((error) =>
          dispatch(
            action.Message({ open: true, message: "Error", error: true })
          )
        );
    } else {
      dispatch(
        action.Message({
          open: true,
          message: "All fields are required!",
          error: true,
        })
      );
    }
  }

  useEffect(() => {
    if (selaBalance?.data) {
      setBalance(JSON.parse(selaBalance?.data));
    }
  }, [selaBalance?.data]);
  return (
    <div className="py-5 flex flex-row space-x-4">
      <div className="w-1/2 border border-gray-300 rounded-xl px-4 py-4">
        <div>
          <a className="text-lg">Balance : {balance?.amount}</a>
        </div>
        <a className="text-lg">Locked : {balance?.locked}</a>
      </div>
      <div className="w-1/2 border border-gray-300 rounded-xl px-4 py-4">
        <div className=" w-full md:mt-0 mt-3 space-y-5">
          <InputField
            heading={"Amount"}
            value={ammount}
            onChange={(e) => setAmmount(e)}
          />
          <InputField
            type={"text"}
            heading={"Wallet Name"}
            value={walletName}
            onChange={(e) => setWalletName(e)}
          />
        </div>
        <div className="flex flex-row justify-end mt-10 mb-5 ">
          <Button
            onButtonClick={() => TopUpWallet()}
            type="submit"
            buttonValue={"Submit"}
            buttonStyle="px-20 py-2 w-full "
          />
        </div>
      </div>
    </div>
  );
}
export default withAuthorization(Wallet, [ROLES.ADMIN, ROLES.UNDER_WRITER]);
function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        type={type || "number"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-300 border rounded-md px-3 py-1.5 outline-none mt-2 w-full"
      />
    </div>
  );
}
