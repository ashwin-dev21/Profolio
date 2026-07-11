// src/configs/api.js
import axios from "axios";

const api = axios.create({
  // During development (npm run dev), we want the baseURL to be '/'
  // In production, we'll use an environment variable.
  baseURL: import.meta.env.MODE === 'development' ? '/' : import.meta.env.VITE_BASE_URL,
});

export default api;