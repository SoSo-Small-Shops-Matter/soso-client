import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/shared/store/useAuthStore";

export function RootRedirect() {
  const { token } = useAuthStore();

  // If token exists, user is logged in -> redirect to users page
  if (token) {
    return <Navigate to="/admin/users" replace />;
  }

  // No token -> redirect to login page
  return <Navigate to="/admin/login" replace />;
}
