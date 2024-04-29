import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../style/Header.css';

function Header() {
  const { isAuthenticated, logout } = useAuth;

  const handleLogout = () => {
    console.log("Logging you out Shepard...");
    logout();
  };

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
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;