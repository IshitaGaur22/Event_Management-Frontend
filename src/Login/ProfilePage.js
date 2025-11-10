import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { useAuth } from '../AuthContext';

const ProfilePage = () => {
  const { userId } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
//   const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (userId) {
      // Fetch user details
      axios.get(`https://localhost:7283/api/Users/${userId}`)
        .then(res => setUserDetails(res.data))
        .catch(err => console.error('Error fetching user details:', err));

      // Fetch booking history
    //   axios.get(`http://localhost:7283/api/Bookings/user/${userId}`)
    //     .then(res => setBookings(res.data))
    //     .catch(err => console.error('Error fetching bookings:', err));
    }
  }, [userId]);

  if (!userDetails) {
    return <div className="profile-container">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>

      {/* User Details */}
      <div className="profile-card">
        <h2>{userDetails.username}</h2>
        <p><strong>Location:</strong> {userDetails.location}</p>
        <p><strong>Phone:</strong> {userDetails.phoneNumber}</p>
        <p><strong>Role:</strong> {userDetails.role}</p>
      </div>

      {/* Booking History */}
      {/* <h2 className="section-title">Booking History</h2>
      <div className="booking-list">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map(b => (
            <div key={b.bookingId} className="booking-card">
              <h3>{b.eventName}</h3>
              <p>Date: {b.eventDate}</p>
              <p>Seats: {b.selectedSeats}</p>
              <p>Total: ₹{b.totalAmount}</p>
            </div>
          ))
        )} */}
      {/* </div> */}
    </div>
  );
};

export default ProfilePage;