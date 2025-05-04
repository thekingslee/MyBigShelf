import { axiosInstance } from "./api-client";
import { AxiosRequestConfig } from "axios";

class HttpsServices<T> {
  endpoint: string;
  requiresAuth: boolean;

  constructor(endpoint: string, requiresAuth: boolean = false) {
    this.endpoint = endpoint;
    this.requiresAuth = requiresAuth;
  }

  private getConfig(): AxiosRequestConfig {
    return {
      headers: {
        requiresAuth: this.requiresAuth
      }
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll = (id?: string, params?: Record<string, any>) => {
    let url = this.endpoint;
    if (id) {
      url = `${this.endpoint}/${id}`;
    }
    if (params) {
      const queryParams = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      url = `${url}?${queryParams}`;
    }
    return axiosInstance.get<T>(url, this.getConfig()).then((res) => res.data);
  };

  post(payload: T) {
    return axiosInstance
      .post<T>(this.endpoint, payload, this.getConfig())
      .then((res) => res.data);
  }
}

export default HttpsServices;