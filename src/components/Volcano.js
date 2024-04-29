import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Map, Marker } from "pigeon-maps";

import "../style/Volcano.css";

function Volcano() {
  const { id } = useParams();
  const [volcano, setVolcano] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);

  useState(() => {
    if (localStorage.getItem("authToken")) {
      console.log("User is logged in.");
      setAuth(true);
    } else {
      console.log("User not logged in.");
    }
  });

  useEffect(() => {
    const fetchVolcanoData = async () => {
      const response = await fetch(`http://4.237.58.241:3000/volcano/${id}`);
      const data = await response.json();
      setVolcano(data);
      setIsLoading(false);
    };

    fetchVolcanoData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const populationData = () => {
    if (isAuth) {
      return (
      <ul>
        <li>Population within 5km: {volcano.population_5km}</li>
        <li>Population within 10km: {volcano.population_10km}</li>
        <li>Population within 30km: {volcano.population_30km}</li>
        <li>Population within 100km: {volcano.population_100km}</li>
      </ul>
      );
    } else {
      <p>Only users with a valid account may view population data.</p>;
    }
  };

  return (
    <div className="container col">
      <div className="container row volcano-content">
        <div className="container col volcano-info">
          <h2>{volcano.name}</h2>
          <p>Country: {volcano.country}</p>
          <p>Region: {volcano.region}</p>
          <p>Subregion: {volcano.subregion}</p>
          <p>Last Eruption: {volcano.last_eruption}</p>
          <p>Summit: {volcano.summit}</p>
          <p>Elevation: {volcano.elevation}</p>
        </div>
        <div className="container col">
          <h2>Population Data</h2>
          <div>{populationData}</div>
        </div>
      </div>
      <div className="volcano-map">
        <Map
          height={400}
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
      </div>
    </div>
  );
}

export default Volcano;
