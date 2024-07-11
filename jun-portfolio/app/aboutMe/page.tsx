// app/aboutMe/page.tsx
"use client"
import React from 'react';
import Slideshow from '../../components/Slideshow';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
        About Me
      </h1>
      <Slideshow />
    </div>
  );
};

export default About;
