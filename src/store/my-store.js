import { create } from "zustand";
import api from "../components/api/api";

const useAuthStore = create((set) => {
  const lsString = JSON.parse(localStorage.getItem("auth"));

  api.defaults.headers.Authorization = `Bearer ${lsString.token}`;
  return {
    isAuthenticate: lsString?.token ? true : false,
    token: lsString?.token,
    user: lsString?.user,
    login: (payload) => {
      api.defaults.headers.Authorization = `Bearer ${payload.token}`;
      return set({
        isAuthenticate: true,
        token: payload.token,
        user: payload.user,
      });
    },
    logout: () => {
      localStorage.removeItem("auth");
      return set({
        isAuthenticate: false,
        token: "",
        user: {},
      });
    },
  };
});
export default useAuthStore;
