import axios from 'axios';

// Ini akan menunjuk ke server lokal yang sedang dibuat oleh BE
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', 
});

export default axiosInstance;