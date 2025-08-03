import React from 'react';
import moment from 'moment';

const BookedEventCard = ({ booking }) => {
  const { title, date, time, location, tickets, price, imageUrl } = booking;

  const totalCost = (Number(price) * tickets).toFixed(2);
  const displayDate = moment(date).format('MMMM Do, YYYY');
  const displayTime = moment(time, 'HH:mm').format('h:mm A');

  return (
    <div className="booked-card">
      <img
        src={imageUrl || 'https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image'}
        alt={title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image';
        }}
      />
      <div className="card-details">
        <h3>{title}</h3>
        <p><strong>Date:</strong> {displayDate}</p>
        <p><strong>Time:</strong> {displayTime}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Tickets:</strong> {tickets}</p>
        <p><strong>Total:</strong> ${totalCost}</p>
      </div>
    </div>
  );
};

export default BookedEventCard;
