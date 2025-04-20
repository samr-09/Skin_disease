// src/components/Toast.jsx
import React from 'react';
import React, { useState, useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
      <p className="text-white">{message}</p>
    </div>
  );
};

export default Toast;
