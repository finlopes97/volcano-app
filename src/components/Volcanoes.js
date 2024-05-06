import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import "../style/Volcanoes.css";

function Volcanoes() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [populatedWithin, setPopulationWithin] = useState("");
  const [usePagination, setUsePagination] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setUsePagination(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchVolcanoes();
  }, [selectedCountry, populatedWithin]);

  const fetchCountries = () => {
    fetch("http://4.237.58.241:3000/countries")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          throw new Error("Invalid response from server");
        }
      })
      .catch((error) => console.error("Error fetching countries:", error));
  };

  const fetchVolcanoes = () => {
    if (!selectedCountry) {
      setRowData([]);
      return;
    }

    let url = "http://4.237.58.241:3000/volcanoes";
    if (selectedCountry) {
      url += `?country=${encodeURIComponent(selectedCountry)}`;
      if (populatedWithin) {
        url += `&populatedWithin=${populatedWithin}`;
      }
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRowData(data);
        } else {
          setRowData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching volcanoes:", error);
        setRowData([]);
      });
  };

  const onCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const onPopulatedWithinChange = (e) => {
    setPopulationWithin(e.target.value);
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Name",
      field: "name",
      minWidth: 150,
      flex: 1
    },
    {
      headerName: "Region",
      field: "region",
      minWidth: 150,
      flex: 1
    },
    {
      headerName: "Subregion",
      field: "subregion",
      minWidth: 100,
      flex: 1,
      hide: window.innerWidth < 768
    }
  ]);

  useEffect(() => {
    const handleResize = () => {
      setColumnDefs((currentDefs) =>
        currentDefs.map((col) => ({
          ...col,
          hide: col.minWidth === 100 && window.innerWidth < 768,
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRowClicked = (e) => {
    navigate(`/volcano/${e.data.id}`);
  };

  return (
    <div className="ag-theme-material">
      <div className="volcano-filters">
        <select value={selectedCountry} onChange={onCountryChange}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select value={populatedWithin} onChange={onPopulatedWithinChange}>
          <option value="">Select population range</option>
          <option value="5km">5 km</option>
          <option value="10km">10 km</option>
          <option value="30km">30 km</option>
          <option value="100km">100 km</option>
        </select>
      </div>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onRowClicked={handleRowClicked}
        domLayout="autoHeight"
        pagination={usePagination}
        animateRows={true}
      />
    </div>
  );
}

export default Volcanoes;
