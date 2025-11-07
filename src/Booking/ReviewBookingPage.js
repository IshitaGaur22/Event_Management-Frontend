import React, { useEffect, useState } from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';
import BookingSummaryHeader from '../components/Booking/BookingSummaryHeader';
import TicketDetailsCard from '../components/Booking/TicketDetailsCard';
import PaymentSummaryCard from '../components/Booking/PaymentSummaryCard';
import GetBookingDetails from './GetBookingDetails';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewBookingPage = () => {
    const navigate= useNavigate();
    const location = useLocation();
    const routeState = location.state;

    const eventId = routeState?.eventId;

    // State for the raw event data and seat selection
    const [eventDetails, setEventDetails] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // const FIXED_FEES = 15.00; // Mock fixed fee

    // Effect to fetch event details on load
    useEffect(() => {
        if (eventId) {
            setIsLoading(true);
            GetBookingDetails(eventId).then(data => {
                setEventDetails(data);
                // Initialize selected seats to 1 after data load
                setSelectedSeats(1); 
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [eventId]);

    // Effect to recalculate total amount when selectedSeats changes
    useEffect(() => {
        if (eventDetails) {
            const baseAmount = selectedSeats * eventDetails.PricePerTicket;
            // const newTotalAmount = baseAmount + FIXED_FEES;
            setTotalAmount(baseAmount);
        }
    }, [selectedSeats, eventDetails]);


    if (isLoading) {
        return <div className="page-content" style={{textAlign: 'center', padding: '5rem'}}>Loading booking summary...</div>;
    }
    
    if (!eventDetails) {
        return <div className="page-content" style={{textAlign: 'center', padding: '5rem'}}>
            <h2 style={{color: 'red'}}>Cannot retrieve event details.</h2>
            <button onClick={() => navigate('/')}>Go to Home</button>
        </div>;
    }
    
    // DTO fields from state
    const bookingSummary = {
        ...eventDetails,
        SelectedSeats: selectedSeats,
        TotalAmount: totalAmount, // Calculated value
    };


    const handleBack = () => navigate(`/event/${eventId}`);
    const handleShare = () => alert('Sharing booking details...');
    // const handlePaymentAdd = () => console.log('Final Payment Confirmation for:', totalAmount);
    const handlePaymentAdd = () => {
        navigate('/booking-confirmation', {
          state: {
            eventName: bookingSummary.EventName,
            performer: bookingSummary.Performer,
            tickets: bookingSummary.SelectedSeats,
            date: bookingSummary.Date,
            time: bookingSummary.Time,
            locationName: bookingSummary.Location,
            totalAmount: bookingSummary.TotalAmount
          }
        });
      };


    return (
        <div className="page-content">
            {/* Top Bar Navigation/Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button 
                    onClick={handleBack}
                    className="back-button"
                    style={{padding: 0}}
                >
                    <ArrowLeft size={20} className="back-button-icon" /> 
                    Back
                </button>
                <h1 style={{fontSize: '1.5rem', margin: 0}}>Review Booking</h1>
                <button 
                    onClick={handleShare}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--simba-text-medium)' }}
                >
                    <Share2 size={20} />
                </button>
            </div>
            
            <BookingSummaryHeader booking={bookingSummary} />

            <TicketDetailsCard 
                booking={bookingSummary}
                selectedSeats={selectedSeats}
                maxSeats={eventDetails.TotalSeats} // Use TotalSeats from fetched data
                setSelectedSeats={setSelectedSeats}
            />

            <PaymentSummaryCard 
                totalAmount={totalAmount} 
                onPaymentAdd={handlePaymentAdd} 
            />

        </div>
    );
};
export default ReviewBookingPage;