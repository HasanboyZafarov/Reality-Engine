export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthContextType {
  user: string | null;
  login: (data: LoginPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}