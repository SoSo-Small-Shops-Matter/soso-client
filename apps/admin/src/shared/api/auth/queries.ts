import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/shared/store/useAuthStore";
import { authApi } from "./api";
import type { AdminLoginRequest } from "./types";

export const authKeys = {
  all: ["auth"] as const,
  login: () => [...authKeys.all, "login"] as const,
};

export const useAdminLogin = () => {
  const navigate = useNavigate();
  const { setToken, setRefreshToken, setUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: AdminLoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      setToken(data.result.accessToken);
      setRefreshToken(data.result.refreshToken);
      setUser({ email: "" }); // Extract from token if needed
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();

  return () => {
    clearAuth();
    navigate("/login");
  };
};
