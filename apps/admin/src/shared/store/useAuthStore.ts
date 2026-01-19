import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  role?: string;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      setToken: (token) => set({ token }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ token: null, refreshToken: null, user: null }),
    }),
    {
      name: "admin-auth-storage",
    }
  )
);
