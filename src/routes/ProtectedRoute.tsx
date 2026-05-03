import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // ❌ Hech qachon return null QILMA
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ MUHIM QATOR
  return <Outlet />;
}