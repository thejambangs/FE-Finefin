import axios from 'axios';

const axiosInstance = axios.create({
  // Pastikan URL dan port sesuai dengan laptop BE 1
  baseURL: 'http://localhost:5000', 
});

// Otomatis tempelkan token JWT dari login
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export default axiosInstance;