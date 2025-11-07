import React from 'react';
import { Ticket, Calendar, IndianRupee } from 'lucide-react';

import SeatCounter from './SeatCounter';

const TicketDetailsCard = ({ booking, selectedSeats, maxSeats, setSelectedSeats }) => {
    const eventDateTime = `${booking.EventDate} at ${booking.Time}`;

    return (
        <div className="page-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--simba-orange-dark)', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--simba-light-grey)', paddingBottom: '0.5rem' }}>
                <Ticket size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Booking Details
            </h3>

            <div className="detail-item" style={{justifyContent: 'space-between'}}>
                <span className="detail-label"><Calendar size={16} className="detail-icon" /> Date & Time: </span>
                <span className="detail-value" style={{ width: 'auto' }}>{eventDateTime}</span>
            </div>
            
            <div className="detail-item" style={{justifyContent: 'space-between'}}>
                <span className="detail-label"><IndianRupee size={16} className="detail-icon" /> Price/Ticket: </span>
                <span className="detail-value" style={{ width: 'auto' }}>₹{booking.PricePerTicket.toFixed(2)}</span>
            </div>
            
            {/* 🛑 NEW: SEAT COUNTER */}
            <SeatCounter 
                count={selectedSeats} 
                setCount={setSelectedSeats} 
                maxSeats={maxSeats} 
            />
            {/* 🛑 END NEW */}
        </div>
    );
};
export default TicketDetailsCard;