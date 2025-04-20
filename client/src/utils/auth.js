// src/utils/auth.js

// Function to check if the user is logged in by checking if a token exists
export const isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false;
  };
  
  // Function to save the authentication token in localStorage
  export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Function to remove the authentication token (logout)
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  // Function to get the token from localStorage
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  