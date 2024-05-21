import React, { useEffect } from "react";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import { useSelector, useDispatch } from "react-redux";
import * as action from "../Services/redux/reducer";
import { jwtDecode } from "jwt-decode";

function MainTemplate({ children }) {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.Loading);
  function checkTokenExpiration(token) {
    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken) {
        return false;
      }
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage) {
      const user = JSON.parse(storage);

      const isTokenExpired = checkTokenExpiration(user?.data?.token);
      if (!isTokenExpired) {
        dispatch(
          action.Auth({
            islogin: user?.islogin,
            user: user?.data,
            role: user?.data?.roles[0],
            token: user?.data?.token,
          })
        );
      } else if (isTokenExpired) {
        Logout(user?.data?.user?.id);
      }
    }
  }, []);

  function Logout(id) {
    console.log("id", id);
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
