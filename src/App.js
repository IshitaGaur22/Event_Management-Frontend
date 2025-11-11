import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
// Booking & User Components
import BookingHistory from './BookingHistory/BookingHistory';
import NotificationTab from './BookingHistory/NotificationTab';
import TopEvents from './Booking/TopEvents';
import EventDetailsPage from './Booking/EventDetailsPage';
import ReviewBookingPage from './Booking/ReviewBookingPage';
import BookingConfirmationPage from './Booking/BookingConfirmationPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Login/Login';
import Signup from './Login/Signup';
import ProfilePage from './Login/ProfilePage';
 
// Feedback Components
import FeedbackAdmin from './Feedback/FeedbackAdmin';
import SubmitFeedback from './Feedback/SubmitFeedback';
 
// Organiser Components
import Dashboard from './OrganiserDashboard/Dashboard';
import CreateEventForm from './OrganiserDashboard/CreateEventForm';
import UpdateEventPage from './OrganiserDashboard/UpdateEventPage';
import EventDetails from './OrganiserDashboard/EventDetails';
 
// Context & Services
import { useAuth } from './AuthContext';
import { startConnection, onNotificationReceived } from './BookingHistory/SignalService';
import { NotificationContext } from './BookingHistory/NotificationContext';
 
import UserDashboard from './Dashboard/UserDashboard';
import { User } from 'lucide-react';
 
function AppContent() {
  const { token, theme, role } = useAuth();
  const { addNotification } = useContext(NotificationContext);
 
  // State and toggles for Feedback section
  const [showList, setShowList] = useState(false);
  const toggleView = () => {
    setShowList(prevShowList => !prevShowList);
  };
 
  // Effect to set initial view for Feedback based on user role
  useEffect(() => {
    if (role === 'Organiser') {
      setShowList(true); // If Organiser, go to the previous feedbacks directly
    } else {
      setShowList(false); // If User, go to the submit feedback form
    }
  }, [role]);
 
  // Effect for SignalR connection and notifications
  // useEffect(() => {
  //   startConnection();
  //   onNotificationReceived((notification) => {
  //     addNotification(notification);
  //     toast.info(notification.message, {
  //       position: "top-right",
  //       autoClose: 5000,
  //     });
  //   });
  // }, []); // Run only once on mount
 
  // Determine if the user is an Organiser
  const isOrganiser = role === 'Organiser';
 
  return (
    <div className="App" data-theme={theme}>
      <Header />
      <ToastContainer />
      {/* <UserDashboard /> */}
 
      {/* Show nav only if logged in */}
      {token && (
        <nav className="main-nav">
          {/* Organiser Navigation */}
          {isOrganiser ? (
            <>
              <NavLink to="/dashboard" style={{ margin: '10px' }}>Dashboard</NavLink>
              <NavLink to="/create-event" style={{ margin: '10px' }}>Create Event</NavLink>
              {/* Note: /update-event and /event-details paths are typically navigated to from the Dashboard */}
              <NavLink to="/feedback" style={{ margin: '10px' }}>Feedback</NavLink>
             
            </>
          ) : (
            /* User/Booking Navigation */
            <>
              <NavLink to="/user-dashboard" style={{ margin: '10px' }}>Dashboard</NavLink>
              <NavLink to="/booking-history" style={{ margin: '10px' }}>Booking History</NavLink>
              {/* <NavLink to="/Notification" style={{ margin: '10px' }}>Notification 🔔</NavLink> */}
              <NavLink to="/feedback" style={{ margin: '10px' }}>Feedback</NavLink>
              {/* <NavLink to="/check-event" style={{ margin: '10px' }}>Check Event</NavLink */}
              <NavLink to="/top-events" style={{ margin: '10px' }}>Top Events</NavLink>
            </>
          )}
        </nav>
      )}
 
      <main className="main-content">
        <Routes>
          {/* --- Public Route --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* --- Protected Routes --- */}
          {/* If token exists, show the page. If not, show Login page. */}
 
          {isOrganiser ? (
            /* Organiser Routes */
            <>
              <Route path="/" element={token ? <Dashboard /> : <Login />} />
              <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
              <Route path="/create-event" element={token ? <CreateEventForm /> : <Login />} />
              <Route path="/update-event" element={token ? <UpdateEventPage /> : <Login />} />
              <Route path="/event-details" element={token ? <EventDetails /> : <Login />} />
            </>
          ) : (
            /* User/Booking Routes */
            <>
              <Route path="/" element={<UserDashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/profile" element={token ? <ProfilePage /> : <Login />} />
              <Route path="/top-events" element={token ? <TopEvents /> : <Login />} />
              <Route path="/event/:eventId" element={<EventDetailsPage />} />
              <Route path="/review-booking" element={token ? <ReviewBookingPage /> : <Login />} />
              <Route path="/booking-confirmation" element={token ? <BookingConfirmationPage /> : <Login />} />
              <Route path="/booking-history" element={token ? <BookingHistory /> : <Login />} />
              <Route path="/notification" element={token ? <NotificationTab /> : <Login />} />
            </>
          )}
         
          <Route
            path="/feedback"
            element={token ?
              (showList ? <FeedbackAdmin onShowForm={toggleView} /> : <SubmitFeedback onViewPrevious={toggleView} />
              ) : <Login />
            }
          />
 
          <Route path="*" element={isOrganiser ? (token ? <Dashboard /> : <Login />) : <UserDashboard />} />
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