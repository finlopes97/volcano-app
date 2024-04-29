import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
    <div>
      <h1>Are you ready to log out? We'll miss you</h1>
      <button onClick={handleLogout}>I'm ready</button>
      <button onClick={handleGoBack}>I'm not ready</button>
    </div>
  );
}

export default Logout;