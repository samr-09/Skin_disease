import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: String,
  symptoms: String,
  disease: String,
  confidence: Number,
  severity: String,
  multiDiseases: [String],
}, { timestamps: true });

export default mongoose.model('Prediction', predictionSchema);
