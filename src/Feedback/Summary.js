import React from 'react';
import styles from './SummaryModal.module.css'; 
import { Rating } from 'react-simple-star-rating'; 

function SummaryModal({ data, onClose }) {
    if (!data) return null;

    // Convert 0-5 rating to 0-100 for the star component
    const ratingValue = data.averageRating * 20;
    
    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                
                <h2>Summary for "{data.eventName}"</h2>
                
                <div className={styles.summaryItem}>
                    <strong>Total Submissions:</strong>
                    <span>{data.totalFeedback}</span>
                </div>
                
                <div className={styles.summaryItem}>
                    <strong>Average Rating:</strong>
                    <span>{data.averageRating.toFixed(2)} / 5</span>
                </div>

                <div className={styles.starRating}>
                    <Rating 
                        rating={ratingValue} 
                        readonly={true} 
                        size={30} 
                    />
                </div>
            </div>
        </div>
    );
}

export default SummaryModal;