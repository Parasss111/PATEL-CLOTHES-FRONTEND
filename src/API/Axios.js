import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://patel-clothes-backend.onrender.com",
  withCredentials: true, // ⭐ REQUIRED for cookies
});

export default api;
