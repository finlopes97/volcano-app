import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Map } from "pigeon-maps";

import "../style/HomePageCards.css";

function getRandomNumber() {
  return Math.floor(Math.random() * 999 + 1);
}

function HomePageCards() {
  const [volcanoes, setVolcanoes] = useState([]);
  const [volcanoIds, setVolcanoIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="content">
      <h3>Hot Volcanoes In Your Area</h3>
      <div className="container cards">
        {volcanoes.map((volcano, index) => (
          <div key={index} className="card">
            <Link to={`/volcano/${volcanoIds[index]}`} className="volcano-link">
              <h4 className="card-title">{volcano.name}</h4>
            </Link>
            <div className="volcano-card-map">
              <Map
                twoFingerDrag={true}
                twoFingerDragWarning="Use two fingers to move the map"
                defaultCenter={[
                  volcano.latitude ? parseFloat(volcano.latitude) : 0,
                  volcano.longitude ? parseFloat(volcano.longitude) : 0,
                ]}
                defaultZoom={11}
                metaWheelZoom={true}
                metaWheelZoomWarning="Hold the CTRL or CMD key to zoom."
                ariaLabel="A map of the volcano"
              ></Map>
            </div>
            <p>Country: {volcano.country}</p>
            <p>Region: {volcano.region}</p>
            <p>Summit: {volcano.summit}</p>
            <p>Last Eruption: {volcano.last_eruption}</p>
            <Link to={`/volcano/${volcanoIds[index]}`} className="volcano-link">
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePageCards;
