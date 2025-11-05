import React, { useState } from 'react';
import { getBookingByName } from './BookingService';

function SearchByUsername() {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    getBookingByName(username)
      .then(response => setResults(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Search Bookings by Username</h2>
      <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map(r => <li key={r.bookingId}>{r.userName} - {r.selectedSeats} seats</li>)}
      </ul>
    </div>
  );
}

export default SearchByUsername;