// frontend/src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleBrowseEvents = () => {
    navigate('/events');
  };

  // URL of the background image served by Django
  const backgroundImageUrl = 'http://localhost:8000/media/homepage_images/banner.jpg';

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`
      }}
    >
      <div className="overlay">
        <h1>Welcome to EventFlow</h1>
        <button onClick={handleBrowseEvents}>Browse Events</button>
      </div>
    </div>
  );
};

export default Home;
