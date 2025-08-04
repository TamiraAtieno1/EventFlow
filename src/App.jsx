// frontend/src/App.js
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./assets/styles/index.scss";
import axios from "axios";

// Import components
import NavBar from "./assets/components/NavBar";
import Footer from "./assets/components/Footer";
import BookingPanel from "./assets/components/BookingPanel";
import TicketDisplay from "./assets/components/TicketDisplay";
import ProtectedRoute from "./assets/components/ProtectedRoute";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isMobile, isTablet } = useResponsive();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // localStorage.setItem('authToken', 'your_jwt_token_here'); // Re-enable if you implement token storage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

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
      fetchEvents();

      setBookings((prev) => [...prev, {
        event: bookingData.event,
        numTickets: bookingData.numTickets,
        name: bookingData.name,
        email: bookingData.email
      }]);

      setTimeout(() => {
        setSelectedEvent(null);
        setTicketVisible(true);
        navigate('/my-bookings');
      }, 3000);

    } catch (err) {
      console.error("Error confirming booking:", err);
      setError("Failed to complete booking. Please try again.");
      if (err.response && err.response.data) {
        console.error("Django booking errors:", err.response.data);
        setError(`Booking failed: ${JSON.stringify(err.response.data)}`);
      }
      setSelectedEvent(null);
    }
  };

  const handleTicketClose = () => {
    setBooking(null);
    setTicketVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn && <NavBar onLogout={handleLogout} />}
      <div className="flex-grow pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes - only accessible if isLoggedIn is true */}
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
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
                  <Footer /> {/* Moved Footer HERE */}
                </>
              }
            />
            <Route
              path="/events/:id"
              element={<EventDetailPage onBook={handleBook} />}
            />
            <Route path="/my-bookings" element={<BookingsPage bookings={bookings} />} />
          </Route>

          {/* Fallback route: Redirect to login if path not found and not logged in */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>

      {selectedEvent && (
        <BookingPanel
          event={selectedEvent}
          onCancel={handleBookingCancel}
          onConfirm={handleBookingConfirm}
          onClose={handleBookingCancel}
        />
      )}
      {ticketVisible && booking && (
        <TicketDisplay booking={booking} onClose={handleTicketClose} />
      )}
      {/* Footer is removed from here to only show on /events */}
    </div>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;