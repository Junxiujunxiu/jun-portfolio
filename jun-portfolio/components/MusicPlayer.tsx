'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image'; // Import the Image component

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Initially set to false, music is off by default
  const [showJourneyMessage, setShowJourneyMessage] = useState(true); // Show the journey message at the start
  const audioRef = useRef<HTMLAudioElement>(null);

  // Toggle play/pause for the music and hide the message after clicking "Start the Journey"
  const toggleMusic = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setShowJourneyMessage(false); // Hide the message after clicking
        } catch (error) {
          console.error("Playback error:", error);
        }
      }
    }
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} loop>
        <source src="https://3d-assets-portfolio.s3-ap-southeast-2.amazonaws.com/material/background-music.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Show the Start Journey message initially, hide it after clicking */}
      {showJourneyMessage && (
        <div
          className="start-journey-message"
          onClick={toggleMusic} // Call the toggle function on click
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            zIndex: 9999,
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: '5px',
            animation: 'glow 1.5s infinite',
          }}
        >
          Start the Journey
        </div>
      )}

      <button
        onClick={toggleMusic}
        className="music-toggle-btn"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
        }}
      >
        {isPlaying ? (
          <Image src="https://3d-assets-portfolio.s3-ap-southeast-2.amazonaws.com/material/music-on.png" alt="Music On" width={40} height={40} />
        ) : (
          <Image src="https://3d-assets-portfolio.s3-ap-southeast-2.amazonaws.com/material/music-off.png" alt="Music Off" width={40} height={40} />
        )}
      </button>

      {/* Glow animation */}
      <style jsx>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 10px #fff, 0 0 20px #ff4dff, 0 0 30px #ff4dff, 0 0 40px #ff4dff;
          }
          50% {
            box-shadow: 0 0 20px #fff, 0 0 30px #ff4dff, 0 0 40px #ff4dff, 0 0 50px #ff4dff;
          }
          100% {
            box-shadow: 0 0 10px #fff, 0 0 20px #ff4dff, 0 0 30px #ff4dff, 0 0 40px #ff4dff;
          }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
