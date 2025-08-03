// frontend/src/assets/pages/EventDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming axios is used for API calls

const API_BASE_URL = "http://localhost:8000/api/";

const EventDetailPage = ({ onBook }) => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}events/${id}/`);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]); // Re-fetch if ID changes

  if (isLoading) {
    return <div className="text-center text-lg text-gray-600 mt-8">Loading event details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 text-lg mt-8">{error}</div>;
  }

  if (!event) {
    return <div className="text-center text-gray-600 text-lg mt-8">Event not found.</div>;
  }

  // Date formatting (you might want a dedicated utility for this)
  const eventDate = new Date(`${event.date}T${event.time}`);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl mt-8 mb-8">
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
      >
        &larr; Back to Events
      </button>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{event.title}</h1>
      <img
        src={event.image || "https://placehold.co/800x400/cccccc/333333?text=Event+Image"}
        alt={event.title}
        className="w-full h-96 object-cover rounded-lg mb-6 shadow-md"
      />
      <p className="text-lg text-gray-700 mb-4">{event.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-600">
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Time:</strong> {formattedTime}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> ${parseFloat(event.price).toFixed(2)}</p>
        <p><strong>Tickets Available:</strong> {event.available_tickets}</p>
      </div>
      <button
        onClick={() => onBook(event)} // Pass the event object to the booking handler
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        disabled={event.available_tickets <= 0}
      >
        {event.available_tickets > 0 ? 'Book Tickets' : 'Sold Out'}
      </button>
    </div>
  );
};

export default EventDetailPage;
