import { create } from "zustand";
import type { UserType } from "@/types";
import { axiosInstance } from "../lib/axios";

interface AuthStore {
  isLoading: boolean;
  error: string | null;
  isUser: boolean;
  user: UserType | null;
  username: UserType[];
  password: UserType[];
  confirmPassword:UserType[];

  signUp: (username: string, password: string,confirmPassword:string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  error: null,
  isUser: false,
  user: null,
  username: [],
  password: [],
  confirmPassword:[],

  signUp: async (username, password,confirmPassword) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/users/signup", {
        username,
        password,
        confirmPassword,
      });
      console.log(response.data);
      set({ isLoading: false, isUser: true, user: response.data.user });
    } catch (error: any) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
