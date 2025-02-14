import { useEffect } from "react";
import axios from "axios";
import { useAdminContext } from "../context/Admin";
import useAxios from "./useAxios";

const useAuth = () => {
  const API = useAxios();
  const { accessToken, setAccessToken, logout, admin, login } =
    useAdminContext();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const { data } = await API.get(
          process.env.REACT_APP_API_URL + "refresh",
          { withCredentials: true }
        );
        setAccessToken(data.accessToken);
        login(data.admin);
      } catch (error) {
        logout();
      }
    };

    if (!accessToken) {
      refreshAccessToken();
    }
  }, [accessToken, setAccessToken, logout, login]);

  return { accessToken, admin };
};

export default useAuth;
