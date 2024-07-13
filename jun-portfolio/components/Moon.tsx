import React from 'react';

interface MoonProps {
  onClick: () => void;
}

const Moon: React.FC<MoonProps> = ({ onClick }) => {
  return (
    <img
      src="/models/moon/night.gif"
      alt="Moon Animation"
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '77%',
        top: '3%',
        width: '100px', // Adjust the width as needed
        height: '100px', // Adjust the height as needed
        cursor: 'pointer',
        zIndex: 10 // Ensure the image is above the Canvas
      }}
    />
  );
};

export default Moon;
