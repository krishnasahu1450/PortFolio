// src/services/apiInstance.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "sonner";

const BaseURL = import.meta.env.VITE_API_BASE_URL || "http://192.168.31.34:5000";
const APIPrefix = import.meta.env.VITE_API_PREFIX || "/api";
const APIVersion = import.meta.env.VITE_API_VERSION || "v1";

export const apiInstance = axios.create({
  baseURL: `${BaseURL}${APIPrefix}/${APIVersion}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional, if using cookies
});

// Request interceptor to attach token
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  // Remove JSON header if FormData
  if (config.data instanceof FormData) {
    config.headers.delete("Content-Type");
  }

  return config;
});

// Response interceptor to handle global errors
apiInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      // Network error
      toast.error(`Network Error: ${error.message}`);

    } else {
      const status = error.response.status;
      const message = (error.response.data as any)?.error || error.message;

      if (status === 401) {
        // Unauthorized
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        window.location.href = "/admin"; // redirect to login
      } else if (status >= 400 && status < 500) {
        toast.error(`Client Error: ${message}`);
      } else if (status >= 500) {
        toast.error(`Server Error: ${message}`);
      }
    }

    return Promise.reject(error);
  }
);
