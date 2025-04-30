import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// reponse middleware
axiosInstance.interceptors.response.use(
  (response) => response?.data || response
);


// request middleware
axiosInstance.interceptors.request.use(
  (request) => {
    return request
  }
);

export default axiosInstance;
