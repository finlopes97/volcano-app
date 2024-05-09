import React from "react";
import "../style/NotFound.css";



function NotFound() {
  return (
    <div className="not-found">
      <h1>Hey, what the heck, this isn't a real page.</h1>
      <p className="prelude">
        You've reached a page that doesn't exist. How did you get here? Go back
        to the <a href="/">home page</a> and try again.
      </p>
      <hr />
    </div>
  );
}

export default NotFound;
