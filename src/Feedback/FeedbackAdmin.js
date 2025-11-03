import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FeedbackAdmin.module.css';
import GetTopEvents from './TopEvents';
import FeedbackFilter from './FeedbackFilter';
import SummaryModal from './Summary';

const API_URL = 'https://localhost:7283/api/Feedbacks';

function FeedbackAdmin({onShowForm}) {
    const [topEvents, setTopEvents] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- LIFTED STATE: Filter state now lives here ---
    const [filterEventName, setFilterEventName] = useState("");
    const [filterMinRating, setFilterMinRating] = useState("");
    const [filterSearch, setFilterSearch] = useState("");
    const [sortBy, setSortBy] = useState("SubmittedAt");
    const [sortOrder, setSortOrder] = useState("descending");

    const [summaryData, setSummaryData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showTopEvents, setShowTopEvents] = useState(false);

    const getCurrentParams = () => ({
        eventName: filterEventName || null,
        minRating: filterMinRating || null,
        search: filterSearch || null,
        sortBy: sortBy,
        sortOrder: sortOrder
    });
    // --- Helper function to show a smart error message ---
    const showErrorMessage = (err) => {
        let errorMessage = "An unknown error occurred."; // Default message

        if (err.response && err.response.data) {
            if (typeof err.response.data === 'string') {
                // If the server sends a plain string (like from NotFoundObjectResult)
                errorMessage = err.response.data;
            } else if (err.response.data.message) {
                // If the server sends an object like { message: "..." }
                errorMessage = err.response.data.message;
            } else if (err.response.data.title) {
                // If it's a standard .NET validation error object
                errorMessage = err.response.data.title;
            }
        } else if (err.message) {
            // Fallback for "Network Error" or other request setup errors
            errorMessage = err.message;
        }
        alert(`Error: ${errorMessage}`);
    };

    // --- Data Fetching ---
    const loadFeedbacks = (filterParams = {}) => {
        setIsLoading(true);
        axios.get(`${API_URL}/FilterFeedbacks`, { params: filterParams })
            .then(response => {
                setFeedbacks(response.data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setFeedbacks([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const loadTopEvents = () => {
        axios.get(`${API_URL}/TopRatedEvents`)
            .then(response => {
                setTopEvents(response.data);
            })
            .catch(err => {
                console.error("Could not load top events:", err);
            });
    };

    
    useEffect(() => {
        loadFeedbacks();
        loadTopEvents();
    }, []);

    // --- CRUD & Filter Event Handlers ---
    
    const handleFilterSubmit = () => {
        const params = getCurrentParams();
        loadFeedbacks(params);
    };

    const handleClearFilters = () => {
        setFilterEventName("");
        setFilterMinRating("");
        setFilterSearch("");
        setSortBy("SubmittedAt");
        setSortOrder("descending");
        loadFeedbacks({});
    };
    // --- CRUD Event Handlers ---

    // U (Update) - Archive
    const handleArchive = (id) => {
        if (!window.confirm('Are you sure you want to archive this feedback?')) {
            return;
        }
        
        axios.put(`${API_URL}/ArchiveFeedback/${id}`)
            .then(() => {
                alert('Feedback archived!');
                loadFeedbacks(getCurrentParams()); // Refresh the list
            })
            .catch(err => {
                // Use the helper function to show the error
                showErrorMessage(err);
            });
    };
    
    
    // U (Update) - Reply
    const handleReply = (id) => {
        const replyText = prompt('Enter your reply:');
        if (!replyText || replyText.trim() === '') {
            return;
        }

        axios.post(`${API_URL}/ReplyToFeedback/${id}`, { replyText })
            .then(() => {
                alert('Reply submitted!');
                loadFeedbacks(getCurrentParams()); // Refresh the list
            })
            .catch(err => {
                // Use the helper function here too
                showErrorMessage(err);
            });
    };
    const handleEventClick = (eventId, eventName) => {
        axios.get(`${API_URL}/GetFeedbackSummary/${eventId}`)
            .then(response => {
                
                const data = { ...response.data, eventName: eventName };
                
                setSummaryData(data);
                setIsModalOpen(true);
            })
            .catch(err => {
                showErrorMessage(err);
            });
    };
    // --- Render Logic (No changes needed below) ---
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.adminContainer}>
            <button className={styles.backButton} onClick={onShowForm}>
                ← Back to Submit Feedback
            </button>
            <h2>Feedbacks</h2>
                {/* 2. Add the toggle link/button */}
                <button 
                    className={styles.linkButton} 
                    onClick={() => setShowTopEvents(!showTopEvents)}
                >
                    {showTopEvents ? 'Hide Top Rated Events' : 'Show Top Rated Events'}
                </button>
            
            {showTopEvents && <GetTopEvents topEvents={topEvents} />}
            {/* 2. Render the Filter component */}
            <div className={styles.filterContainer}>
            <FeedbackFilter
                filterEventName={filterEventName}
                filterMinRating={filterMinRating}
                filterSearch={filterSearch}
                sortBy={sortBy}
                sortOrder={sortOrder}
                
                setFilterEventName={setFilterEventName}
                setFilterMinRating={setFilterMinRating}
                setFilterSearch={setFilterSearch}
                setSortBy={setSortBy}
                setSortOrder={setSortOrder}

                onFilterSubmit={handleFilterSubmit}
                onClearFilters={handleClearFilters}
            />
            </div>
            <table className={styles.feedbackTable}>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>User</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Submitted At</th>
                        <th>Reply</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((fb) => (
                        <tr key={fb.feedbackId}>
                            <td data-label="Event">
                                
                                <button 
                                    className={styles.eventlink} 
                                    onClick={() => handleEventClick(fb.eventId, fb.eventName)}
                                >
                                    {fb.eventName || 'N/A'}
                                </button>
                            </td>
                            <td>{fb.userName || 'N/A'}</td>
                            <td>{fb.rating} / 5</td>
                            <td className={styles.commentCell}>{fb.comments}</td>
                            <td data-label="Submitted">{formatDate(fb.submittedAt)}</td>
                            <td>{fb.reply || 'N/A'}</td>
                            <td className={styles.actionsCell}>
                                <button onClick={() => handleReply(fb.feedbackId)} disabled={fb.reply}>
                                    Reply
                                </button>
                                
                                <button 
                                    onClick={() => handleArchive(fb.feedbackId)} 
                                    className={styles.archiveButton}
                                >
                                    Archive
                                </button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <SummaryModal 
                    data={summaryData} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    );
}
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
};
export default FeedbackAdmin;