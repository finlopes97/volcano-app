import React, { useState, useEffect } from 'react';
import { Map, Marker } from "pigeon-maps"
import './style/App.css';

function GetRandomNumber() {
  return Math.floor(Math.random() * 101);
}

function App() {
  const [volcanoes, setVolcanoes] = useState([]);

  useEffect(() => {
    const fetchVolcanoData = async () => {
      const responses = await Promise.all([
        fetchVolcano(GetRandomNumber()),
        fetchVolcano(GetRandomNumber()),
        fetchVolcano(GetRandomNumber()),
        fetchVolcano(GetRandomNumber())
      ]);

      const data = await Promise.all(responses.map(response => response.json()));
      setVolcanoes(data);
    };

    fetchVolcanoData();
  }, []);

  const fetchVolcano = (volcanoId) => {
    return fetch(`http://4.237.58.241:3000/volcano/${volcanoId}`);
  }

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
          <div className="container row quote parallax">
            <blockquote cite="Meet Dave">    
              This is a picture of a volcano with a sick parallax effect, if only there were more stuff
              on this page I could scroll down.
              <div className="cite">- Whimsical Web Developer</div>
            </blockquote>
          </div>
          <div className="container col content">
            <h3>Volcanoes of the Week</h3>
            <div className="container row">
              {volcanoes.map((volcano, index) => (
                <div key={index}>
                  <div className="card">
                    <h3 className="card-title">{volcano.name}</h3>
                    <Map height={200} defaultCenter={[parseFloat(volcano.latitude), parseFloat(volcano.longitude)]} defaultZoom={11}>
                      <Marker width={1} anchor={[parseFloat(volcano.latitude), parseFloat(volcano.longitude)]} />
                    </Map>
                    <p>Country: {volcano.country}</p>
                    <p>Region: {volcano.region}</p>
                    <p>Summit: {volcano.summit}</p>
                    <p>Last Eruption: {volcano.last_eruption}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
        </main>
        <footer className="container row footer">
          © 1997-2024 FINLOPES97 
        </footer>
      </div>
  );
}

export default App;
