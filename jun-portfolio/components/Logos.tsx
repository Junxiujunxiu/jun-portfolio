// components/Logos.tsx
import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';


const Logos: React.FC = () => {
  return (
    <div className="logos-container">
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={40} className="logo bouncing" />
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={40} className="logo bouncing" />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={40} className="logo bouncing" />
      </a>
      
    </div>
  );
};

export default Logos;
