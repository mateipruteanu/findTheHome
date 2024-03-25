import { useState } from "react";
import { BACKEND_URL } from "@/constants";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function useDeleteListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteListing = async (listingId: string) => {
    setIsLoading(true);
    toast.loading("Deleting listing...");
    setError(null);
    try {
      const token = Cookies.get("access_token");
      const response = await fetch(`${BACKEND_URL}/listing/${listingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("[useDeleteListing] Listing deleted successfully:", data);
        toast.dismiss();
        toast.success("Listing deleted successfully!");
      } else {
        console.error(
          "[useDeleteListing] Failed to delete listing:",
          data.message
        );
        toast.dismiss();
        toast.error(`Could not delete listing - ${data.message}`);
        setError(data.message);
      }
    } catch (error) {
      console.error("[useDeleteListing] Failed to delete listing:", error);
      toast.dismiss();
      toast.error(`Could not delete listing - ${error}`);
      setError("Failed to delete listing");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteListing };
}
