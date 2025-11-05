import './App.css';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import FeedbackAdmin from './Feedback/FeedbackAdmin';
import SubmitFeedback from './Feedback/SubmitFeedback';
import Login from './Login/Login';
import { useAuth } from './Login/AuthContext'; 

// A component for your main page
function FeedbackPage() {
  const [showList, setShowList] = React.useState(false);
  const toggleView = () => setShowList(p => !p);

  return (
    <>
      {showList ? (
        <FeedbackAdmin onShowForm={toggleView} />
      ) : (
        <SubmitFeedback onViewPrevious={toggleView} />
      )}
    </>
  );
}

function App() {
  // Get both 'token' and 'logout' from the context
  const { token, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // This clears the token from state and localStorage
    navigate('/login'); // Navigate the user back to the login page
  };

  return (
    <div className="App">
      <header className="App-header">
        
        {/* This button only shows if the user is logged in */}
        {token && (
          <button onClick={handleLogout} className="logoutButton">
            Logout
          </button>
        )}

        
        <Routes>
          {/* Your routes will now automatically redirect to /login when token is null */}
          <Route path="/" element={token ? <FeedbackPage /> : <Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;