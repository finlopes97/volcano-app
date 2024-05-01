import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "../style/Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
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
          login(data.token);
          navigate("/");
        } else {
          setError(data);
          throw new Error(error.message);
        }
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <h2 className="auth-heading" id="auth-heading">
          Sign into your account.
        </h2>
        {error.message === "Incorrect email or password" && (
          <div className="container row error-message">
            <p>
              It looks like you entered the wrong password, please try again.
            </p>
          </div>
        )}
        {error.message ===
          "Request body incomplete, both email and password are required" && (
          <div className="container row error-message">
            <p>
              Please enter both your email and password to sign in to your
              account.
            </p>
          </div>
        )}
        <label className="container col">
          Email:
          <input type="email" name="email" id="email" autoComplete="email" />
        </label>
        <label className="container col">
          Password:
          <div className="container row">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
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
        <input id="auth-submit" type="submit" value="Sign In" />
        <div className="container row">
          <button className="auth-button" type="button" onClick={handleSignUp}>
            No account? Create one
          </button>
          <button className="auth-button" type="button" onClick={handleGoBack}>
            Go back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
