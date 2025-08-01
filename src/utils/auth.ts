import { jwtDecode } from "jwt-decode";
import { UserObj } from "../types/common";


export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // current time in seconds
  } catch {
    return false;
  }
};

export function isAdmin(user: UserObj) {
  return user.role === "admin";
}