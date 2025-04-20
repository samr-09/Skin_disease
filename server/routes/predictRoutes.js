import express from 'express';
import multer from 'multer';
import { predictDisease, savePrediction, getHistory } from '../controllers/predictController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Predict with image + symptoms
// Only authenticated users can access this route
router.post('/predict', verifyToken, upload.single('image'), predictDisease);

// Save result after ML response
// Only authenticated users can save the prediction result
router.post('/save', verifyToken, savePrediction);

// Fetch user's prediction history
// Only authenticated users can access their history
router.get('/history', verifyToken, getHistory);

export default router;
