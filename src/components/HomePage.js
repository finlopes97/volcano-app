import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Map, Marker } from "pigeon-maps";

import "../style/HomePage.css";

function getRandomNumber() {
  return Math.floor(Math.random() * 251);
}

function MainPage() {
  const [volcanoes, setVolcanoes] = useState([]);
  const [volcanoId, setVolcanoId] = useState(0);

  useEffect(() => {
    const fetchVolcanoData = async () => {
      const volcanoIds = [
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber(),
      ];
      setVolcanoId(volcanoIds);
      const responses = await Promise.all(
        volcanoIds.map((id) => fetchVolcano(id))
      );

      const data = await Promise.all(
        responses.map((response) => response.json())
      );
      setVolcanoes(data);
    };

    fetchVolcanoData();
  }, []);

  const fetchVolcano = (volcanoId) => {
    return fetch(`http://4.237.58.241:3000/volcano/${volcanoId}`);
  };

  return (
    <main>
      <div className="container row jumbotron">
        <div className="container col">
          <h2>Volcano Watch</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Tincidunt eget nullam non nisi. Sit amet facilisis magna etiam
            tempor orci. Turpis cursus in hac habitasse. Diam maecenas ultricies
            mi eget mauris pharetra. Velit euismod in pellentesque massa
            placerat duis ultricies. Vitae turpis massa sed elementum tempus
            egestas sed sed risus.
          </p>
          <h3 id="cta-heading">Stay Connected</h3>
          <form id="cta-form" className="container col">
            <label className="container col">
              Your Email:
              <div className="container row">
                <input id="cta-email" type="email" name="userEmail" />
                <input id="cta-submit" type="submit" value="Sign Up" />
              </div>
            </label>
          </form>
        </div>
      </div>
      <div className="container row quote parallax">
        <blockquote cite="Meet Dave">
          This is a picture of a volcano with a sick parallax effect, if only
          there were more stuff on this page I could scroll down.
          <div className="cite">- Whimsical Web Developer</div>
        </blockquote>
      </div>
      <div className="container col content">
        <h3>Hot Volcanoes In Your Area</h3>
        <div className="container row">
          {volcanoes.map((volcano, index) => (
            <div key={index}>
              <div className="card">
                <h4 className="card-title">{volcano.name}</h4>
                <Map
                  height={200}
                  defaultCenter={[
                    volcano.latitude ? parseFloat(volcano.latitude) : 0, 
                    volcano.longitude ? parseFloat(volcano.longitude) : 0,
                  ]}
                  defaultZoom={11}
                >
                  <Marker
                    width={25}
                    anchor={[
                      volcano.latitude ? parseFloat(volcano.latitude) : 0, 
                      volcano.longitude ? parseFloat(volcano.longitude) : 0,
                    ]}
                    color="red"
                  />
                </Map>
                <p>Country: {volcano.country}</p>
                <p>Region: {volcano.region}</p>
                <p>Summit: {volcano.summit}</p>
                <p>Last Eruption: {volcano.last_eruption}</p>
                <Link to={`/volcano/${volcanoId[index]}`} className="volcano-link">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default MainPage;
