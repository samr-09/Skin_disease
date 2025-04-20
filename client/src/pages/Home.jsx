// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { partnerLogos } from './partnerLogos';
import { FaClock, FaCheckCircle, FaGlobe } from 'react-icons/fa';
import {
  FaRobot, FaUserFriends, FaHistory, FaUserMd,
  FaEye, FaLock, FaUserInjured, FaStethoscope, FaMicroscope
} from 'react-icons/fa';

import skin1 from '../assets/skin1.jpg';
import skin2 from '../assets/skin2.jpg';
import skin3 from '../assets/skin3.jpg';
import skin4 from '../assets/skin4.jpg';

const images = [skin1, skin2, skin3, skin4];

const features = [
  { title: "AI-Based Detection", desc: "Upload a photo and get accurate skin disease predictions instantly.", icon: <FaRobot className="text-pink-500 text-3xl mb-2" /> },
  { title: "User Friendly", desc: "Simple interface for both patients and doctors.", icon: <FaUserFriends className="text-pink-500 text-3xl mb-2" /> },
  { title: "Prediction History", desc: "Track and analyze previous results anytime.", icon: <FaHistory className="text-pink-500 text-3xl mb-2" /> },
  { title: "Expert Suggestions", desc: "Get suggestions from verified dermatologists.", icon: <FaUserMd className="text-pink-500 text-3xl mb-2" /> },
  { title: "Heatmap Analysis", desc: "Visualize which area triggered the prediction using Grad-CAM.", icon: <FaEye className="text-pink-500 text-3xl mb-2" /> },
  { title: "Fast & Secure", desc: "Your data is encrypted and privacy is our priority.", icon: <FaLock className="text-pink-500 text-3xl mb-2" /> },
];

const userSolutions = [
  { title: "Patients", desc: "Get instant skin disease predictions and expert suggestions.", icon: <FaUserInjured className="text-blue-600 text-4xl mb-3" /> },
  { title: "Doctors", desc: "Provide quick and accurate diagnoses backed by AI.", icon: <FaStethoscope className="text-blue-600 text-4xl mb-3" /> },
  { title: "Researchers", desc: "Analyze skin disease trends and insights with our data.", icon: <FaMicroscope className="text-blue-600 text-4xl mb-3" /> },
];

const impactStats = [
  { icon: <FaClock className="text-pink-500 text-4xl mb-3" />, stat: "2 Seconds", desc: "Average prediction time" },
  { icon: <FaCheckCircle className="text-pink-500 text-4xl mb-3" />, stat: "99%", desc: "Prediction accuracy rate" },
  { icon: <FaGlobe className="text-pink-500 text-4xl mb-3" />, stat: "10k+", desc: "Users served globally" },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-white to-blue-300 flex flex-col items-center px-2 sm:px-4 py-8 sm:py-12">

      {/* Login/Signup Prompt */}
      <motion.div
        className="text-center mb-16 sm:mb-20 w-full max-w-4xl bg-white shadow-xl rounded-2xl py-8 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">New to SkinPredict?</h2>
        <p className="text-gray-600 mb-5 text-sm sm:text-base">
          Create an account or log in to track your skin health journey, access history, and more.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition text-sm shadow">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition text-sm shadow">
              Sign Up
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden mb-16 sm:mb-20 relative"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full h-[18rem] sm:h-[24rem] md:h-[32rem]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`slide-${currentIndex}`}
              className="absolute w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg">SkinPredict</h1>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-2xl font-light">AI-powered skin disease detection in seconds.</p>
            <Link to="/predict">
              <button className="mt-4 sm:mt-6 px-5 sm:px-6 py-2 sm:py-3 rounded-full bg-pink-600 hover:bg-pink-700 transition text-white text-sm sm:text-base font-medium shadow-lg">
                Start Your Diagnosis
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Trusted By */}
      <motion.div className="text-center mb-16 sm:mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 sm:mb-8">Trusted by Leading Healthcare Partners</h2>
        <div className="flex justify-center flex-wrap gap-4 sm:gap-8">
          {partnerLogos.map((logo, index) => (
            <img key={index} src={logo} alt={`partner-${index}`} className="w-28 sm:w-40 h-16 sm:h-20 object-contain grayscale hover:grayscale-0 transition" />
          ))}
        </div>
      </motion.div>

      {/* AI Features */}
      <motion.div className="text-center mb-16 sm:mb-20 w-full max-w-6xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 sm:mb-10">AI Features for Accurate Diagnosis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-xl border-l-4 border-pink-500 hover:shadow-2xl transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Solution For Everyone */}
      <motion.div className="text-center mb-16 sm:mb-20 w-full max-w-5xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 sm:mb-10">A Solution for Everyone</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
          {userSolutions.map((user, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-2xl transition">
              <div className="flex justify-center">{user.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-700">{user.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{user.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Impact Stats */}
      <motion.div className="text-center mb-16 sm:mb-20 w-full max-w-5xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 sm:mb-10">Impact Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {impactStats.map((item, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700">{item.stat}</h3>
              <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action Section */}
<motion.div
  className="bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-3xl shadow-xl px-6 sm:px-12 py-10 sm:py-14 text-center w-full max-w-6xl mb-16 sm:mb-20"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.75 }}
>
  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to take control of your skin health?</h2>
  <p className="text-sm sm:text-base mb-6">Start your AI-powered diagnosis today and receive expert guidance in seconds.</p>
  <Link to="/predict">
    <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition text-sm sm:text-base">
      Get Started Now
    </button>
  </Link>
</motion.div>

{/* Footer */}
<footer className="bg-white shadow-inner w-full py-8 px-4 sm:px-10 text-center border-t">
  <p className="text-gray-600 text-sm">
    &copy; {new Date().getFullYear()} <span className="font-semibold text-pink-600">SkinPredict</span>. All rights reserved.
  </p>
  <div className="flex justify-center gap-4 mt-3 text-sm text-blue-600 font-medium">
    <Link to="/terms" className="hover:underline">Terms</Link>
    <Link to="/privacy" className="hover:underline">Privacy</Link>
    <Link to="/contact" className="hover:underline">Contact</Link>
  </div>
</footer>

    </div>
  );
};

export default Home;
