import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import GetBookings from './Booking/GetBookings';
import BookTicketsForm from './Booking/BookTicketsForm';
import UpdateBookingForm from './Booking/UpdateBookingForm';
import SearchByUsername from './Booking/SearchByUsername';
import SeatAvailability from './Booking/SeatAvailability';
import TopEvents from './Booking/TopEvents';
import PaymentDetails from './Booking/PaymentDetails';
import UpdateCompleted from './Booking/UpdateCompleted';
import BookingPage from './Booking/EventDetailsPage';
import ReviewBookingPage from './Booking/ReviewBookingPage';
import BookingPageWrapper from './Booking/BookingWrapper';
import BookingConfirmationPage from './Booking/BookingConfirmationPage';
import Login from './Login/Login'
import ProtectedRoute from './Login/ProtectedRoute';
import UserDashboard from './Dashboard/UserDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-simba-off-white font-poppins text-simba-text-dark">
        <Header onLogoClick={() => window.location.href = '/'} />

        <nav className="p-2 bg-gray-100 flex flex-wrap justify-center sm:justify-start border-b border-gray-300">
          <Link to="/" className="m-2">Bookings</Link>
          <Link to="/add" className="m-2">Book Tickets</Link>
          <Link to="/search" className="m-2">Search</Link>
          <Link to="/availability" className="m-2">Seat Availability</Link>
          <Link to="/top-events" className="m-2">Top Events</Link>
          <Link to="/payment" className="m-2">Payment</Link>
          <Link to="/update-completed" className="m-2">Update Completed</Link>
          <Link to="/check-event" className="m-2">Check Event</Link>
          <Link to="/login" className="m-2">Login</Link>
          <Link to="/dashboard" className="m-2">Dashboard</Link>
        </nav>

        <main className="p-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/" element={<GetBookings />} />
            <Route path="/add" element={<BookTicketsForm />} />
            <Route path="/edit/:id" element={<UpdateBookingForm />} />
            <Route path="/search" element={<SearchByUsername />} />
            <Route path="/availability" element={<SeatAvailability />} />
            <Route path="/top-events" element={<TopEvents />} />
            <Route path="/payment" element={<PaymentDetails />} />
            <Route path="/update-completed" element={<UpdateCompleted />} />
            <Route path="/review-booking" element={<ReviewBookingPage />} />
            <Route path="/event/:eventId" element={<BookingPage />} />
            <Route path="/check-event" element={<BookingPageWrapper />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;