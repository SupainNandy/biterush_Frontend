import axios from 'axios';

// Base Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Update this for production
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
