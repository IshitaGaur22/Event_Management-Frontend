import React from 'react';
import { MapPin } from 'lucide-react';


const BookingSummaryHeader = ({ booking }) => (
    // ... (same as before, using DTO properties: booking.EventName, booking.Location)
    <div className="flex p-4 border-b border-simba-light-grey">
        <div 
            style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: 'var(--radius-soft)',
                overflow: 'hidden',
                marginRight: '1rem',
                backgroundImage: `url(https://placehold.co/100x100/6C4234/FFFFFF?text=Media)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            aria-label="Event Media Preview"
        />

        <div style={{ flexGrow: 1 }}>
            <h2 style={{ color: 'var(--simba-brown-dark)', fontSize: '1.4rem', marginBottom: '0.25rem' }}>
                {booking.EventName}
            </h2>
            <p style={{ color: 'var(--simba-text-medium)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} style={{ color: 'var(--simba-orange-dark)' }} />
                {booking.Location}
            </p>
        </div>
    </div>
);
export default BookingSummaryHeader;