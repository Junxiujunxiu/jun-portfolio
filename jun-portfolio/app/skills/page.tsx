'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Sample skills data, you can adjust this to your actual skills
const skills = [
  {
    id: 1,
    name: "JavaScript",
    level: "Expert",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
  },
  {
    id: 2,
    name: "React",
    level: "Advanced",
    icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
  },
  {
    id: 3,
    name: "Node.js",
    level: "Intermediate",
    icon: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 4,
    name: "CSS",
    level: "Advanced",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Skills = () => {
  return (
    <div
      className="py-20 w-full text-white font-fantasy relative"
      style={{
        backgroundImage: `url('/world.jpg')`,
        backgroundSize: 'cover',  // Ensures the background image covers the whole area
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Glowing Orbs */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300 opacity-10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400 opacity-10 rounded-full blur-2xl animate-pulse"></div>

      {/* Title */}
      <motion.h1
        className="heading text-6xl font-bold text-center mb-12 animate-glow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ color: 'rgba(255, 255, 255, 0.9)' }} // Semi-transparent text
      >
        My <span className="text-yellow-300">Journey of Skills</span>
      </motion.h1>

      {/* Skills Section */}
      <motion.div
        className="w-full mt-12 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            className="rounded-xl p-5 border-2 shadow-lg transition-shadow duration-300"
            style={{
              background: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
              borderColor: 'rgba(255, 255, 255, 0.2)', // Light border
            }}
            variants={itemVariants}
          >
            <motion.div
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={skill.icon}
                alt={skill.name}
                className="w-20 h-20 object-contain mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 300 }}
                style={{ opacity: 0.8 }} // Slightly transparent icon
              />
              <h1 className="text-2xl font-bold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{skill.name}</h1>
              <p className="text-md mt-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{skill.level}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Section: Milestones (Projects) */}
      <div className="mt-20">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 animate-glow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: 'rgba(255, 255, 255, 0.9)' }} // Semi-transparent text
        >
          Milestones on My <span className="text-yellow-300">Journey</span>
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="w-80 p-5 border-2 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-float"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            style={{
              background: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
              borderColor: 'rgba(255, 255, 255, 0.2)', // Light border
            }}
          >
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Milestone A</h3>
            <p className="text-md" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              A significant step on my journey, where I overcame challenges and developed key skills.
            </p>
          </motion.div>

          <motion.div
            className="w-80 p-5 border-2 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-float"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            style={{
              background: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
              borderColor: 'rgba(255, 255, 255, 0.2)', // Light border
            }}
          >
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Milestone B</h3>
            <p className="text-md" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              A project that marked a turning point, teaching me valuable lessons and honing my expertise.
            </p>
          </motion.div>

          <motion.div
            className="w-80 p-5 border-2 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-float"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            style={{
              background: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
              borderColor: 'rgba(255, 255, 255, 0.2)', // Light border
            }}
          >
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Milestone C</h3>
            <p className="text-md" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              A challenging yet rewarding experience that contributed significantly to my journey.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Additional Section: Reflections (Testimonials) */}
      <div className="mt-20">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 animate-glow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: 'rgba(255, 255, 255, 0.9)' }} // Semi-transparent text
        >
          Reflections on My <span className="text-yellow-300">Journey</span>
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="w-80 p-5 border-2 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-float"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            style={{
              background: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
              borderColor: 'rgba(255, 255, 255, 0.2)', // Light border
            }}
          >
            <p className="text-md" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              "This journey has been transformative, each milestone bringing me closer to mastering my craft."
            </p>
            <h3 className="text-2xl font-bold mt-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Traveler A</h3>
          </motion.div>

          <motion.div
            className="w-80 p-5 border-2 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-float"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            style={{
              background: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
              borderColor: 'rgba(255, 255, 255, 0.2)', // Light border
            }}
          >
            <p className="text-md" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              "Each project is a step on a path of continuous learning and growth."
            </p>
            <h3 className="text-2xl font-bold mt-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Traveler B</h3>
          </motion.div>

          <motion.div
            className="w-80 p-5 border-2 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 animate-float"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            style={{
              background: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
              borderColor: 'rgba(255, 255, 255, 0.2)', // Light border
            }}
          >
            <p className="text-md" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              "The journey is ongoing, and with each step, I grow more confident in my skills."
            </p>
            <h3 className="text-2xl font-bold mt-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Traveler C</h3>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
