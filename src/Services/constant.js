import axios from "axios";
import { store } from "./redux/store";
import * as action from "./redux/reducer";
import appRoutes from "Routes/appRoutes";
const RouteId = () => {
  const currentPath = window.location.pathname; // Get current path, e.g., '/admin/add-roles'

  // Function to find the route code based on the current path
  const findRoute = (routes, path) => {
    for (let route of routes) {
      if (route.path === path) {
        return route.id;
      }
      if (route.child) {
        const childCode = findRoute(route.child, path);
        if (childCode) return childCode;
      }
    }
    return null;
  };

  // Function to progressively check for matches, removing the last segment if no match is found
  const findMatchingRouteCode = (routes, path) => {
    let currentPath = path;
    let currentRouteCode = findRoute(routes, currentPath);

    while (!currentRouteCode && currentPath.includes("/")) {
      // Remove the last segment of the path
      currentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
      currentRouteCode = findRoute(routes, currentPath);
    }

    return currentRouteCode;
  };

  const currentRouteCode = findMatchingRouteCode(appRoutes, currentPath);

  if (currentRouteCode) {
    return currentRouteCode;
  } else {
    return 0;
  }
};
export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
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
    config.headers["x-mod-id"] = RouteId();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error response status is 401
    if (error.response && error.response.status === 401) {
      // Handle the 401 error (e.g., log out the user, redirect to login, etc.)
      console.log("Unauthorized access - maybe redirect to login?");

      // Logout();
      // store.dispatch({ islogin: false });
    }
    return Promise.reject(error);
  }
);

// function Logout() {
//   store.dispatch(
//     action.Auth({
//       islogin: false,
//       user: null,
//       role: null,
//       token: null,
//     })
//   );
//   localStorage.removeItem("user");
//   store.dispatch({
//     type: "LOGOUT_USER",
//     payload: user(),
//   });
//   window.location.href = "/login";
// }

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
