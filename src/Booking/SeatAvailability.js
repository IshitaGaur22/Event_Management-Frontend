import React, { useState } from 'react';
import { checkSeatAvailability } from './BookingService';

function SeatAvailability() {
  const [eventId, setEventId] = useState('');
  const [requestedSeats, setRequestedSeats] = useState('');
  const [available, setAvailable] = useState(null);

  const handleCheck = () => {
    checkSeatAvailability(eventId, requestedSeats)
      .then(response => setAvailable(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Check Seat Availability</h2>
      <input type="number" placeholder="Event ID" value={eventId} onChange={(e) => setEventId(e.target.value)} />
      <input type="number" placeholder="Requested Seats" value={requestedSeats} onChange={(e) => setRequestedSeats(e.target.value)} />
      <button onClick={handleCheck}>Check</button>
      {available !== null && <p>{available ? 'Seats Available' : 'Not Available'}</p>}
    </div>
  );
}

export default SeatAvailability;