// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <motion.section 
      className="bg-cover bg-center h-[60vh] flex justify-center items-center text-white"
      style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SkinPredict</h1>
        <p className="text-lg">Use AI to predict skin diseases from images or symptoms.</p>
      </div>
    </motion.section>
  );
};

export default HeroSection;
