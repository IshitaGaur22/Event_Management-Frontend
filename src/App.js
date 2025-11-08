import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- CORE & AUTH ---
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Login/Login';
import Signup from './Login/Signup';
import { useAuth } from './AuthContext';

// --- ORGANISER PAGES ---
import Dashboard from './OrganiserDashboard/Dashboard';
import CreateEventForm from './OrganiserDashboard/CreateEventForm';
import UpdateEventPage from './OrganiserDashboard/UpdateEventPage';
import EventDetails from './OrganiserDashboard/EventDetails';

// --- USER PAGES ---
import UserDashboard from './Dashboard/UserDashboard';
import GetBookings from './Booking/GetBookings';
import BookTicketsForm from './Booking/BookTicketsForm';
import UpdateBookingForm from './Booking/UpdateBookingForm';
import SearchByUsername from './Booking/SearchByUsername';
import SeatAvailability from './Booking/SeatAvailability';
import TopEvents from './Booking/TopEvents';
import PaymentDetails from './Booking/PaymentDetails';
import UpdateCompleted from './Booking/UpdateCompleted';

// --- SHARED PAGES ---
import FeedbackAdmin from './Feedback/FeedbackAdmin';
import SubmitFeedback from './Feedback/SubmitFeedback';

/**
 * This component is the main router and layout.
 * It's inside <Router> so it can use hooks like useAuth.
 */
function AppContent() {
  const { token, theme, role } = useAuth();
  const isOrganiser = role === 'Organiser';

  // --- State for Feedback Page Toggle ---
  const [showList, setShowList] = useState(false);
  const toggleView = () => {
    setShowList(prevShowList => !prevShowList);
  };
 
  // Effect to set initial Feedback view based on role
  useEffect(() => {
    setShowList(isOrganiser);
  }, [isOrganiser, token]);

  /**
   * This component handles all root redirects.
   * It sends logged-out users to /login.
   * It sends logged-in users to their correct dashboard.
   */
  const HomeRedirect = () => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return isOrganiser ? 
      <Navigate to="/organiser-dashboard" replace /> : 
      <Navigate to="/user-dashboard" replace />;
  };

  return (
    <div className="App" data-theme={theme}>
      <Header />
      <ToastContainer />
 
      {/* --- Role-Based Navigation --- */}
      {token && (
        <nav className="main-nav">
          {isOrganiser ? (
            /* --- ORGANISER NAV --- */
            <>
              <NavLink to="/organiser-dashboard">Dashboard</NavLink>
              <NavLink to="/create-event">Create Event</NavLink>
              <NavLink to="/feedback">Feedback</NavLink>
            </>
          ) : (
            /* --- USER NAV --- */
            <>
              <NavLink to="/user-dashboard">Home</NavLink>
              <NavLink to="/bookings">My Bookings</NavLink>
              <NavLink to="/top-events">Top Events</NavLink>
              <NavLink to="/feedback">Feedback</NavLink>
            </>
          )}
        </nav>
      )}
 
      <main className="main-content">
        <Routes>
          {/* --- Public Route --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* --- Home/Redirector --- */}
          <Route path="/" element={<HomeRedirect />} />
 
          {/* --- Protected Routes --- */}
          {/* We check for 'token' to protect all routes */}
          {token ? (
            <>
              {isOrganiser ? (
                /* --- ORGANISER-ONLY ROUTES --- */
                <>
                  <Route path="/organiser-dashboard" element={<Dashboard />} />
                  <Route path="/create-event" element={<CreateEventForm />} />
                  <Route path="/update-event" element={<UpdateEventPage />} />
                  <Route path="/event-details" element={<EventDetails />} />
                </>
              ) : (
                /* --- USER-ONLY ROUTES --- */
                <>
                  <Route path="/user-dashboard" element={<UserDashboard />} />
                  <Route path="/bookings" element={<GetBookings />} />
                  <Route path="/add" element={<BookTicketsForm />} />
                  <Route path="/edit/:id" element={<UpdateBookingForm />} />
                  <Route path="/search" element={<SearchByUsername />} />
                  <Route path="/availability" element={<SeatAvailability />} />
                  <Route path="/top-events" element={<TopEvents />} />
                  <Route path="/payment" element={<PaymentDetails />} />
                  <Route path="/update-completed" element={<UpdateCompleted />} />
                </>
              )}
              
              {/* --- SHARED FEEDBACK ROUTE --- */}
              <Route
                path="/feedback"
                element={
                  showList ? <FeedbackAdmin onShowForm={toggleView} /> : <SubmitFeedback onViewPrevious={toggleView} />
                }
              />
            </>
          ) : (
             /* --- If no token, all other paths redirect to login --- */
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}

          {/* --- Final catch-all if logged in but route doesn't exist --- */}
           <Route path="*" element={<HomeRedirect />} />
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