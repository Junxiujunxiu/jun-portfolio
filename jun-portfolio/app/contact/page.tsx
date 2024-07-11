// app/contact/page.tsx
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-black">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="text-lg mb-2">You can contact me at...</p>
      {/* Add more contact information */}
    </div>
  );
};

export default Contact;
