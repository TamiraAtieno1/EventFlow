// src/App.jsx

import React, { useState, useEffect } from "react";
// Import components
import Header from "./assets/components/Header";
import EventCard from "./assets/components/EventCard";
import BookingPanel from "./assets/components/BookingPanel";
import TicketDisplay from "./assets/components/TicketDisplay";

// Import hooks and utilities
import { useResponsive } from "./assets/hooks/useResponsive";

// Import local images for events
import USIUGalaImage from "./assets/images/USIU_GALA_IMAGE.jpg";

// Black placeholder image as data URI (1x1 black pixel)
const blackPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='black' /%3E%3C/svg%3E";

// Sample events data (would be fetched from backend normally)
const sampleEvents = [
  {
    id: "e1",
    title: "USIU GALA NIGHT",
    description:
      "Talent unleashed! Join us for an unforgettable evening of performances, networking, and celebration at the USIU GALA NIGHT.",
    date: "2025-07-11T18:00:00Z",
    location: "USIU Auditorium, Nairobi, Kenya",
    price: 100,
    imageUrl: USIUGalaImage,
  },
  {
    id: "e2",
    title: "JavaScript Summit",
    description: "Deep dive into modern JS techniques and frameworks.",
    date: "2025-10-01T10:00:00Z",
    location: "KICC, Nairobi, Kenya",
    price: 199,
    imageUrl: blackPlaceholder,
  },
  {
    id: "e3",
    title: "CSS Workshop",
    description: "Hands-on workshop to master CSS Grid and Flexbox layouts.",
    date: "2025-09-25T14:00:00Z",
    location: "Online - Zoom",
    price: 149,
    imageUrl: blackPlaceholder,
  },
];

// Main App component
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [booking, setBooking] = useState(null);
  const [ticketVisible, setTicketVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useResponsive(); // isDesktop not directly used in App's JSX, but available.

  useEffect(() => {
    if (!menuOpen) return;
    const onEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [menuOpen]);

  // Filter events by search query (case insensitive, search title and description and location)
  const filteredEvents = sampleEvents.filter(
    (ev) =>
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleBook = (event) => {
    setSelectedEvent(event);
  };

  const handleBookingCancel = () => {
    setSelectedEvent(null);
  };

  const handleBookingConfirm = (bookingData) => {
    setBooking(bookingData);
    setSelectedEvent(null);
    setTicketVisible(true);
  };

  const handleTicketClose = () => {
    setBooking(null);
    setTicketVisible(false);
  };

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenMenu={() => setMenuOpen(!menuOpen)}
        isMenuOpen={menuOpen}
        onStartBooking={() => setSelectedEvent(null)}
      />
      <div
        className={`app-layout ${
          isMobile ? "mobile" : isTablet ? "tablet" : "desktop"
        }`}
      >
        {menuOpen && isMobile && (
          <nav className="mobile-menu" aria-label="Mobile main menu">
            <ul>
              <li>
                <button
                  onClick={() => {
                    setSelectedEvent(null);
                    setMenuOpen(false);
                  }}
                >
                  Browse Events
                </button>
              </li>
              {/* Additional menu items can go here */}
            </ul>
          </nav>
        )}
        <main className="main-content" id="main-content" tabIndex={-1}>
          <h1 className="page-title">Upcoming Events</h1>
          {filteredEvents.length === 0 ? (
            <p className="no-results">No events found matching your search.</p>
          ) : (
            <section className="events-grid" aria-live="polite">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} onBook={handleBook} />
              ))}
            </section>
          )}
        </main>
      </div>
      {selectedEvent && (
        <BookingPanel
          event={selectedEvent}
          onCancel={handleBookingCancel}
          onConfirm={handleBookingConfirm}
        />
      )}
      {ticketVisible && booking && (
        <TicketDisplay booking={booking} onClose={handleTicketClose} />
      )}
    </>
  );
};

export default App;
