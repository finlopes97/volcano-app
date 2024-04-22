import React, { useState } from 'react';
import './style/App.css';

function App() {
  return (
      <div className="App">
        <header className="App-header">
            <nav>
                <ul className="nav-list">
                    <li id="first-link"><a className="nav-link"><h1>Home</h1></a></li>
                    <li><a className="nav-link">Volcano List</a></li>
                    <li><a className="nav-link">Sign Up</a></li>
                    <li><a className="nav-link">Login</a></li>
                </ul>
            </nav>
        </header>
        <main>
          <div className="container row jumbotron">
            <div className="container col">
              <h2>Hot Volcanoes In Your Area</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Tincidunt eget nullam non nisi. 
                Sit amet facilisis magna etiam tempor orci. Turpis cursus in hac habitasse. 
                Diam maecenas ultricies mi eget mauris pharetra. Velit euismod in pellentesque 
                massa placerat duis ultricies. Vitae turpis massa sed elementum tempus egestas 
                sed sed risus.
              </p>
              <h3 id="cta-heading">Stay Connected</h3>
              <form id="cta-form" className="container row">
                <label className="container col">
                  Your Email:
                  <input type="email" name="userEmail" />
                </label>
                <input id="cta-submit" type="submit" value="Sign Up" />
              </form>
            </div>
          </div>
          <div class="container row quote parallax">
            <blockquote cite="Meet Dave">    
              This is a picture of a volcano with a sick parallax effect, if only there were more stuff
              on this page I could scroll down.
              <div class="cite">- Whimsical Web Developer</div>
            </blockquote>
          </div>
            <div class="container col content">
              <h3>Some random information.</h3>
                <div class="container row">
                  <div class="card">
                    <h3>Placeholder</h3>
                    <p>this is some subtext under an illustration or image</p>
                  </div>
                  <div class="card">
                    <h3>Placeholder</h3>
                    <p>this is some subtext under an illustration or image</p>
                  </div>
                  <div class="card">
                    <h3>Placeholder</h3>
                    <p>this is some subtext under an illustration or image</p>
                  </div>
                  <div class="card">
                    <h3>Placeholder</h3>
                    <p>this is some subtext under an illustration or image</p>
                  </div>
                </div>
            </div>
        </main>
        <footer class="container row footer">
          © 1997-2024 FINLOPES97 
        </footer>
      </div>
  );
}

export default App;
