import { Users } from 'react-feather';
import './BookTicketsPanel.css';

const BookTicketsPanel = ({ event, onBookClick }) => (
    <div className="page-card">
      <h3>Secure Your Spot!</h3>
      
      <div className="detail-item">
        <span><Users size={20} /> Availability: </span>
        <span>{event.seats} Seats Left</span>
      </div>

      <button className="page-button" onClick={onBookClick}>
        Book Tickets Now
      </button>
    </div>
);
export default BookTicketsPanel;