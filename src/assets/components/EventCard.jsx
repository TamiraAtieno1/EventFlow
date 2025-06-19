// src/components/EventCard.jsx

import React from "react";
import { formatDate } from "../utils/formatDate.jsx"; // Corrected path

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
 * @typedef {object} EventCardProps
 * @property {Event} event
 * @property {(event: Event) => void} onBook
 */

/**
 * EventCard component displays details of a single event and provides a booking option.
 * @param {EventCardProps} props
 * @returns {JSX.Element}
 */
const EventCard = ({ event, onBook }) => {
  const isPast = new Date(event.date) < new Date();

  return (
    <article
      className="event-card"
      tabIndex={0}
      aria-label={`Event titled ${event.title} at ${
        event.location
      } on ${formatDate(event.date)}`}
    >
      <img
        src={event.imageUrl}
        alt={`Image for event titled ${event.title}`}
        loading="lazy"
        className="event-image"
      />
      <div className="event-content">
        <h2 className="event-title">{event.title}</h2>
        <p
          className="event-date"
          aria-label={`Event date ${formatDate(event.date)}`}
        >
          {formatDate(event.date)}
        </p>
        <p className="event-location">{event.location}</p>
        <p className="event-description">{event.description}</p>
        <p className="event-price" aria-label={`Ticket price $${event.price}`}>
          ${event.price.toFixed(2)}
        </p>
        <button
          onClick={() => onBook(event)}
          disabled={isPast}
          aria-disabled={isPast}
          className="btn-book"
          aria-label={
            isPast
              ? "Event is past, booking disabled"
              : "Book tickets for this event"
          }
        >
          {isPast ? "Event Ended" : "Book Now"}
        </button>
      </div>
      <style>{`
        .event-card {
          background: #fff;
          border-radius: 0.75rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          outline-offset: 2px;
        }
        .event-card:focus-within,
        .event-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .event-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
        }
        .event-content {
          padding: 1rem 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-grow: 1;
        }
        .event-title {
          font-weight: 700;
          font-size: 1.25rem;
          color: #111827;
          margin: 0;
          line-height: 1.2;
        }
        .event-date, .event-location {
          font-size: 0.9rem;
          color: #6b7280;
        }
        .event-description {
          flex-grow: 1;
          font-size: 0.95rem;
          color: #4b5563;
          margin-bottom: 0.75rem;
        }
        .event-price {
          font-weight: 600;
          font-size: 1rem;
          color: #2563eb;
        }
        .btn-book {
          padding: 0.5rem 1rem;
          background-color: #2563eb;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.25s ease;
          align-self: flex-start;
        }
        .btn-book:hover:not(:disabled),
        .btn-book:focus-visible:not(:disabled) {
          background-color: #1e40af;
          outline: none;
        }
        .btn-book:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </article>
  );
};

export default EventCard;