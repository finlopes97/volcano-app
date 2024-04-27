import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "../style/SignUp.css";

function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");

  const handleGoBack = () => {
    navigate(`/`);
  };

  const handleLogin = () => {
    navigate(`/login`);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container col signup-form">
      <form className="container col">
        <h2 className="signup-heading">Create a free account.</h2>
        <label className="container col">
          Email:
          <input
            type="email"
            name="email"
            id="signup-email"
            defaultValue={email}
            autoComplete="email"
          />
        </label>
        <label className="container col">
          Password:
          <div className="container row">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="signup-password"
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
        <input id="signup-submit" type="submit" value="Create Account" />
        <div className="container row">
          <button className="signup-button" type="button" onClick={handleLogin}>
            Have an account? Sign in
          </button>
          <button className="signup-button" type="button" onClick={handleGoBack}>
            Go back
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
