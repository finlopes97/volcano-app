import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "../style/Auth.css";

function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    const userDataJson = JSON.stringify(userData);

    fetch("http://4.237.58.241:3000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: userDataJson,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User created") {
          // Automatically log this bitch in
          return fetch("http://4.237.58.241:3000/user/login", {
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
                console.error(error.message);
              }
            });
        } else {
          setError(data);
          throw new Error(error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="auth-form">
      <form className="container col" onSubmit={handleSubmit}>
        <h2 className="auth-heading">Create a free account.</h2>
        {error.message === "User already exists" && (
          <div className="container row error-message">
            <p>
              It looks like you already have an account with us, try{" "}
              <Link to="/login" className="error-link">
                signing in?
              </Link>
            </p>
          </div>
        )}
        {error.message ===
          "Request body incomplete, both email and password are required" && (
          <div className="container row error-message">
            <p>
              It looks like you forgot to enter your email or password, try
              again.
            </p>
          </div>
        )}
        <label className="container col">
          Email:
          <input
            type="email"
            name="email"
            id="email"
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
              id="password"
              autoComplete="off"
              minLength={5}
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
        <input id="submit" type="submit" value="Create Account" />
        <div className="container row">
          <button className="auth-button" type="button" onClick={handleLogin}>
            Have an account? Sign in
          </button>
          <button className="auth-button" type="button" onClick={handleGoBack}>
            Go back
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
