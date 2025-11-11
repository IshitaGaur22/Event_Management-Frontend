import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimbaLogo from '../images/simba-dark.png'; // Make sure this path is correct
import styles from './Header.module.css';
import { useAuth } from '../AuthContext';
import { NotificationContext } from '../BookingHistory/NotificationContext';
import { toast } from 'react-toastify';

const Header = () => {
  // 2. Get theme and toggleTheme from the context
  const { token, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();
 
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!', {
      position: 'top-center',
      autoClose: 2000
    });
    navigate('/');
  };
  const handleNotifications = () => {
    navigate('/notification');
  };
  const { unreadCount, resetUnreadCount } = React.useContext(NotificationContext);
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
          
          {/* Profile & Notifications */}
        {token ? (
          <div className={styles.profileContainer}>
            <button
              onClick={() => {
                handleNotifications();
                resetUnreadCount();
              }}
              className={styles.notificationBell}
              aria-label="View notifications"
              style={{ position: "relative" }}
            >
              <i className="fas fa-bell"></i>
              {unreadCount > 0 && (
                <span
                  className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.75rem" }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
 
              <button onClick={() => navigate('/profile')} className={styles.profileIcon}>
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </button>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
</button>
</div>
          ): (
            <button onClick={() => navigate('/login')} className={styles.loginButton}>
              Login
            </button>
          )}
</div>
 
      </div>
</header>
  );
};
 
export default Header;