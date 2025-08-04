// frontend/src/pages/SignUpPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SIGNUP_URL = "http://localhost:8000/api/register/";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(SIGNUP_URL, {
        username,
        email,
        password,
      });
      console.log(response.data);
      setSuccess(true);
      // Route to login after successful registration
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Sign-up failed. Try again.");
      if (err.response && err.response.data) {
        // You can add more specific error handling here based on Django's response
        console.error("Django signup errors:", err.response.data);
        if (err.response.data.username) {
          setError(`Username: ${err.response.data.username[0]}`);
        } else if (err.response.data.email) {
          setError(`Email: ${err.response.data.email[0]}`);
        } else if (err.response.data.password) {
          setError(`Password: ${err.response.data.password[0]}`);
        } else {
          setError("Sign-up failed. Please check your details.");
        }
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br/>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
        <button type="submit">Register</button>
      </form>
      {success && <p style={{ color: "green" }}>Account created successfully!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ADDED THIS SECTION */}
      <button
        type="button"
        onClick={() => navigate("/login")}
        style={{ marginTop: "1rem" }} // Added some spacing
      >
        Already have an account? Login
      </button>
      {/* END OF ADDED SECTION */}
    </div>
  );
};

export default SignUpPage;