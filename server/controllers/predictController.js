import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import Prediction from '../models/Prediction.js';

export const predictDisease = async (req, res) => {
  try {
    const image = req.file;
    const { symptoms } = req.body;

    let prediction;

    if (image) {
      const imagePath = image.path;

      const python = spawn('python', [
        path.join('skin_disease_ml', 'predict.py'),
        imagePath
      ]);

      let output = '';
      let error = '';

      python.stdout.on('data', (data) => {
        output += data.toString();
      });

      python.stderr.on('data', (data) => {
        error += data.toString();
      });

      python.on('close', (code) => {
        // Delete uploaded image
        fs.unlink(imagePath, () => {});

        if (code !== 0) {
          return res.status(500).json({ success: false, error: error || 'Prediction failed' });
        }

        const lines = output.trim().split('\n');
        const disease = lines.find(line => line.includes('Disease prediction:'))?.split(':')[1]?.trim();
        const confidenceRaw = lines.find(line => line.includes('Confidence score:'))?.split(':')[1]?.trim();
        const confidence = confidenceRaw ? parseFloat(confidenceRaw.replace('%', '')) : null;

        prediction = {
          disease: disease || 'Unknown',
          confidence: confidence || 0,
          severity: 'Moderate',
          multiDiseases: [disease]
        };

        return res.status(200).json({
          success: true,
          data: prediction,
          imagePath,
          symptoms,
        });
      });
    } else {
      // If no image, use symptom-based dummy prediction
      if (symptoms === 'itching') {
        prediction = {
          disease: 'Fungal infection',
          confidence: 80,
          severity: 'Low',
          multiDiseases: ['Fungal infection'],
        };
      } else {
        prediction = {
          disease: 'Unknown disease',
          confidence: 0,
          severity: 'Unknown',
          multiDiseases: [],
        };
      }

      res.status(200).json({
        success: true,
        data: prediction,
        imagePath: null,
        symptoms,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Prediction failed', err });
  }
};
