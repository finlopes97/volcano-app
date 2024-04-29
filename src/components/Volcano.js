import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Map, Marker } from "pigeon-maps";

import "../style/Volcano.css";

function Volcano() {
  const { id } = useParams();
  const [volcano, setVolcano] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuth(!!authToken);
    console.log(authToken ? "User logged in." : "User not logged in.");

    const headers = authToken
      ? {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        }
      : {
          Accept: "application/json",
        };
        
    fetch(`http://4.237.58.241:3000/volcano/${id}`, { headers })
      .then((response) => response.json())
      .then((data) => {
        setVolcano(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <div>
            {isAuth ? (
              <div>
                <p>{volcano.population_5km}</p>
                <p>{volcano.population_10km}</p>
                <p>{volcano.population_30km}</p>
                <p>{volcano.population_100km}</p>
              </div>
            ) : (
              <p>Only users with a valid account may view population data.</p>
            )}
          </div>
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
