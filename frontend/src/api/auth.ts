import { apiFetch } from "./fetchClient";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}


export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};



export const register = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiFetch<LoginResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response; // <-- WICHTIG
};


export const logout = (): void => {
  localStorage.removeItem("token");
};
