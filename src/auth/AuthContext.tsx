/* eslint-disable react-refresh/only-export-components */

import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { loginRequest } from "../api/auth";
import type { AuthContextType, LoginPayload } from "./types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // ✅ Lazy initialization — useEffect kerak emas
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("access_token")
      ? "authenticated"
      : null;
  });

  const login = async (data: LoginPayload) => {
    const tokens = await loginRequest(data);

    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);

    setUser(data.username);
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