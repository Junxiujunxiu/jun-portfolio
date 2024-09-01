'use client';

import React from 'react';
import { InfiniteMovingCards } from '../../UI/InfiniteMovingCards'; // Adjust the path if necessary

const grades = [
  { text: "Mathematics - A" },
  { text: "Computer Science - A+" },
  { text: "Physics - B+" },
  { text: "Chemistry - A-" },
  { text: "History - B" },
  { text: "Biology - A" },
  { text: "English - A" },
  { text: "Art - B+" },
];

const MyGrades: React.FC = () => {
  return (
    <section className="w-full py-20 text-white relative">
      <div className="text-center space-y-6 mb-16">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
          <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            My Grades
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"></div>
        </div>
        <p className="text-lg max-w-3xl mx-auto">
          Explore my academic achievements that showcase my dedication to learning and growth.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        {/* First row - Moves left */}
        <InfiniteMovingCards items={grades} direction="left" speed="slow" />
        {/* Second row - Moves right */}
        <InfiniteMovingCards items={grades} direction="right" speed="slow" />
        {/* Third row - Moves left */}
        <InfiniteMovingCards items={grades} direction="left" speed="slow" />
      </div>
    </section>
  );
};

export default MyGrades;
