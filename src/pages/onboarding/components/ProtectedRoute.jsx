import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Ambil data dari localStorage
  const token = localStorage.getItem("token");
  const isOnboarded = localStorage.getItem("isOnboarded");

  // Belum login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Sudah login tapi belum onboarding
  if (isOnboarded !== "true") {
    return <Navigate to="/kuesioner" replace />;
  }

  // Sudah login & onboarding
  return children;
};

export default ProtectedRoute;