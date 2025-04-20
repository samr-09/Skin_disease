import api from '../utils/api';

export const predictSkinDisease = async (imageFile, symptoms) => {
  const formData = new FormData();
  if (imageFile) formData.append('image', imageFile);
  if (symptoms) formData.append('symptom', symptoms);

  try {
    const res = await api.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    console.error('Prediction error:', err);
    throw err;
  }
};
