import React from "react";
import "../style/Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="App-header">
      <nav>
        <ul className="nav-list">
          <li id="first-link">
            <Link to="/" className="nav-link">
              <h1>Home</h1>
            </Link>
          </li>
          <li>
            <Link to="/volcanoes" className="nav-link">
              Volcano List
            </Link>
          </li>
          <li>
            <Link to="/signup" className="nav-link">
              Create Account
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
