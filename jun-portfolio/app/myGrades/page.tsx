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
  { text: "Information Security Technologies - B+" },
  { text: "Enterprise Networks - C-" },
  { text: "Contemporary Issues in Software Engineering - B+" },
  { text: "Web Development - A+" }
];

const MyGrades: React.FC = () => {
  return (
    <section 
      className="w-full min-h-screen py-20 text-white relative overflow-hidden" // Add overflow-hidden to prevent scrolling
      style={{
        backgroundImage: "url('https://3d-assets-portfolio.s3-ap-southeast-2.amazonaws.com/material/darkBG.gif')", // Path to your new GIF
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // Fix the background so it doesn't move with scrolling
      }}
    >
      {/* Text content */}
      <div className="text-center space-y-6 mb-16 w-full px-4 md:px-8 max-w-full lg:max-w-3xl mx-auto">
        {/* Responsive heading */}
        <div className="flex items-center justify-center space-x-4">
          <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            My Grades
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"></div>
        </div>
        <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
          Take a look at my academic achievements, reflecting my commitment to learning and continuous growth.
        </p>
      </div>

      {/* Moving Cards Section */}
      <div className="container mx-auto flex flex-col items-center justify-center space-y-6 w-full">
        {/* First row - Moves left */}
        <InfiniteMovingCards items={grades} direction="left" speed="slow" />
        {/* Second row - Moves right */}
        <InfiniteMovingCards items={grades} direction="right" speed="slow" />
      </div>
    </section>
  );
};

export default MyGrades;
