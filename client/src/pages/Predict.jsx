import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { predictSkinDisease } from '../services/predictService';

const Predict = () => {
  const [image, setImage] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState(null); // Initially set to null
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePrediction = async () => {
    if (!image && !symptoms.trim()) {
      return; // Do nothing if both image and symptoms are empty
    }

    setPrediction(null); // Reset previous prediction
    setLoading(true);

    // Show a dummy prediction result while loading
    setPrediction({
      prediction: 'Psoriasis',
      confidence: '85%',
      advice: 'Consider consulting a dermatologist for a proper diagnosis and treatment.'
    });

    try {
      const formData = new FormData();
      if (image) formData.append('image', image);
      if (symptoms.trim()) formData.append('symptom', symptoms);

      // Replace the dummy prediction once the API response is received
      const result = await predictSkinDisease(formData);
      setPrediction(result); // Set the prediction result after API call
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-blue-700 mb-6">
          Skin Disease Prediction
        </h2>

        {/* Image Upload */}
        <div className="mb-5">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
            Upload an Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Symptoms Input */}
        <div className="mb-5">
          <label htmlFor="symptoms" className="block text-gray-700 font-medium mb-1">
            Or Enter Symptoms
          </label>
          <textarea
            id="symptoms"
            rows="4"
            placeholder="E.g., red rash, itchy skin, dry patches..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none"
          ></textarea>
        </div>

        {/* Prediction Button */}
        <button
          onClick={handlePrediction}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-colors text-white font-bold py-2 rounded-lg"
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>

        {/* Loading */}
        {loading && (
          <p className="text-center text-blue-500 font-medium mt-4">Analyzing... Please wait</p>
        )}

        {/* Prediction Result */}
        {prediction && (
          <motion.div
            className="mt-6 bg-gradient-to-br from-purple-100 to-blue-50 p-5 rounded-xl shadow-lg border border-purple-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-center text-purple-800 mb-2">Prediction Result</h3>
            <p className="text-center text-gray-700">
              <strong>Disease:</strong> {prediction.prediction}
            </p>
            <p className="text-center text-gray-700">
              <strong>Confidence:</strong> {prediction.confidence}
            </p>
            <p className="text-center text-gray-700 mt-2 italic">{prediction.advice}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Predict;
