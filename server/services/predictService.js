import fs from 'fs';
import multer from 'multer';
import path from 'path';

// Setup file upload using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).single('image'); // Expecting 'image' as the field name

// Import your prediction logic from runPrediction
import { runPrediction } from './runPrediction';

// Function to handle prediction logic
const predictSkinDisease = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to upload image.' });
    }

    try {
      const { symptoms } = req.body; // Symptoms from the request body
      const imagePath = req.file ? req.file.path : null; // Image file path

      // Validate if image or symptoms are provided
      if (!imagePath && !symptoms) {
        return res.status(400).json({ message: 'Please provide an image or symptoms.' });
      }

      // Call your runPrediction function to get the prediction result
      const predictionResult = await runPrediction({ imagePath, symptom: symptoms });

      // Return the prediction result
      return res.status(200).json(predictionResult);
    } catch (error) {
      console.error('Error in prediction:', error);
      return res.status(500).json({ message: 'Prediction failed. Please try again later.' });
    }
  });
};

export { predictSkinDisease };
