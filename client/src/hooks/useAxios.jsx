import axios from "axios";
import { useEffect } from "react";
import { useAdminContext } from "../context/Admin";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const useAxios = () => {
  const { accessToken, setAccessToken, logout } = useAdminContext();

  useEffect(() => {
    // 🟢 Request Interceptor: Attach Access Token
    API.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 🔴 Response Interceptor: Handle Token Expiry (401)
    API.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            // Attempt to refresh accessToken
            const { data } = await axios.get(
              process.env.REACT_APP_API_URL + "refresh",
              { withCredentials: true }
            );
            setAccessToken(data.accessToken);
            // Retry the failed request with new token
            error.config.headers.Authorization = `Bearer ${data.accessToken}`;
            return API(error.config);
          } catch {
            logout(); // Refresh failed, logout user
          }
        }
        return Promise.reject(error);
      }
    );
  }, [accessToken, setAccessToken, logout]);

  return API;
};

export default useAxios;
