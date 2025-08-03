// src/assets/components/BookingPanel.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


// Remove 'navigate' from props, as App.js will handle it
const BookingPanel = ({ event, onCancel, onConfirm, onClose }) => {
  const [numTickets, setNumTickets] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!name || !email || numTickets < 1) {
      alert('Please fill in all fields and select at least one ticket.');
      return;
    }

    setIsSubmitting(true);
    setBookingConfirmed(false); // Reset confirmation message on new attempt

    try {
      // Call the onConfirm prop. It handles the API call.
      // We expect it to return something upon success, even just 'true'.
      await onConfirm({ event, numTickets, name, email });

      // ✅ Store booking info in localStorage (if still needed, though App.js might do this too)
      const bookingData = {
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        tickets: numTickets,
        price: event.price,
        imageUrl: event.imageUrl,
        name,
        email,
      };

      const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      localStorage.setItem('bookings', JSON.stringify([...existingBookings, bookingData]));

      setBookingConfirmed(true); // Show the confirmation message in the panel

      // The panel will be closed and navigation handled by App.js after this function completes.
      // Do NOT put setTimeout or navigate here.
      // The parent (App.js) will react to the state changes caused by onConfirm.

    } catch (error) {
      console.error("Booking failed:", error);
      setIsSubmitting(false); // Stop submitting state on error
      alert('Failed to book ticket. Please try again.');
      // Do not set bookingConfirmed to true on error
    }
  };

  const totalCost = (event.price * numTickets).toFixed(2);

  return (
    <div className="booking-panel">
      <button onClick={onCancel} className="close-btn" aria-label="Close booking panel">
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <h2>{event.title}</h2>
      <p>{event.description}</p>

      {bookingConfirmed ? (
        <div className="confirmation-message">
          <p>🎉 Your ticket has been confirmed and booked!</p>
          <p>You will be redirected shortly...</p>
        </div>
      ) : (
        <form onSubmit={handleBooking}>
          <label htmlFor="numTickets">Number of Tickets</label>
          <input
            id="numTickets"
            type="number"
            min="1"
            value={numTickets}
            onChange={(e) => setNumTickets(parseInt(e.target.value) || 1)}
            required
          />

          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="total">
            Total: <span className="amount">${totalCost}</span>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingPanel;