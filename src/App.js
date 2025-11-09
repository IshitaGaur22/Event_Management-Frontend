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
import ProtectedRoute from './Login/ProtectedRoute';
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
          {isOrganiser ? (
            /* --- ORGANISER-ONLY ROUTES --- */
            <>
              <Route path="/organiser-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/create-event" element={<ProtectedRoute><CreateEventForm /></ProtectedRoute>} />
              <Route path="/update-event" element={<ProtectedRoute><UpdateEventPage /></ProtectedRoute>} />
              <Route path="/event-details" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
            </>
          ) : (
            /* --- USER-ONLY ROUTES --- */
            <>
              <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              <Route path="/bookings" element={<ProtectedRoute><GetBookings /></ProtectedRoute>} />
              <Route path="/add" element={<ProtectedRoute><BookTicketsForm /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><UpdateBookingForm /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><SearchByUsername /></ProtectedRoute>} />
              <Route path="/availability" element={<ProtectedRoute><SeatAvailability /></ProtectedRoute>} />
              <Route path="/top-events" element={<ProtectedRoute><TopEvents /></ProtectedRoute>} />
              <Route path="/payment" element={<ProtectedRoute><PaymentDetails /></ProtectedRoute>} />
              <Route path="/update-completed" element={<ProtectedRoute><UpdateCompleted /></ProtectedRoute>} />
            </>
          )}
         
          {/* --- SHARED FEEDBACK ROUTE --- */}
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                {showList ? <FeedbackAdmin onShowForm={toggleView} /> : <SubmitFeedback onViewPrevious={toggleView} />}
              </ProtectedRoute>
            }
          />
 
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