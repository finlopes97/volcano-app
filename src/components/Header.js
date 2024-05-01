import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../style/Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="App-header">
      <nav>
        <button className="nav-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul className={`nav-list ${isOpen ? "open" : ""}`}>
          <li id="first-link">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/volcanoes" className="nav-link">
              Volcano List
            </Link>
          </li>
          {!isAuthenticated ? (
            <>
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
            </>
          ) : (
            <>
              <li>
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
