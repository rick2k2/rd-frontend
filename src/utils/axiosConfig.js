import axios from "axios";
import { getToken } from "./auth";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api", local host server
  baseURL: "https://rd-backend-jb01.onrender.com/api", //render server
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
