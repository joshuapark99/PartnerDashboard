import axios from 'axios';

// Create an Axios instance with a base URL for the API
const api = axios.create({
baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',  // Set content type for JSON requests
  },
});

api.interceptors.response.use(
  (response) => response,  // Pass through successful responses
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error); 
  }
);

export default api;
