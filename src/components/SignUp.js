import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "../style/SignUp.css";

function SignUp() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container col signup">
      <form className="container col signup-form">
        <h2>Sign Up</h2>
        <label>
          Email:
          <input
            type="email"
            name="email"
            id="signup-email"
            defaultValue={email}
            autoComplete="email"
          />
        </label>
        <label>
          Password:
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
        </label>
        <input id="signup-submit" type="submit" value="Sign Up" />
      </form>
    </div>
  );
}

export default SignUp;
