import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest } from "../api/auth";
import type { LoginPayload } from "./types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // ✅ Lazy init — useEffect yo‘q, lint-friendly
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("access_token")
      ? "authenticated"
      : null;
  });

  const login = async (data: LoginPayload) => {
    const tokens = await loginRequest(data);

    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);

    setUser("authenticated");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};