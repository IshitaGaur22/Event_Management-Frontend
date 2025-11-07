import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CategoryList from './CategoryList';
import EventCard from './EventCard'; // ✅ Import the new component

const UserDashboard = ({ userId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:7283/api/Events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Events fetch error:', err));
  }, []);

  const handleSearch = () => {
    axios.get(`http://localhost:7283/api/Events/search?query=${searchQuery}`)
      .then(res => setEvents(res.data))
      .catch(err => console.error('Search error:', err));
  };

  return (
    <div className="dashboard-container" style={{ padding: '1rem' }}>
      {/* Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search for events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid var(--simba-light-grey)'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: '0.5rem',
            background: 'var(--simba-orange-dark)',
            color: '#fff',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '6px'
          }}
        >
          <Search size={18} />
        </button>
      </div>

      {/* Categories */}
      <h3 style={{ marginBottom: '0.5rem', color: 'var(--simba-brown-dark)' }}>Explore Events</h3>
      <CategoryList />

      {/* All Events */}
      <h3 style={{ marginBottom: '0.5rem', marginTop: '1rem', color: 'var(--simba-brown-dark)' }}>All Events</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {['All', 'Today', 'Tomorrow', 'This Week'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.5rem 1rem',
              background: filter === f ? 'var(--simba-orange-dark)' : '#eee',
              color: filter === f ? '#fff' : '#333',
              border: 'none',
              borderRadius: '6px'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Event Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem'
      }}>
        {events
          .filter(ev => filter === 'All' || ev.dateFilter === filter)
          .map(event => (
            <EventCard key={event.eventId} event={event} />
          ))}
      </div>
    </div>
  );
};

export default UserDashboard;