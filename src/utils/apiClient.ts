// utils/apiClient.ts

import axios from "axios";
import { getFromLocalStorage } from "./localStorage";

const API = "https://krshak.onrender.com/api/v1" // "http://192.168.43.83:5001/api/v1" //"https://krshak.onrender.com/api/v1" //; import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; // or your existing API URL

const apiClient = axios.create({
  baseURL: API,
});

// Add a request interceptor to include token
apiClient.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
