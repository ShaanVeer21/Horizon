// frontend/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://horizon-backend-6mbl.onrender.com',
  withCredentials: true,
});

export default api;
