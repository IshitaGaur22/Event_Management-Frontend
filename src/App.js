import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GetBookings from './Booking/GetBookings';
import BookTicketsForm from './Booking/BookTicketsForm';
import UpdateBookingForm from './Booking/UpdateBookingForm';
import SearchByUsername from './Booking/SearchByUsername';
import SeatAvailability from './Booking/SeatAvailability';
import TopEvents from './Booking/TopEvents';
import PaymentDetails from './Booking/PaymentDetails';
import UpdateCompleted from './Booking/UpdateCompleted';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
      </div>
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        <Link to="/" style={{ margin: '10px' }}>Bookings</Link>
        <Link to="/add" style={{ margin: '10px' }}>Book Tickets</Link>
        <Link to="/search" style={{ margin: '10px' }}>Search</Link>
        <Link to="/availability" style={{ margin: '10px' }}>Seat Availability</Link>
        <Link to="/top-events" style={{ margin: '10px' }}>Top Events</Link>
        <Link to="/payment" style={{ margin: '10px' }}>Payment</Link>
        <Link to="/update-completed" style={{ margin: '10px' }}>Update Completed</Link>
      </nav>
      <Routes>
        <Route path="/" element={<GetBookings />} />
        <Route path="/add" element={<BookTicketsForm />} />
        <Route path="/edit/:id" element={<UpdateBookingForm />} />
        <Route path="/search" element={<SearchByUsername />} />
        <Route path="/availability" element={<SeatAvailability />} />
        <Route path="/top-events" element={<TopEvents />} />
        <Route path="/payment" element={<PaymentDetails />} />
        <Route path="/update-completed" element={<UpdateCompleted />} />
      </Routes>
    </Router>
  );
}

export default App;