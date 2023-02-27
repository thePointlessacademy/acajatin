import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  let login = localStorage.getItem("auth");

  return login ? <Outlet /> : <Navigate to="/" replace />;
};

export default Protected;
