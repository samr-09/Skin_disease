// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">SkinPredict</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/predict" className="text-white">Predict</Link>
          <Link to="/profile" className="text-white">Profile</Link>
          <Link to="/contact" className="text-white">Contact</Link>
          <Link to="/about" className="text-white">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
