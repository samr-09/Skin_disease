// src/components/VoiceInput.jsx
import React, { useState } from 'react';
import React from 'react';
const VoiceInput = ({ onVoiceInput }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState('');

  const startRecording = () => {
    setIsRecording(true);
    setMessage('');
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      onVoiceInput(transcript);  // Pass the voice input to parent component
    };
    recognition.start();
  };

  return (
    <div>
      <button
        onClick={startRecording}
        className={`py-2 px-4 ${isRecording ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-md`}
      >
        {isRecording ? 'Recording...' : 'Start Voice Input'}
      </button>
      {message && <p className="mt-2 text-center">Heard: {message}</p>}
    </div>
  );
};

export default VoiceInput;
