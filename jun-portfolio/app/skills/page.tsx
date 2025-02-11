'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Updated skills data to reflect your focus and current expertise level
const skills = [
  {
    id: 1,
    name: "Java",
    level: "Junior",
    icon: "https://cdn-icons-png.flaticon.com/512/226/226777.png", // Java icon
  },
  {
    id: 2,
    name: "JavaScript",
    level: "Junior",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", // JavaScript icon
  },
  {
    id: 3,
    name: "TypeScript",
    level: "Junior",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png", // TypeScript icon
  },
  {
    id: 4,
    name: "MongoDB",
    level: "Junior",
    icon: "https://cdn-icons-png.flaticon.com/512/919/919836.png", // MongoDB icon
  },
  {
    id: 5,
    name: "React",
    level: "Junior",
    icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png", // React icon
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
        backgroundImage: `url('https://3d-assets-portfolio.s3-ap-southeast-2.amazonaws.com/material/world.jpg')`,
        backgroundSize: 'cover',
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
        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
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

      {/* Milestones Section */}
      <div className="mt-20">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 animate-glow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
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
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Deepening Focus</h3>
            <p className="text-md" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              After being exposed to various technologies, I decided to narrow my focus on mastering Java, React, TypeScript, and MongoDB to build comprehensive full-stack applications.
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
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Full-Stack Development</h3>
            <p className="text-md" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Developed full-stack applications integrating front-end frameworks like React with back-end services using Node.js and MongoDB, enhancing my practical understanding of these technologies.
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
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Problem-Solving and Algorithms</h3>
            <p className="text-md" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Applied algorithmic thinking to solve complex problems using Java, focusing on performance and efficiency, while continuing to learn and strengthen my problem-solving skills.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Reflections Section */}
      <div className="mt-20">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 animate-glow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
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
              &quot;Narrowing my focus has allowed me to build deeper expertise in a few core areas, providing me with a stronger foundation as I continue to learn.&quot;
            </p>
            <h3 className="text-2xl font-bold mt-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>My Reflection</h3>
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
              &quot;Each new project has allowed me to apply my growing skills in real-world scenarios, helping me learn and improve.&quot;
            </p>
            <h3 className="text-2xl font-bold mt-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Project Experience</h3>
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
              &quot;My journey is about continuous learning and improvement. I&apos;m focused on becoming proficient in the technologies I&apos;m passionate about.&quot;
            </p>
            <h3 className="text-2xl font-bold mt-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Looking Forward</h3>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
