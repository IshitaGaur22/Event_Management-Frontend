import React from 'react';
import styles from './Footer.module.css';
import SimbaLogo from '../images/simba-dark.png'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        {/* --- Top Section --- */}
        <div className={styles.footerTop}>
          
          {/* Logo */}
          <div className={styles.footerLogo}>
            <img src={SimbaLogo} alt="SIMBA Events" />
            <span>SIMBA Events</span>
          </div>
          
          {/* Links */}
          <div className={styles.footerLinks}>
            <a href="/">Terms & Conditions</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Contact Us</a>
          </div>
        
        </div>
        
        {/* --- Bottom Section --- */}
        <div className={styles.footerBottom}>
          <p className={styles.legalText}>
            © 2025 SIMBA Events. All rights reserved.
          </p>
          
          {/* Updated Social Icons */}
          <div className={styles.socialIcons}>
            <a href="/" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            <a href="/" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="/" aria-label="X (Twitter)"><i className="fab fa-x-twitter"></i></a>
            <a href="/" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;