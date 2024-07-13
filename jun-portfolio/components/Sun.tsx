import React from 'react';

interface SunProps {
  onClick: () => void;
}

const Sun: React.FC<SunProps> = ({ onClick }) => {
  return (
    <img
      src="/models/sun/day.gif"
      alt="Sun Animation"
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '83.5%',
        top: '2%',
        width: '100px', // Adjust the width as needed
        height: '100px', // Adjust the height as needed
        cursor: 'pointer',
        zIndex: 10 // Ensure the image is above the Canvas
      }}
    />
  );
};

export default Sun;
