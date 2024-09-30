import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import appRoutes from "Routes/appRoutes";
// This HOC checks if the user is authorized to access the component
import NotFound from "Pages/NotFound";
const withAuthorization = (WrappedComponent, code) => {
  return () => {
    const roles = useSelector((state) => state?.role);
    const path = useLocation().pathname;

    useEffect(() => {
      const storage = localStorage.getItem("user");
      if (!storage) {
        const user = JSON.parse(storage);
        if (!user?.islogin) {
          const origin = window.location.origin + "/login";
          window.location.href = origin;
        }
      }
    }, []);
    const foundRoute = findPathInChildren(appRoutes, path);

    const newPermission = roles?.permissions.some((item) =>
      item.subMenus.some((subMenu) => subMenu?.code === foundRoute?.code)
    );
    if (foundRoute) {
      console.log("Found route:", newPermission);
    } else {
      console.log("Route not found");
    }
    // If no matching code is found, return null (or a fallback component)
    if (!newPermission) {
      return <NotFound />; // Or you could return a <NotFound /> component or redirect
    }

    // If the user has the correct permission, render the WrappedComponent
    return <WrappedComponent />;
  };
};

export default withAuthorization;

function findPathInChildren(routes, targetPath) {
  for (const route of routes) {
    // If an exact match is found, return the route immediately
    if (route.path === targetPath) {
      return route;
    }

    // If the route has children, search recursively in child routes first
    if (route.child) {
      const childResult = findPathInChildren(route.child, targetPath);
      if (childResult) {
        return childResult; // Return the found child route if a match is found
      }
    }
  }

  // If no child matches, check if the current route path is a parent of the targetPath
  for (const route of routes) {
    if (targetPath.startsWith(route.path)) {
      return route; // Return the parent route if it is a match
    }
  }

  return null; // Return null if no match is found
}
