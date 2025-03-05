import axios from 'axios';

// Set the base URL for your API calls
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this if your backend is running on a different port
});

export default api;
