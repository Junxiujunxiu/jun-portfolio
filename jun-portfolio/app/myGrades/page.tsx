// app/myGrades/page.tsx
import React from 'react';

const MyGrades: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-4">My Grades</h1>
      <p className="text-lg mb-2">Here are my grades...</p>
      {/* Add more content about your grades */}
    </div>
  );
};

export default MyGrades;
