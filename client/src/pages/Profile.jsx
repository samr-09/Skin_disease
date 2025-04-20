import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Edit2, Save, User, Mail } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (err) {
          console.log('Failed to fetch user:', err);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setNewName(user.name);
    setNewEmail(user.email);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const updatedUser = { name: newName, email: newEmail };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/user`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(updatedUser);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.log('Error updating profile:', err);
      setMessage('Error updating profile');
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl shadow-inner">
            <User size={40} />
          </div>
          <h2 className="text-2xl font-bold mt-4 text-gray-800">Your Profile</h2>
          <p className="text-sm text-gray-500">Manage your personal info</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <User size={16} /> Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            ) : (
              <p className="mt-1 px-4 py-2 bg-gray-50 rounded-md">{user.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            ) : (
              <p className="mt-1 px-4 py-2 bg-gray-50 rounded-md">{user.email}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition"
            >
              <Save size={16} /> Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow transition"
            >
              <Edit2 size={16} /> Edit
            </button>
          )}
        </div>

        {message && (
  <div
    className={`mt-4 text-center text-sm flex justify-center items-center gap-2 ${
      message.toLowerCase().includes('error') ? 'text-red-600' : 'text-green-600'
    }`}
  >
    <CheckCircle size={16} /> {message}
  </div>
)}

      </div>
    </motion.div>
  );
};

export default Profile;
