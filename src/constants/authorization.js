import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// This HOC checks if the user is authorized to access the component
const withAuthorization = (WrappedComponent, code) => {
  return () => {
    const roles = useSelector((state) => state?.role);

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
    const hasPermission = roles?.permissions.some((item) =>
      item.subMenus.some((subMenu) => subMenu.code === code)
    );

    // If no matching code is found, return null (or a fallback component)
    if (!hasPermission) {
      return null; // Or you could return a <NotFound /> component or redirect
    }

    // If the user has the correct permission, render the WrappedComponent
    return <WrappedComponent />;
  };
};

export default withAuthorization;
