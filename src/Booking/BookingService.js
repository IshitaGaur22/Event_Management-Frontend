import axios from 'axios';

const API_URL = 'https://localhost:7283/api/Bookings';

// POST - Book tickets
export const bookTickets = (selectedSeats, userName, eventId) =>
  axios.post(API_URL, null, { params: { selectedSeats, userName, eventId } });

// GET - All bookings
export const getAllBookings = () => axios.get(API_URL);

// GET - Booking by ID
export const getBookingById = (id) => axios.get(`${API_URL}/bookingId?id=${id}`);

// GET - Booking by username
export const getBookingByName = (name) => axios.get(`${API_URL}/UserName?name=${name}`);

// GET - Seat availability
export const checkSeatAvailability = (eventId, requestedSeats) =>
  axios.get(`${API_URL}/seatAvailability?eventId=${eventId}&requestedSeats=${requestedSeats}`);

// GET - Bookings by event
export const getBookingsByEvent = (eventId) =>
  axios.get(`${API_URL}/eventId?eventId=${eventId}`);

// GET - Top booked events
export const getTopBookedEvents = (count) =>
  axios.get(`${API_URL}/topEvents?count=${count}`);

// GET - Payment by booking ID
export const getPaymentByBooking = (bookingId) =>
  axios.get(`${API_URL}/payment/${bookingId}`);

// PUT - Update booking
export const updateBooking = (id, bookingDto) =>
  axios.put(`${API_URL}/bookingId?id=${id}`, bookingDto);

// PUT - Update completed bookings
export const updateCompletedBookings = () =>
  axios.put(`${API_URL}/update-completed-bookings`);

// DELETE - Delete booking
export const deleteBooking = (id) =>
  axios.delete(`${API_URL}/id?id=${id}`);