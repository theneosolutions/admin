import React, { useEffect } from "react";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import { useSelector, useDispatch } from "react-redux";
import * as action from "../Services/redux/reducer";
import { jwtDecode } from "jwt-decode";
import { Alert, Snackbar } from "@mui/material";
import { useTheme } from "Theme";
function MainTemplate({ children }) {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const loading = useSelector((state) => state.Loading);

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
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
            user: user?.data?.user,
            role: user?.data?.user?.roles[0],
            token: user?.data?.token,
          })
        );
      } else if (isTokenExpired) {
        dispatch(
          action.Auth({
            islogin: user?.islogin,
            user: user?.data?.user,
            role: user?.data?.user?.roles[0],
            token: user?.data?.token,
          })
        );

        Logout(user?.data?.user?.id);
      }
    }
  }, []);

  function Logout(id) {
    dispatch({
      type: "LOGOUT_USER",
      payload: id,
    });
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <WaveAnimation show={loading} />
      <div>{children}</div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        className="mt-4"
      >
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default MainTemplate;
