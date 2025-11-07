import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event.eventId}`, { state: { eventId: event.eventId } });
  };

  return (
    <div className="event-card" onClick={handleClick}>
      <img
        src={event.imageUrl || '/default-event.jpg'} // fallback image
        alt={event.name}
        className="event-image"
      />
      <h3 className="event-name">{event.name}</h3>
    </div>
  );
};

export default EventCard;