// src/components/BookingPanel.jsx

import React, { useState, useEffect, useRef } from "react";
import { generateBookingId } from "../utils/generateBookingId.jsx"; // Corrected path

/**
 * @typedef {object} Event
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} date - ISO string
 * @property {string} location
 * @property {number} price - In USD
 * @property {string} imageUrl
 */

/**
 * @typedef {object} Booking
 * @property {string} eventId
 * @property {string} userName
 * @property {string} userEmail
 * @property {number} tickets
 * @property {string} bookingId
 * @property {Event} event
 */

/**
 * @typedef {object} BookingPanelProps
 * @property {Event | null} event
 * @property {() => void} onCancel
 * @property {(booking: Booking) => void} onConfirm
 */

/**
 * BookingPanel component allows users to book tickets for an event.
 * @param {BookingPanelProps} props
 * @returns {JSX.Element|null}
 */
const BookingPanel = ({ event, onCancel, onConfirm }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [tickets, setTickets] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const initialFocusRef = useRef(null);

  useEffect(() => {
    setUserName("");
    setUserEmail("");
    setTickets(1);
    setFormErrors({});
    // Focus first input on open
    setTimeout(() => initialFocusRef.current?.focus(), 100);
  }, [event]);

  if (!event) return null;

  const validateForm = () => {
    /** @type {{ name?: string; email?: string; tickets?: string; }} */
    const errors = {};
    if (!userName.trim()) errors.name = "Name is required";
    if (!userEmail.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(userEmail)) errors.email = "Email is invalid";
    if (tickets < 1 || tickets > 10)
      errors.tickets = "Tickets must be between 1 and 10";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const bookingId = generateBookingId();
    onConfirm({
      bookingId,
      eventId: event.id,
      event,
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      tickets,
    });
  };

  return (
    <div
      className="booking-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookingTitle"
    >
      <div className="booking-panel" tabIndex={-1}>
        <h2 id="bookingTitle">Book Tickets for {event.title}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="userName">Full Name</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            aria-invalid={!!formErrors.name}
            aria-describedby={formErrors.name ? "nameError" : undefined}
            ref={initialFocusRef}
          />
          {formErrors.name && (
            <p className="error" id="nameError">
              {formErrors.name}
            </p>
          )}

          <label htmlFor="userEmail">Email Address</label>
          <input
            id="userEmail"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? "emailError" : undefined}
          />
          {formErrors.email && (
            <p className="error" id="emailError">
              {formErrors.email}
            </p>
          )}

          <label htmlFor="tickets">Number of Tickets</label>
          <input
            id="tickets"
            type="number"
            min={1}
            max={10}
            value={tickets}
            onChange={(e) =>
              setTickets(Math.min(10, Math.max(1, Number(e.target.value))))
            }
            aria-invalid={!!formErrors.tickets}
            aria-describedby={formErrors.tickets ? "ticketsError" : undefined}
          />
          {formErrors.tickets && (
            <p className="error" id="ticketsError">
              {formErrors.tickets}
            </p>
          )}

          <p className="total-price" aria-live="polite" aria-atomic="true">
            Total Price:{" "}
            <strong>${(event.price * tickets).toFixed(2)}</strong>
          </p>

          <div className="buttons">
            <button type="submit" className="btn-confirm">
              Pay & Book
            </button>
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .booking-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          z-index: 1500;
        }
        .booking-panel {
          background: #fff;
          border-radius: 1rem;
          max-width: 400px;
          width: 100%;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          outline-offset: 4px;
          display: flex;
          flex-direction: column;
        }
        h2 {
          margin-top: 0;
          color: #111827;
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        label {
          font-weight: 600;
          color: #374151;
        }
        input {
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          color: #111827;
        }
        input:focus {
          outline: 2px solid #2563eb;
          border-color: #2563eb;
        }
        .error {
          color: #b91c1c;
          font-size: 0.875rem;
          margin: 0;
        }
        .total-price {
          font-size: 1.1rem;
          color: #111827;
          margin-top: 0.5rem;
          text-align: center;
        }
        .buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .btn-confirm {
          background-color: #2563eb;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 1.25rem;
          cursor: pointer;
          flex-grow: 1;
          transition: background-color 0.25s ease;
        }
        .btn-confirm:hover,
        .btn-confirm:focus-visible {
          background-color: #1e40af;
          outline: none;
        }
        .btn-cancel {
          background-color: #f3f4f6;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 1.25rem;
          cursor: pointer;
          flex-grow: 1;
          color: #374151;
          font-weight: 600;
          transition: background-color 0.25s ease;
        }
        .btn-cancel:hover,
        .btn-cancel:focus-visible {
          background-color: #e5e7eb;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default BookingPanel;