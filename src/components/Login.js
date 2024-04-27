import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "../style/Login.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");

  const handleGoBack = () => {
    navigate(`/`);
  };

  const handleSignUp = () => {
    navigate(`/signup`);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container col login-form">
      <form className="container col">
        <h2 className="login-heading">Sign into your account.</h2>
        <label className="container col">
          Email:
          <input
            type="email"
            name="email"
            id="login-email"
            autoComplete="email"
          />
        </label>
        <label className="container col">
          Password:
          <div className="container row">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="login-password"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="show-password"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          </div>
        </label>
        <input id="login-submit" type="submit" value="Sign In" />
        <div className="container row">
          <button className="login-button" type="button" onClick={handleSignUp}>
            No account? Create one
          </button>
          <button className="login-button" type="button" onClick={handleGoBack}>
            Go back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
