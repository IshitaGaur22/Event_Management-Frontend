import React, { useState, useEffect } from 'react';
import styles from './FeedbackAdmin.module.css';
import GetTopEvents from './TopEvents';
import FeedbackFilter from './FeedbackFilter';
import SummaryModal from './SummaryModal';
import { useAuth } from '../AuthContext';
import api from '../Login/Api';
import { toast } from 'react-toastify';

function FeedbackAdmin({onShowForm}) {
    const{role}=useAuth();
    const [topEvents, setTopEvents] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
    
    const showErrorMessage = (err) => {
        let errorMessage = "An unknown error occurred."; // Default message
        if (err.response && err.response.data) {
            if (typeof err.response.data === 'string') {
                // If the server sends a plain string 
                errorMessage = err.response.data;
            } else if (err.response.data.message) {
                // If the server sends an object 
                errorMessage = err.response.data.message;
            } else if (err.response.data.title) {
                // If it's a standard .NET validation error object
                errorMessage = err.response.data.title;
            }
        } else if (err.message) {
            // Network Error or other request setup errors
            errorMessage = err.message;
        }
        toast.error(`Error: ${errorMessage}`);
    };

    const loadFeedbacks = (filterParams = {}) => {
        setIsLoading(true);
        api.get(`/Feedbacks/FilterFeedbacks`, { params: filterParams })
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
        api.get(`/Feedbacks/TopRatedEvents`)
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

    // Archive
    const handleArchive = (id) => {
        if (!toast.confirm('Are you sure you want to archive this feedback?')) {
            return;
        }
        
        api.put(`/Feedbacks/ArchiveFeedback/${id}`)
            .then(() => {
                toast.success('Feedback archived!');
                loadFeedbacks(getCurrentParams()); // Refresh the list
            })
            .catch(err => {
                showErrorMessage(err);
            });
    };
    
    
    // Update-Reply
    const handleReply = (id) => {
        const replyText = prompt('Enter your reply:');
        if (!replyText || replyText.trim() === '') {
            return;
        }

        api.post(`/Feedbacks/ReplyToFeedback/${id}`, { replyText })
            .then(() => {
                toast.success('Reply submitted!');
                loadFeedbacks(getCurrentParams()); // Refresh the list
            })
            .catch(err => {
                showErrorMessage(err);
            });
    };
    const handleEventClick = (eventId, eventName) => {
        api.get(`/Feedbacks/GetFeedbackSummary/${eventId}`)
            .then(response => {
                
                const data = { ...response.data, eventName: eventName };
                
                setSummaryData(data);
                setIsModalOpen(true);
            })
            .catch(err => {
                showErrorMessage(err);
            });
    };
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.adminContainer}>
            {role === 'User' && (
            <button className={styles.backButton} onClick={onShowForm}>
                ← Back to Submit Feedback
            </button>
            )}
            <h2>Feedbacks</h2>
                <button 
                    className={styles.linkButton} 
                    onClick={() => setShowTopEvents(!showTopEvents)}
                >
                    {showTopEvents ? 'Hide Top Rated Events' : 'Show Top Rated Events'}
                </button>
            
            {showTopEvents && <GetTopEvents topEvents={topEvents} />}
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
            <div className={styles.tableWrapper}>
            <table className={styles.feedbackTable}>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>User</th>
                        <th>Overall Rating</th>
                        <th>Content</th>
                        <th>Venue</th>
                        <th>Organization</th>
                        <th>Value for Money</th>
                        <th>Comment</th>
                        <th>Submitted At</th>
                        <th>Reply</th>
                        {role === 'Organiser' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((fb) => {
                        const content = (fb.contentQuality ?? fb.ContentQuality ?? 0);
                        const venue = (fb.venueFacilities ?? fb.VenueFacilities ?? 0);
                        const org = (fb.eventOrganization ?? fb.EventOrganization ?? 0);
                        const value = (fb.valueForMoney ?? fb.ValueForMoney ?? 0);
                        return (
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
                                <td>{content} / 5</td>
                                <td>{venue} / 5</td>
                                <td>{org} / 5</td>
                                <td>{value} / 5</td>
                                <td className={styles.commentCell}>{fb.comments}</td>
                                <td data-label="Submitted">{formatDate(fb.submittedAt)}</td>
                                <td>{fb.reply || 'N/A'}</td>
                                {role === 'Organiser' && (
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
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
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