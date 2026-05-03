import { apiClient } from "./client";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export const loginRequest = async (
  data: LoginPayload
): Promise<AuthTokens> => {
  const response = await apiClient.post<AuthTokens>(
    "/api/v1/auth/token/",
    data
  );

  return response.data;
};