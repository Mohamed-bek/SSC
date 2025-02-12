import { create } from "zustand";
import axios from "axios";

export const useAdminContext = create((set) => {
  return {
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    accessToken: JSON.parse(localStorage.getItem("accessToken")) || null,

    login: (adminData) => {
      set({ admin: adminData });
      localStorage.setItem("admin", JSON.stringify(adminData));
    },

    setAccessToken: (token) => {
      set({ accessToken: token });
      localStorage.setItem("accessToken", JSON.stringify(token));
    },

    logout: async () => {
      try {
        await axios.post(
          process.env.REACT_APP_API_URL + "logout",
          {},
          { withCredentials: true }
        );
      } catch (error) {
        console.log("Error In Logout");
      } finally {
        set({ admin: null, accessToken: null });
        localStorage.removeItem("admin");
        localStorage.removeItem("accessToken");
      }
    },
  };
});
