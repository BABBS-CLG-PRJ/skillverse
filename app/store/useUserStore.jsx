// store/useUserStore.js
import {create} from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUserData: async () => {
    const authtoken = localStorage.getItem("authtoken");

    if (!authtoken) {
      return;
    }

    try {
      const response = await axios.post("/api/verifytoken", {
        token: authtoken,
      });
      set({ user: response.data });
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  },
}));

export default useUserStore;
