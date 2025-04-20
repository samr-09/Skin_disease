// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div className="flex justify-center items-center min-h-screen bg-gray-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-center text-2xl font-bold mb-4">About Us</h2>
        <p className="text-center">
          We are a dedicated team focused on helping people predict and diagnose skin diseases through AI-powered technology.
        </p>
        <p className="mt-4 text-center">This platform uses cutting-edge machine learning models to identify skin diseases from images or symptoms.</p>
      </div>
    </motion.div>
  );
};

export default About;
