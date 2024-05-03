import React, { useEffect } from "react";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import { useSelector, useDispatch } from "react-redux";
import * as action from "../Services/redux/reducer";
import { CheckQuestionStatusInScreen, CheckToken } from "Services/OtherApis";

function MainTemplate({ children }) {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.Loading);

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage) {
      const user = JSON.parse(storage);
      if (user?.islogin) {
        CheckTokenfunction(user?.data);
      }
    }
  }, []);

  function CheckTokenfunction(user) {
    console.log("user");
    CheckToken(user?.user?.idNumber, user?.token).then((response) => {
      console.log("Response,response", response?.message);
      if (response?.message === "Token Expried") {
        Logout(user?.user?.idNumber);
      } else {
        dispatch(
          action.Auth({
            islogin: true,
            user: user,
            role: user?.roles[0],
            token: user?.token,
          })
        );
      }
    });
  }
  function Logout(id) {
    dispatch(
      action.Auth({
        islogin: false,
        user: null,
        role: null,
        token: null,
      })
    );

    localStorage.removeItem("user");

    dispatch({
      type: "LOGOUT_USER",
      payload: id,
    });
    window.location.href = "/login";
  }

  return (
    <div>
      <WaveAnimation show={loading} />
      <div>{children}</div>
    </div>
  );
}
export default MainTemplate;
