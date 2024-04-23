import React from "react";
import "../style/Header.css";

function Header() {
  return (
    <header className="App-header">
      <nav>
        <ul className="nav-list">
          <li id="first-link">
            <a className="nav-link">
              <h1>Home</h1>
            </a>
          </li>
          <li>
            <a className="nav-link">Volcano List</a>
          </li>
          <li>
            <a className="nav-link">Sign Up</a>
          </li>
          <li>
            <a className="nav-link">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;