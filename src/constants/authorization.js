import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// This HOC checks if the user is authorized to access the component
const withAuthorization = (WrappedComponent, allowedRoles) => {
  return () => {
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
    const userRole = useSelector((state) => state.role);

    if (!allowedRoles.includes(userRole)) {
      // const origin = window.location.origin + "/404";
      // User is not authorized, handle the unauthorized access (e.g., redirect to a different page)
      // return (window.location.href = origin);
      return null;
    }

    // User is authorized, render the component
    return <WrappedComponent />;
  };
};

export default withAuthorization;
