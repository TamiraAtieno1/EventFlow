import React, { useEffect, useState } from 'react';
import BookedEventCard from '../assets/components/BookedEventCard';


const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(stored);
  }, []);

  return (
    <main className="bookings-page">
      <h1>Your Booked Events</h1>
      {bookings.length === 0 ? (
        <p className="no-bookings">You haven't booked any events yet.</p>
      ) : (
        <div className="booked-events-grid">
          {bookings.map((booking) => (
            <BookedEventCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </main>
  );
};

export default BookingsPage;
