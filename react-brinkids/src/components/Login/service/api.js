import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000"
});

axios.interceptors.request.use(async config => {
  const token = getToken();
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;