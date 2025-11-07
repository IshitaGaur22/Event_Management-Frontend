import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Share2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import confetti from 'canvas-confetti';
import {jwtDecode} from 'jwt-decode';
import { bookTickets } from './BookingService';

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;

  const [isBookingDone, setIsBookingDone] = useState(false);

  // ✅ Function to get userId from JWT
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken'); // token stored after login
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.sub || decoded.userId; // adjust based on your JWT payload
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (bookingData) {
      const { eventId, selectedSeats } = bookingData;
      const userId = getUserIdFromToken();

      if (!userId) {
        toast.error('User not authenticated! Please log in.');
        // navigate('/login');
        return;
      }

      // ✅ Call booking API
      bookTickets(selectedSeats, userId, eventId)
        .then(() => {
          setIsBookingDone(true);
          toast.success('🎉 Your booking is confirmed!', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            theme: 'colored'
          });

          // ✅ Confetti animation
          const duration = 3 * 1000;
          const end = Date.now() + duration;
          (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
            if (Date.now() < end) requestAnimationFrame(frame);
          })();
        })
        .catch(error => {
          toast.error('Booking failed! Please try again.');
          console.error(error);
        });
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2 style={{ color: 'red' }}>No booking details found!</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const { eventName, performer, selectedSeats, date, time, locationName, totalAmount } = bookingData;

  const handleDownload = () => alert('Downloading booking confirmation...');
  const handleShare = () => alert('Sharing booking details...');

  return (
    <div className="page-content" style={{ maxWidth: '500px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
      <ToastContainer />
      <h1 style={{ textAlign: 'center', color: 'var(--simba-brown-dark)', marginBottom: '1rem' }}>BOOKING CONFIRMATION</h1>
      
      <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '0.5rem', color: 'var(--simba-orange-dark)' }}>{eventName}</h2>
        <p>{performer}</p>
        <p>No of Tickets: <strong>{selectedSeats}</strong></p>
        <p>Date: {date} &nbsp; Time: {time}</p>
        <p>Location: {locationName}</p>
        <p>Total Payment: <strong>{totalAmount}</strong></p>
        <p style={{ fontWeight: 'bold', color: isBookingDone ? 'green' : 'gray', marginTop: '1rem' }}>
          {isBookingDone ? 'YOUR BOOKING IS CONFIRMED!' : 'Processing your booking...'}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1.5rem' }}>
        <button onClick={handleDownload} style={{ padding: '0.8rem 1.2rem', backgroundColor: 'var(--simba-orange-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          <Download size={18} style={{ marginRight: '0.5rem' }} /> Download
        </button>
        <button onClick={handleShare} style={{ padding: '0.8rem 1.2rem', backgroundColor: 'var(--simba-brown-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          <Share2 size={18} style={{ marginRight: '0.5rem' }} /> Share
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;


// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Download, Share2 } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import confetti from 'canvas-confetti';

// const BookingConfirmationPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const bookingData = location.state;

//   useEffect(() => {
//     if (bookingData) {
//       // Show toast
//       toast.success('🎉 Your booking is confirmed!', {
//         position: 'top-center',
//         autoClose: 3000,
//         hideProgressBar: true,
//         theme: 'colored'
//       });

//       // Trigger confetti animation
//       const duration = 3 * 1000;
//       const end = Date.now() + duration;

//       (function frame() {
//         confetti({
//           particleCount: 5,
//           angle: 60,
//           spread: 55,
//           origin: { x: 0 }
//         });
//         confetti({
//           particleCount: 5,
//           angle: 120,
//           spread: 55,
//           origin: { x: 1 }
//         });

//         if (Date.now() < end) {
//           requestAnimationFrame(frame);
//         }
//       })();
//     }
//   }, [bookingData]);

//   if (!bookingData) {
//     return (
//       <div style={{ textAlign: 'center', padding: '2rem' }}>
//         <h2 style={{ color: 'red' }}>No booking details found!</h2>
//         <button onClick={() => navigate('/')}>Go to Home</button>
//       </div>
//     );
//   }

//   const {
//     eventName,
//     performer,
//     tickets,
//     date,
//     time,
//     locationName,
//     totalAmount
//   } = bookingData;

//   const handleDownload = () => alert('Downloading booking confirmation...');
//   const handleShare = () => alert('Sharing booking details...');

//   return (
//     <div className="page-content" style={{ maxWidth: '500px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
//       <ToastContainer />
//       <h1 style={{ textAlign: 'center', color: 'var(--simba-brown-dark)', marginBottom: '1rem' }}>BOOKING CONFIRMATION</h1>
      
//       <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
//         <h2 style={{ marginBottom: '0.5rem', color: 'var(--simba-orange-dark)' }}>{eventName}</h2>
//         <p>{performer}</p>
//         <p>No of Tickets: <strong>{tickets}</strong></p>
//         <p>Date: {date} &nbsp; Time: {time}</p>
//         <p>Location: {locationName}</p>
//         <p>Total Payment: <strong>{totalAmount}</strong></p>
//         <p style={{ fontWeight: 'bold', color: 'green', marginTop: '1rem' }}>YOUR BOOKING IS CONFIRMED!</p>
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1.5rem' }}>
//         <button onClick={handleDownload} style={{ padding: '0.8rem 1.2rem', backgroundColor: 'var(--simba-orange-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
//           <Download size={18} style={{ marginRight: '0.5rem' }} /> Download
//         </button>
//         <button onClick={handleShare} style={{ padding: '0.8rem 1.2rem', backgroundColor: 'var(--simba-brown-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
//           <Share2 size={18} style={{ marginRight: '0.5rem' }} /> Share
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingConfirmationPage;