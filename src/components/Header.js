import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimbaLogo from '../images/SimbaLogo.png'; // Make sure this path is correct
import styles from './Header.module.css'; // Import your CSS module
import { useAuth } from '../Login/AuthContext'; // Import useAuth

const Header = () => {
  // Get auth state and functions
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear token
    navigate('/login'); // Redirect to login
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        
        {/* Left: Logo - Links to homepage */}
        <Link to="/" className={styles.logoContainer}>
          <img src={SimbaLogo} alt="Logo" className={styles.logo} />
          <span className={styles.logoText}>SIMBA Events</span>
        </Link>

        {/* Right: Profile Icon & Logout Button */}
        {/* Only show this section if the user is logged in */}
        {token && (
          <div className={styles.profileContainer}>
            <div className={styles.profileIcon}>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </div>
            
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;