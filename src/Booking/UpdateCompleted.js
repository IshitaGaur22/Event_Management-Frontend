import React from 'react';
import { updateCompletedBookings } from './BookingService';

function UpdateCompleted() {
  const handleUpdate = () => {
    updateCompletedBookings()
      .then(response => alert(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Mark Completed Bookings</h2>
      <button onClick={handleUpdate}>Update Completed</button>
    </div>
  );
}

export default UpdateCompleted;