// components/Slideshow.tsx
import React, { useState, useEffect } from 'react';

const contents = [
  "Hi, I'm Jun. Currently in my third year, penultimate semester of my final year at Auckland University of Technology.",
  "I'm majoring in Software Development in Computer and Information Science. I'm a fast learner and have a passion for innovation.",
  "In a world driven by AI, I believe the key is to be creative and innovative in ideas and concepts.",
  "Hobbies: Watching horror movies, learning new programming languages, bodybuilding.",
  "Personality: INTP. I prefer focusing on my work over engaging in unnecessary distractions."
];

const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (currentIndex < contents.length - 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 2000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    } else {
      // When the last content is shown, stop the slideshow and show all cards
      setTimeout(() => setShowAll(true), 2000); // Wait for the last slide to show for 3 seconds before displaying all
    }
  }, [currentIndex]);

  if (showAll) {
    return (
      <div className="flex flex-wrap justify-center">
        {contents.map((content, index) => (
          <div key={index} className="max-w-md p-8 m-4 bg-white text-black rounded-lg shadow-lg bg-opacity-70 backdrop-filter backdrop-blur-lg">
            <p className="text-lg mb-4">{content}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {contents.map((content, index) => (
        <div
          key={index}
          className={`absolute transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="max-w-md p-8 bg-white text-black rounded-lg shadow-lg bg-opacity-70 backdrop-filter backdrop-blur-lg">
            <p className="text-lg mb-4">{content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
