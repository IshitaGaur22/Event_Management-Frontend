import React from 'react';
import { Info } from 'react-feather';

const EventDescriptionCard = ({ description }) => (
    <div className="event-card-detail">
      <h2 style={{ color: 'var(--simba-orange-dark)', fontSize: '1.5rem', marginBottom: '1rem' }}>
        <Info size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> About the Event
      </h2>
      <p style={{ color: 'var(--simba-text-medium)' }}>{description}</p>
    </div>
  );

    export default EventDescriptionCard;