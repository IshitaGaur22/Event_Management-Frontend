import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimbaLogo from '../images/simba-dark.png'; // Make sure this path is correct
import styles from './Header.module.css';
import { useAuth } from '../AuthContext';

const Header = () => {
  // 2. Get theme and toggleTheme from the context
  const { token, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();
 
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleNotifications = () => {
    // You can replace this with your notification logic later
    alert('Notifications clicked!');
  };
 
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        
        <Link to="/" className={styles.logoContainer}>
          <img src={SimbaLogo} alt="Logo" className={styles.logo} />
          <span className={styles.logoText}>SIMBA Events</span>
        </Link>

        <div className={styles.rightContainer}>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {token && (
<div className={styles.profileContainer}>
<button 
                onClick={handleNotifications} 
                className={styles.notificationBell}
                aria-label="View notifications"
                >
                <i className="fas fa-bell"></i> 
              </button>
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
 
      </div>
</header>
  );
};
 
export default Header;