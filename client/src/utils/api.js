import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ai-chat-bot-wmqa.onrender.com/api',
  timeout: 1000, // Set timeout to 10 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      // Return the error message from the server
      return Promise.reject({
        ...error,
        message: error.response.data.message || 'An error occurred'
      });
    }
    
    return Promise.reject({
      ...error,
      message: 'Network error occurred'
    });
  }
);

export default api; 