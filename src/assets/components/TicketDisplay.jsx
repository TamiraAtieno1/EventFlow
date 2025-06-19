// src/components/TicketDisplay.jsx

import React from "react";
import { formatDate } from "../utils/formatDate"; // Corrected path

const TicketDisplay = ({ booking, onClose }) => {
  // Simulate QR code with a styled div containing bookingId
  return (
    <div
      className="ticket-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticketTitle"
    >
      <div className="ticket-panel" tabIndex={-1}>
        <h2 id="ticketTitle">Your Ticket</h2>
        <div className="ticket-content">
          <p>
            <strong>Event:</strong> {booking.event.title}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(booking.event.date)}
          </p>
          <p>
            <strong>Location:</strong> {booking.event.location}
          </p>
          <p>
            <strong>Attendee:</strong> {booking.userName}
          </p>
          <p>
            <strong>Email:</strong> {booking.userEmail}
          </p>
          <p>
            <strong>Tickets:</strong> {booking.tickets}
          </p>
          <p>
            <strong>Booking ID:</strong> {booking.bookingId}
          </p>
          <div
            className="qr-code"
            aria-label="QR code representing your ticket booking ID"
          >
            <span>{booking.bookingId}</span>
          </div>
          <button
            onClick={onClose}
            className="btn-close"
            aria-label="Close ticket view"
          >
            Close
          </button>
        </div>
      </div>
      <style>{`
        .ticket-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          z-index: 1600;
        }
        .ticket-panel {
          background: #fff;
          border-radius: 1rem;
          max-width: 400px;
          width: 100%;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          outline-offset: 4px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
        h2 {
          margin: 0 0 1rem 0;
          color: #111827;
          font-weight: 700;
          font-size: 1.5rem;
        }
        .ticket-content p {
          margin: 0.25rem 0;
          color: #374151;
          font-weight: 600;
        }
        .qr-code {
          margin: 1rem auto;
          width: 160px;
          height: 160px;
          border: 4px solid #2563eb;
          border-radius: 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 900;
          font-size: 1.25rem;
          color: #2563eb;
          user-select: all;
          background: #e0e7ff;
          letter-spacing: 0.2rem;
        }
        .btn-close {
          background-color: #2563eb;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          margin-top: 1rem;
          transition: background-color 0.25s ease;
        }
        .btn-close:hover,
        .btn-close:focus-visible {
          background-color: #1e40af;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default TicketDisplay;
