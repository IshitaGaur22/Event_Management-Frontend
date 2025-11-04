import React from 'react';
import styles from './FeedbackAdmin.module.css'; 

function GetTopEvents({ topEvents }) {
    return (
        <div className={styles.statsContainer}>
            <h3>Top Rated Events</h3>
            {topEvents.length > 0 ? (
                <ul>
                    {topEvents.map(event => (
                        <li key={event.eventName}>
                            <strong>{event.eventName}</strong> :
                            {event.averageRating} stars
                            ({event.feedbackCount} ratings)
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events have 2 or more ratings yet.</p>
            )}
        </div>
    );
}

export default GetTopEvents;