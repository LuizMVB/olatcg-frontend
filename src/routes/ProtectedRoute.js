import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const ProtectedRoute = () => {
  const { token } = useAuth();
  //if token exists, the user can go to other pages
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
