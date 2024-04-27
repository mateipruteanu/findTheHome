import { BACKEND_URL } from "@/constants";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function useChangeRole() {
  const changeRole = async (id: string, role: "ADMIN" | "USER") => {
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        console.error("[useChangeRole] No access token found");
        toast.error("You must be logged in to change the role of an account.");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/user/${id}/change-role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("[useChangeRole] Role changed successfully:", data);
        toast.success("Role changed successfully");
        return data;
      } else if (response.status === 403) {
        console.error("[useChangeRole] Failed to change role:", data.message);
        toast.error("You are not authorized to change this account's role.");
      } else {
        console.error("[useChangeRole] Failed to change role:", data.message);
        toast.error(`Could not change role - ${data.message}`);
      }
    } catch (error) {
      console.error("[useChangeRole] Failed to change role:", error);
      toast.error("Failed to change role");
    }
  };

  return { changeRole };
}
