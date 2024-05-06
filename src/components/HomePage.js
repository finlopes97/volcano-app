import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HomePageCards from "./HomePageCards";
import "../style/HomePage.css";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${email}`);
  };

  return (
    <main>
      <div className="container row jumbotron">
        <div className="container col">
          <h1>About volcano watch.</h1>
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
          {!isAuthenticated ? (
            <>
              <form className="cta" onSubmit={handleSubmit}>
                <h2>Stay Connected</h2>
                <label className="">
                  Your Email:
                  <div className="cta-form">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      id="submit"
                      type="submit"
                      name="submit"
                      value="Sign Up"
                    />
                  </div>
                </label>
              </form>
            </>
          ) : (
            <hr />
          )}
        </div>
      </div>
      <div className="container row quote parallax"></div>
      <HomePageCards />
    </main>
  );
}

export default HomePage;
