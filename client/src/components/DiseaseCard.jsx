// src/components/DiseaseCard.jsx
import React from 'react';

const DiseaseCard = ({ disease, description, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <img src={image} alt={disease} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{disease}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default DiseaseCard;
