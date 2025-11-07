import { Users } from 'react-feather';

const BookTicketsPanel = ({ event, onBookClick }) => (
    <div className="page-card" style={{ padding: '1.5rem', position: 'sticky', top: '90px' }}>
      <h3 style={{ color: 'var(--simba-brown-dark)', fontSize: '1.25rem', marginBottom: '1rem' }}>
        Secure Your Spot
      </h3>
      
      <div className="detail-item" style={{justifyContent: 'space-between', marginBottom: '1rem'}}>
        <span style={{color: 'var(--simba-text-medium)'}}><Users size={20} style={{verticalAlign: 'middle', marginRight: '0.5rem'}} /> Availability: </span>
        <span style={{color: event.seats > 50 ? 'green' : 'var(--simba-orange-dark)', fontWeight: 700}}>
          {event.seats} Seats Left
        </span>
      </div>
      
      {/* <div className="detail-item" style={{justifyContent: 'space-between', marginBottom: '2rem'}}>
        <span style={{color: 'var(--simba-text-dark)', fontWeight: 600}}>Organizer: </span>
        <span style={{color: 'var(--simba-text-medium)'}}>{event.organizer}</span>
      </div> */}
  
      <button
        onClick={onBookClick}
        style={{
          width: '100%',
          padding: '1rem',
          backgroundColor: 'var(--simba-orange-dark)',
          color: 'var(--simba-white)',
          fontWeight: 600,
          fontSize: '1.1rem',
          borderRadius: 'var(--simba-radius-soft)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.2s ease',
        }}
      >
        Book Tickets Now
      </button>
    </div>
);
export default BookTicketsPanel;