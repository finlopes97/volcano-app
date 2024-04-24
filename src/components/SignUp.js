import React from "react";
import { useLocation } from "react-router-dom";

function SignUp() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  return (
    <div>
      <h2>Sign Up</h2>
      <p>Email: {email}</p>
      {/* Your sign-up form */}
    </div>
  );
}

export default SignUp;