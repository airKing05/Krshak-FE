// utils/auth.ts
export function isAdmin() {
  const user = {
    role: 'admin'
  }
  //JSON.parse(localStorage.getItem("user") || "{}");
  return user?.role === "admin"; // or however you store roles
}
