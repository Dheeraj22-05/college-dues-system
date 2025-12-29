import axios from "axios";

const API = axios.create({
  baseURL: "https://college-dues-backend.onrender.com/api",
});

// attach token to every request (later use)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
