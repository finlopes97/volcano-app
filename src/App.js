import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
// import VolcanoList from "./components/VolcanoList";
import Volcano from "./components/Volcano";
import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import NotFound from "./components/NotFound";

import "./style/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/volcano/:id" element={<Volcano />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
        <footer className="container row footer">© 1997-2024 FINLOPES97</footer>
      </div>
    </Router>
  );
}

export default App;
