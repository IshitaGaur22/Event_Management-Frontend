import axios from "axios";

// Create a new axios instance
const api = axios.create({
  baseURL: "https://localhost:7283/api", // Your Event API URL
});

// This is an "interceptor" that adds the token to *every* request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;