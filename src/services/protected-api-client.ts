import router from "@/routes/Router";
import { useCartStore } from "@/stores/cartStore";
import axios from "axios";

// Function to validate JWT structure
const isValidJWT = (token: string): boolean => {
  // Basic JWT structure validation (header.payload.signature)
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  // Check if each part is base64 encoded
  try {
    parts.forEach((part) => {
      if (!part) return false;
      // Replace - with + and _ with / for base64 URL decode
      const cleaned = part.replace(/-/g, "+").replace(/_/g, "/");
      window.atob(cleaned);
    });
    return true;
  } catch {
    return false;
  }
};

const protectedInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

protectedInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");

    // Check if token exists and is valid JWT format
    if (token && isValidJWT(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Token is missing or invalid - clear auth state
      localStorage.clear();
      useCartStore.getState().setIsAuthenticated(false);
      router.navigate("/", { replace: true });
      throw new axios.Cancel("Invalid token detected");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

protectedInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 ||
        error.response?.status === 403 ||
        error.response?.status === 500
      ) {
        localStorage.clear();
        useCartStore.getState().setIsAuthenticated(false);
        router.navigate("/", { replace: true });
      }
    }
    return Promise.reject(error);
  }
);

export default protectedInstance;
