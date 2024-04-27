import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
// import VolcanoList from "./components/VolcanoList";
import Volcano from "./components/Volcano";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
// import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

import "./style/Main.css";
import "./style/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/volcano/:id" element={<Volcano />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
