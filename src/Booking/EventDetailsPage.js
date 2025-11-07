import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
// Assuming these imports are correct based on your file structure
import GetEventById from "./GetEventById"; 
import ImageCarousel from '../components/Booking/ImageCarousel';
import EventDetailsCard from '../components/Booking/EventDetailsCard';
import EventDescriptionCard from '../components/Booking/EventDescriptionCard';
import BookTicketsPanel from '../components/Booking/BookTicketsPanel';
import { useNavigate, useParams } from 'react-router-dom';

const EventDetailsPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (eventId) {
      setIsLoading(true);
      // Assuming GetEventById is your function that fetches and maps data
      GetEventById(eventId).then(data => {
        setEvent(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [eventId]);

  const handleBack = () => {
    navigate('/');
  };

  const handleBook = () => {
    // 🛑 CRITICAL CHECK: Ensure 'event' exists before accessing properties
    if (event) {
      navigate('/review-booking', { 
        state: { 
          eventId: eventId, 
          // Ensure the property names 'price' and 'name' match your mapped event object
          eventPrice: event.price, 
          eventName: event.name 
        }
      });
    } else {
      console.error("Attempted to book an event that is not loaded.");
      // Optional: Add an alert or message here
    }
  };

  if (isLoading) {
    return <div className="page-content" style={{textAlign: 'center', padding: '5rem'}}>
        <p style={{color: 'var(--simba-brown-dark)'}}>Loading event details...</p>
    </div>;
  }
  
  if (!event) {
    return <div className="page-content" style={{textAlign: 'center', padding: '5rem'}}>
        <h2 style={{color: 'red'}}>Event Not Found!</h2>
        <p>Please check the event ID or API connectivity.</p>
    </div>;
  }

  return (
    <div className="page-content">
      <h1 style={{color: 'var(--simba-brown-dark)'}}>Event Details</h1>
      {/* Assuming event.title is available from the mapped data */}
      <h2 style={{color: 'var(--simba-brown-dark)'}}>{event.name}</h2> 
      
      <button 
        onClick={handleBack}
        className="back-button"
      >
        <ArrowLeft size={20} className="back-button-icon" /> 
        Back to Listings
      </button>

      <div className="event-page-layout">
        <div>
          <ImageCarousel images={event.images} />
          <EventDetailsCard event={event} />
          <EventDescriptionCard description={event.description} />
        </div>
        <div>
          {/* BookTicketsPanel calls handleBook when its button is clicked */}
          <BookTicketsPanel event={event} onBookClick={handleBook} />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;