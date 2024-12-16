import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import TokenService from '@your-org/shared-utils/auth/tokenService'; // Adjust import path as needed

const AuthAccessRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");

  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // If not authenticated, render the children (login, signup, verify pages)
  return !isAuthenticated ? children : null;
};

export default AuthAccessRoute;