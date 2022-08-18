import axios from 'axios'
import { store }  from "redux/store";

// // Create axios instance
const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASENAME
});

// // Add a request interceptor
AxiosInstance.interceptors.request.use(
  config => {
  const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept'] = 'application/json';
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default AxiosInstance;