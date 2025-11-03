import React, { useState, useEffect } from 'react';
import { updateBooking, getBookingById } from './BookingService';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateBookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({ selectedSeats: '', userName: '', eventId: '' });

  useEffect(() => {
    getBookingById(id)
      .then(response => setBooking(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBooking(id, booking)
      .then(() => {
        alert('Booking updated!');
        navigate('/');
      })
      .catch(error => {
        alert('Update failed!');
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Booking</h2>
      <input type="number" name="selectedSeats" value={booking.selectedSeats} onChange={handleChange} />
      <input type="text" name="userName" value={booking.userName} onChange={handleChange} />
      <input type="number" name="eventId" value={booking.eventId} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateBookingForm;