import React, { useState , useEffect} from 'react';
import './App.css';
import FeedbackAdmin from './Feedback/FeedbackAdmin';
import SubmitFeedback from './Feedback/SubmitFeedback';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import GetBookings from './Booking/GetBookings';
import BookTicketsForm from './Booking/BookTicketsForm';
import UpdateBookingForm from './Booking/UpdateBookingForm';
import SearchByUsername from './Booking/SearchByUsername';
import SeatAvailability from './Booking/SeatAvailability';
import TopEvents from './Booking/TopEvents';
import PaymentDetails from './Booking/PaymentDetails';
import UpdateCompleted from './Booking/UpdateCompleted';
import Header from './components/Header';
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
      setShowList(true); // If Organiser, go to the previous feedbacks directly
    } else {
      setShowList(false); // If User, go to the submit feedback form
    }
  }, [role]);
  return (
    <div className="App" data-theme={theme}>
      <Header />
      {/* Show nav only if logged in */}
      {token && (
        <nav className="main-nav">
          <NavLink to="/" style={{ margin: '10px' }}>Bookings</NavLink>
          <NavLink to="/add" style={{ margin: '10px' }}>Book Tickets</NavLink>
          <NavLink to="/search" style={{ margin: '10px' }}>Search</NavLink>
          <NavLink to="/availability" style={{ margin: '10px' }}>Seat Availability</NavLink>
          <NavLink to="/top-events" style={{ margin: '10px' }}>Top Events</NavLink>
          <NavLink to="/payment" style={{ margin: '10px' }}>Payment</NavLink>
          <NavLink to="/update-completed" style={{ margin: '10px' }}>Update Completed</NavLink>
          <NavLink to="/feedback" style={{ margin: '10px' }}>Feedback</NavLink>
        </nav>
      )}

      <main className="main-content">
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/login" element={<Login />} />
        
        {/* --- Protected Routes --- */}
        {/* If token exists, it shows the page. If not, it shows Login page. */}
        
        <Route path="/" element={token ? <GetBookings /> : <Login />} />
        <Route path="/add" element={token ? <BookTicketsForm /> : <Login />} />
        <Route path="/edit/:id" element={token ? <UpdateBookingForm /> : <Login />} />
        <Route path="/search" element={token ? <SearchByUsername /> : <Login />} />
        <Route path="/availability" element={token ? <SeatAvailability /> : <Login />} />
        <Route path="/top-events" element={token ? <TopEvents /> : <Login />} />
        <Route path="/payment" element={token ? <PaymentDetails /> : <Login />} />
        <Route path="/update-completed" element={token ? <UpdateCompleted /> : <Login />} />
        
        <Route path="/feedback" element={token ? 
              (showList ? <FeedbackAdmin onShowForm={toggleView} /> 
                : <SubmitFeedback onViewPrevious={toggleView} />
              ) : <Login />
          } 
        />
        
        {/* Go to login if no token */}
        <Route path="*" element={token ? <GetBookings /> : <Login />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;