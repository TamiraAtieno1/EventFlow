// frontend/src/assets/components/Footer.jsx
import React from 'react';


const Footer = () => {
  return (
    <div className="footer container">
      <div className="footer-section">
        <p className="title">EventFlow</p>
        <p>EventFlow is where you can get your tickets with no hustle! Book now!</p>
        <p>&copy; 2023 | All Rights Reserved</p>
      </div>
      <div className="footer-section">
        <p className="title">Contact Us</p>
        <p>EventFlow@gmail.com</p>
        <p>+254 711 895 052</p>
        <p>Nairobi, Kenya</p>
      </div>
      <div className="footer-section">
        <p className="title">Socials</p>
        <p>Facebook</p>
        <p>Twitter</p>
        <p>Instagram</p>
      </div>
    </div>
  );
};

export default Footer;
