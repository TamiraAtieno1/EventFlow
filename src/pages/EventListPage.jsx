// src/pages/EventListPage.jsx
import React, { useState } from 'react';
import EventCard from '../assets/components/EventCard';
import SearchBar from '../assets/components/SearchBar';
import BookingPanel from '../assets/components/BookingPanel';


const EventListPage = ({ events, isLoading, error, searchQuery, setSearchQuery }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleBook = (event) => {
    setSelectedEvent(event); // Show booking panel
  };

  const handleCancelBooking = () => {
    setSelectedEvent(null); // Close modal
  };

  const handleConfirmBooking = (bookingData) => {
    console.log('Booking Confirmed:', bookingData);
    setTimeout(() => {
      setSelectedEvent(null); // Close modal after confirmation
    }, 300); // short delay for UX smoothness
  };

  return (
    <main className="main-content">
      <h1 className="event-heading">Upcoming Events</h1>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {isLoading ? (
        <p className="loading-message">Loading events...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : events.length === 0 ? (
        <p className="no-results">No events found matching your search criteria.</p>
      ) : (
        <section className="event-grid" aria-live="polite">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onBook={handleBook} />
          ))}
        </section>
      )}

      {/* Conditionally show booking popup */}
      {selectedEvent && (
        <div className="booking-overlay">
          <BookingPanel
            event={selectedEvent}
            onCancel={handleCancelBooking}
            onConfirm={handleConfirmBooking}
          />
        </div>
      )}
    </main>
  );
};

export default EventListPage;
