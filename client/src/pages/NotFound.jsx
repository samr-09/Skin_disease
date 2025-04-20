
// src/pages/NotFound.jsx
import React from 'react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div className="flex justify-center items-center min-h-screen bg-gray-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-4xl font-bold text-red-500">404 - Not Found</h2>
        <p className="mt-4">The page you are looking for does not exist.</p>
      </div>
    </motion.div>
  );
};

export default NotFound;
