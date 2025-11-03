import React, { useState } from 'react';
import { getTopBookedEvents } from './BookingService';

function TopEvents() {
  const [count, setCount] = useState('');
  const [events, setEvents] = useState([]);

  const handleFetch = () => {
    getTopBookedEvents(count)
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Top Booked Events</h2>
      <input type="number" placeholder="Number of events" value={count} onChange={(e) => setCount(e.target.value)} />
      <button onClick={handleFetch}>Fetch</button>
      <ul>
        {events.map(e => <li key={e.eventID}>{e.eventName} - {e.location}</li>)}
      </ul>
    </div>
  );
}

export default TopEvents;