import React from 'react';
import { deleteBooking } from './BookingService';

function DeleteBooking({ id, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(id)
        .then(() => {
          alert('Booking deleted!');
          onDelete();
        })
        .catch(error => {
          alert('Delete failed!');
          console.error(error);
        });
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteBooking;