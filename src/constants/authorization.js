import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// This HOC checks if the user is authorized to access the component
const withAuthorization = (WrappedComponent, allowedRoles) => {
  return () => {
    const userRole = useSelector((state) => state.role);

    if (!allowedRoles.includes(userRole)) {
      const origin = window.location.origin + "/404";
      // User is not authorized, handle the unauthorized access (e.g., redirect to a different page)
      return (window.location.href = origin);
    }

    // User is authorized, render the component
    return <WrappedComponent />;
  };
};

export default withAuthorization;
