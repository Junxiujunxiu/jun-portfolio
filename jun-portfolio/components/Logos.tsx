// components/Logos.tsx
import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { SiWechat } from 'react-icons/si';

const Logos: React.FC = () => {
  return (
    <div className="logos-container">
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={30} className="logo bouncing" />
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={30} className="logo bouncing" />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={30} className="logo bouncing" />
      </a>
      <a href="https://www.wechat.com" target="_blank" rel="noopener noreferrer">
        <SiWechat size={30} className="logo bouncing" />
      </a>
    </div>
  );
};

export default Logos;
