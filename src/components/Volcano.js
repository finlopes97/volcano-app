import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Map, Marker } from "pigeon-maps";
import { useAuth } from "../contexts/AuthContext";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import "../style/Volcano.css";

function Volcano() {
  const { id } = useParams();
  const [volcano, setVolcano] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const headers = isAuthenticated
      ? {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
  }, [id, isAuthenticated]);

  const chartData = {
    labels: ["5 km", "10 km", "30 km", "100 km"],
    datasets: [
      {
        label: "Population within distance",
        data: [
          volcano.population_5km,
          volcano.population_10km,
          volcano.population_30km,
          volcano.population_100km,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container col volcano-content">
      <div className="container volcano-info">
        <div className="container col volcano-info-card">
          <h2>{volcano.name}</h2>
          <p>Country: {volcano.country}</p>
          <p>Region: {volcano.region}</p>
          <p>Subregion: {volcano.subregion}</p>
          <p>Last Eruption: {volcano.last_eruption}</p>
          <p>Summit: {volcano.summit}</p>
          <p>Elevation: {volcano.elevation}</p>
        </div>
        <div className="container col volcano-info-card">
          <h2>Population Data</h2>
          <div>
          {isAuthenticated ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p>Only users with a valid account may view population data.</p>
          )}
          </div>
        </div>
      </div>
      <div className="volcano-map-parent">
        <Map
          boxClassname="volcano-map"
          defaultCenter={[
            volcano.latitude ? parseFloat(volcano.latitude) : 0,
            volcano.longitude ? parseFloat(volcano.longitude) : 0,
          ]}
          defaultZoom={11}
          metaWheelZoom={true}
          metaWheelZoomWarning="Hold the CTRL or CMD key to zoom."
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
