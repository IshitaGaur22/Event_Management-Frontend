import React, { useState } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import emLogo from "../emLogo.png";
import '../App.css';

const Header = () => {
  // This component assumes all necessary CSS classes (simba-header, logo-section, profile-button, etc.)
  // and CSS variables are defined in the external file imported as '../App.css'.
  
  return (
    <header className="simba-header">
      <div className="header-container">
        <div className="header-content">
          
          {/* Logo Section (Extreme Left) */}
          <div className="logo-section">
            {/* Renders the image imported from emLogo.png */}
            <img src={emLogo} alt="Simba Logo" className="logo-icon" />
            <span className="logo-text">
              Simba Events
            </span>
          </div>

          {/* Navigation/Profile Section (Extreme Right) */}
          <div className="profile-group">
            
            {/* Simple Navigation Placeholder */}
            {/* <nav className="nav-links">
              <a href="#">Products</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </nav> */}

            {/* Profile Icon/Button */}
            <button 
              className="profile-button"
              onClick={() => console.log('Profile clicked')}
              aria-label="User Profile"
            >
              {/* Uses the imported icon from react-icons/fa */}
              <FaUserCircle size={24} />
            </button>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


// create the header of the website having logo in left and profile icon on right. the colors are given in app.css as follows-
// :root {
//   --font-primary: 'Poppins', sans-serif;
//   --simba-brown-dark: #6C4234;
//   --simba-orange-dark: #C27040;
//   --simba-orange-light: #E0914A;
//   --simba-white: #FFFFFF;
//   --simba-off-white: #F8F9FA;
//   --simba-light-grey: #DEE2E6;
//   --simba-text-dark: #212529;
//   --simba-text-medium: #495057;
 
//   --shadow-medium: 0 6px 15px rgba(0, 0, 0, 0.12);
//   --radius-soft: 8px;
//   --radius-round: 25px;
// }
// keep is responsive and bg of header light cause the logo is dark