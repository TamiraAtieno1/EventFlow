// src/assets/components/EventCard.jsx
import React from 'react';
import moment from 'moment';

const EventCard = ({ event, onBook }) => {
  const { title, description, date, time, location, price, image } = event;

  const displayDate = moment(date).format('MMMM Do, YYYY');
  const displayTime = moment(time, 'HH:mm:ss').format('h:mm A');
  const numericPrice = Number(price);
  const displayPrice = isNaN(numericPrice) || numericPrice <= 0 ? 'Free' : `$${numericPrice.toFixed(2)}`;

  return (
    <div className="event-card">
      <div className="event-image">
        <img
          src={image || 'https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image'}
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image';
          }}
        />
      </div>

      <div className="event-content">
        <h3>{title}</h3>
        <p className="event-description">{description}</p>

        <div className="event-details">
          <div><span>Date:</span> {displayDate}</div>
          <div><span>Time:</span> {displayTime}</div>
          <div><span>Location:</span> {location}</div>
          <div><span>Price:</span> {displayPrice}</div>
        </div>

        <button onClick={() => onBook(event)}>View Details</button>
      </div>
    </div>
  );
};

export default EventCard;
