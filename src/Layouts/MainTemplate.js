import React, { useEffect } from "react";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import { useSelector, useDispatch } from "react-redux";
import * as action from "../Services/redux/reducer";
// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

function MainTemplate({ children }) {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.Loading);
  const isLogin = useSelector((state) => state?.islogin);
  console.log("islogin", isLogin);
  function checkTokenExpiration(token) {
    console.log("token", token);
    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken) {
        // Token is invalid or cannot be decoded
        return false;
      }

      // Check if token has expired
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token has expired
        return true;
      } else {
        // Token is still valid
        return false;
      }
    } catch (error) {
      // Error decoding token
      console.error("Error decoding token:", error);
      return false;
    }
  }
  // function checkTokenExpiration(token) {
  //   try {
  //     const decodedToken = jwt.decode(token);
  //     if (!decodedToken) {
  //       // Token is invalid or cannot be decoded
  //       return false;
  //     }

  //     // Check if token has expired
  //     const currentTime = Math.floor(Date.now() / 1000);
  //     if (decodedToken.exp < currentTime) {
  //       // Token has expired
  //       return true;
  //     } else {
  //       // Token is still valid
  //       return false;
  //     }
  //   } catch (error) {
  //     // Error decoding token
  //     console.error("Error decoding token:", error);
  //     return false;
  //   }
  // }

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage) {
      const user = JSON.parse(storage);

      const isTokenExpired = checkTokenExpiration(user?.data?.token);
      console.log("Is token expired?", isTokenExpired);
      if (!isTokenExpired) {
        console.log("helo");
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
