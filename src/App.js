import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
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
import { User } from 'lucide-react';
import ProfilePage from './Login/ProfilePage';
import LandingPage from './components/LandingPage';

function AppContent() {
  const { token, theme, role } = useAuth();
  const location = useLocation();
  const showNav = location.pathname !== '/'; // hide navbar only on LandingPage ('/')
  // const { addNotification } = useContext(NotificationContext);
  
  // State and toggles for Feedback section
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
      {/* <LandingPage/> */}
      <ToastContainer />
      {/* <UserDashboard /> */}

      {/* Show nav only if logged in */}
      {token && showNav && (
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
          {/* Public login */}
          <Route path="/login" element={<Login />} />

          {/* Always show LandingPage as the home screen (header/footer remain) */}
          <Route path="/" element={<LandingPage />} />

          {/* Organiser Routes (protected) */}
          <Route path="/create-event" element={token ? <CreateEventForm /> : <Login />} />
          <Route path="/update-event" element={token ? <UpdateEventPage /> : <Login />} />
          <Route path="/event-details" element={token ? <EventDetails /> : <Login />} />

          {/* User / Booking Routes (require login for booking flow) */}
          <Route path="/top-events" element={token ? <TopEvents /> : <Login />} />
          <Route path="/event/:eventId" element={token ? <EventDetailsPage /> : <Login />} />
          <Route path="/review-booking" element={token ? <ReviewBookingPage /> : <Login />} />
          <Route path="/booking-confirmation" element={token ? <BookingConfirmationPage /> : <Login />} />

          {/* Feedback (shared) */}
          <Route 
            path="/feedback"
            element={token ? (showList ? <FeedbackAdmin onShowForm={toggleView} /> : <SubmitFeedback onViewPrevious={toggleView} />) : <Login />}
          />

          <Route path="/profile" element={token ? <ProfilePage /> : <Login />} />

          {/* fallback -> show landing for anonymous, otherwise route to dashboard by role */}
          <Route path="*" element={token ? (isOrganiser ? <Dashboard /> : <UserDashboard />) : <LandingPage />} />
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