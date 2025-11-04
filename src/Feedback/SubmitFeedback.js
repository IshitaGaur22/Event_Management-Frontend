import React, { useState } from 'react';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating'; 
import styles from './FeedbackForm.module.css'; 
import api from '../Login/Api';

function SubmitFeedback({onViewPrevious}) {
    // State for all form fields
    const [eventId, setEventId] = useState("");
    const [userId, setUserId] = useState("");
    const [overallExperience, setOverallExperience] = useState(0);
    const [contentQuality, setContentQuality] = useState(0);
    const [venueFacilities, setVenueFacilities] = useState(0);
    const [eventOrganization, setEventOrganization] = useState(0);
    const [valueForMoney, setValueForMoney] = useState(0);
    const [comments, setComments] = useState("");

    const handleRating = (rate, setter) => {
        setter(rate);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!eventId) {
            alert('Please enter an Event ID.');
            return;
        }
        if (!userId) {
            alert('Please enter a User ID.');
            return;
        }
        if (overallExperience === 0) {
            alert('Please provide an "Overall Experience" rating.');
            return;
        }
        if (contentQuality === 0) {
            alert('Please provide a "Content Quality" rating.');
            return;
        }
        if (venueFacilities === 0) {
            alert('Please provide a "Venue & Facilities" rating.');
            return;
        }
        if (eventOrganization === 0) {
            alert('Please provide an "Event Organization" rating.');
            return;
        }
        if (valueForMoney === 0) {
            alert('Please provide a "Value for Money" rating.');
            return;
        }
        if (comments.length < 2) {
            alert('Please provide a comment of at least 2 characters.');
            return;
        }
        const feedbackData = {
            EventId: parseInt(eventId, 10),
            UserId: parseInt(userId, 10),
            Rating: overallExperience,
            ContentQuality: contentQuality,
            VenueFacilities: venueFacilities,
            EventOrganization: eventOrganization,
            ValueForMoney: valueForMoney,
            Comments: comments
        };

        // API Call
        api.post('/Feedbacks/SubmitFeedback', feedbackData)
            .then(response => {
                alert('Thank you! Your feedback has been submitted.');
                setEventId("");
                setUserId("");
                setOverallExperience(0);
                setContentQuality(0);
                setVenueFacilities(0);
                setEventOrganization(0);
                setValueForMoney(0);
                setComments("");
            })
            .catch(err => {
            // --- START: UPDATED ERROR HANDLING ---
                let errorMessage = "An error occurred.";

                if (err.response && err.response.data && err.response.data.errors) {
                    // This will find the *first* specific validation error
                    // e.g., "The Rating field must be between 1 and 5."
                    // or "The Comments field must be a string with a minimum length of 10."
                    
                    const errors = err.response.data.errors;
                    const errorKey = Object.keys(errors)[0]; // Get the first field name (e.g., "Rating")
                    errorMessage = errors[errorKey][0];     // Get the first error message for that field
                
                } else if (err.response && err.response.data && err.response.data.title) {
                    // Fallback for the generic message
                    errorMessage = err.response.data.title;
                }

                alert(`Error: ${errorMessage}`);
                // --- END: UPDATED ERROR HANDLING ---
            });
        };

    return (
        <div className={styles.container}>
            <h2>Event Feedback</h2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label>Event ID:</label>
                    <input
                        type="number"
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                        className={styles.inputField}
                        placeholder="Enter Event ID"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>User ID:</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className={styles.inputField}
                        placeholder="Enter User ID"
                    />
                </div>
                <label className={styles.heading}>Overall Experience</label>
                <div className={styles.starRating}>
                    <Rating
                        onClick={(rate) => handleRating(rate, setOverallExperience)}
                        initialValue={overallExperience}
                        size={40}
                    />
                </div>

                <label className={styles.heading}>Rate Specific Aspects</label>
                <div className={styles.ratingGrid}> 
                    <div className={styles.ratingGridRow}>
                        <label>Content Quality</label>
                        <Rating onClick={(rate) => handleRating(rate, setContentQuality)} initialValue={contentQuality} size={23} />
                    </div>
                    <div className={styles.ratingGridRow}>
                        <label>Venue & Facilities</label>
                        <Rating onClick={(rate) => handleRating(rate, setVenueFacilities)} initialValue={venueFacilities} size={23} />
                    </div>
                    <div className={styles.ratingGridRow}>
                        <label>Event Organization</label>
                        <Rating onClick={(rate) => handleRating(rate, setEventOrganization)} initialValue={eventOrganization} size={23} />
                    </div>
                    <div className={styles.ratingGridRow}>
                        <label>Value for Money</label>
                        <Rating onClick={(rate) => handleRating(rate, setValueForMoney)} initialValue={valueForMoney} size={23} />
                    </div>
                </div>

                <label className={styles.heading}>Additional Comments</label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className={styles.textarea}
                    placeholder="Enter Comment"
                />

                <button type="button" className={styles.secondaryButton} onClick={onViewPrevious}>
                    View Previous Feedbacks
                </button>
                
                <button type="submit" className={styles.primaryButton}>
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}

export default SubmitFeedback;