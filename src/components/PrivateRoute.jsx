import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { token, role } = useAuth();
  if (!token) {
    return <Navigate to="/auth" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={`/${role}/`} />;
  }

  return children;
};

export default PrivateRoute;
