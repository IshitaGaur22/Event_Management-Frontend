import React, { useState } from 'react';
import { getPaymentByBooking } from './BookingService';

function PaymentDetails() {
  const [bookingId, setBookingId] = useState('');
  const [payment, setPayment] = useState(null);

  const handleFetch = () => {
    getPaymentByBooking(bookingId)
      .then(response => setPayment(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <input type="number" placeholder="Booking ID" value={bookingId} onChange={(e) => setBookingId(e.target.value)} />
      <button onClick={handleFetch}>Fetch</button>
      {payment && (
        <div>
          <p>Amount: {payment.amount}</p>
          <p>Status: {payment.status}</p>
          <p>Method: {payment.paymentMethod}</p>
        </div>
      )}
    </div>
  );
}

export default PaymentDetails;