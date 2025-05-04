
import Airtable from "airtable";
import axios from "axios";

export const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Only add the token if requiresAuth is true
    if (config.headers['requiresAuth']) {
      const token = localStorage.getItem('jwt');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // Remove the custom requiresAuth header
    delete config.headers['requiresAuth'];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);