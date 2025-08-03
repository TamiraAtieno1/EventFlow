// frontend/src/App.js
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./assets/styles/index.scss";
import axios from "axios";

// Import components
import NavBar from "./assets/components/NavBar";
import Footer from "./assets/components/Footer";
import BookingPanel from "./assets/components/BookingPanel";
import TicketDisplay from "./assets/components/TicketDisplay";

// Import page components
import Home from "./pages/Home";
import EventListPage from "./pages/EventListPage";
import EventDetailPage from "./pages/EventDetailPage";
import BookingsPage from "./pages/BookingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";

// Import hooks and utilities
import { useResponsive } from "./assets/hooks/useResponsive";

// Import local images for events
import USIUGalaImage from "./assets/images/USIU_GALA_IMAGE.jpg";
import JAVASCRIPTsummit from "./assets/images/Javascript.jpeg";
import CSSworkshop from "./assets/images/CssWorkshop.jpeg";

// Base URL for your Django API
const API_BASE_URL = "http://localhost:8000/api/";

// Map local image names to their imported modules for fallback
const LOCAL_IMAGE_MAP = {
  "USIU_GALA_IMAGE.jpg": USIUGalaImage,
  "Javascript.jpeg": JAVASCRIPTsummit,
  "CssWorkshop.jpeg": CSSworkshop,
};

const App = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [booking, setBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [ticketVisible, setTicketVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isMobile, isTablet } = useResponsive();
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = searchQuery
        ? `${API_BASE_URL}events/?search=${encodeURIComponent(searchQuery)}`
        : `${API_BASE_URL}events/`;

      const response = await axios.get(url);

      const fetchedData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      const fetchedEvents = fetchedData.map((event) => ({
        ...event,
        dateTime: `${event.date}T${event.time}:00Z`,
        imageUrl:
          event.image ||
          LOCAL_IMAGE_MAP[event.title.replace(/\s+/g, '') + '.jpeg'] ||
          null,
      }));

      setEvents(fetchedEvents);
      setError(null);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchEvents();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [fetchEvents, searchQuery]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const onEsc = (e) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onEsc);
      return () => {
        window.removeEventListener("keydown", onEsc);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const handleBook = (event) => {
    navigate(`/events/${event.id}`);
    setSelectedEvent(event);
  };

  const handleBookingCancel = () => {
    setSelectedEvent(null);
  };

  const handleBookingConfirm = async (bookingData) => {
    try {
      const djangoBookingData = {
        event: bookingData.event.id,
        num_tickets: bookingData.numTickets,
        booker_name: bookingData.name,
        booker_email: bookingData.email,
      };

      const response = await axios.post(`${API_BASE_URL}bookings/`, djangoBookingData);
      setBooking(response.data);
      // setSelectedEvent(null); // This will be set to null after the timeout to allow message to show
      // setTicketVisible(true); // This will be set after the timeout
      fetchEvents(); // Refresh events to update available tickets

      setBookings((prev) => [...prev, {
        event: bookingData.event,
        numTickets: bookingData.numTickets,
        name: bookingData.name,
        email: bookingData.email
      }]);

      // <--- ADDED/MOVED LOGIC HERE FOR NAVIGATION AND PANEL CLOSING --->
      // This timeout allows the BookingPanel to show its confirmation message
      setTimeout(() => {
        setSelectedEvent(null); // Closes the BookingPanel
        setTicketVisible(true); // Shows the TicketDisplay (if you still want it)
        navigate('/my-bookings'); // Navigate to my bookings page
      }, 3000); // 3-second delay for the confirmation message

    } catch (err) {
      console.error("Error confirming booking:", err);
      setError("Failed to complete booking. Please try again.");
      if (err.response && err.response.data) {
        console.error("Django booking errors:", err.response.data);
        setError(`Booking failed: ${JSON.stringify(err.response.data)}`);
      }
      // Ensure panel closes even on error if desired, or show error within panel
      setSelectedEvent(null); // Close the panel on error
    }
  };

  const handleTicketClose = () => {
    setBooking(null);
    setTicketVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/events"
            element={
              <>
                <EventListPage
                  events={events}
                  isLoading={isLoading}
                  error={error}
                  onBook={handleBook}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/events/:id"
            element={<EventDetailPage onBook={handleBook} />}
          />
          <Route path="/my-bookings" element={<BookingsPage bookings={bookings} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/settings" element={<SettingsPage />} */}
        </Routes>
      </div>

      {selectedEvent && (
        <BookingPanel
          event={selectedEvent}
          onCancel={handleBookingCancel}
          onConfirm={handleBookingConfirm}
          onClose={handleBookingCancel} // onClose still helpful for the X button
          // navigate={navigate} // <--- REMOVE THIS PROP
        />
      )}
      {ticketVisible && booking && (
        <TicketDisplay booking={booking} onClose={handleTicketClose} />
      )}
    </div>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;