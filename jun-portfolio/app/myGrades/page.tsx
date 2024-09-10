'use client';

import React from 'react';
import { InfiniteMovingCards } from '../../UI/InfiniteMovingCards'; // Adjust the path if necessary

const grades = [
  { text: "Computing Technology in Society - A+" },
  { text: "Mahitahi Collaborative Practices - A+" },
  { text: "Programming 2 - A" },
  { text: "Programming for Creativity - A+" },
  { text: "Data Analysis - B" },
  { text: "Operating Systems - A" },
  { text: "Program Design and Construction - A+" },
  { text: "Text and Vision Intelligence - A+" },
  { text: "Database System Design - A-" },
  { text: "IT Project Management - A" },
  { text: "Mathematics for Computing - A" },
  { text: "Programming Concepts and Techniques - A" },
  { text: "Data Structures and Algorithms - A-" },
  { text: "Networks and Internet - A+" },
  { text: "Software Development Practice - B+" },
  { text: "Web Development - A+" }
];

const MyGrades: React.FC = () => {
  return (
    <section 
      className="w-full min-h-screen py-20 text-white relative" 
      style={{
        backgroundImage: "url('/darkBG.gif')", // Path to your new GIF
        backgroundSize: "cover", // Make the GIF cover the entire section
        backgroundPosition: "center", // Center the background
        backgroundRepeat: "no-repeat", // Prevent the GIF from repeating
      }}
    >
      <div className="text-center space-y-6 mb-16 w-full px-4 md:px-8 max-w-full lg:max-w-5xl mx-auto">
        {/* Full width content that adapts to smaller and larger screens */}
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            My Grades
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"></div>
        </div>
        <p className="text-base md:text-lg max-w-3xl mx-auto">
          Take a look at my academic achievements, reflecting my commitment to learning and continuous growth.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-full lg:max-w-5xl px-4 md:px-8 mx-auto">
        {/* Full width moving cards with max-w-5xl */}
        {/* First row - Moves left */}
        <InfiniteMovingCards items={grades} direction="left" speed="slow" />
        {/* Second row - Moves right */}
        <InfiniteMovingCards items={grades} direction="right" speed="slow" />
      </div>
    </section>
  );
};

export default MyGrades;
