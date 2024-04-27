import { BACKEND_URL } from "@/constants";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function useDeleteUser() {
  const deleteUser = async (id: string) => {
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        console.error("[useDeleteUser] No access token found");
        toast.error("You must be logged in to delete an account.");
        return;
      }
      const response = await fetch(`${BACKEND_URL}/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        console.log("[useDeleteUser] Account deleted successfully:", data);
        toast.success("Account deleted successfully");
        return data;
      } else if (response.status === 403) {
        console.error(
          "[useDeleteUser] Failed to delete account:",
          data.message
        );
        toast.error("You are not authorized to delete this account.");
      } else {
        console.error(
          "[useDeleteUser] Failed to delete account:",
          data.message
        );
        toast.error(`Could not delete account - ${data.message}`);
      }
    } catch (error) {
      console.error("[useDeleteUser] Failed to delete account:", error);
      toast.error("Failed to delete account");
    }
  };

  return { deleteUser };
}
