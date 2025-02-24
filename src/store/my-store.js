import { create } from "zustand";

const useAuthStore = create((set) => {
  return {
    isAuthenticate: false,
    token: "",
    user: null,
    login: (payload) => {
      return set({
        isAuthenticate: true,
        token: payload.token,
        user: payload.user,
      });
    },
    logout: () => {
      return set({
        isAuthenticate: false,
        token: "",
        user: {},
      });
    },
  };
});
export default useAuthStore;
