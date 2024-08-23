import axios from "axios";
import { store } from "./redux/store";
import * as action from "./redux/reducer";

export const axiosInstance = axios.create({
  headers: {
    Authorization: token(),
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
    // "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    "Accept-Language": LanguageCode(),
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const tokenValue = token();
    if (tokenValue) {
      config.headers.Authorization = tokenValue;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    //  console.log("helo from state",) store.getState()
    return response;
  },
  (error) => {
    // Check if the error response status is 401
    if (error.response && error.response.status === 401) {
      // Handle the 401 error (e.g., log out the user, redirect to login, etc.)
      console.log("Unauthorized access - maybe redirect to login?");
      // You can also add custom behavior like dispatching a logout action
      Logout();
      store.dispatch({ islogin: false });
    }
    return Promise.reject(error);
  }
);

function Logout() {
  store.dispatch(
    action.Auth({
      islogin: false,
      user: null,
      role: null,
      token: null,
    })
  );
  localStorage.removeItem("user");
  store.dispatch({
    type: "LOGOUT_USER",
    payload: user(),
  });
  window.location.href = "/login";
}

function user() {
  const storage = localStorage.getItem("user");
  if (storage) {
    const user = JSON.parse(storage);

    if (user?.data?.token) {
      return user?.data?.user?.id;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function token() {
  const storage = localStorage.getItem("user");
  if (storage) {
    const user = JSON.parse(storage);

    if (user?.data?.token) {
      return user?.data?.token;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function LanguageCode() {
  const preferredLanguage = localStorage.getItem("preferredLanguage");
  if (preferredLanguage) {
    if (preferredLanguage) {
      return preferredLanguage;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
