import Dashboard from './OrganiserDashboard/Dashboard';
import CreateEventForm from './OrganiserDashboard/CreateEventForm';
import UpdateEventPage from './OrganiserDashboard/UpdateEventPage';
import EventDetails from './OrganiserDashboard/EventDetails';
import React, { useState , useEffect} from 'react';
import './App.css';
import FeedbackAdmin from './Feedback/FeedbackAdmin';
import SubmitFeedback from './Feedback/SubmitFeedback';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
// Import BrowserRouter as Router, and NavLink
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
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
import ProtectedRoute from './Login/ProtectedRoute';
import UserDashboard from './Dashboard/UserDashboard';
import Login from './Login/Login';
import { useAuth } from './AuthContext'; 
import Footer from './components/Footer';

function AppContent() {
  const [showList, setShowList] = useState(false);
  const toggleView = () => {
    setShowList(prevShowList => !prevShowList);
  };
  
  const { token, theme, role } = useAuth();
  useEffect(() => {
    if (role === 'Organiser') {
      setShowList(true); 
    } else {
      setShowList(false); 
    }
  }, [role]);

  return (
    <div className="App" data-theme={theme}>
      <Header />
      {/* Show nav only if logged in */}
      {token && (
        <nav className="main-nav">
          {/* --- FIXED: Changed "/" to "/bookings" to avoid conflict --- */}
          <NavLink to="/bookings" style={{ margin: '10px' }}>Bookings</NavLink> 
          <NavLink to="/add" style={{ margin: '10px' }}>Book Tickets</NavLink>
          <NavLink to="/search" style={{ margin: '10px' }}>Search</NavLink>
          <NavLink to="/availability" style={{ margin: '10px' }}>Seat Availability</NavLink>
          <NavLink to="/top-events" style={{ margin: '10px' }}>Top Events</NavLink>
          <NavLink to="/payment" style={{ margin: '10px' }}>Payment</NavLink>
          <NavLink to="/update-completed" style={{ margin: '10px' }}>Update Completed</NavLink>
          <NavLink to="/feedback" style={{ margin: '10px' }}>Feedback</NavLink>
          {/* Add a link to the organiser dashboard if they are an organiser */}
          {role === 'Organiser' && (
            <NavLink to="/organiser-dashboard" style={{ margin: '10px' }}>Admin Dashboard</NavLink>
          )}
        </nav>
      )}
      <Routes>
        {/* --- Public Route --- */}
        <Route path="/login" element={<Login />} />
        
        {/* --- Organiser-Only Routes --- */}
        {/* These routes are now protected */}
        <Route path="/organiser-dashboard" element={token ? <Dashboard /> : <Login />} />
        <Route path="/create-event" element={token ? <CreateEventForm /> : <Login />} />
        <Route path="/update-event" element={token ? <UpdateEventPage /> : <Login />} />
        <Route path="/event-details" element={token ? <EventDetails /> : <Login />} />
        
        {/* --- User Dashboard (Protected by Wrapper) --- */}
        {/* You can simplify this if you want */}
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

        {/* --- Protected Routes (using token) --- */}
        {/* --- FIXED: Changed "/" to "/bookings" --- */}
        <Route path="/bookings" element={token ? <GetBookings /> : <Login />} />
        <Route path="/add" element={token ? <BookTicketsForm /> : <Login />} />
        <Route path="/edit/:id" element={token ? <UpdateBookingForm /> : <Login />} />
        <Route path="/search" element={token ? <SearchByUsername /> : <Login />} />
        <Route path="/availability" element={token ? <SeatAvailability /> : <Login />} />
        <Route path="/top-events" element={token ? <TopEvents /> : <Login />} />
        <Route path="/payment" element={token ? <PaymentDetails /> : <Login />} />
        <Route path="/update-completed" element={token ? <UpdateCompleted /> : <Login />} />
        
        <Route 
          path="/feedback" 
          element={
            token ? (
              showList ? <FeedbackAdmin onShowForm={toggleView} /> 
                       : <SubmitFeedback onViewPrevious={toggleView} />
            ) : <Login />
          } 
        />
        
        {/* --- Catch-all / Default Route --- */}
        {/* --- FIXED: Set the default route to "/" --- */}
        <Route path="/" element={token ? <GetBookings /> : <Login />} />
        <Route path="*" element={token ? <GetBookings /> : <Login />} />
      </Routes>
    </div>
  );
}

// --- THIS IS THE MAIN FIX ---
// Your App component MUST wrap AppContent in <Router>
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;