// api.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/'; // Replace this with your API endpoint

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // Set a timeout (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});

export default axiosInstance;
