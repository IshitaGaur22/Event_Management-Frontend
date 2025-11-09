import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString ? timeString.slice(0, 5) : '';
  };

  return (
    <div className="event-card" onClick={() => navigate(`/event/${event.eventID}`)}>
      <img
        src={event.imagePath || '/default-event.jpg'}
        alt={event.eventName}
        className="event-image"
      />
      <div className="event-datetime">
        {formatDate(event.eventDate)} • {formatTime(event.eventTime)}
      </div>
      <h3 className="event-name">{event.eventName}</h3>
      <div className="event-location">{event.location}</div>
      <div className="event-price">₹{event.pricePerTicket}</div>
    </div>
  );
};

export default EventCard;