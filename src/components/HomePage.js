import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Map, Marker } from "pigeon-maps";

import "../style/HomePage.css";

function getRandomNumber() {
  return Math.floor(Math.random() * 251);
}

function HomePage() {
  const [volcanoes, setVolcanoes] = useState([]);
  const [volcanoIds, setVolcanoIds] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${email}`);
  };

  useEffect(() => {
    const ids = [
      getRandomNumber(),
      getRandomNumber(),
      getRandomNumber(),
      getRandomNumber(),
    ];
    setVolcanoIds(ids);

    Promise.all(ids.map((id) => fetchVolcano(id)))
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => setVolcanoes(data))
      .then(() => setIsLoading(false))
      .catch((error) =>
        console.error(`Failed to fetch volcano data: ${error}`)
      );
  }, []);

  const fetchVolcano = (volcanoId) => {
    return fetch(`http://4.237.58.241:3000/volcano/${volcanoId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="container row jumbotron">
        <div className="container col">
          <h1>Volcano Watch</h1>
          <blockquote>
            I'm baby vegan brunch chillwave, flexitarian keytar snackwave
            austin. Pickled poke crucifix, trust fund meggings fam iPhone
            selfies four dollar toast chicharrones bespoke YOLO. Pok pok
            gatekeep before they sold out tousled flannel mlkshk fixie
            microdosing. Pork belly Brooklyn organic sriracha pinterest banh mi.
            Ascot drinking vinegar literally, enamel pin chicharrones everyday
            carry wayfarers street art tattooed gochujang blue bottle affogato.
            Mustache locavore whatever ramps vibecession chicharrones wayfarers
            pitchfork sartorial taxidermy single-origin coffee tote bag.
            Scenester shabby chic umami food truck gastropub migas.
            <cite>
              Jason Cosper, <a href="https://hipsum.co/">Hipster Ipsum</a>
            </cite>
          </blockquote>
          <h3 id="cta-heading">Stay Connected</h3>
          <form id="cta-form" className="container col" onSubmit={handleSubmit}>
            <label className="container col">
              Your Email:
              <div className="container row">
                <input
                  id="cta-email"
                  type="email"
                  name="userEmail"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input id="cta-submit" type="submit" value="Sign Up" />
              </div>
            </label>
          </form>
        </div>
      </div>
      <div className="container row quote parallax"></div>
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
                    width={50}
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
                <Link
                  to={`/volcano/${volcanoIds[index]}`}
                  className="volcano-link"
                >
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

export default HomePage;
