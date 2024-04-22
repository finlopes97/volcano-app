import React, { useState } from 'react';
import './style/App.css';

function fetchData(callback) {
  fetch('http://4.237.58.241:3000/volcanoes?country=Algeria&populatedWithin=100km')
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error('Error fetching data:', error));
}

function App() {
  const [colorBlindMode, setColorBlindMode] = useState('normal');

  const toggleColorBlindMode = (mode) => {
    setColorBlindMode(mode);
  }

  const handleFetchData = () => {
    fetchData(response => {
      console.log(response);
    });
  };

  return (
      <div className="App colorBlindMode">
        <header className="App-header">
            <h1 className="title">Hot Volcanoes in Your Area</h1>
            <nav>
                <ul className="navList">
                    <button className="nav-button colorBlindMode">Home</button>
                    <button className="nav-button colorBlindMode">Volcano List</button>
                    <button className="nav-button colorBlindMode">Sign Up</button>
                    <button className="nav-button colorBlindMode">Login</button>
                </ul>
            </nav>
        </header>
      </div>
  );
}

export default App;
