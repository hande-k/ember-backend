import { apiFetch } from "./fetchClient";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = async (data: LoginRequest): Promise<void> => {
  const response = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  localStorage.setItem("token", response.token);
};

export const register = async (data: LoginRequest): Promise<void> => {
  const response = await apiFetch<LoginResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  localStorage.setItem("token", response.token);
};

export const logout = (): void => {
  localStorage.removeItem("token");
};
