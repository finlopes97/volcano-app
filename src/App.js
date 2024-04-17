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
    <div className={`App ${colorBlindMode}`}>
      <header className={`App-header ${colorBlindMode}`}>
        <p>
          Hello, World!
        </p>
        <a
          className={`App-link ${colorBlindMode}`}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div className={`App ${colorBlindMode}`}>
          <button onClick={() => toggleColorBlindMode('normal')} className={`button ${colorBlindMode}`}>Normal</button>
          <button onClick={() => toggleColorBlindMode('protanopia')} className={`button ${colorBlindMode}`}>Protanopia</button>
          <button onClick={() => toggleColorBlindMode('deuteranopia')} className={`button ${colorBlindMode}`}>Deuteranopia</button>
          <button onClick={handleFetchData} className={`button ${colorBlindMode}`}>Fetch Test Data</button>
          <p>Hello, World!</p>
        </div>

        <div className={`${colorBlindMode}`}>
        </div>
      </header>
    </div>
  );
}

export default App;
