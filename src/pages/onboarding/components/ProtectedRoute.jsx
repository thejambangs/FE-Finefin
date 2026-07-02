import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (token && isOnboarded !== 'true') {
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (token && !isOnboarded) {
    return <Navigate to="/kuesioner" replace />;
  }
}

  return children;
};

export default ProtectedRoute;
