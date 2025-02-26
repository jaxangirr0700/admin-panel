import { create } from "zustand";

const useAuthStore = create((set) => {
  const lsString = JSON.parse(localStorage.getItem("auth"));

  return {
    isAuthenticate: lsString?.token ? true : false,
    token: lsString?.token,
    user: lsString?.user,
    login: (payload) => {
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
