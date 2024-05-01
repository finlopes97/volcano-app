import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "../style/Auth.css";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging you out Shepard...");
    logout();
    navigate("/");
  };

  const handleGoBack = () => {
    console.log("Going back to the previous page...");
    navigate(-1);
  };

  return (
    <div className="auth-form">
      <h1 className="auth-heading">Ready to go already? We'll miss you</h1>
      <div className="container row">
        <button
          className="auth-button"
          onClick={handleLogout}
        >
          I'm ready
        </button>
        <button
          className="auth-button"
          onClick={handleGoBack}
        >
          I'm not ready
        </button>
      </div>
    </div>
  );
}

export default Logout;
