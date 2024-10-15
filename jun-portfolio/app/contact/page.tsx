"use client";
import React, { useState } from 'react';
import '@fontsource/cinzel-decorative';  // Import the font after installation

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      setStatus(result.message);
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(true);
    } catch (error) {
      setStatus('Error sending message. Please try again.');
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-6 text-white"
      style={{
        backgroundImage: "url('/darkBG.gif')",  // Background image with fantasy theme
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat",
        fontFamily: "'Cinzel Decorative', serif",  // Fantasy-style font
      }}
    >
      <h1 
        className="text-5xl font-extrabold mb-8 glow-text"
        style={{ textShadow: '0 0 10px #ff8a00, 0 0 20px #ff0080' }}  // Glowing effect
      >
        Contact Me
      </h1>
      <p className="text-xl mb-6" style={{ fontFamily: "'Almendra Display', serif", fontWeight: 'bold' }}>
        I&apos;d love to hear from you!
      </p>

      {/* Conditional rendering for Thank You message */}
      {submitted ? (
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col w-full max-w-lg text-black">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Thank You!</h2>
          <p className="text-center">Thank you for contacting me. I will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl flex flex-col w-full max-w-lg">
          <label className="mb-4 text-black fantasy-label">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full p-2 fantasy-input"
              required
            />
          </label>
          
          <label className="mb-4 text-black fantasy-label">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 fantasy-input"
              required
            />
          </label>
          
          <label className="mb-4 text-black fantasy-label">
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 w-full p-2 fantasy-input"
              rows={4}
              required
            />
          </label>

          <button 
            type="submit" 
            className="bg-purple-600 hover:bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 transition-all glowing-button"
          >
            Send Message
          </button>

          {status && <p className="mt-4 text-lg text-center">{status}</p>}
        </form>
      )}
    </div>
  );
};

export default Contact;
