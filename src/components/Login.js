import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "../style/Login.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [incorrectDetails, setIncorrectDetails] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: document.getElementById("login-email").value,
      password: document.getElementById("login-password").value,
    };

    const userDataJson = JSON.stringify(userData);

    fetch("http://4.237.58.241:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: userDataJson,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          console.log(`User successfully logged in with token: ${data.token}`);
          localStorage.setItem("authToken", data.token);
          navigate("/");
        } else {
          setIncorrectDetails("That account does not exist. Try again.")
          throw new Error("Failed to login. Try again.");
        }
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        setError(`Error: ${error.message}`);
      });
  };

  return (
    <div className="container col login-form">
      <form className="container col" onSubmit={handleSubmit}>
        <h2 className="login-heading" id="login-heading">Sign into your account.</h2>
        <h3 className="login-error">{incorrectDetails}</h3>
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
              name="hide-password"
              id="hide-password"
              onClick={toggleShowPassword}
              className="hide-password"
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
