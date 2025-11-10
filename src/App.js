import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './AuthContext';
 
// Booking & User Components
import GetBookings from './Booking/GetBookings';
// import BookingHistory from './BookingHistory/BookingHistory';
// import NotificationTab from './BookingHistory/NotificationTab';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Login/Login';
 
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
// import { startConnection, onNotificationReceived } from './BookingHistory/SignalService';
// import { NotificationContext } from './BookingHistory/NotificationContext';
 
 
function AppContent() {
  const { token, theme, role } = useAuth();
  // const { addNotification } = useContext(NotificationContext);
 
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
              <NavLink to="/top-events" style={{ margin: '10px' }}>Top Events</NavLink>
              <NavLink to="/booking-history" style={{ margin: '10px' }}>Booking History</NavLink>
              {/* <NavLink to="/Notification" style={{ margin: '10px' }}>Notification 🔔</NavLink> */}
              <NavLink to="/feedback" style={{ margin: '10px' }}>Feedback</NavLink>
            </>
          )}
        </nav>
      )}
 
      <main className="main-content">
        <Routes>
          {/* --- Public Route --- */}
          <Route path="/login" element={<Login />} />
 
          {/* --- Protected Routes --- */}
          {/* If token exists, show the page. If not, show Login page. */}
 
          {isOrganiser ? (
            /* Organiser Routes */
            <>
              <Route path="/" element={token ? <Dashboard /> : <Login />} />
              <Route path="/create-event" element={token ? <CreateEventForm /> : <Login />} />
              <Route path="/update-event" element={token ? <UpdateEventPage /> : <Login />} />
              <Route path="/event-details" element={token ? <EventDetails /> : <Login />} />
            </>
          ) : (
            /* User/Booking Routes */
            <>
             
              {/* <Route path="/booking-history" element={token ? <BookingHistory /> : <Login />} /> */}
              {/* <Route path="/Notification" element={token ? <NotificationTab /> : <Login />} /> */}
            </>
          )}
         
          {/* Feedback Route (Shared but with role logic inside) */}
          <Route
            path="/feedback"
            element={token ?
              (showList ? <FeedbackAdmin onShowForm={toggleView} /> : <SubmitFeedback onViewPrevious={toggleView} />
              ) : <Login />
            }
          />
 
          {/* Fallback Route: Go to the respective default view if no token, otherwise the default view (Booking or Dashboard) */}
          <Route path="*" element={token ? (isOrganiser ? <Dashboard /> : <GetBookings />) : <Login />} />
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