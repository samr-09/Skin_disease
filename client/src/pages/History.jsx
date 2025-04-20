// src/pages/History.jsx
import React from 'react';
import { motion } from 'framer-motion';

const History = () => {
  return (
    <motion.div className="flex justify-center items-center min-h-screen bg-gray-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-center text-2xl font-bold mb-4">History</h2>
        <p className="text-center">Your past predictions and activities will appear here.</p>
      </div>
    </motion.div>
  );
};

export default History;
