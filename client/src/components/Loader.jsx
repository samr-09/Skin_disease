// src/components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-blue-600 rounded-full" role="status"></div>
    </div>
  );
};

export default Loader;
