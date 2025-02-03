import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ element }) {
  const { currentUser } = useAuth();

  return currentUser ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
