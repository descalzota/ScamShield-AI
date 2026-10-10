import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 10000,
});

export async function checkBackendHealth() {
  const response = await api.get("/health");
  return response.data;
}