import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EventDetails.css';
import { useAuth } from '../AuthContext';

const EventDetails = () => {
  const{role}=useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!state?.eventName) {
        setError('No event name provided.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://localhost:7283/api/Events/by-name?eventName=${encodeURIComponent(state.eventName)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [state]);

  const formatTime = (timeStr) => {
    try {
      return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } catch {
      return timeStr;
    }
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>No event data available.</p>;

  const category = event.categoryName || 'event';
  const backgroundStyle = {
    backgroundImage: `url(https://source.unsplash.com/1600x900/?${encodeURIComponent(category)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: '20px',
    borderRadius: '12px',
    maxWidth: '800px',
    margin: '40px auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
    animation: 'fadeIn 1s ease-in'
  };

  return (
    <div style={backgroundStyle}>
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="event-title">{event.eventName}</h2>
      <img src={event.imagePath || 'https://via.placeholder.com/600x300'} alt={event.eventName} className="event-image" />
      <p className="event-description">{event.description}</p>
      <div className="event-info">
        <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        <p><strong>Time:</strong> {formatTime(event.eventTime)} - {formatTime(event.endTime)}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Total Seats:</strong> {event.totalSeats}</p>
        <p><strong>Price Per Ticket:</strong> ₹{event.pricePerTicket}</p>
      </div>
    </div>
  );
};

export default EventDetails;




// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './EventDetails.css';
// import { useAuth } from '../AuthContext';
 
// const EventDetails = () => {
//   const { role } = useAuth();
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 
//   useEffect(() => {
//     const fetchEvent = async () => {
//       if (!state?.eventName) {
//         setError('No event name provided.');
//         setLoading(false);
//         return;
//       }
 
//       try {
//         const response = await fetch(`https://localhost:7283/api/Events/by-name?eventName=${encodeURIComponent(state.eventName)}`);
//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch event details. Server response: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setEvent(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     fetchEvent();
//   }, [state]);
 
//   const formatTime = (timeStr) => {
//     try {
//       // Handles "HH:mm:ss" format returned by the backend
//       return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
//     } catch {
//       return timeStr;
//     }
//   };
 
//   // --- CORRECTED LOGIC: Ensures completion only after the event has started AND finished ---
//   const isEventCompleted = (event) => {
//     if (!event || !event.eventDate || !event.eventTime || !event.endTime) return false;
 
//     // 1. Calculate Event Start Time
//     const eventStartDateTime = new Date(`${event.eventDate}T${event.eventTime}`);
 
//     // 2. Calculate Event End Time (Adjusting for overnight)
//     let eventEndDateTime = new Date(`${event.eventDate}T${event.endTime}`);
 
//     // Check for overnight event: If the end time is chronologically before the start time, 
//     // it means the event ends on the NEXT day.
//     if (eventEndDateTime <= eventStartDateTime) {
//       // Advance the date of the end time by one day
//       eventEndDateTime.setDate(eventEndDateTime.getDate() + 1);
//     }
//     // 3. The event is completed if the current time (now) is strictly AFTER the calculated end date/time.
//     const now = new Date();
//     return now > eventEndDateTime;
//   };
 
//   // --- Rendering ---
 
//   if (loading) return <p>Loading event details...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!event) return <p>No event data available.</p>;
 
//   const completed = isEventCompleted(event); // Check completion status
//   const category = event.categoryName || 'event';
//   // Conditionally apply a style filter if the event is completed
//   const completionStyle = completed ? { filter: 'grayscale(70%) opacity(0.8)' } : {};
 
//   const backgroundStyle = {
//     backgroundImage: `url(https://source.unsplash.com/1600x900/?${encodeURIComponent(category)})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundColor: 'rgba(255,255,255,0.95)',
//     padding: '20px',
//     borderRadius: '12px',
//     maxWidth: '800px',
//     margin: '40px auto',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     fontFamily: 'Segoe UI, sans-serif',
//     animation: 'fadeIn 1s ease-in',
//     ...completionStyle // Merge completion style
//   };
 
//   // Calculate the end date/time instance for the note
//   let eventEndDateTimeInstance = new Date(`${event.eventDate}T${event.endTime}`);
//   if (eventEndDateTimeInstance <= new Date(`${event.eventDate}T${event.eventTime}`)) {
//       eventEndDateTimeInstance.setDate(eventEndDateTimeInstance.getDate() + 1);
//   }
 
//   return (
// <div style={backgroundStyle} className="event-details-container">
// <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
// <h2 className="event-title">{event.eventName}</h2>
//       {/* Display the COMPLETED badge */}
//       {completed && <div className="completed-badge">COMPLETED</div>}
// <img src={event.imagePath || 'https://via.placeholder.com/600x300'} alt={event.eventName} className="event-image" />
// <p className="event-description">{event.description}</p>
// <div className="event-info">
// <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
// <p><strong>Time:</strong> {formatTime(event.eventTime)} - {formatTime(event.endTime)}</p>
// <p className="note">
//             {/* Show a note if it's an overnight event */}
//             {eventEndDateTimeInstance.getDate() !== new Date(event.eventDate).getDate() && 
// <strong>(Note: Event ends on the following day)</strong>
//             }
// </p>
// <p><strong>Location:</strong> {event.location}</p>
// <p><strong>Total Seats:</strong> {event.totalSeats}</p>
// <p><strong>Price Per Ticket:</strong> ₹{event.pricePerTicket}</p>
// </div>
// </div>
//   );
// };
 
// export default EventDetails;