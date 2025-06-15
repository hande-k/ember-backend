// src/api/axios.ts
import axios from "axios";

// Axios-Instanz
const api = axios.create({
  baseURL: "/api", // wichtig für Vite Proxy
});

// Interceptor: Hänge automatisch den Token an jeden Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
