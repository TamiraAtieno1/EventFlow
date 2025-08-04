// frontend/src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const API_URL = "http://localhost:8000/api/login/";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(API_URL, { username, password });
      console.log(response.data.message);
      if (onLogin) onLogin();
      // ONLY navigate to /bookings if the API call is successful
      navigate("/"); // <--- This line is moved here
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  const loginContainerBackgroundImageUrl = 'http://localhost:8000/media/login_images/login.jpg';
  const pageBackgroundImageUrl = 'http://localhost:8000/media/login_images/signup.jpg';

  return (
    <div
     className="login-page-background"
        style={{
          backgroundImage: `url(${pageBackgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh', // Ensure it takes full viewport height
          width: '100vw',    // Ensure it takes full viewport width
          display: 'flex',     // Use flexbox to center the login container
          justifyContent: 'center', // Center horizontally
          alignItems: 'center',      // Center vertically
          // Ensure these are present and correct for full-page fixed background
          position: 'fixed', // This is critical
          top: 0,
          left: 0,
          zIndex: -1, // Keep this -1 to send the background behind everything else
        }}
    >
      <div
        className="login-container"
        style={{
          backgroundImage: `url(${loginContainerBackgroundImageUrl})`,
          // Add a background-color with some transparency here if the form's image
          // makes the text hard to read. E.g.:
          // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white overlay
          // color: '#333' // Adjust text color if needed
        }}
      >
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form"> {/* Add a class to the form */}
          {/* Wrap input fields and br tags in a div */}
          <div className="form-inputs">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            /><br/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /><br/>
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p style={{color: "red"}}>{error}</p>}

        <button
          type="button"
          onClick={() => navigate("/signup")}
          style={{ marginTop: "1rem" }}
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;