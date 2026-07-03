import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Wajib ambil dulu datanya dari localStorage!
  const token = localStorage.getItem("token");
  const isOnboarded = localStorage.getItem("isOnboarded"); // Pastikan namanya sama dengan BE

  // Jika tidak ada token (belum login), tendang ke Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login tapi belum isi kuesioner, tendang ke Kuesioner
  if (token && isOnboarded !== 'true') {
    return <Navigate to="/kuesioner" replace />;
  }

  // Jika aman, izinkan masuk ke halaman yang dituju
  return children;
};

export default ProtectedRoute;